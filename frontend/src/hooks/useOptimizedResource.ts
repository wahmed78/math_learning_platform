import { useState, useEffect } from 'react';

export function useOptimizedResource<T>(
  fetcher: () => Promise<T>,
  options: {
    cacheKey?: string;
    ttl?: number;
    priority?: number;
    retry?: number;
  } = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const cache = AdvancedCache.getInstance();
    const profiler = Profiler.getInstance('resource-fetch');

    async function fetchData() {
      try {
        if (options.cacheKey) {
          const cachedData = cache.get(options.cacheKey);
          if (cachedData) {
            setData(cachedData);
            setLoading(false);
            return;
          }
        }

        profiler.startProfile('fetch');
        const result = await fetcher();
        profiler.endProfile('fetch');

        if (options.cacheKey) {
          cache.set(options.cacheKey, result, {
            ttl: options.ttl,
            priority: options.priority
          });
        }

        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}