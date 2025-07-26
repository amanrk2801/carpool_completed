import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Loading Component
 * 
 * Displays a loading spinner with optional text.
 * Can be used for full-page loading or inline loading states.
 */
const Loading = ({ 
  text = 'Loading...', 
  size = 'md', 
  fullScreen = false,
  overlay = false 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center space-y-3">
      <Loader2 
        className={`${sizeClasses[size]} text-blue-600 animate-spin`} 
      />
      {text && (
        <p className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <LoadingSpinner />
    </div>
  );
};

/**
 * Inline Loading Component
 * 
 * For small loading states within components
 */
export const InlineLoading = ({ text = 'Loading...', className = '' }) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
    <span className="text-sm text-gray-600">{text}</span>
  </div>
);

/**
 * Button Loading Component
 * 
 * For loading states within buttons
 */
export const ButtonLoading = ({ text = 'Processing...', className = '' }) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    <Loader2 className="w-4 h-4 animate-spin" />
    <span>{text}</span>
  </div>
);

/**
 * Card Loading Component
 * 
 * Skeleton loading for card-like components
 */
export const CardLoading = ({ count = 1 }) => (
  <div className="space-y-4">
    {[...Array(count)].map((_, index) => (
      <div key={index} className="border border-gray-200 rounded-lg p-6 animate-pulse">
        <div className="flex space-x-4">
          <div className="rounded-full bg-gray-300 h-12 w-12"></div>
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="space-y-1">
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-3 bg-gray-300 rounded w-full"></div>
          <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
    ))}
  </div>
);

/**
 * Table Loading Component
 * 
 * Skeleton loading for table-like components
 */
export const TableLoading = ({ rows = 5, columns = 4 }) => (
  <div className="space-y-3">
    {[...Array(rows)].map((_, rowIndex) => (
      <div key={rowIndex} className="flex space-x-4 animate-pulse">
        {[...Array(columns)].map((_, colIndex) => (
          <div 
            key={colIndex} 
            className="h-4 bg-gray-300 rounded flex-1"
          ></div>
        ))}
      </div>
    ))}
  </div>
);

export default Loading;
