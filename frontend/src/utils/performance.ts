export const performanceOptimizations = {
  debounce: (fn: Function, ms: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  },

  memoize: (fn: Function) => {
    const cache = new Map();
    return (...args: any[]) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) return cache.get(key);
      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    };
  },

  throttle: (fn: Function, ms: number) => {
    let lastRun: number;
    let timeout: ReturnType<typeof setTimeout>;
    
    return function (...args: any[]) {
      if (lastRun && Date.now() - lastRun < ms) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          lastRun = Date.now();
          fn.apply(this, args);
        }, ms);
        return;
      }
      lastRun = Date.now();
      fn.apply(this, args);
    };
  }
};