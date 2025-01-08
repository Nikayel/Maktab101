import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hero } from './components/Hero';
import { SignInForm } from './components/auth/SignInForm';
import { StudentSignUpForm } from './components/auth/StudentSignUpForm';
import { MentorApplicationForm } from './components/auth/MentorApplicationForm';
import { GraduationCap } from 'lucide-react';

type AuthView = 'signin' | 'student-signup' | 'mentor-apply';

export default function App() {
  const [authView, setAuthView] = useState<AuthView>('signin');
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [authView]);

  return (
    <div className="min-h-screen bg-white">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-x-0 top-0 z-50"
      >
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-semibold text-gray-900">Afghan Scholars</span>
            </a>
          </div>
          <div className="flex gap-x-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setAuthView('signin')}
              className={`text-sm font-semibold leading-6 ${
                authView === 'signin' ? 'text-indigo-600' : 'text-gray-900'
              }`}
            >
              Sign in
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setAuthView('student-signup')}
              className={`text-sm font-semibold leading-6 ${
                authView === 'student-signup' ? 'text-indigo-600' : 'text-gray-900'
              }`}
            >
              Student Sign Up
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setAuthView('mentor-apply')}
              className="rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Become a Mentor
            </motion.button>
          </div>
        </nav>
      </motion.header>

      <main>
        <Hero />
        <div ref={formRef} className="py-16 px-6 sm:px-8">
          {authView === 'signin' && <SignInForm />}
          {authView === 'student-signup' && <StudentSignUpForm />}
          {authView === 'mentor-apply' && <MentorApplicationForm />}
        </div>
      </main>
    </div>
  );
}