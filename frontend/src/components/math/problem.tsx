import React from 'react';
import { useProblem } from '../../hooks/useProblem';
import { ProblemType } from '../../types/problem';

export const Problem: React.FC<ProblemType> = ({ 
  problem,
  difficulty,
  topic
}) => {
  const { submitAnswer, checkSolution } = useProblem();

  return (
    <div className="math-problem p-4 rounded-lg bg-white shadow-md">
      <h3 className="text-xl font-bold mb-4">{problem.question}</h3>
      
      <div className="problem-content">
        {problem.visualAid && (
          <div className="visual-aid mb-4">
            <img src={problem.visualAid} alt="Problem visualization" />
          </div>
        )}
        
        <div className="answer-section">
          <input 
            type="text"
            className="answer-input"
            placeholder="Enter your answer"
            onChange={(e) => submitAnswer(e.target.value)}
          />
          <button 
            className="check-button"
            onClick={() => checkSolution()}
          >
            Check Answer
          </button>
        </div>
      </div>
    </div>
  );
};