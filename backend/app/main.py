from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# Import our modules
from database import get_db, engine
from models import Base
from ai_tutor_core import AdvancedMathTutorAI
from content_generation import ContentGenerator

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Math Tutor API",
    description="AI-Powered Mathematics Learning Platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with actual frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Initialize AI components
ai_tutor = AdvancedMathTutorAI()
content_generator = ContentGenerator(ai_tutor)

# User Authentication Routes
@app.post("/token")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # Verify credentials (implement your auth logic)
    if not verify_credentials(form_data.username, form_data.password, db):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    # Generate token
    access_token = create_access_token(form_data.username)
    return {"access_token": access_token, "token_type": "bearer"}

# Learning Content Routes
@app.get("/api/problems/{grade}/{topic}")
async def get_problems(
    grade: str,
    topic: str,
    difficulty: Optional[str] = "medium",
    count: Optional[int] = 5,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        problems = content_generator.generate_problem_set(
            grade=grade,
            topic=topic,
            difficulty=difficulty,
            count=count
        )
        return {"problems": problems}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/check-answer")
async def check_answer(
    problem_id: int,
    student_answer: str,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        result = ai_tutor.assess_solution(
            problem_id=problem_id,
            student_answer=student_answer
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Progress Tracking Routes
@app.get("/api/progress/{student_id}")
async def get_progress(
    student_id: int,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        progress = get_student_progress(student_id, db)
        return progress
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/update-progress")
async def update_progress(
    student_id: int,
    topic: str,
    score: float,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        updated_progress = update_student_progress(student_id, topic, score, db)
        return updated_progress
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Analytics Routes
@app.get("/api/analytics/{student_id}")
async def get_analytics(
    student_id: int,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    try:
        analytics = generate_analytics(student_id, db)
        return analytics
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Health Check
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow(),
        "version": "1.0.0"
    }

# Helper Functions
def verify_credentials(username: str, password: str, db: Session) -> bool:
    # Implement your credential verification logic
    pass

def create_access_token(username: str) -> str:
    # Implement your token generation logic
    pass

def get_student_progress(student_id: int, db: Session) -> dict:
    # Implement progress retrieval logic
    pass

def update_student_progress(student_id: int, topic: str, score: float, db: Session) -> dict:
    # Implement progress update logic
    pass

def generate_analytics(student_id: int, db: Session) -> dict:
    # Implement analytics generation logic
    pass

# Create database tables
Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True
    )
    
    app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your Vercel frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)