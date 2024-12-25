'use client'

import { useState } from 'react'
import styles from './AuthForm.module.css'

type StudentSignupFormProps = {
  onSubmit: (email: string, password: string) => void
}

export function StudentSignupForm({ onSubmit }: StudentSignupFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(email, password)
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Student Sign Up</h2>
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
        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>
      </form>
    </div>
  )
}

