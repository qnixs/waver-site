// ═══════════════════════════════════════════════════════════
//  НАСТРОЙКИ САЙТА — редактируй здесь, потом git push
// ═══════════════════════════════════════════════════════════
//
//  ФОТО: положи файлы в папки и укажи имена ниже
//    images/hero/   — главная карусель (01.jpg, 02.jpg …)
//    images/gallery/ — галерея (01.jpg, 02.jpg …)
//    files/         — PDF для скачивания (komplekt.pdf)
//
window.WAVER_CONFIG = {
  brand: "WaverStore",

  formspreeId: "xqeoggwp",

  // Контакты — клиенты пишут в мессенджеры, звонить не обязательно
  telegram: "https://t.me/your_username",
  telegramLabel: "Написать в Telegram",
  whatsapp: "https://wa.me/79000000000",
  whatsappLabel: "Написать в WhatsApp",

  // Главная карусель — добавь свои фото в images/hero/
  heroImages: [
    { src: "images/hero/01.jpg", alt: "Скрытая розетка WaverStore в керамограните" },
    { src: "images/hero/02.jpg", alt: "Розетка заподлицо — вид сбоку" },
    { src: "images/hero/03.jpg", alt: "Монтаж на кухне" },
  ],

  // Галерея — добавь фото в images/gallery/
  galleryImages: [
    { src: "images/gallery/01.jpg", alt: "Розетка в плитке", caption: "Розетка заподлицо" },
    { src: "images/gallery/02.jpg", alt: "Блок из 2 постов", caption: "Блок из 2 постов" },
    { src: "images/gallery/03.jpg", alt: "Кухня", caption: "Монтаж на кухне" },
    { src: "images/gallery/04.jpg", alt: "Ванная", caption: "Розетки в ванной" },
    { src: "images/gallery/05.jpg", alt: "Деталь", caption: "Механизм без выступа" },
    { src: "images/gallery/06.jpg", alt: "Шаблон", caption: "Шаблон для реза в комплекте" },
  ],

  // Файл для скачивания — положи PDF в files/
  downloadFile: "files/komplekt-waverstore.pdf",
  downloadLabel: "Скачать комплект (PDF)",

  // Цены за 1 шт (розетка и выключатель 1-клав — одинаково)
  prices: {
    retail: { 1: 5000, 10: 5000, 20: 5000, 30: 5000 },
    master: { 1: 4620, 10: 4400, 20: 4150, 30: 3940 },
  },
};
