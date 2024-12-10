from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
import os
import jwt
from dotenv import load_dotenv

# Import our modules
from app.database import get_db, engine
from app.models import Base, User  # Make sure to import User model
from app.ai_tutor_core import AdvancedMathTutorAI
from app.content_generation import ContentGenerator

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Math Tutor API",
    description="AI-Powered Mathematics Learning Platform",
    version="1.0.0"
)

# Configure CORS - keep only this one, remove the one at the bottom
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Initialize AI components
try:
    ai_tutor = AdvancedMathTutorAI()
    content_generator = ContentGenerator(ai_tutor)
except Exception as e:
    print(f"Error initializing AI components: {e}")

# Helper Functions
def verify_credentials(username: str, password: str, db: Session) -> bool:
    try:
        user = db.query(User).filter(User.username == username).first()
        if not user:
            return False
        return user.verify_password(password)  # Implement this method in your User model
    except Exception as e:
        print(f"Error verifying credentials: {e}")
        return False

def create_access_token(username: str) -> str:
    try:
        to_encode = {"sub": username, "exp": datetime.utcnow() + timedelta(days=1)}
        return jwt.encode(to_encode, os.getenv("SECRET_KEY"), algorithm="HS256")
    except Exception as e:
        print(f"Error creating access token: {e}")
        raise HTTPException(status_code=500, detail="Could not create access token")

def get_student_progress(student_id: int, db: Session) -> dict:
    try:
        # Implement your progress retrieval logic
        progress = db.query(Progress).filter(Progress.student_id == student_id).all()
        return {"progress": [p.to_dict() for p in progress]}
    except Exception as e:
        print(f"Error getting progress: {e}")
        raise HTTPException(status_code=500, detail="Could not retrieve progress")

# Keep your existing routes, but add error handling...

# Health Check with database check
@app.get("/health")
async def health_check(db: Session = Depends(get_db)):
    try:
        # Test database connection
        db.execute("SELECT 1")
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": datetime.utcnow(),
            "version": "1.0.0"
        }
    except Exception as e:
        print(f"Health check failed: {e}")
        return {
            "status": "unhealthy",
            "error": str(e),
            "timestamp": datetime.utcnow(),
            "version": "1.0.0"
        }

# Create database tables
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Error creating database tables: {e}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)