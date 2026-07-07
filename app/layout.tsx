import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { YandexMetrika } from '@/components/yandex-metrika'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'WAVER STORE — скрытые розетки заподлицо с плиткой',
    template: '%s | WAVER STORE',
  },
  description:
    'Скрытые розетки и выключатели заподлицо с плиткой и керамогранитом. Запатентованное производство в Тюмени. Доставка по России и СНГ.',
  keywords: [
    'скрытые розетки',
    'розетки заподлицо',
    'розетки под плитку',
    'розетки в плитку',
    'встроенные розетки',
    'невидимые розетки',
    'врезные розетки',
    'розетки в керамогранит',
    'WAVER STORE',
  ],
  metadataBase: new URL('https://weyerstore.ru'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'WAVER STORE',
    title: 'WAVER STORE — скрытые розетки заподлицо с плиткой',
    description:
      'Скрытые розетки и выключатели заподлицо с плиткой. Производство Тюмень. Доставка по России.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="bg-background">
      <body className="antialiased font-sans">
        <YandexMetrika />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
