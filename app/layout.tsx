import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
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
      <head>
        {/* Yandex.Metrika counter */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
              })(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=110481134','ym');
              ym(110481134,'init',{
                ssr:true,
                webvisor:true,
                clickmap:true,
                ecommerce:"dataLayer",
                referrer:document.referrer,
                url:location.href,
                accurateTrackBounce:true,
                trackLinks:true
              });
            `,
          }}
        />
        {/* /Yandex.Metrika counter */}
      </head>
      <body className="antialiased font-sans">
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://mc.yandex.ru/watch/110481134"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
              width="1"
              height="1"
            />
          </div>
        </noscript>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
