export class CacheManager {
  private static instance: CacheManager;
  private cache: Map<string, { data: any; timestamp: number }>;
  private maxAge: number;

  private constructor() {
    this.cache = new Map();
    this.maxAge = 5 * 60 * 1000; // 5 minutes default
  }

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  set(key: string, data: any, maxAge?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + (maxAge || this.maxAge)
    });
  }

  get(key: string): any {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.timestamp) {
      this.cache.delete(key);
      return null;
    }
    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }
}
