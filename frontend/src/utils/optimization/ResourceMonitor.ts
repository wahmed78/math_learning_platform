export class ResourceMonitor {
  private static memoryUsage: number[] = [];
  private static cpuUsage: number[] = [];

  static startMonitoring(interval: number = 1000): void {
    setInterval(() => {
      if (performance.memory) {
        this.memoryUsage.push(performance.memory.usedJSHeapSize);
      }
      // CPU usage estimation through animation frame timing
      let lastTime = performance.now();
      requestAnimationFrame(() => {
        const cpuTime = performance.now() - lastTime;
        this.cpuUsage.push(cpuTime);
      });
    }, interval);
  }

  static getMetrics(): {
    memory: { current: number; avg: number };
    cpu: { current: number; avg: number };
  } {
    return {
      memory: {
        current: this.memoryUsage[this.memoryUsage.length - 1],
        avg: this.memoryUsage.reduce((a, b) => a + b, 0) / this.memoryUsage.length
      },
      cpu: {
        current: this.cpuUsage[this.cpuUsage.length - 1],
        avg: this.cpuUsage.reduce((a, b) => a + b, 0) / this.cpuUsage.length
      }
    };
  }
}
