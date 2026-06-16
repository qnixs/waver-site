(function () {
  const config = window.WAVER_CONFIG || {};
  const brand = config.brand || "WaverStore";

  document.querySelectorAll("[data-brand]").forEach((el) => {
    el.textContent = brand;
  });

  document.querySelectorAll("[data-brand-accent]").forEach((el) => {
    const parts = brand.split(/(?=[A-Z])/);
    if (parts.length > 1) {
      el.innerHTML = parts[0] + '<span class="brand-accent">' + parts.slice(1).join("") + "</span>";
    } else {
      el.textContent = brand;
    }
  });

  document.querySelectorAll("#site-logo, .logo[data-logo]").forEach((el) => {
    el.href = "/";
    el.setAttribute("aria-label", brand);
    if (config.logo) {
      el.innerHTML = '<img src="' + config.logo + '" alt="' + brand + '" class="logo-img" width="140" height="40">';
      el.classList.add("logo--image");
    } else {
      el.textContent = brand;
    }
  });

  if (config.logo) {
    let icon = document.querySelector('link[rel="icon"]');
    if (!icon) {
      icon = document.createElement("link");
      icon.rel = "icon";
      document.head.appendChild(icon);
    }
    icon.href = config.logo;
  }

  const tg = document.getElementById("footer-telegram");
  const wa = document.getElementById("footer-whatsapp");
  const tgHero = document.getElementById("contact-telegram");
  const waHero = document.getElementById("contact-whatsapp");

  if (tg && config.telegram) {
    tg.href = config.telegram;
    tg.textContent = config.telegramLabel || "Telegram";
  }
  if (wa && config.whatsapp) {
    wa.href = config.whatsapp;
    wa.textContent = config.whatsappLabel || "WhatsApp";
  }
  if (tgHero && config.telegram) {
    tgHero.href = config.telegram;
  }
  if (waHero && config.whatsapp) {
    waHero.href = config.whatsapp;
  }

  function normalizePath(value) {
    return value.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
  }

  const path = normalizePath(location.pathname);

  if (location.pathname.endsWith("/index.html")) {
    const clean = normalizePath(location.pathname);
    const target = clean === "/" ? "/" : clean + "/";
    history.replaceState(null, "", target + location.search + location.hash);
  }

  document.querySelectorAll(".nav-links a, .footer-links a, .mobile-nav a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (!href.startsWith("/") || href.includes("#")) return;
    const linkPath = normalizePath(href);
    if (linkPath === path) {
      link.classList.add("active");
    }
  });
})();
