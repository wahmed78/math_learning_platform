export class PerformanceMonitor {
  private static measures: Map<string, number[]> = new Map();

  static startMeasure(label: string): void {
    performance.mark(`${label}-start`);
  }

  static endMeasure(label: string): void {
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    
    const measure = performance.getEntriesByName(label).pop();
    if (measure) {
      const measures = PerformanceMonitor.measures.get(label) || [];
      measures.push(measure.duration);
      PerformanceMonitor.measures.set(label, measures);
    }
  }

  static getAverageTime(label: string): number {
    const measures = PerformanceMonitor.measures.get(label);
    if (!measures || measures.length === 0) return 0;
    return measures.reduce((a, b) => a + b, 0) / measures.length;
  }

  static logMetrics(): void {
    PerformanceMonitor.measures.forEach((measures, label) => {
      console.log(`Average time for ${label}: ${PerformanceMonitor.getAverageTime(label)}ms`);
    });
  }
}
