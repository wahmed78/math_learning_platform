export class MemoryLeakDetector {
  private static instance: MemoryLeakDetector;
  private observations: Map<string, WeakRef<any>[]>;
  private registry: FinalizationRegistry<string>;

  private constructor() {
    this.observations = new Map();
    this.registry = new FinalizationRegistry((key) => {
      this.handleObjectFinalization(key);
    });
  }

  static getInstance(): MemoryLeakDetector {
    if (!this.instance) {
      this.instance = new MemoryLeakDetector();
    }
    return this.instance;
  }

  observe(key: string, object: any): void {
    const weakRef = new WeakRef(object);
    const refs = this.observations.get(key) || [];
    refs.push(weakRef);
    this.observations.set(key, refs);
    this.registry.register(object, key);
  }

  private handleObjectFinalization(key: string): void {
    console.warn(`Potential memory leak detected for key: ${key}`);
    // Additional leak analysis logic
  }

  getStats(): { [key: string]: number } {
    const stats: { [key: string]: number } = {};
    for (const [key, refs] of this.observations.entries()) {
      stats[key] = refs.filter(ref => ref.deref()).length;
    }
    return stats;
  }
}
