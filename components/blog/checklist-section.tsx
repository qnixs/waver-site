const items = [
  {
    text: 'плитка ещё не уложена — решение принимается на этапе черновой электрики, в готовую облицовку врезаться штатно нельзя;',
  },
  {
    text: 'известна толщина плитки — стандарт 8–14 мм, нестандарт 6–20 мм решается спецзаказом;',
  },
  {
    text: 'посчитано количество постов — пройдитесь по кухне и санузлу: чайник, кофемашина, зарядки, фен, стиральная машина, выключатели; обычно выходит 4–8 постов;',
  },
  {
    text: 'соблюдены зоны в ванной — не ближе 60 см от края ванны или душа;',
  },
  {
    text: 'мастер ознакомлен с инструкцией — отправьте ему PDF до начала работ;',
  },
  {
    text: 'комплекты заказаны заранее — они должны быть на объекте до начала облицовки.',
  },
]

export function ChecklistSection() {
  return (
    <section id="checklyst" aria-labelledby="h-checklyst" className="not-prose my-10">
      <h2
        id="h-checklyst"
        className="text-2xl font-bold text-gray-900 mb-4"
      >
        Что нужно предусмотреть до ремонта
      </h2>
      <p className="text-gray-600 mb-5 leading-relaxed">Перед покупкой проверьте:</p>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-0.5 flex-shrink-0 flex items-center justify-center size-5 rounded-full bg-gray-900 text-white text-xs font-semibold">
              {i + 1}
            </span>
            <span className="text-gray-700 leading-relaxed text-[15px]">{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
