"use client"

import { useRouter } from 'next/navigation'
import LandingPage from '../components/LandingPage'

export default function Home() {
  const router = useRouter()

  return (
    <main>
      <LandingPage
        isSignedIn={false}
        onSignIn={() => router.push('/sign-in')}
        onSignUp={() => router.push('/sign-up')}
        userButton={null}
        language="en"
      />
    </main>
  )
}

