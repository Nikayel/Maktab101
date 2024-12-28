"use client"

import { useRouter } from 'next/navigation'

export default function SignIn() {
    const router = useRouter()

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
                <button
                    onClick={() => router.push('/')}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                >
                    Back to Home
                </button>
            </div>
        </div>
    )
} 