import { useState, useEffect } from 'react';

export const useProgress = (studentId) => {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    // Implementation
  }, [studentId]);

  return { progress };
};