import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Homepage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Welcome to Maktab</h2>
      <p className="mb-8 text-gray-600 dark:text-gray-300">Hello, {user?.email}!</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300">Your Courses</h3>
          <p className="text-gray-600 dark:text-gray-400">No courses enrolled yet.</p>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 text-green-700 dark:text-green-300">Upcoming Classes</h3>
          <p className="text-gray-600 dark:text-gray-400">No upcoming classes.</p>
        </div>
        
        <div className="md:col-span-2 bg-purple-50 dark:bg-purple-900 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-300">Your Progress</h3>
          <p className="text-gray-600 dark:text-gray-400">Start a course to track your progress!</p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

