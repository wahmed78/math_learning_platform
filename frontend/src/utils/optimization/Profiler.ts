export class Profiler {
  private static instances = new Map<string, Profiler>();
  private metrics: Map<string, number[]>;
  private startTimes: Map<string, number>;

  private constructor() {
    this.metrics = new Map();
    this.startTimes = new Map();
  }

  static getInstance(name: string): Profiler {
    if (!Profiler.instances.has(name)) {
      Profiler.instances.set(name, new Profiler());
    }
    return Profiler.instances.get(name)!;
  }

  startProfile(label: string): void {
    this.startTimes.set(label, performance.now());
  }

  endProfile(label: string): number {
    const startTime = this.startTimes.get(label);
    if (!startTime) return 0;

    const duration = performance.now() - startTime;
    const metrics = this.metrics.get(label) || [];
    metrics.push(duration);
    this.metrics.set(label, metrics);

    return duration;
  }

  getMetrics(label: string): { avg: number; min: number; max: number } {
    const metrics = this.metrics.get(label) || [];
    return {
      avg: metrics.reduce((a, b) => a + b, 0) / metrics.length,
      min: Math.min(...metrics),
      max: Math.max(...metrics)
    };
  }
}
