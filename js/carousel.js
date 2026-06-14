(function () {
  const config = window.WAVER_CONFIG || {};
  const images = config.heroImages || [];
  const root = document.getElementById("hero-carousel");
  if (!root || images.length === 0) return;

  let index = 0;
  let touchStartX = 0;

  root.innerHTML = `
    <div class="carousel-track" id="carousel-track"></div>
    <button type="button" class="carousel-btn carousel-prev" aria-label="Предыдущее фото">‹</button>
    <button type="button" class="carousel-btn carousel-next" aria-label="Следующее фото">›</button>
    <div class="carousel-dots" id="carousel-dots"></div>
  `;

  const track = document.getElementById("carousel-track");
  const dots = document.getElementById("carousel-dots");

  images.forEach((img, i) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide" + (i === 0 ? " active" : "");
    slide.innerHTML = `
      <img src="${img.src}" alt="${img.alt || ""}" loading="${i === 0 ? "eager" : "lazy"}"
           onerror="this.parentElement.classList.add('no-image')">
      <div class="carousel-placeholder">
        <p>Добавь фото: <code>${img.src}</code></p>
        <small>Положи файл в папку images/hero/</small>
      </div>
    `;
    track.appendChild(slide);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carousel-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Фото ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dots.appendChild(dot);
  });

  function goTo(i) {
    index = (i + images.length) % images.length;
    track.querySelectorAll(".carousel-slide").forEach((s, j) => {
      s.classList.toggle("active", j === index);
    });
    dots.querySelectorAll(".carousel-dot").forEach((d, j) => {
      d.classList.toggle("active", j === index);
    });
  }

  root.querySelector(".carousel-prev").addEventListener("click", () => goTo(index - 1));
  root.querySelector(".carousel-next").addEventListener("click", () => goTo(index + 1));

  root.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  root.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? index - 1 : index + 1);
  }, { passive: true });

  if (images.length > 1) {
    setInterval(() => goTo(index + 1), 6000);
  }
})();
