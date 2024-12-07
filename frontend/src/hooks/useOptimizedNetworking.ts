export function useOptimizedNetworking() {
  return {
    async fetch(url: string, options?: RequestInit) {
      const startTime = performance.now();
      try {
        const response = await NetworkOptimizer.optimizedFetch(url, options);
        PerformanceMetrics.track('network-request', performance.now() - startTime);
        return response;
      } catch (error) {
        console.error('Network request failed:', error);
        throw error;
      }
    },

    prefetch(urls: string[]) {
      NetworkOptimizer.prefetch(urls);
    }
  };
}
