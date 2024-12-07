import React from 'react';
import { useProgress } from '../hooks/useProgress';
import { LineChart } from 'recharts';

export const Progress = () => {
  const { progress } = useProgress();

  return (
    <div className="progress-container p-6">
      <h1 className="text-2xl font-bold mb-6">Learning Progress</h1>
      
      <div className="progress-charts">
        <LineChart data={progress?.data}>
          {/* Chart configuration */}
        </LineChart>
      </div>
    </div>
  );
};