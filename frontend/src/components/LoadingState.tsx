import React from 'react';
import { Loading } from './common/Loading';

interface LoadingStateProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  isLoading,
  children,
  loadingText = 'Loading...'
}) => {
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text={loadingText} />
      </div>
    );
  }

  return <>{children}</>;
};
