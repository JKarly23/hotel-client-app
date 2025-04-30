import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="text-red-600">
        <svg
          className="w-16 h-16 mb-4 animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.29 3.86L1.82 18a1 1 0 00.85 1.5h18.66a1 1 0 00.85-1.5L13.71 3.86a1 1 0 00-1.71 0zM12 9v4m0 4h.01"
          />
        </svg>
      </div>
      <p className="text-lg font-medium text-gray-800">
        {error?.message || 'Ha ocurrido un error inesperado'}
      </p>
    </div>
  );
};

export default ErrorMessage;
