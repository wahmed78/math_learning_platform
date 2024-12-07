import React, { useEffect, useRef } from 'react';
import { Line } from 'recharts';

export const PerformanceVisualizer: React.FC = () => {
  const metricsRef = useRef<any[]>([]);

  useEffect(() => {
    const updateMetrics = () => {
      const metrics = {
        timestamp: Date.now(),
        fps: calculateFPS(),
        memory: performance.memory?.usedJSHeapSize || 0,
        domNodes: document.getElementsByTagName('*').length,
        renderTime: window.performance.getEntriesByType('measure').length
      };

      metricsRef.current = [...metricsRef.current.slice(-50), metrics];
      visualizeMetrics(metricsRef.current);
    };

    const interval = setInterval(updateMetrics, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="performance-visualizer">
      <div id="fps-chart" />
      <div id="memory-chart" />
      <div id="render-chart" />
    </div>
  );
};
