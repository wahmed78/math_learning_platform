import { useQuery, UseQueryOptions } from 'react-query';
import { CacheManager } from '../utils/cache';

export function useOptimizedQuery<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options?: UseQueryOptions<T>
) {
  const cache = CacheManager.getInstance();
  
  return useQuery<T>(
    key,
    async () => {
      const cachedData = cache.get(key);
      if (cachedData) return cachedData;

      PerformanceMonitor.startMeasure(key);
      const data = await fetchFn();
      PerformanceMonitor.endMeasure(key);

      cache.set(key, data);
      return data;
    },
    {
      ...options,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000 // 30 minutes
    }
  );
}

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}