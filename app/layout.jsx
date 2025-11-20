import { Inter } from 'next/font/google'
import './globals.css'
import CursorGrid2 from '@/components/CursorGrid2'
import CustomCursor from '@/components/CustomCursor'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Maor Assayag',
  description: 'Personal website of Maor Assayag, showcasing experience, education, and projects.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CursorGrid2 />
        <CustomCursor />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}