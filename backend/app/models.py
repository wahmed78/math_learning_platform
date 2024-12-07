from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Enum, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import enum

Base = declarative_base()

class UserRole(enum.Enum):
    STUDENT = "student"
    PARENT = "parent"
    TEACHER = "teacher"

class DifficultyLevel(enum.Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.STUDENT)
    grade_level = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime)

    # Relationships
    profile = relationship("StudentProfile", back_populates="user", uselist=False)
    progress = relationship("Progress", back_populates="user")
    achievements = relationship("Achievement", back_populates="user")
    attempts = relationship("ProblemAttempt", back_populates="user")

class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    current_level = Column(Integer, default=1)
    xp_points = Column(Integer, default=0)
    preferred_learning_style = Column(String)
    strengths = Column(JSON)  # Store as JSON: {"topic": score}
    weaknesses = Column(JSON)  # Store as JSON: {"topic": score}
    last_activity = Column(DateTime)

    # Relationships
    user = relationship("User", back_populates="profile")

class MathProblem(Base):
    __tablename__ = "math_problems"

    id = Column(Integer, primary_key=True, index=True)
    topic = Column(String, nullable=False)
    grade_level = Column(String, nullable=False)
    difficulty = Column(Enum(DifficultyLevel))
    question = Column(String, nullable=False)
    correct_answer = Column(String, nullable=False)
    solution_steps = Column(JSON)  # Store steps as JSON array
    hints = Column(JSON)  # Store hints as JSON array
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    attempts = relationship("ProblemAttempt", back_populates="problem")

class ProblemAttempt(Base):
    __tablename__ = "problem_attempts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    problem_id = Column(Integer, ForeignKey("math_problems.id"))
    student_answer = Column(String)
    is_correct = Column(Boolean)
    time_taken = Column(Float)  # Time in seconds
    attempt_date = Column(DateTime, default=datetime.utcnow)
    hints_used = Column(Integer, default=0)

    # Relationships
    user = relationship("User", back_populates="attempts")
    problem = relationship("MathProblem", back_populates="attempts")

class Progress(Base):
    __tablename__ = "progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    topic = Column(String, nullable=False)
    mastery_level = Column(Float, default=0.0)  # 0 to 1
    problems_attempted = Column(Integer, default=0)
    problems_solved = Column(Integer, default=0)
    average_time = Column(Float)  # Average time per problem
    last_updated = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="progress")

class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, nullable=False)
    description = Column(String)
    achieved_at = Column(DateTime, default=datetime.utcnow)
    xp_awarded = Column(Integer, default=0)
    badge_icon = Column(String)  # Store icon path/name

    # Relationships
    user = relationship("User", back_populates="achievements")

class LearningPath(Base):
    __tablename__ = "learning_paths"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    current_topic = Column(String)
    completed_topics = Column(JSON)  # Store as JSON array
    next_topics = Column(JSON)  # Store as JSON array
    difficulty_level = Column(Enum(DifficultyLevel))
    last_updated = Column(DateTime, default=datetime.utcnow)

class ParentTeacherLink(Base):
    __tablename__ = "parent_teacher_links"

    id = Column(Integer, primary_key=True, index=True)
    parent_id = Column(Integer, ForeignKey("users.id"))
    student_id = Column(Integer, ForeignKey("users.id"))
    access_level = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

# Add indices for better query performance
def create_indices():
    User.__table__.create_index('idx_user_role', 'role')
    Progress.__table__.create_index('idx_progress_topic', 'topic')
    MathProblem.__table__.create_index('idx_problem_topic_grade', 'topic', 'grade_level')
    ProblemAttempt.__table__.create_index('idx_attempt_date', 'attempt_date')