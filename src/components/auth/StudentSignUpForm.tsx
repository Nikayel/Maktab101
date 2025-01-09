import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import type { StudentSignUpData } from '../../types/auth';
import { UserPlus, Loader } from 'lucide-react'; // Added Loader for loading state

export function StudentSignUpForm() {
  const [formData, setFormData] = useState<StudentSignUpData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    currentEducation: 'high_school',
    englishLevel: 'Intermediate',
    targetSchool: '',
    targetMajor: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Validate form data
  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill out all fields.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Sign up with Supabase Auth
      const { error: signUpError, data } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) {
        console.error('Sign-up error:', signUpError);
        throw new Error(signUpError.message || 'Failed to sign up. Please try again.');
      }

      if (data.user) {
        // Insert user record
        const { error: userError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: formData.email,
              name: `${formData.firstName} ${formData.lastName}`,
              role: 'student',
              country: 'Afghanistan',
              language: formData.englishLevel,
            },
          ]);

        if (userError) {
          console.error('User creation error:', userError);
          throw new Error(userError.message || 'Failed to create user profile.');
        }

        // Insert student profile
        const { error: profileError } = await supabase
          .from('students')
          .insert([
            {
              user_id: data.user.id,
              education_level: formData.currentEducation,
              interests: [],
              goals: `Study ${formData.targetMajor} at ${formData.targetSchool}`,
            },
          ]);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          throw new Error(profileError.message || 'Failed to create student profile.');
        }

        // Success message
        setSuccess('Account created successfully! Redirecting to dashboard...');
        setTimeout(() => {
          window.location.href = '/dashboard'; // Redirect to dashboard
        }, 3000);
      }
    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl"
    >
      <div className="text-center mb-8">
        <UserPlus className="mx-auto h-12 w-12 text-indigo-600" />
        <h2 className="mt-6 text-3xl font-bold">Create your student account</h2>
        <p className="mt-2 text-gray-600">Join our community of aspiring scholars</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter your first name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter your last name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Confirm your password"
            />
          </div>

          {/* Current Education Level */}
          <div>
            <label htmlFor="currentEducation" className="block text-sm font-medium text-gray-700">
              Current Education Level
            </label>
            <select
              id="currentEducation"
              value={formData.currentEducation}
              onChange={(e) => setFormData({ ...formData, currentEducation: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="high_school">High School</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
            </select>
          </div>

          {/* Target School */}
          <div>
            <label htmlFor="targetSchool" className="block text-sm font-medium text-gray-700">
              Target School
            </label>
            <input
              type="text"
              id="targetSchool"
              value={formData.targetSchool}
              onChange={(e) => setFormData({ ...formData, targetSchool: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter your target school"
            />
          </div>

          {/* Target Major */}
          <div>
            <label htmlFor="targetMajor" className="block text-sm font-medium text-gray-700">
              Target Major
            </label>
            <input
              type="text"
              id="targetMajor"
              value={formData.targetMajor}
              onChange={(e) => setFormData({ ...formData, targetMajor: e.target.value })}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="Enter your target major"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn btn-primary flex items-center justify-center"
        >
          {loading ? (
            <>
              <Loader className="animate-spin mr-2" />
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </button>
      </form>
    </motion.div>
  );
}