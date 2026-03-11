import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SiteGen - Générateur de site web professionnel',
  description: 'Créez votre site web professionnel en quelques minutes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  )
}
