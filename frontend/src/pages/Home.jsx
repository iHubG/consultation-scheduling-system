import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 flex items-start lg:items-center justify-center px-4 p-5">
      <div className="bg-white rounded-xl shadow-xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-4">
          Consultation Scheduling System
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome! This system helps students, faculty, and admins efficiently schedule and manage consultations.
        </p>
        
        <div className="flex flex-col gap-4">
          <Link
            to="/login"
            className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="w-full border border-purple-500 text-purple-700 py-3 rounded-md hover:bg-purple-100 transition duration-200"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
