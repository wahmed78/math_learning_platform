export const PerformanceMonitor: React.FC = () => {
    const [metrics, setMetrics] = useState<any>({});
  
    useEffect(() => {
      const updateMetrics = () => {
        setMetrics({
          memory: PerformanceMetrics.getMetrics('memory-usage'),
          network: PerformanceMetrics.getMetrics('network-request'),
          rendering: PerformanceMetrics.getMetrics('render-time')
        });
      };
  
      const interval = setInterval(updateMetrics, 1000);
      return () => clearInterval(interval);
    }, []);
  
    if (process.env.NODE_ENV === 'production') return null;
  
    return (
      <div className="fixed bottom-0 right-0 p-4 bg-black bg-opacity-80 text-white">
        <h3>Performance Metrics</h3>
        <pre>{JSON.stringify(metrics, null, 2)}</pre>
      </div>
    );
  };