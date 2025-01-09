import { motion } from 'framer-motion';
import { GraduationCap, Users, Award } from 'lucide-react';

export function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
          >
            Empowering Afghan Girls Through Education
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            Connect with mentors, discover scholarships, and build your future through education.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 flow-root sm:mt-24"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/10"
            >
              <GraduationCap className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Scholarships</h3>
              <p className="mt-4 text-gray-600">Access educational opportunities worldwide through our curated scholarship database.</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/10"
            >
              <Users className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Mentorship</h3>
              <p className="mt-4 text-gray-600">Connect with experienced mentors who will guide you on your educational journey.</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/10"
            >
              <Award className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Success Stories</h3>
              <p className="mt-4 text-gray-600">Get inspired by stories of Afghan girls who achieved their educational dreams.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}