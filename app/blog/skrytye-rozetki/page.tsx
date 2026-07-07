import type { Metadata } from 'next'
import { ArticleHero } from '@/components/blog/article-hero'
import { ArticleBody } from '@/components/blog/article-body'
import { ArticleSchema } from '@/components/blog/article-schema'

export const metadata: Metadata = {
  title: 'Скрытые розетки: что это, как работают и как установить заподлицо с плиткой',
  description:
    'Что такое скрытые розетки и розетки заподлицо с плиткой: устройство, где ставят, монтаж по шагам, какая плитка подходит и что предусмотреть до ремонта.',
  keywords: [
    'скрытые розетки',
    'розетки заподлицо с плиткой',
    'розетки под плитку',
    'монтаж розеток в плитку',
    'невидимые розетки',
    'врезные розетки',
    'розетки в керамогранит',
    'розетки без рамки',
  ],
  alternates: {
    canonical: '/blog/skrytye-rozetki',
  },
  openGraph: {
    type: 'article',
    locale: 'ru_RU',
    title: 'Скрытые розетки: что это, как работают и как установить заподлицо с плиткой',
    description:
      'Что такое скрытые розетки: устройство, виды, монтаж по шагам, какая плитка подходит и что предусмотреть до ремонта.',
    publishedTime: '2025-01-01T00:00:00.000Z',
    authors: ['WAVER STORE'],
    siteName: 'WAVER STORE',
  },
}

export default function SkrytyeRozetki() {
  return (
    <>
      <ArticleSchema />
      <div className="min-h-screen bg-white text-gray-900">
        <ArticleHero />
        <ArticleBody />
      </div>
    </>
  )
}
