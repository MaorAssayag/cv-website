import { Inter } from 'next/font/google'
import './globals.css'
import CursorGrid from '@/components/CursorGrid'
import CustomCursor from '@/components/CustomCursor'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Maor Assayag - CV',
  description: 'Personal website of Maor Assayag, showcasing experience, education, and projects.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CursorGrid />
        <CustomCursor />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}