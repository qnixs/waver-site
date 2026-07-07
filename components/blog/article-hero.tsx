import Image from 'next/image'
import Link from 'next/link'

export function ArticleHero() {
  return (
    <header className="bg-white border-b border-gray-100">
      {/* Навигационная цепочка (хлебные крошки) — важно для SEO */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-2"
      >
        <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-gray-900 transition-colors">
              WAVER STORE
            </Link>
          </li>
          <li aria-hidden="true" className="select-none">
            /
          </li>
          <li>
            <Link href="/blog" className="hover:text-gray-900 transition-colors">
              Блог
            </Link>
          </li>
          <li aria-hidden="true" className="select-none">
            /
          </li>
          <li>
            <span className="text-gray-900 font-medium">Скрытые розетки</span>
          </li>
        </ol>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Метка рубрики */}
        <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
          Руководство
        </p>

        {/* Заголовок H1 */}
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-balance text-gray-900 mb-6">
          Скрытые розетки: что это такое, как работают и как их устанавливают в плитку
        </h1>

        {/* Лид-абзац */}
        <p className="text-lg leading-relaxed text-gray-600 mb-8">
          <strong className="text-gray-900">Скрытые розетки</strong> — это розетки, которые
          устанавливаются заподлицо с поверхностью стены: плиткой, керамогранитом или другой
          облицовкой. Снаружи не видно ни рамки, ни выступающего корпуса — только ровная плоскость
          стены. В этой статье разберём, что это за решение, как оно устроено, где применяется,
          как проходит монтаж и что нужно предусмотреть до начала ремонта.
        </p>

        {/* Главное фото */}
        <figure className="rounded-xl overflow-hidden bg-gray-100 aspect-[16/9] relative">
          {/* Заглушка — замените на реальное фото */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-2 p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-12 opacity-30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-sm text-center max-w-xs opacity-50">
              ФОТО: общий вид скрытой розетки заподлицо с плиткой — крупный план
            </p>
          </div>
        </figure>
        <figcaption className="text-xs text-gray-400 mt-2 text-center">
          Скрытая розетка WAVER STORE заподлицо с керамогранитом
        </figcaption>
      </div>
    </header>
  )
}
