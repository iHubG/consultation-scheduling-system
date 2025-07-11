import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-xl w-full text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or was moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
