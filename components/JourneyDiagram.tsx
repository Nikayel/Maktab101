'use client'

import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  { title: 'Sign Up', description: 'Join the Maktab platform' },
  { title: 'Complete Courses', description: 'Showcase your talents through various classes' },
  { title: 'Get Mentored', description: 'Receive guidance from experienced professionals' },
  { title: 'Find Opportunities', description: 'Access internships and job placements' },
]

export const JourneyDiagram: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-4">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <motion.section
            className="flex flex-col items-center text-center w-full md:w-1/4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold mb-4">
              {index + 1}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-sm">{step.description}</p>
          </motion.section>
          {index < steps.length - 1 && (
            <motion.div
              className="hidden md:block w-full h-1 bg-black"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

