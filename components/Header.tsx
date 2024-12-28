'use client'

import Link from 'next/link'
import { useLanguage } from '../app/providers'
import { useAuth } from '../lib/auth'
import styles from './Header.module.css'

const translations = {
  en: {
    home: 'Home',
    courses: 'Courses',
    mentorship: 'Mentorship',
    community: 'Community',
    login: 'Login',
    signup: 'Sign Up',
    dashboard: 'Dashboard',
    profile: 'Profile',
  },
  dari: {
    home: 'خانه',
    courses: 'دوره ها',
    mentorship: 'مربیگری',
    community: 'انجمن',
    login: 'ورود',
    signup: 'ثبت نام',
    dashboard: 'داشبورد',
    profile: 'پروفیل',
  },
  pashto: {
    home: 'کور',
    courses: 'کورسونه',
    mentorship: 'لارښوونه',
    community: 'ټولنه',
    login: 'ننوتل',
    signup: 'نوم لیکنه',
    dashboard: 'ډاشبورډ',
    profile: 'پروفیل',
  },
}

export function Header() {
  const { language, setLanguage } = useLanguage()
  const { user } = useAuth()

  return (
    <header className={`bg-white text-black p-4 sticky top-0 z-50 ${styles.header}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-black hover:text-gray-700 transition-colors">
          Maktab
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className={styles.navLink}>{translations[language].home}</Link></li>
            <li><Link href="/courses" className={styles.navLink}>{translations[language].courses}</Link></li>
            {user ? (
              <>
                <li><Link href="/profile" className={styles.navLink}>{translations[language].profile}</Link></li>
                <li><Link href="/mentorship" className={styles.navLink}>{translations[language].mentorship}</Link></li>
                <li><Link href="/community" className={styles.navLink}>{translations[language].community}</Link></li>
              </>
            ) : (
              <>
                {/* <li><Link href="/login" className={styles.navLink}>{translations[language].login}</Link></li>
                <li><Link href="/signup" className={styles.navLink}>{translations[language].signup}</Link></li> */}
              </>
            )}
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <Link href="/dashboard" className={`${styles.button} ${styles.primaryButton}`}>
              {translations[language].dashboard}
            </Link>
          ) : (
            <>
              <Link href="/login" className={`${styles.button} ${styles.secondaryButton}`}>{translations[language].login}</Link>
              <Link href="/signup" className={`${styles.button} ${styles.primaryButton}`}>{translations[language].signup}</Link>
            </>
          )}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'dari' | 'pashto')}
            className={styles.languageSelect}
          >
            <option value="en">English</option>
            <option value="dari">دری</option>
            <option value="pashto">پښتو</option>
          </select>
        </div>
      </div>
    </header>
  )
}

