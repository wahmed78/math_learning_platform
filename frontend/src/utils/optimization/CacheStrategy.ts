export class AdvancedCache {
  private static instance: AdvancedCache;
  private cache: Map<string, {
    data: any;
    expires: number;
    priority: number;
    hits: number;
  }>;
  private maxSize: number;

  private constructor(maxSize: number = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  static getInstance(): AdvancedCache {
    if (!AdvancedCache.instance) {
      AdvancedCache.instance = new AdvancedCache();
    }
    return AdvancedCache.instance;
  }

  set(key: string, data: any, options: {
    ttl?: number;
    priority?: number;
  } = {}): void {
    if (this.cache.size >= this.maxSize) {
      this.evictLeastValuable();
    }

    this.cache.set(key, {
      data,
      expires: Date.now() + (options.ttl || 5 * 60 * 1000),
      priority: options.priority || 1,
      hits: 0
    });
  }

  get(key: string): any {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }

    item.hits++;
    return item.data;
  }

  private evictLeastValuable(): void {
    let leastValuableKey: string | null = null;
    let lowestValue = Infinity;

    this.cache.forEach((item, key) => {
      const value = this.calculateValue(item);
      if (value < lowestValue) {
        lowestValue = value;
        leastValuableKey = key;
      }
    });

    if (leastValuableKey) {
      this.cache.delete(leastValuableKey);
    }
  }

  private calculateValue(item: {
    priority: number;
    hits: number;
    expires: number;
  }): number {
    const timeRemaining = item.expires - Date.now();
    return (item.priority * item.hits) * (timeRemaining / 3600000);
  }
}
