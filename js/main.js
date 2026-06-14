(function () {
  const config = window.WAVER_CONFIG || {};
  const PRICES = config.prices || {
    retail: { 1: 5000, 10: 5000, 20: 5000, 30: 5000 },
    master: { 1: 4620, 10: 4400, 20: 4150, 30: 3940 },
  };

  const PRODUCTS = {
    socket: {
      id: "socket",
      name: "Розетка скрытая, 1 пост",
      sub: "арт. 3028910163 · чёрный · шаблон для реза в комплекте",
      available: true,
    },
    switch1: {
      id: "switch1",
      name: "Выключатель одноклавишный, 1 пост",
      sub: "заподлицо в керамограните · в наличии",
      available: true,
    },
    switch2: {
      id: "switch2",
      name: "Выключатель двухклавишный, 1 пост",
      sub: "скоро в продаже — оставьте заявку в комментарии",
      available: false,
    },
  };

  const form = document.getElementById("order-form");
  const qtyInput = document.getElementById("qty");
  const masterToggle = document.getElementById("master-toggle");
  const masterHidden = document.getElementById("is-master");
  const summaryLines = document.getElementById("summary-lines");
  const totalPriceEl = document.getElementById("total-price");
  const deliveryValue = document.getElementById("delivery-value");
  const formError = document.getElementById("form-error");
  const submitBtn = document.getElementById("submit-btn");
  const productHidden = document.getElementById("hidden-product");

  let selectedProduct = "socket";
  let isMaster = false;

  function formatMoney(value) {
    return value.toLocaleString("ru-RU") + " ₽";
  }

  function getUnitPrice(qty, master) {
    const table = master ? PRICES.master : PRICES.retail;
    if (qty >= 30) return table[30];
    if (qty >= 20) return table[20];
    if (qty >= 10) return table[10];
    return table[1];
  }

  function clampQty(value) {
    const num = Number(value);
    if (Number.isNaN(num) || num < 1) return 1;
    if (num > 999) return 999;
    return Math.floor(num);
  }

  function setMaster(on) {
    isMaster = on;
    if (masterHidden) masterHidden.value = on ? "да" : "нет";
    if (masterToggle) {
      masterToggle.classList.toggle("on", on);
      masterToggle.setAttribute("aria-pressed", on ? "true" : "false");
      const label = document.getElementById("master-label");
      if (label) label.textContent = on ? "Тариф мастера включён" : "Тариф мастера выключен";
    }
    updateSummary();
  }

  function updateSummary() {
    if (!qtyInput) return;
    const qty = clampQty(qtyInput.value);
    qtyInput.value = qty;

    const product = PRODUCTS[selectedProduct];
    const unitPrice = getUnitPrice(qty, isMaster);
    const retailUnit = getUnitPrice(qty, false);
    const total = unitPrice * qty;
    const savings = isMaster ? (retailUnit - unitPrice) * qty : 0;
    const delivery = deliveryValue ? deliveryValue.value : "";

    if (summaryLines) {
      summaryLines.innerHTML = "";
      addLine(product.name + " × " + qty + " шт", formatMoney(unitPrice) + "/шт");
      addLine("Тариф", isMaster ? "Мастер / плиточник" : "Розница");
      if (savings > 0) addLine("Экономия vs розницы", "− " + formatMoney(savings), "savings");
      if (delivery) addLine("Доставка", delivery);
    }

    if (totalPriceEl) totalPriceEl.textContent = formatMoney(total);
    if (productHidden) productHidden.value = product.name;
    const fields = {
      "hidden-unit-price": unitPrice,
      "hidden-total": total,
      "hidden-tariff": isMaster ? "Мастер" : "Розница",
      "hidden-savings": savings,
    };
    Object.entries(fields).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    });
  }

  function addLine(label, value, extraClass) {
    const row = document.createElement("div");
    row.className = "summary-line" + (extraClass ? " " + extraClass : "");
    row.innerHTML = "<span>" + label + "</span><span>" + value + "</span>";
    summaryLines.appendChild(row);
  }

  function setupProducts() {
    document.querySelectorAll(".product-pick").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.classList.contains("disabled")) return;
        selectedProduct = btn.dataset.product;
        document.querySelectorAll(".product-pick").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        updateSummary();
      });
    });
  }

  function setupQty() {
    const minus = document.getElementById("qty-minus");
    const plus = document.getElementById("qty-plus");
    if (minus) minus.addEventListener("click", () => { qtyInput.value = clampQty(Number(qtyInput.value) - 1); updateSummary(); });
    if (plus) plus.addEventListener("click", () => { qtyInput.value = clampQty(Number(qtyInput.value) + 1); updateSummary(); });
    if (qtyInput) qtyInput.addEventListener("input", updateSummary);
  }

  function setupMasterToggle() {
    if (!masterToggle) return;
    masterToggle.addEventListener("click", () => setMaster(!isMaster));
    masterToggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setMaster(!isMaster); }
    });
    setMaster(false);
  }

  function setupDelivery() {
    document.querySelectorAll(".delivery-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".delivery-option").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        if (deliveryValue) deliveryValue.value = btn.dataset.delivery;
        updateSummary();
      });
    });
  }

  function setupFaq() {
    document.querySelectorAll(".faq-question").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const wasOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("open"));
        if (!wasOpen) item.classList.add("open");
      });
    });
  }

  function validateForm() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    if (!name) return "Укажите имя";
    if (!phone || phone.replace(/\D/g, "").length < 10) return "Укажите корректный телефон";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Проверьте email";
    if (!config.formspreeId) return "Не указан Formspree ID в config.js";
    return "";
  }

  function setupForm() {
    if (!form) return;
    if (config.formspreeId) {
      form.action = "https://formspree.io/f/" + config.formspreeId;
      form.method = "POST";
    }
    const nextField = document.getElementById("form-next");
    if (nextField) nextField.value = new URL("thanks.html", window.location.href).href;

    form.addEventListener("submit", (e) => {
      const error = validateForm();
      if (error) {
        e.preventDefault();
        formError.textContent = error;
        formError.classList.add("visible");
        return;
      }
      formError.classList.remove("visible");
      submitBtn.disabled = true;
      submitBtn.textContent = "Отправляем…";
    });
  }

  function setupGalleryPreview() {
    const grid = document.getElementById("gallery-preview");
    const images = config.galleryImages || [];
    if (!grid || images.length === 0) return;
    grid.innerHTML = images.slice(0, 4).map((img) => `
      <a href="gallery.html" class="gallery-preview-item">
        <img src="${img.src}" alt="${img.alt || ""}" loading="lazy"
             onerror="this.closest('.gallery-preview-item').classList.add('no-image')">
        <span>${img.caption || ""}</span>
      </a>
    `).join("");
  }

  setupProducts();
  setupQty();
  setupMasterToggle();
  setupDelivery();
  setupFaq();
  setupForm();
  setupGalleryPreview();
  updateSummary();
})();
