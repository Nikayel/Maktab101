'use client'

import { useEffect, useState } from 'react'
import { useAuth, withAuth } from '../../lib/auth'
import { Header } from '../../components/Header'
import styles from './profile.module.css'

const ProfilePage = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            setLoading(false)
        }
    }, [user])

    if (loading) {
        return <div className={styles.loading}>Loading...</div>
    }

    return (
        <div className={styles.profileContainer}>
            <Header />
            <main className={styles.profileMain}>
                <div className={styles.profileCard}>
                    <div className={styles.profileHeader}>
                        <h1 className={styles.profileTitle}>Welcome, {user?.email}</h1>
                        <p className={styles.profileRole}>{user?.role}</p>
                    </div>
                    <div className={styles.profileContent}>
                        <div className={styles.profileSection}>
                            <h2 className={styles.sectionTitle}>Personal Information</h2>
                            <p><strong>Email:</strong> {user?.email}</p>
                            <p><strong>Role:</strong> {user?.role}</p>
                            {user?.role === 'tutor' && (
                                <>
                                    <p><strong>Field of Study:</strong> {user?.fieldOfStudy || 'Not specified'}</p>
                                    <p><strong>Plans to Teach:</strong> {user?.plansToTeach || 'Not specified'}</p>
                                </>
                            )}
                        </div>
                        <div className={styles.profileSection}>
                            <h2 className={styles.sectionTitle}>Learning Progress</h2>
                            <div className={styles.statGrid}>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>0</span>
                                    <span className={styles.statLabel}>Courses Completed</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>0</span>
                                    <span className={styles.statLabel}>Active Communities</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>0</span>
                                    <span className={styles.statLabel}>Achievements</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>-</span>
                                    <span className={styles.statLabel}>Average Score</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.profileSection}>
                            <h2 className={styles.sectionTitle}>Current Courses</h2>
                            {user?.role === 'student' ? (
                                <div className={styles.courseList}>
                                    <p>You are not enrolled in any courses yet.</p>
                                    <button className={styles.actionButton}>Explore Courses</button>
                                </div>
                            ) : (
                                <div className={styles.courseList}>
                                    <p>You have not created any courses yet.</p>
                                    <button className={styles.actionButton}>Create a Course</button>
                                </div>
                            )}
                        </div>
                        <div className={styles.profileSection}>
                            <h2 className={styles.sectionTitle}>Achievements</h2>
                            <div className={styles.achievementList}>
                                <p>Complete courses and participate in communities to earn achievements!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default withAuth(ProfilePage)

