import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://sqghnwxxxfckqsjffndg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZ2hud3h4eGZja3FzamZmbmRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2Mzc3OTEsImV4cCI6MjA1MDIxMzc5MX0.uwlQUncVGtWGgka_O5XIFr7rsSkEVG4EnKoEfbCjy-A');

interface UserProfile {
  full_name: string;
  role: string;
  points: number;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase.from('profiles')
      .select('full_name, role, points')
      .eq('id', user?.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
  };

  if (!profile) {
    return <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Your Profile</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2 text-blue-700 dark:text-blue-300">Name</h3>
          <p className="text-gray-600 dark:text-gray-400">{profile.full_name}</p>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2 text-green-700 dark:text-green-300">Email</h3>
          <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-2 text-purple-700 dark:text-purple-300">Role</h3>
          <p className="text-gray-600 dark:text-gray-400">{profile.role}</p>
        </div>
        
        {profile.role === 'student' && (
          <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2 text-yellow-700 dark:text-yellow-300">Points</h3>
            <p className="text-gray-600 dark:text-gray-400">{profile.points}</p>
          </div>
        )}
        
        {profile.role === 'tutor' && (
          <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2 text-red-700 dark:text-red-300">Rating</h3>
            <p className="text-gray-600 dark:text-gray-400">Not yet rated</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

