(function () {
  const config = window.WAVER_CONFIG || {};
  const brand = config.brand || "WAVER STORE";
  const isEnglish = location.pathname.startsWith("/english");
  const enBase = "/english";

  document.documentElement.lang = isEnglish ? "en" : "ru";

  document.querySelectorAll("[data-brand]").forEach((el) => {
    el.textContent = brand;
  });

  document.querySelectorAll("#site-logo, .logo[data-logo]").forEach((el) => {
    el.href = isEnglish ? enBase + "/" : "/";
    el.setAttribute("aria-label", brand);
    el.textContent = brand;
    el.classList.remove("logo--image");
  });

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

  function normalizePath(value) {
    return value.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
  }

  const path = normalizePath(location.pathname);

  if (location.pathname.endsWith("/index.html")) {
    const clean = normalizePath(location.pathname);
    const target = clean === "/" ? "/" : clean + "/";
    history.replaceState(null, "", target + location.search + location.hash);
  }

  function navHref(href) {
    return href;
  }

  function renderNavigation() {
    const home = isEnglish ? enBase + "/" : "/";
    const section = (id) => home + id;
    const page = (slug) => (isEnglish ? enBase : "") + slug;

    const desktop = isEnglish
      ? [
          { href: section("#about"), label: "About" },
          { href: section("#catalog"), label: "Catalog" },
          { href: section("#kit"), label: "Kit" },
          { href: section("#prices"), label: "Prices" },
          { href: page("/gallery"), label: "Gallery" },
          { href: page("/download"), label: "Downloads" },
          { href: section("#faq"), label: "FAQ" },
        ]
      : [
          { href: section("#about"), label: "О продукте" },
          { href: section("#catalog"), label: "Каталог" },
          { href: section("#kit"), label: "Комплект" },
          { href: section("#prices"), label: "Цены" },
          { href: page("/gallery"), label: "Галерея" },
          { href: page("/download"), label: "Скачать" },
          { href: section("#faq"), label: "FAQ" },
        ];

    const mobile = desktop.concat(
      isEnglish
        ? [
            { href: page("/offer"), label: "Terms" },
            { href: section("#order"), label: "Order" },
          ]
        : [
            { href: page("/offer"), label: "Оферта" },
            { href: section("#order"), label: "Оформить заказ" },
          ]
    );

    const navLinks = document.querySelector(".nav-links");
    if (navLinks) {
      if (navLinks.querySelector("a")) {
        navLinks.querySelectorAll("a").forEach((link) => {
          link.classList.remove("active");
          const href = link.getAttribute("href") || "";
          if (!href.includes("#")) {
            const linkPath = normalizePath(href);
            if (linkPath === path) link.classList.add("active");
          }
        });
      } else {
        navLinks.innerHTML = desktop
          .map((item) => {
            const active = !item.href.includes("#") && normalizePath(item.href) === path;
            return `<a href="${navHref(item.href)}"${active ? ' class="active"' : ""}>${item.label}</a>`;
          })
          .join("");
      }
    }

    const mobileNav = document.getElementById("mobile-nav");
    if (mobileNav && !mobileNav.querySelector("a")) {
      mobileNav.innerHTML = mobile
        .map((item) => `<a href="${navHref(item.href)}">${item.label}</a>`)
        .join("");
    }
  }

  function renderLangSwitch() {
    const hosts = document.querySelectorAll("[data-lang-switch]");
    const ruPath = mapLangPath(location.pathname, false);
    const enPath = mapLangPath(location.pathname, true);

    hosts.forEach((host) => {
      if (host.querySelector("a")) return;
      host.innerHTML = `
        <a href="${ruPath}" class="lang-switch-link${isEnglish ? "" : " active"}" hreflang="ru">RU</a>
        <span class="lang-switch-sep">/</span>
        <a href="${enPath}" class="lang-switch-link${isEnglish ? " active" : ""}" hreflang="en">EN</a>
      `;
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

  renderNavigation();
  renderLangSwitch();

  if (config.yandexMetrikaId) {
    (function (m, e, t, r, i, k, a) {
      m[i] =
        m[i] ||
        function () {
          (m[i].a = m[i].a || []).push(arguments);
        };
      m[i].l = 1 * new Date();
      for (k = 0; k < document.scripts.length; k++) {
        if (document.scripts[k].src === r) return;
      }
      a = e.createElement(t);
      a.async = 1;
      a.src = r;
      e.head.appendChild(a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    window.ym(config.yandexMetrikaId, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
  }

  document.getElementById("menu-btn")?.addEventListener("click", () => {
    document.getElementById("mobile-nav")?.classList.toggle("open");
  });

  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const wasOpen = item?.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("open"));
      if (!wasOpen) item?.classList.add("open");
    });
  });
})();
