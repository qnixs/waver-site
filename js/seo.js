(function () {
  const config = window.WAVER_CONFIG || {};
  const seo = config.seo || {};
  const siteUrl = (seo.siteUrl || "https://waverstore.site").replace(/\/$/, "");
  const isEnglish = location.pathname.startsWith("/english");
  const enPrefix = isEnglish ? "/english" : "";

  function normalizePath(path) {
    let p = path.replace(/\/index\.html$/, "");
    if (p !== "/" && p.endsWith("/")) p = p.slice(0, -1);
    return p || "/";
  }

  const path = normalizePath(location.pathname);
  const lookupPath =
    isEnglish && path.startsWith("/english") && path !== "/english"
      ? path.replace(/^\/english/, "") || "/"
      : path;
  const canonicalPath = path === "/" ? "/" : path + "/";
  const canonical = siteUrl + canonicalPath;

  const defaults = isEnglish
    ? {
        title: "Flush-Mounted Hidden Sockets in Porcelain Stoneware — WAVER STORE",
        description:
          "Hidden flush-mount sockets and switches recessed into tile and porcelain stoneware. For kitchen and bathroom. Pro pricing for tilers. Delivery across Russia from Tyumen.",
      }
    : {
        title: "Скрытые розетки заподлицо в керамограните — WAVER STORE | кухня и ванная",
        description:
          "Скрытые розетки и выключатели заподлицо с плиткой и керамогранитом. Монтаж вровень, без рамок. Спеццены для плиточников и мастеров. Доставка по России из Тюмени.",
      };

  const pageMeta = {
    "/": defaults,
    "/english": {
      title: "Flush-Mounted Hidden Sockets and Switches — WAVER STORE",
      description:
        "Hidden flush-mount sockets and switches in porcelain stoneware. Kitchen backsplash and bathroom. Pro pricing for tilers. Made in Tyumen, Russia.",
    },
    "/gallery": isEnglish
      ? { title: "Gallery — WAVER STORE flush sockets", description: "Photos of hidden flush-mounted sockets and switches in porcelain stoneware." }
      : { title: "Галерея скрытых розеток WAVER STORE — фото монтажа", description: "Фото скрытых розеток заподлицо в керамограните. Примеры на кухне и в ванной." },
    "/download": isEnglish
      ? { title: "Installation manual — WAVER STORE", description: "Download WAVER STORE installation manual for flush-mounted sockets." }
      : { title: "Инструкция по монтажу — WAVER STORE", description: "Скачать инструкцию по монтажу скрытых розеток заподлицо в керамограните." },
    "/offer": isEnglish
      ? { title: "Terms of offer — WAVER STORE", description: "Public offer terms for WAVER STORE orders." }
      : { title: "Публичная оферта — WAVER STORE", description: "Публичная оферта интернет-магазина WAVER STORE." },
    "/blog": isEnglish
      ? { title: "Articles — hidden sockets WAVER STORE", description: "Guides on flush-mounted sockets for kitchen, bathroom and tilers." }
      : { title: "Статьи о скрытых розетках — WAVER STORE", description: "Статьи: розетки в ванной, на кухне, монтаж заподлицо, сравнение решений." },
    "/blog/rozetki-v-vannoj": isEnglish
      ? { title: "Bathroom flush sockets with tile — WAVER STORE", description: "Hidden flush sockets in bathroom tile: safety, moisture zones, installation." }
      : { title: "Розетки в ванной заподлицо с плиткой — WAVER STORE", description: "Скрытый монтаж розеток в ванной с керамогранитом: безопасность, зоны, монтаж заподлицо." },
    "/blog/rozetki-na-kuhne": isEnglish
      ? { title: "Kitchen backsplash flush sockets — WAVER STORE", description: "Flush-mounted sockets in kitchen porcelain stoneware: ideas and installation." }
      : { title: "Розетки на кухне заподлицо в керамограните — WAVER STORE", description: "Скрытые розетки на кухонном фартуке: идеи, монтаж, цены WAVER STORE." },
    "/blog/montazh-skrytoj-rozetki": isEnglish
      ? { title: "How to install a hidden flush socket — WAVER STORE", description: "Step-by-step hidden socket installation under tile with WAVER STORE template." }
      : { title: "Как установить скрытую розетку под плитку — WAVER STORE", description: "Пошаговый монтаж скрытой розетки заподлицо в керамограните с шаблоном WAVER STORE." },
    "/blog/sravnenie-skrytyh-rozetok": isEnglish
      ? { title: "Hidden socket comparison — WAVER STORE", description: "Compare magnetic, bayonet and WAVER STORE flush-mounted sockets." }
      : { title: "Сравнение скрытых розеток — WAVER STORE", description: "Магнитные, байонетные и WAVER STORE: сравнение скрытых розеток заподлицо." },
    "/blog/dlya-plitochnikov": isEnglish
      ? { title: "Hidden sockets for tilers — WAVER STORE", description: "How tilers sell flush sockets to clients and earn more with WAVER STORE." }
      : { title: "Скрытые розетки для плиточников — WAVER STORE", description: "Как плиточникам предлагать скрытые розетки клиентам и зарабатывать больше." },
  };

  const meta = pageMeta[lookupPath] || defaults;

  function upsertMeta(name, content, attr) {
    if (!content) return;
    attr = attr || "name";
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function upsertLink(rel, href, extra) {
    let sel = `link[rel="${rel}"]`;
    if (extra?.hreflang) sel += `[hreflang="${extra.hreflang}"]`;
    let el = document.querySelector(sel);
    if (!el) {
      el = document.createElement("link");
      el.rel = rel;
      if (extra?.hreflang) el.hreflang = extra.hreflang;
      document.head.appendChild(el);
    }
    el.href = href;
  }

  const hasStaticJsonLd = !!document.querySelector('script[type="application/ld+json"][data-static]');

  function injectJsonLd(data) {
    if (hasStaticJsonLd) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  document.title = meta.title;
  upsertMeta("description", meta.description);
  const isBlog = lookupPath === "/blog" || lookupPath.startsWith("/blog/");
  const isThanks = lookupPath === "/thanks";
  upsertMeta("robots", isBlog || isThanks ? "noindex, nofollow" : "index, follow");
  upsertLink("canonical", canonical);

  const hasEnMirror =
    path === "/" ||
    path === "/english" ||
    lookupPath === "/gallery" ||
    lookupPath === "/download" ||
    lookupPath === "/offer";

  if (hasEnMirror) {
    const ruHref =
      siteUrl + (lookupPath === "/" || path === "/" ? "/" : lookupPath + "/");
    const enHref =
      siteUrl +
      (lookupPath === "/" || path === "/"
        ? "/english/"
        : "/english" + lookupPath + "/");
    upsertLink("alternate", ruHref, { hreflang: "ru" });
    upsertLink("alternate", enHref, { hreflang: "en" });
    upsertLink("alternate", ruHref, { hreflang: "x-default" });
  }

  if (seo.googleSiteVerification) upsertMeta("google-site-verification", seo.googleSiteVerification);
  if (seo.yandexVerification) upsertMeta("yandex-verification", seo.yandexVerification);

  const ogImage = siteUrl + (seo.ogImage || "/images/hero/skrytaya-rozetka-kuhnya.jpg");
  upsertMeta("og:title", meta.title, "property");
  upsertMeta("og:description", meta.description, "property");
  upsertMeta("og:url", canonical, "property");
  upsertMeta("og:type", "website", "property");
  upsertMeta("og:image", ogImage, "property");
  upsertMeta("og:locale", isEnglish ? "en_US" : "ru_RU", "property");
  upsertMeta("twitter:card", "summary_large_image");
  upsertMeta("twitter:title", meta.title);
  upsertMeta("twitter:description", meta.description);
  upsertMeta("twitter:image", ogImage);

  const org = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: config.brand || "WAVER STORE",
    url: siteUrl,
    logo: siteUrl + "/favicon.png",
    image: ogImage,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tyumen",
      addressRegion: "Tyumen Oblast",
      addressCountry: "RU",
    },
    areaServed: "RU",
  };
  injectJsonLd(org);

  const breadcrumbLabels = {
    "/gallery": isEnglish ? "Gallery" : "Галерея",
    "/download": isEnglish ? "Downloads" : "Скачать",
    "/offer": isEnglish ? "Terms" : "Оферта",
  };
  if (breadcrumbLabels[lookupPath]) {
    injectJsonLd({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isEnglish ? "Home" : "Главная",
          item: siteUrl + (isEnglish ? "/english/" : "/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: breadcrumbLabels[lookupPath],
          item: canonical,
        },
      ],
    });
  }

  if (path === "/" || path === "/english") {
    injectJsonLd({
      "@context": "https://schema.org",
      "@type": "Product",
      name: isEnglish ? "WAVER STORE hidden flush socket" : "Скрытая розетка WAVER STORE",
      description: meta.description,
      brand: { "@type": "Brand", name: "WAVER STORE" },
      image: ogImage,
      offers: {
        "@type": "AggregateOffer",
        lowPrice: String((config.prices?.master || {})[30] || 3800),
        highPrice: String((config.prices?.retail || {})[1] || 4500),
        priceCurrency: "RUB",
        availability: "https://schema.org/InStock",
        url: siteUrl + enPrefix + "/#order",
      },
    });

    const faqItems = document.querySelectorAll(".faq-item");
    if (faqItems.length) {
      injectJsonLd({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: Array.from(faqItems).map((item) => ({
          "@type": "Question",
          name: item.querySelector(".faq-question")?.textContent.replace("+", "").trim(),
          acceptedAnswer: {
            "@type": "Answer",
            text: item.querySelector(".faq-answer")?.textContent.trim(),
          },
        })),
      });
    }
  }

  if (lookupPath.endsWith("/blog/montazh-skrytoj-rozetki")) {
    injectJsonLd({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: isEnglish ? "Install a hidden flush socket under tile" : "Монтаж скрытой розетки заподлицо под плитку",
      description: meta.description,
      step: (isEnglish
        ? [
            "Mark the cut-out using the WAVER STORE template",
            "Cut the recess in porcelain stoneware",
            "Install the frame and mechanism flush with the tile",
            "Check alignment and finish the cladding",
          ]
        : [
            "Разметить вырез по шаблону WAVER STORE",
            "Выполнить вырез в керамограните",
            "Установить рамку и механизм заподлицо",
            "Проверить совпадение плоскости и завершить облицовку",
          ]
      ).map((text, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: text,
        text: text,
      })),
    });
  }

  if (lookupPath.startsWith("/blog/") && lookupPath !== "/blog") {
    injectJsonLd({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: meta.title,
      description: meta.description,
      author: { "@type": "Organization", name: "WAVER STORE" },
      publisher: org,
      mainEntityOfPage: canonical,
      image: ogImage,
    });

    const faqItems = document.querySelectorAll(".faq-item");
    if (faqItems.length) {
      injectJsonLd({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: Array.from(faqItems).map((item) => ({
          "@type": "Question",
          name: item.querySelector(".faq-question")?.textContent.replace("+", "").trim(),
          acceptedAnswer: {
            "@type": "Answer",
            text: item.querySelector(".faq-answer")?.textContent.trim(),
          },
        })),
      });
    }
  }
})();
