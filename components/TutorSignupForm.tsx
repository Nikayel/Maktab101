'use client'

import { useState } from 'react'
import styles from './AuthForm.module.css'

type TutorSignupFormProps = {
  onSubmit: (tutorData: {
    email: string
    password: string
    fieldOfStudy: string
    plansToTeach: string
  }) => void
}

export function TutorSignupForm({ onSubmit }: TutorSignupFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldOfStudy, setFieldOfStudy] = useState('')
  const [plansToTeach, setPlansToTeach] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ email, password, fieldOfStudy, plansToTeach })
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Tutor Sign Up</h2>
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
        <input
          type="text"
          placeholder="Field of Study"
          value={fieldOfStudy}
          onChange={(e) => setFieldOfStudy(e.target.value)}
          className={styles.input}
          required
        />
        <textarea
          placeholder="Plans to Teach"
          value={plansToTeach}
          onChange={(e) => setPlansToTeach(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>
      </form>
    </div>
  )
}

