import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="flex flex-col items-center justify-center bg-white/80 rounded-2xl shadow-lg px-8 py-10 border border-red-200">
        <div className="flex items-center justify-center mb-4">
          <svg
            className="w-20 h-20 text-red-500 animate-bounce"
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
        <h2 className="text-2xl font-bold text-red-600 mb-2">¡Ups! Ocurrió un error</h2>
        <p className="text-lg font-medium text-gray-700">
          {error?.message || 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.'}
        </p>
      </div>
    </div>
  );
};

export default ErrorMessage;
