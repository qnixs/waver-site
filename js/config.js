// ═══════════════════════════════════════════════════════════
//  НАСТРОЙКИ САЙТА — редактируй здесь, потом git push
// ═══════════════════════════════════════════════════════════
window.WAVER_CONFIG = {
  brand: "WAVER STORE",
  logo: "",

  // Formspree ID — публичный адрес формы, не пароль.
  formspreeId: "xqeoggwp",

  telegram: "https://t.me/tontreader",
  telegramLabel: "Написать в Telegram",
  whatsapp: "https://wa.me/79959342806",
  whatsappLabel: "Написать в WhatsApp",

  // ── ЯНДЕКС.КАРТЫ (выбор адреса / ПВЗ в форме заказа) ──
  // developer.tech.yandex.ru → «JavaScript API и HTTP Геокодер»
  // Ограничь ключ по HTTP Referer: waverstore.site, qnixs.github.io
  yandexMaps: {
    apiKey: "c0567da7-de5e-4a15-b3f5-2193b515bbc1",
    // Стартовый центр карты, если геолокация недоступна [широта, долгота]
    defaultCenter: [57.1522, 65.5272],
    defaultZoom: 11,
  },

  // Адрес самовывоза — показывается при выборе «Самовывоз, Тюмень»
  pickupAddress: "г. Тюмень, производство WAVER STORE",

  // ── SEO (вставь коды после регистрации в Search Console / Вебмастер) ──
  seo: {
    siteUrl: "https://waverstore.site",
    googleSiteVerification: "",
    yandexVerification: "8bb05e284e152a2e",
    ogImage: "/images/hero/skrytaya-rozetka-kuhnya.jpg",
  },

  // Яндекс.Метрика — вставь номер счётчика (metrika.yandex.ru), иначе оставь пустым
  yandexMetrikaId: "",

  heroImages: [
    { src: "/images/hero/skrytaya-rozetka-kuhnya.jpg", alt: "Скрытая розетка заподлицо в керамограните на кухне WAVER STORE" },
    { src: "/images/hero/blok-rozetka-vyklyuchatel.jpg", alt: "Блок скрытых розеток и выключателя заподлицо WAVER STORE" },
  ],

  galleryImages: [
    { src: "/images/gallery/montazh-vannaya-keraogranit.jpg", alt: "Скрытая розетка заподлицо в керамограните монтаж в ванной", caption: "Розетка заподлицо — ванная" },
    { src: "/images/gallery/montazh-kuhnya-fartuk.jpg", alt: "Блок из 2 постов розетка и выключатель в плитке на кухне", caption: "Розетка и выключатель — блок" },
    { src: "/images/gallery/montazh-vannaya-keraogranit.jpg", alt: "Потайная розетка под плитку WAVER STORE в ванной", caption: "Пример для ванной" },
    { src: "/images/gallery/montazh-kuhnya-fartuk.jpg", alt: "Скрытые розетки на кухне в керамограните фартук", caption: "Пример для кухни" },
  ],

  downloads: [
    {
      type: "pdf",
      file: "/files/instrukciya-montazh.pdf",
      label: "Инструкция по монтажу",
      desc: "Пошаговая установка для электрика и плиточника",
    },
    {
      type: "video",
      url: "",
      label: "Видео монтажа",
      desc: "Скоро",
      soon: true,
    },
  ],

  kitContents: [
    {
      title: "Розетка скрытая, 1 пост",
      items: [
        "Рамка с механизмом (утоплена в облицовку)",
        "Крепёж для монтажа",
        "Шаблон для реза в керамограните",
        "Инструкция по установке",
        "Декоративная плитка — ваша (подбираем под заказ)",
      ],
    },
    {
      title: "Выключатель одноклавишный, 1 пост",
      items: [
        "Рамка с механизмом одноклавишного выключателя",
        "Крепёж для монтажа",
        "Шаблон для реза в керамограните",
        "Инструкция по установке",
        "Стыкуется с розеткой в единый блок",
      ],
    },
  ],

  orderProducts: [
    {
      id: "socket",
      field: "qty_socket",
      name: "Розетка скрытая, 1 пост",
      sub: "Белый · шаблон для реза в комплекте",
      defaultQty: 5,
      available: true,
    },
    {
      id: "switch1",
      field: "qty_switch1",
      name: "Выключатель одноклавишный, 1 пост",
      sub: "Заподлицо в керамограните · в наличии",
      defaultQty: 0,
      available: true,
    },
    {
      id: "switch2",
      field: "qty_switch2",
      name: "Выключатель двухклавишный, 1 пост",
      sub: "Готовим к запуску",
      defaultQty: 0,
      available: false,
    },
  ],

  prices: {
    retail: { 1: 4500, 5: 4350, 10: 4250, 20: 4150, 30: 4050 },
    master: { 1: 4200, 5: 4100, 10: 4000, 20: 3900, 30: 3800 },
  },

  // Данные продавца для оферты — подставь реальные перед запуском
  seller: {
    name: "СМЗ",
    inn: "____________",
    address: "г. Тюмень",
  },
};
