import Link from 'next/link'

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-sm">
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
          WAVER STORE
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-3 text-balance">
          Скрытые розетки заподлицо с плиткой
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Статья-руководство для тех, кто делает ремонт
        </p>
        <Link
          href="/blog/skrytye-rozetki"
          className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Читать статью
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </main>
  )
}
