import { useState, useEffect } from 'react';
import { problemsService } from '../services/problems';

export const useProblem = () => {
  const [currentProblem, setCurrentProblem] = useState(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const submitAnswer = (value) => {
    setAnswer(value);
  };

  const checkSolution = async () => {
    const result = await problemsService.checkSolution(
      currentProblem.id,
      answer
    );
    setFeedback(result);
  };

  return {
    currentProblem,
    submitAnswer,
    checkSolution,
    feedback
  };
};