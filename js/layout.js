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

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (href === current || (current === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
})();
