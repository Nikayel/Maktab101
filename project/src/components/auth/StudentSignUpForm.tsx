import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import type { StudentSignUpData } from '../../types/auth';
import { UserPlus } from 'lucide-react';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: signUpError, data } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // First create the user record
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

        if (userError) throw userError;

        // Then create the student profile
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

        if (profileError) throw profileError;
      }
    } catch (err: any) {
      setError(err.message);
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
      {/* Rest of the component remains the same */}
      <div className="text-center mb-8">
        <UserPlus className="mx-auto h-12 w-12 text-indigo-600" />
        <h2 className="mt-6 text-3xl font-bold">Create your student account</h2>
        <p className="mt-2 text-gray-600">Join our community of aspiring scholars</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* ... other form fields remain the same ... */}
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
          {/* ... rest of the form fields remain the same ... */}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn btn-primary"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </motion.div>
  );
}