import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  color = '#4F46E5',
  text = 'Loading...'
}) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`${sizeMap[size]} animate-spin rounded-full border-4 border-t-transparent`}
        style={{ borderColor: `${color} transparent transparent transparent` }}
      />
      {text && (
        <span className="mt-2 text-gray-600">{text}</span>
      )}
    </div>
  );
};
