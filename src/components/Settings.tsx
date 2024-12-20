import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Settings: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      
      <button className="block w-full text-left px-4 py-2 mb-2 bg-gray-100 hover:bg-gray-200">
        Change Password
      </button>
      
      <button className="block w-full text-left px-4 py-2 mb-2 bg-gray-100 hover:bg-gray-200">
        Notification Preferences
      </button>
      
      <button className="block w-full text-left px-4 py-2 mb-2 bg-gray-100 hover:bg-gray-200">
        Language Settings
      </button>
      
      <button 
        className="mt-8 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={signOut}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Settings;

