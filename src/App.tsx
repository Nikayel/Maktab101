import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Hero } from './components/Hero';
import { SignInForm } from './components/auth/SignInForm';
import { StudentSignUpForm } from './components/auth/StudentSignUpForm';
import { MentorApplicationForm } from './components/auth/MentorApplicationForm';

type AuthView = 'signin' | 'student-signup' | 'mentor-apply';

function App() {
  const [session, setSession] = useState<any>(null);
  const [authView, setAuthView] = useState<AuthView>('signin');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (session) {
    return (
      <Router>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <div className="py-16 px-6 sm:px-8">
        {authView === 'signin' && <SignInForm />}
        {authView === 'student-signup' && <StudentSignUpForm />}
        {authView === 'mentor-apply' && <MentorApplicationForm />}
      </div>
    </div>
  );
}

export default App;