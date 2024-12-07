export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateAnswer = (
  userAnswer: string,
  correctAnswer: number,
  tolerance: number = 0.01
): boolean => {
  const numAnswer = parseFloat(userAnswer);
  if (isNaN(numAnswer)) return false;
  return Math.abs(numAnswer - correctAnswer) <= tolerance;
};

export const validateGrade = (grade: string): boolean => {
  const validGrades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4'];
  return validGrades.includes(grade);
};