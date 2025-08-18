import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'Residentes | Softwareland',
  description: 'CRUD de residentes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
