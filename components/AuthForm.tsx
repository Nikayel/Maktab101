'use client'

import { useState } from 'react'
import styles from './AuthForm.module.css'

type AuthFormProps = {
  onSubmit: (email: string, password: string, role?: 'student' | 'mentor') => void
  formType: 'login' | 'signup'
}

export function AuthForm({ onSubmit, formType }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'student' | 'mentor'>('student')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(email, password, formType === 'signup' ? role : undefined)
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>{formType === 'login' ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        {formType === 'signup' && (
          <div className={styles.roleSelection}>
            <label>
              <input
                type="radio"
                value="student"
                checked={role === 'student'}
                onChange={() => setRole('student')}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                value="mentor"
                checked={role === 'mentor'}
                onChange={() => setRole('mentor')}
              />
              Mentor
            </label>
          </div>
        )}
        <button type="submit" className={styles.submitButton}>
          {formType === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

