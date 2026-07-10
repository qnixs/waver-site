(function () {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isEnglish = location.pathname.startsWith("/english");

  function autoMarkSections() {
    const foldLine = window.innerHeight * 0.9;
    const belowFold = (el) => el.getBoundingClientRect().top > foldLine;

    document.querySelectorAll("main > section").forEach((section) => {
      if (section.classList.contains("hero")) return;
      if (section.classList.contains("reveal") || section.querySelector(".reveal, .reveal-stagger")) return;
      // Секции, уже видимые при загрузке, не прячем — иначе мигание
      if (belowFold(section)) section.classList.add("reveal");
    });

    ["cards-3", "catalog-grid", "kit-grid", "steps-grid", "stats-grid", "gallery-preview", "gallery-page-grid", "download-list", "guides-grid", "article-links"].forEach((cls) => {
      document.querySelectorAll("." + cls).forEach((el) => {
        if (belowFold(el)) el.classList.add("reveal-stagger");
      });
    });
  }

  function setupReveal() {
    const targets = document.querySelectorAll(".reveal, .reveal-stagger");
    if (!targets.length) return;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    // threshold 0: элемент проявляется, как только входит в экран —
    // выше порог нельзя: длинные секции (статьи) иначе не проявятся никогда
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0 }
    );
    targets.forEach((el) => io.observe(el));
  }

  function setupScrollCue() {
    const cue = document.getElementById("scroll-cue");
    if (!cue) return;
    const heroSection = cue.closest(".hero");
    cue.addEventListener("click", () => {
      const next = heroSection ? heroSection.nextElementSibling : null;
      if (next) next.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
    let hidden = false;
    window.addEventListener(
      "scroll",
      () => {
        const shouldHide = window.scrollY > 120;
        if (shouldHide !== hidden) {
          hidden = shouldHide;
          cue.classList.toggle("is-hidden", hidden);
        }
      },
      { passive: true }
    );
  }

  // Ротация слова в hero (вдохновлено animated-hero, без зависимостей)
  function setupRotator() {
    const rotator = document.querySelector("[data-rotator]");
    if (!rotator) return;
    const words = rotator.querySelectorAll("span");
    if (!words.length) return;
    words[0].classList.add("active");
    if (prefersReducedMotion || words.length < 2) return;
    let index = 0;
    setInterval(() => {
      const prev = words[index];
      prev.classList.remove("active");
      prev.classList.add("leaving");
      setTimeout(() => prev.classList.remove("leaving"), 500);
      index = (index + 1) % words.length;
      words[index].classList.add("active");
    }, 2600);
  }

  // Чип «N мин чтения» в шапке статьи
  function setupReadingTime() {
    if (!/\/blog\/.+/.test(location.pathname)) return;
    const prose = document.querySelector(".article-prose");
    const heroBox = document.querySelector(".page-hero .container");
    if (!prose || !heroBox) return;
    const words = prose.textContent.trim().split(/\s+/).length;
    const mins = Math.max(2, Math.round(words / 170));
    const meta = document.createElement("p");
    meta.className = "article-meta";
    meta.innerHTML =
      '<span class="meta-chip"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>' +
      mins + (isEnglish ? " min read" : " мин чтения") + "</span>";
    heroBox.appendChild(meta);
  }

  // Полноэкранный просмотр фото галереи
  function setupLightbox() {
    const items = Array.from(document.querySelectorAll(".gallery-preview-item, .gallery-page-item"))
      .filter((item) => item.querySelector("img"));
    if (!items.length) return;

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="' + (isEnglish ? "Close" : "Закрыть") + '">✕</button>' +
      '<button type="button" class="lightbox-nav lightbox-prev" aria-label="' + (isEnglish ? "Previous photo" : "Предыдущее фото") + '">‹</button>' +
      '<img alt="">' +
      '<button type="button" class="lightbox-nav lightbox-next" aria-label="' + (isEnglish ? "Next photo" : "Следующее фото") + '">›</button>' +
      '<p class="lightbox-caption"></p>';
    document.body.appendChild(lightbox);

    const imgEl = lightbox.querySelector("img");
    const captionEl = lightbox.querySelector(".lightbox-caption");
    let index = 0;

    function render(i) {
      index = (i + items.length) % items.length;
      const img = items[index].querySelector("img");
      imgEl.src = img.currentSrc || img.src;
      imgEl.alt = img.alt || "";
      const caption = items[index].querySelector("figcaption")?.textContent || img.alt || "";
      captionEl.textContent = caption;
    }
    function open(i) {
      render(i);
      lightbox.classList.add("is-open");
      document.body.classList.add("lightbox-lock");
    }
    function close() {
      lightbox.classList.remove("is-open");
      document.body.classList.remove("lightbox-lock");
    }

    items.forEach((item, i) => {
      item.classList.add("is-zoomable");
      item.addEventListener("click", (e) => {
        e.preventDefault();
        open(i);
      });
    });

    lightbox.querySelector(".lightbox-close").addEventListener("click", close);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", () => render(index - 1));
    lightbox.querySelector(".lightbox-next").addEventListener("click", () => render(index + 1));
    lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") render(index - 1);
      if (e.key === "ArrowRight") render(index + 1);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    autoMarkSections();
    setupReveal();
    setupScrollCue();
    setupRotator();
    setupReadingTime();
    setupLightbox();
  });
})();
