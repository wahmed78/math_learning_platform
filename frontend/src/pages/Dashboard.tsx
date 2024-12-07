import React from 'react';
import { useProgress } from '../hooks/useProgress';
import { Card } from '../components/common/Card';
import { Visualization } from '../components/math/Visualization';

export const Dashboard = () => {
  const { progress } = useProgress();

  return (
    <div className="dashboard-container p-6">
      <h1 className="text-2xl font-bold mb-6">Learning Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-4">
        <Card title="Current Progress">
          <Visualization data={progress?.data} />
        </Card>
        
        <Card title="Recent Activities">
          {/* Activity list */}
        </Card>
        
        <Card title="Recommendations">
          {/* Recommendations list */}
        </Card>
      </div>
    </div>
  );
};
