from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL")

# Create SQLAlchemy engine
engine = create_engine(
    DATABASE_URL,
    pool_size=5,  # Maximum number of database connections in the pool
    max_overflow=10,  # Maximum number of connections that can be created beyond pool_size
    pool_timeout=30,  # Timeout for getting a connection from the pool
    pool_recycle=1800,  # Recycle connections after 30 minutes
    echo=False  # Set to True to see SQL queries in console
)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

def get_db():
    """
    Dependency to get database session.
    Usage in FastAPI:
    @app.get("/users/")
    def get_users(db: Session = Depends(get_db)):
        ...
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@contextmanager
def db_session():
    """
    Context manager for database sessions.
    Usage:
    with db_session() as db:
        db.query(User).all()
    """
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()

class DatabaseManager:
    """Database management utilities"""
    
    @staticmethod
    def init_db():
        """Initialize database tables"""
        Base.metadata.create_all(bind=engine)
        print("Database tables created successfully")

    @staticmethod
    def drop_db():
        """Drop all database tables"""
        Base.metadata.drop_all(bind=engine)
        print("Database tables dropped successfully")

    @staticmethod
    def check_connection():
        """Check database connection"""
        try:
            with db_session() as db:
                db.execute("SELECT 1")
            return {"status": "connected", "message": "Database connection successful"}
        except Exception as e:
            return {"status": "error", "message": f"Database connection failed: {str(e)}"}

    @staticmethod
    async def get_connection_pool_status():
        """Get database connection pool status"""
        return {
            "pool_size": engine.pool.size(),
            "checkedin": engine.pool.checkedin(),
            "checkedout": engine.pool.checkedout(),
            "overflow": engine.pool.overflow()
        }

    @staticmethod
    def execute_raw_sql(query: str, params: dict = None):
        """Execute raw SQL query"""
        with db_session() as db:
            result = db.execute(query, params or {})
            return result

# Database migration functions
def run_migrations():
    """Run database migrations"""
    try:
        # Import models to ensure they're registered
        from models import User, StudentProfile, MathProblem, Progress
        
        # Create tables
        Base.metadata.create_all(bind=engine)
        print("Migrations completed successfully")
    except Exception as e:
        print(f"Migration failed: {str(e)}")
        raise

# Database backup utility
def backup_database():
    """Create database backup"""
    try:
        import subprocess
        from datetime import datetime
        
        backup_dir = "backups"
        if not os.path.exists(backup_dir):
            os.makedirs(backup_dir)
            
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_file = f"{backup_dir}/backup_{timestamp}.sql"
        
        # Get database URL components
        db_url = DATABASE_URL.replace("postgresql://", "").split("@")
        auth = db_url[0].split(":")
        host_port_db = db_url[1].split("/")
        
        # Construct pg_dump command
        cmd = [
            "pg_dump",
            "-h", host_port_db[0].split(":")[0],
            "-U", auth[0],
            "-d", host_port_db[1],
            "-f", backup_file
        ]
        
        # Execute backup
        subprocess.run(cmd, env={"PGPASSWORD": auth[1]})
        print(f"Backup created successfully: {backup_file}")
        return {"status": "success", "file": backup_file}
    except Exception as e:
        print(f"Backup failed: {str(e)}")
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    # Initialize database if run directly
    DatabaseManager.init_db()
    
    # Test connection
    connection_status = DatabaseManager.check_connection()
    print(connection_status)