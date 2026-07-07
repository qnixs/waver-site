'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Это надёжно? А если механизм сломается?',
    a: 'Механизм — серийный Systeme Electric (бывший Schneider Electric), один из самых распространённых в России. Замена — покупка такого же в ближайшем электромагазине, без демонтажа плитки: лицевая часть на магнитах снимается для доступа.',
  },
  {
    q: 'Это безопасно по электрике?',
    a: 'Да. Механизм сертифицированный, подключение стандартное. Требования ПУЭ по зонам размещения одинаковы для любых розеток — исполнение заподлицо их не меняет.',
  },
  {
    q: 'Плитка не треснет от выреза?',
    a: 'Отверстия сверлятся алмазной коронкой Ø42 мм — тот же тип операции, что рез под смеситель или трубу. Шаблон убирает риск ошибки в разметке.',
  },
  {
    q: 'Вилка нормально держится?',
    a: 'Да. Внутри — обычная серийная розетка, просто утопленная в плоскость. Пользоваться ей так же, как любой другой.',
  },
  {
    q: 'Можно поставить в уже уложенную плитку?',
    a: 'Честно — нет. Монтажная рамка вклеивается с обратной стороны плитки до её укладки. Планируйте заранее.',
  },
  {
    q: 'Есть ли выключатели?',
    a: 'Да, одноклавишные выключатели заподлицо в том же исполнении; двухклавишные — на подходе.',
  },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" aria-labelledby="h-faq" className="not-prose my-10">
      <h2 id="h-faq" className="text-2xl font-bold text-gray-900 mb-6">
        Ответы на главные вопросы
      </h2>
      <div className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-900 text-[15px] leading-snug">
                {faq.q}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`flex-shrink-0 size-5 text-gray-400 mt-0.5 transition-transform duration-200 ${
                  open === i ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-gray-600 text-[15px] leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
