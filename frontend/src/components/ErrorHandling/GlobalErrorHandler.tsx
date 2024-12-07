import React, { useEffect } from 'react';

export const GlobalErrorHandler: React.FC = () => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error:', event.error);
      // Log to service
      logErrorToService(event.error);
      // Show user-friendly message
      showErrorNotification('An unexpected error occurred');
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      // Log to service
      logErrorToService(event.reason);
      // Show user-friendly message
      showErrorNotification('Failed to complete operation');
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
};
