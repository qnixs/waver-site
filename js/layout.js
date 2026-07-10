(function () {
  const config = window.WAVER_CONFIG || {};
  const brand = config.brand || "WAVER STORE";
  const isEnglish = location.pathname.startsWith("/english");
  const enBase = "/english";
  const t = (ru, en) => (isEnglish ? en : ru);

  document.documentElement.lang = isEnglish ? "en" : "ru";

  function normalizePath(value) {
    return value.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
  }

  const path = normalizePath(location.pathname);

  if (location.pathname.endsWith("/index.html")) {
    const clean = normalizePath(location.pathname);
    const target = clean === "/" ? "/" : clean + "/";
    history.replaceState(null, "", target + location.search + location.hash);
  }

  const home = isEnglish ? enBase + "/" : "/";
  const section = (id) => home + id;
  const page = (slug) => (isEnglish ? enBase : "") + slug;
  const orderHref = section("#order");
  // Только один гид переведён на английский — раздел /english/blog/ пока заглушка
  const blogHref = isEnglish ? enBase + "/blog/skrytye-rozetki-zapodlico/" : "/blog/";

  // ── Универсальная шапка ──
  function renderHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const desktop = [
      { href: section("#about"), label: t("О продукте", "About") },
      { href: section("#catalog"), label: t("Каталог", "Catalog") },
      { href: section("#kit"), label: t("Комплект", "Kit") },
      { href: section("#prices"), label: t("Цены", "Prices") },
      { href: page("/gallery"), label: t("Галерея", "Gallery") },
      { href: section("#faq"), label: "FAQ" },
      { divider: true },
      { href: blogHref, label: t("Статьи", "Articles"), pill: "articles" },
      { href: page("/download"), label: t("Скачать", "Download"), pill: "download" },
    ];

    const navLinksHtml = desktop
      .map((item) => {
        if (item.divider) return '<span class="nav-divider" aria-hidden="true"></span>';
        const active = !item.href.includes("#") && normalizePath(item.href) === path;
        const classes = [item.pill ? "nav-pill nav-pill--" + item.pill : "", active ? "active" : ""]
          .filter(Boolean)
          .join(" ");
        return `<a href="${item.href}"${classes ? ` class="${classes}"` : ""}>${item.label}</a>`;
      })
      .join("");

    header.innerHTML = `
      <div class="container header-inner">
        <a href="${home}" class="logo" id="site-logo" aria-label="${brand}">${brand}</a>
        <nav class="nav">
          <div class="nav-links">${navLinksHtml}</div>
          <a href="${orderHref}" class="btn btn-dark">${t("Заказать", "Order")}</a>
          <button type="button" class="menu-btn" id="menu-btn" aria-label="${t("Меню", "Menu")}">☰</button>
        </nav>
      </div>
    `;

    const mobile = desktop
      .filter((item) => !item.divider)
      .concat([
        { href: page("/offer"), label: t("Оферта", "Terms") },
        { href: orderHref, label: t("Оформить заказ", "Place an order") },
      ]);

    const mobileNav = document.getElementById("mobile-nav");
    if (mobileNav) {
      mobileNav.innerHTML = mobile
        .map((item) => {
          const classes = item.pill ? ` class="nav-pill--${item.pill}"` : "";
          return `<a href="${item.href}"${classes}>${item.label}</a>`;
        })
        .join("");
    }

    document.getElementById("menu-btn")?.addEventListener("click", () => {
      document.getElementById("mobile-nav")?.classList.toggle("open");
    });
  }

  // ── Универсальный футер ──
  function renderFooter() {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;

    footer.innerHTML = `
      <div class="container footer-inner">
        <div>
          <p class="footer-logo" data-brand>${brand}</p>
          <p>${t("Производство: г. Тюмень", "Made in Tyumen, Russia")}</p>
          <p><a href="tel:+79088729490" style="color:inherit">+7 908 872-94-90</a></p>
          <div class="footer-messenger">
            <a id="footer-telegram" href="#" class="btn btn-telegram" target="_blank" rel="noopener">Telegram</a>
            <a id="footer-whatsapp" href="#" class="btn btn-whatsapp" target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
        <div>
          <div class="footer-links">
            <a href="${home}">${t("Главная", "Home")}</a>
            <a href="${page("/gallery")}">${t("Галерея", "Gallery")}</a>
            <a href="${blogHref}">${t("Статьи", "Articles")}</a>
            <a href="${page("/download")}">${t("Скачать", "Download")}</a>
            <a href="${page("/offer")}">${t("Оферта", "Terms")}</a>
            <a href="${orderHref}">${t("Заказать", "Order")}</a>
          </div>
          <nav class="footer-sitemap" aria-label="${t("Карта сайта", "Sitemap")}">
            <a href="${section("#catalog")}">${t("Каталог", "Catalog")}</a>
            <a href="${section("#prices")}">${t("Цены", "Prices")}</a>
            <a href="${section("#kit")}">${t("Комплект", "Kit")}</a>
            <a href="${section("#faq")}">FAQ</a>
          </nav>
          <p style="margin-top:0.75rem;font-size:0.75rem">© <span data-brand>${brand}</span></p>
          <p class="lang-switch" data-lang-switch></p>
        </div>
      </div>
    `;
  }

  function applyContactLinks() {
    document.querySelectorAll("[data-brand]").forEach((el) => { el.textContent = brand; });

    const tg = document.getElementById("footer-telegram");
    const wa = document.getElementById("footer-whatsapp");
    const tgHero = document.getElementById("contact-telegram");
    const waHero = document.getElementById("contact-whatsapp");

    if (tg && config.telegram) {
      tg.href = config.telegram;
      tg.textContent = isEnglish ? "Telegram" : (config.telegramLabel || "Telegram");
    }
    if (wa && config.whatsapp) {
      wa.href = config.whatsapp;
      wa.textContent = isEnglish ? "WhatsApp" : (config.whatsappLabel || "WhatsApp");
    }
    if (tgHero && config.telegram) tgHero.href = config.telegram;
    if (waHero && config.whatsapp) waHero.href = config.whatsapp;

    document.querySelectorAll("[data-pickup-address]").forEach((el) => {
      if (config.pickupAddress) el.textContent = config.pickupAddress;
    });
    document.querySelectorAll("[data-seller-name]").forEach((el) => {
      if (config.seller?.name) el.textContent = config.seller.name;
    });
    document.querySelectorAll("[data-seller-inn]").forEach((el) => {
      if (config.seller?.inn) el.textContent = config.seller.inn;
    });
    document.querySelectorAll("[data-seller-address]").forEach((el) => {
      if (config.seller?.address) el.textContent = config.seller.address;
    });
  }

  function mapLangPath(current, toEnglish) {
    if (toEnglish) {
      if (current.startsWith("/english")) return current;
      if (current === "/" || current === "") return "/english/";
      return "/english" + current;
    }
    if (!current.startsWith("/english")) return current || "/";
    const stripped = current.replace(/^\/english/, "") || "/";
    return stripped === "/" ? "/" : stripped;
  }

  function renderLangSwitch() {
    const hosts = document.querySelectorAll("[data-lang-switch]");
    const ruPath = mapLangPath(location.pathname, false);
    const enPath = mapLangPath(location.pathname, true);

    hosts.forEach((host) => {
      host.innerHTML = `
        <a href="${ruPath}" class="lang-switch-link${isEnglish ? "" : " active"}" hreflang="ru">RU</a>
        <span class="lang-switch-sep">/</span>
        <a href="${enPath}" class="lang-switch-link${isEnglish ? " active" : ""}" hreflang="en">EN</a>
      `;
    });
  }

  renderHeader();
  renderFooter();
  applyContactLinks();
  renderLangSwitch();

  // Яндекс.Метрика подключается статически в <head> каждой страницы
  // (см. блок "Yandex.Metrika counter"). Здесь инъекция намеренно убрана,
  // чтобы счётчик не загружался дважды.

  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const wasOpen = item?.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("open"));
      if (!wasOpen) item?.classList.add("open");
    });
  });
})();
