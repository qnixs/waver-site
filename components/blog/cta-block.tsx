import Link from 'next/link'

const reasons = [
  {
    title: 'Собственное производство в Тюмени',
    body: 'Запатентованная конструкция — вы покупаете у производителя, а не у перепродавца.',
  },
  {
    title: 'Серийная электрика Systeme Electric',
    body: 'Никакой привязки к редким запчастям.',
  },
  {
    title: 'Полный комплект',
    body: 'Монтажная рамка, регулировочное кольцо, механизм, белая и чёрная вставки на выбор, шаблон для реза и инструкция.',
  },
  {
    title: 'Гибкость',
    body: 'Блоки из любого количества постов, спецзаказ под плитку 6–20 мм.',
  },
  {
    title: 'Открытая инструкция',
    body: 'PDF с монтажом доступен на сайте до покупки — покажите мастеру и примите решение спокойно.',
  },
]

export function CtaBlock() {
  return (
    <section id="cta" aria-labelledby="h-cta" className="not-prose my-12">
      {/* Почему выбирают */}
      <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 mb-8">
        <h2 id="h-cta" className="text-2xl font-bold text-gray-900 mb-6">
          Почему выбирают WAVER STORE
        </h2>
        <ul className="space-y-4">
          {reasons.map((r) => (
            <li key={r.title} className="flex items-start gap-3">
              <span className="mt-1 flex-shrink-0 size-2 rounded-full bg-gray-900" />
              <span className="text-[15px] text-gray-700 leading-relaxed">
                <strong className="text-gray-900">{r.title}</strong> — {r.body}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Где заказать */}
      <div className="bg-gray-900 text-white rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-3">Где заказать</h2>
        <p className="text-gray-300 leading-relaxed mb-6 text-[15px]">
          Заказать скрытые розетки и выключатели WAVER STORE можно в каталоге на сайте — там
          актуальные розничные цены и все варианты комплектов. Отправляем по всей России и в
          страны СНГ с трек-номером. Для мастеров и бригад действует рабочая цена от{' '}
          <strong className="text-white">4 000 ₽ за комплект</strong> при заказе от 10 штук — с
          бесплатной доставкой; по регулярным объёмам условия обсуждаются индивидуально. Если
          сомневаетесь в подборе под ваш объект — напишите нам, поможем рассчитать количество
          постов и конфигурацию блоков.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold text-sm px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Перейти в каталог
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
    </section>
  )
}
