import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  approved: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  tutor_id: string;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', tutor_id: '' });

  useEffect(() => {
    fetchUsers();
    fetchCourses();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:5000/api/users');
    const data = await response.json();
    setUsers(data);
  };

  const fetchCourses = async () => {
    const response = await fetch('http://localhost:5000/api/courses');
    const data = await response.json();
    setCourses(data);
  };

  const approveTutor = async (id: string) => {
    await fetch(`http://localhost:5000/api/users/${id}/approve`, { method: 'PUT' });
    fetchUsers();
  };

  const createCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:5000/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCourse),
    });
    setNewCourse({ title: '', description: '', tutor_id: '' });
    fetchCourses();
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Admin Dashboard</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">User Management</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b dark:border-gray-600">
                <td className="p-2">{user.full_name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2">
                  {user.role === 'tutor' && !user.approved && (
                    <button
                      onClick={() => approveTutor(user.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-gray-300">Course Management</h3>
        <form onSubmit={createCourse} className="mb-4">
          <input
            type="text"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          <textarea
            placeholder="Course Description"
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          <input
            type="text"
            placeholder="Tutor ID"
            value={newCourse.tutor_id}
            onChange={(e) => setNewCourse({ ...newCourse, tutor_id: e.target.value })}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Create Course
          </button>
        </form>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Tutor ID</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b dark:border-gray-600">
                <td className="p-2">{course.title}</td>
                <td className="p-2">{course.description}</td>
                <td className="p-2">{course.tutor_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

