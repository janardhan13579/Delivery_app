// src/components/CustomerSignUp.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CustomerSignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Customer</h3>
            <Link
              to="/signup"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-center block hover:bg-blue-700 transition duration-300"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg text-center block mt-2 hover:bg-gray-700 transition duration-300"
            >
              Already have an account
            </Link>
          </div>

          <div className="my-4 text-center text-gray-600">or</div>

         
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Restaurant Manager</h3>
            <Link
              to="/manager-signup"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg text-center block hover:bg-green-700 transition duration-300"
            >
              Create Account
            </Link>
            <Link
              to="/manager-login"
              className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg text-center block mt-2 hover:bg-gray-700 transition duration-300"
            >
              Already have an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignUp;
