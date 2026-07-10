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
  whatsapp: "https://wa.me/79088729490",
  whatsappLabel: "Написать в WhatsApp",
  phone: "+7 908 872-94-90",
  phoneHref: "tel:+79088729490",

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
    // Google Search Console: https://search.google.com/search-console → «Добавить ресурс»
    // → способ подтверждения «HTML-тег» → скопируй значение из content="..." и вставь сюда.
    // Также раскомментируй строку google-site-verification в index.html и вставь код туда.
    googleSiteVerification: "",
    yandexVerification: "8bb05e284e152a2e",
    ogImage: "/images/hero/skrytaya-rozetka-kuhnya.jpg",
  },

  // ── ЯНДЕКС.МЕТРИКА — счётчик НЕ установлен, пока это поле пустое! ──
  // 1. Зайди на https://metrika.yandex.ru → «Добавить счётчик»
  // 2. Укажи адрес сайта waverstore.site и создай счётчик
  // 3. Скопируй НОМЕР счётчика (8–9 цифр) и вставь сюда в кавычках, например: "99123456"
  // 4. Опубликуй изменения (git push) — код Метрики подключится на всех страницах сам
  yandexMetrikaId: "110481134",

  heroImages: [
    { src: "/images/gallery/montazh-kuhnya-fartuk.jpg", alt: "Скрытые розетки заподлицо на кухне WAVER STORE" },
    { src: "/images/gallery/montazh-sverlenie.jpg", alt: "Скрытые розетки заподлицо с тёмной плиткой WAVER STORE" },
    { src: "/images/hero/skrytaya-rozetka-kuhnya.jpg", alt: "Скрытая розетка заподлицо в керамограните на кухне WAVER STORE" },
    { src: "/images/hero/blok-rozetka-vyklyuchatel.jpg", alt: "Блок скрытых розеток и выключателя заподлицо WAVER STORE" },
  ], // порядок: кухня (тёмная плитка) → фото 2 (было первым) → фото 3 (было вторым)

  galleryImages: [
    { src: "/images/gallery/montazh-kuhnya-fartuk.jpg", alt: "Скрытая розетка заподлицо на кухонном фартуке в тёмном керамограните", caption: "Кухонный фартук" },
    { src: "/images/gallery/montazh-sverlenie.jpg", alt: "Скрытая розетка заподлицо в тёмном керамограните крупным планом", caption: "Тёмный керамогранит" },
    { src: "/images/gallery/montazh-vannaya-keraogranit.jpg", alt: "Скрытая розетка заподлицо в ванной в светлом керамограните", caption: "Ванная комната" },
    { src: "/images/gallery/sravnenie-rozetok.jpg", alt: "Сравнение обычной розетки и розетки заподлицо WAVER STORE", caption: "Было / стало" },
    { src: "/images/gallery/komplekt-v-razbore.jpg", alt: "Комплект скрытой розетки WAVER STORE в разборе — все детали", caption: "Комплект в разборе" },
    { src: "/images/hero/skrytaya-rozetka-kuhnya.jpg", alt: "Скрытая розетка заподлицо в керамограните крупным планом", caption: "Крупный план" },
    { src: "/images/hero/blok-rozetka-vyklyuchatel.jpg", alt: "Блок из нескольких постов розетки и выключателя заподлицо", caption: "Блок из нескольких постов" },
  ],

  downloads: [
    {
      type: "pdf",
      file: "/files/socket_installation_new.pdf",
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
        "Монтажная рамка + соединитель для многопостового монтажа",
        "Проставка под розетку и рамка с магнитами",
        "Центральная вставка — 2 шт. (белая и чёрная, на выбор)",
        "Регулировочное кольцо и соединительные болты",
        "Шаблон для разметки и розетка в заводской упаковке",
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

  // Данные продавца для оферты. Реквизиты (наименование, ИНН) добавишь позже:
  // раскомментируй строки и верни соответствующие <span data-seller-name>/<span data-seller-inn> в offer/index.html.
  seller: {
    // name: "",
    // inn: "",
    address: "г. Тюмень",
  },
};
