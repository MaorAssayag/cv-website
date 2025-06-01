import './globals.css'

export const metadata = {
  title: 'Maor Assayag - CV',
  description: 'Personal website of Maor Assayag, showcasing experience, education, and projects.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 