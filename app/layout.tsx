import './globals.css'
import { Inter } from 'next/font/google'
import { LanguageProvider } from './providers'
import { AuthProvider } from '../lib/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Maktab - Empowering Afghan Girls',
  description: 'Educational platform supporting Afghan girls with knowledge, mentorship, and career guidance.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

