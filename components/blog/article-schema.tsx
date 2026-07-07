// JSON-LD разметка для Яндекса и Google — статья + FAQ
export function ArticleSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://weyerstore.ru/blog/skrytye-rozetki#article',
        headline: 'Скрытые розетки: что это такое, как работают и как их устанавливают в плитку',
        description:
          'Что такое скрытые розетки и розетки заподлицо с плиткой: устройство, виды, монтаж по шагам, какая плитка подходит и что предусмотреть до ремонта.',
        author: {
          '@type': 'Organization',
          name: 'WAVER STORE',
          url: 'https://weyerstore.ru',
        },
        publisher: {
          '@type': 'Organization',
          name: 'WAVER STORE',
          url: 'https://weyerstore.ru',
          logo: {
            '@type': 'ImageObject',
            url: 'https://weyerstore.ru/icon.svg',
          },
        },
        datePublished: '2025-01-01',
        dateModified: '2025-07-07',
        inLanguage: 'ru',
        url: 'https://weyerstore.ru/blog/skrytye-rozetki',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://weyerstore.ru/blog/skrytye-rozetki',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://weyerstore.ru/blog/skrytye-rozetki#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Что такое скрытые розетки?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Скрытые розетки — это розетки, которые устанавливаются заподлицо с поверхностью стены: плиткой, керамогранитом или другой облицовкой. Снаружи не видно ни рамки, ни выступающего корпуса — только ровная плоскость стены.',
            },
          },
          {
            '@type': 'Question',
            name: 'Можно ли поставить скрытую розетку в уже уложенную плитку?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Нет. Монтажная рамка вклеивается с обратной стороны плитки до её укладки. Решение нужно планировать на этапе черновой электрики.',
            },
          },
          {
            '@type': 'Question',
            name: 'Какая толщина плитки подходит для скрытой розетки?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Стандартный диапазон — 8–14 мм, что покрывает почти весь керамогранит и плитку на рынке. По спецзаказу система адаптируется под толщину 6–20 мм.',
            },
          },
          {
            '@type': 'Question',
            name: 'Безопасно ли это по электрике?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Да. Используется сертифицированный серийный механизм Systeme Electric. Подключение стандартное. Требования ПУЭ по зонам размещения одинаковы для любых розеток.',
            },
          },
          {
            '@type': 'Question',
            name: 'Сложно ли плиточнику установить скрытую розетку?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Монтаж выполняется стандартным инструментом плиточника. Основная операция — рез алмазной коронкой Ø42 мм по шаблону из комплекта. Мастер, который режет плитку под смесители, освоит установку по инструкции.',
            },
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
