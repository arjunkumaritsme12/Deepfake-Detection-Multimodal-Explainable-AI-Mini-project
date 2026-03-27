import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Deepfake Detection System | AI-Powered Video Analysis',
  description: 'Advanced AI-powered deepfake detection system using ResNeXt + LSTM architecture. Detect manipulated videos with 93%+ accuracy.',
  keywords: 'deepfake, detection, AI, machine learning, video analysis, fake video',
  authors: [{ name: 'Urvashi Agrawal' }],
  openGraph: {
    title: 'Deepfake Detection System',
    description: 'AI-powered deepfake detection with 93%+ accuracy',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
