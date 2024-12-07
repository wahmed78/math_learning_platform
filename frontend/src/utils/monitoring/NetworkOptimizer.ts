export class NetworkOptimizer {
  private static requestCache: Map<string, {
    promise: Promise<any>;
    timestamp: number;
  }> = new Map();

  static async optimizedFetch(
    url: string,
    options: RequestInit & {
      cacheDuration?: number;
      priority?: 'high' | 'low';
    } = {}
  ): Promise<any> {
    const cacheKey = `${url}-${JSON.stringify(options)}`;
    const cached = this.requestCache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < (options.cacheDuration || 5000)) {
      return cached.promise;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, options.priority === 'high' ? 10000 : 5000);

    const promise = fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...options.headers,
        'Priority': options.priority || 'low'
      }
    }).finally(() => clearTimeout(timeoutId));

    this.requestCache.set(cacheKey, {
      promise,
      timestamp: Date.now()
    });

    return promise;
  }

  static prefetch(urls: string[]): void {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });
  }
}
