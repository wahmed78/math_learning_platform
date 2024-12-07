import React from 'react';
import { Problem } from '../components/math/Problem';
import { useProblem } from '../hooks/useProblem';

export const Practice = () => {
  const { currentProblem } = useProblem();

  return (
    <div className="practice-container p-6">
      <h1 className="text-2xl font-bold mb-6">Practice Problems</h1>
      
      {currentProblem && (
        <Problem problem={currentProblem} />
      )}
    </div>
  );
};
