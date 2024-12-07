import ReactGA from 'react-ga';

export class Analytics {
  static init(trackingId: string) {
    ReactGA.initialize(trackingId);
  }

  static pageview(path: string) {
    ReactGA.pageview(path);
  }

  static trackEvent(category: string, action: string, label?: string) {
    ReactGA.event({
      category,
      action,
      label
    });
  }

  static trackTiming(category: string, variable: string, value: number) {
    ReactGA.timing({
      category,
      variable,
      value
    });
  }
}
