import React from 'react';
import { Outlet } from 'react-router-dom';

const NotFound = () => {
  const handleBack = () => {
    window.history.back();
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-gray-800 mb-8">Oops! Page not found.</p>
      <button
        onClick={handleBack}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go back
      </button>
      <Outlet />
    </div>
  );
};

export default NotFound;
