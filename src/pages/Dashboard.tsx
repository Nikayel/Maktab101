import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Calendar, Award, Clock } from 'lucide-react';

export function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [recentActivity, setRecentActivity] = useState([
    { id: 1, type: 'scholarship', text: 'Applied for Fulbright Scholarship', date: '2024-01-08' },
    { id: 2, type: 'session', text: 'Scheduled mentorship session with Sarah', date: '2024-01-07' },
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
        setUser(userData);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name || 'Scholar'}!
        </h1>
        <p className="mt-1 text-gray-500">
          Here's what's happening with your applications and mentorship.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center">
            <Award className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Scholarships</h3>
              <p className="text-gray-500">3 Active Applications</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Next Session</h3>
              <p className="text-gray-500">Tomorrow, 3:00 PM</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Study Hours</h3>
              <p className="text-gray-500">12 hours this week</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 text-sm"
            >
              <div className="flex-shrink-0">
                {activity.type === 'scholarship' ? (
                  <Award className="h-5 w-5 text-indigo-600" />
                ) : (
                  <Calendar className="h-5 w-5 text-indigo-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900">{activity.text}</p>
                <p className="text-gray-500">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}