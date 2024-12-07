import React from 'react';
import { SolutionType } from '../../types/problem';

export const Solution: React.FC<SolutionType> = ({
  steps,
  explanation,
  hints
}) => {
  return (
    <div className="solution-container">
      <div className="steps-list">
        {steps.map((step, index) => (
          <div key={index} className="solution-step">
            <span className="step-number">{index + 1}</span>
            <span className="step-content">{step}</span>
          </div>
        ))}
      </div>
      
      {hints && (
        <div className="hints-section">
          <h4>Hints</h4>
          <ul>
            {hints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};