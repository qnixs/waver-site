window.WAVER_CONFIG = {
  brand: "WAVER STORE",
  logo: "",
  formspreeId: "xqeoggwp",
  telegram: "https://t.me/tontreader",
  telegramLabel: "Message on Telegram",
  whatsapp: "https://wa.me/79959342806",
  whatsappLabel: "Message on WhatsApp",
  yandexMaps: {
    apiKey: "c0567da7-de5e-4a15-b3f5-2193b515bbc1",
    defaultCenter: [57.1522, 65.5272],
    defaultZoom: 11,
  },
  pickupAddress: "Tyumen, WAVER STORE production facility",

  seo: {
    siteUrl: "https://waverstore.site",
    googleSiteVerification: "",
    yandexVerification: "8bb05e284e152a2e",
    ogImage: "/images/hero/skrytaya-rozetka-kuhnya.jpg",
  },

  yandexMetrikaId: "110481134",

  heroImages: [
    { src: "/images/hero/skrytaya-rozetka-kuhnya.jpg", alt: "Flush-mounted hidden socket in porcelain stoneware kitchen WAVER STORE" },
    { src: "/images/hero/blok-rozetka-vyklyuchatel.jpg", alt: "Two-gang hidden socket and switch block WAVER STORE" },
  ],
  galleryImages: [
    { src: "/images/gallery/montazh-vannaya-keraogranit.jpg", alt: "Hidden flush socket in porcelain stoneware bathroom", caption: "Flush socket — bathroom" },
    { src: "/images/gallery/montazh-kuhnya-fartuk.jpg", alt: "Two-gang socket and switch block in kitchen tile", caption: "Socket and switch block" },
    { src: "/images/gallery/montazh-vannaya-keraogranit.jpg", alt: "Recessed socket under tile WAVER STORE bathroom", caption: "Bathroom example" },
    { src: "/images/gallery/montazh-kuhnya-fartuk.jpg", alt: "Hidden kitchen backsplash sockets in porcelain stoneware", caption: "Kitchen example" },
  ],
  downloads: [
    {
      type: "pdf",
      file: "/files/instrukciya-montazh.pdf",
      label: "Installation manual",
      desc: "Step-by-step guide for electricians and tilers",
    },
    {
      type: "video",
      url: "",
      label: "Installation video",
      desc: "Coming soon",
      soon: true,
    },
  ],
  kitContents: [
    {
      title: "Hidden socket, 1 gang",
      items: [
        "Frame with mechanism (recessed into cladding)",
        "Mounting hardware",
        "Cut-out template for porcelain stoneware",
        "Installation manual",
        "Decorative tile — yours (selected per order)",
      ],
    },
    {
      title: "Single-gang switch, 1 gang",
      items: [
        "Frame with single-gang switch mechanism",
        "Mounting hardware",
        "Cut-out template for porcelain stoneware",
        "Installation manual",
        "Combines with socket into one block",
      ],
    },
  ],
  orderProducts: [
    {
      id: "socket",
      field: "qty_socket",
      name: "Hidden socket, 1 gang",
      sub: "White · cut-out template included",
      defaultQty: 5,
      available: true,
    },
    {
      id: "switch1",
      field: "qty_switch1",
      name: "Single-gang switch, 1 gang",
      sub: "Flush in porcelain stoneware · in stock",
      defaultQty: 0,
      available: true,
    },
    {
      id: "switch2",
      field: "qty_switch2",
      name: "Double-gang switch, 1 gang",
      sub: "Coming soon",
      defaultQty: 0,
      available: false,
    },
  ],
  prices: {
    retail: { 1: 4500, 5: 4350, 10: 4250, 20: 4150, 30: 4050 },
    master: { 1: 4200, 5: 4100, 10: 4000, 20: 3900, 30: 3800 },
  },
  seller: {
    // name: "",
    // inn: "",
    address: "Tyumen, Russia",
  },
};
