export class PerformanceMetrics {
  private static metrics: {
    [key: string]: {
      value: number;
      timestamp: number;
    }[];
  } = {};

  static track(key: string, value: number): void {
    if (!this.metrics[key]) {
      this.metrics[key] = [];
    }
    this.metrics[key].push({
      value,
      timestamp: Date.now()
    });
  }

  static getMetrics(key: string): {
    current: number;
    average: number;
    trend: 'up' | 'down' | 'stable';
  } {
    const values = this.metrics[key] || [];
    if (values.length === 0) {
      return { current: 0, average: 0, trend: 'stable' };
    }

    const current = values[values.length - 1].value;
    const average = values.reduce((sum, v) => sum + v.value, 0) / values.length;
    
    const trend = this.calculateTrend(values);
    
    return { current, average, trend };
  }

  private static calculateTrend(values: { value: number; timestamp: number }[]): 'up' | 'down' | 'stable' {
    if (values.length < 2) return 'stable';
    
    const recentValues = values.slice(-5);
    const firstValue = recentValues[0].value;
    const lastValue = recentValues[recentValues.length - 1].value;
    
    if (lastValue > firstValue * 1.1) return 'up';
    if (lastValue < firstValue * 0.9) return 'down';
    return 'stable';
  }
}
