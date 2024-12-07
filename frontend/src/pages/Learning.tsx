import React, { useState } from 'react';
import { Problem } from '../components/math/Problem';
import { Solution } from '../components/math/Solution';
import { useProblem } from '../hooks/useProblem';

export const Learning = () => {
  const { currentProblem, feedback } = useProblem();
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="learning-container p-6">
      <h1 className="text-2xl font-bold mb-6">Learning Session</h1>
      
      <div className="learning-content">
        {currentProblem && (
          <Problem problem={currentProblem} />
        )}
        
        {showSolution && feedback && (
          <Solution steps={feedback.solution.steps} />
        )}
      </div>
    </div>
  );
};