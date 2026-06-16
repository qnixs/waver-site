(function () {
  const config = window.WAVER_CONFIG || {};
  const PRICES = config.prices || {
    retail: { 1: 5000, 5: 5000, 10: 5000, 20: 5000, 30: 5000 },
    master: { 1: 4620, 5: 4400, 10: 4150, 20: 4000, 30: 3940 },
  };

  const PRODUCTS = config.orderProducts || [];

  const form = document.getElementById("order-form");
  const lineItemsRoot = document.getElementById("line-items");
  const masterToggle = document.getElementById("master-toggle");
  const masterHidden = document.getElementById("is-master");
  const summaryLines = document.getElementById("summary-lines");
  const totalPriceEl = document.getElementById("total-price");
  const deliveryValue = document.getElementById("delivery-value");
  const formError = document.getElementById("form-error");
  const submitBtn = document.getElementById("submit-btn");

  let isMaster = false;
  const qtyState = {};

  function formatMoney(value) {
    return value.toLocaleString("ru-RU") + " ₽";
  }

  function getUnitPrice(totalQty, master) {
    const table = master ? PRICES.master : PRICES.retail;
    if (totalQty >= 30) return table[30];
    if (totalQty >= 20) return table[20];
    if (totalQty >= 10) return table[10];
    if (totalQty >= 5) return table[5];
    return table[1];
  }

  function getTierLabel(totalQty) {
    if (totalQty >= 30) return "от 30 шт";
    if (totalQty >= 20) return "от 20 шт";
    if (totalQty >= 10) return "от 10 шт";
    if (totalQty >= 5) return "от 5 шт";
    return "1–4 шт";
  }

  function clampQty(value, allowZero) {
    const num = Number(value);
    if (Number.isNaN(num)) return allowZero ? 0 : 1;
    if (num < 0) return 0;
    if (!allowZero && num < 1) return 1;
    if (num > 999) return 999;
    return Math.floor(num);
  }

  function getTotalQty() {
    return PRODUCTS.reduce((sum, p) => sum + (qtyState[p.id] || 0), 0);
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

  function setQty(productId, value) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product || !product.available) return;
    qtyState[productId] = clampQty(value, true);
    const input = document.querySelector('[data-qty-input="' + productId + '"]');
    if (input) input.value = qtyState[productId];
    updateSummary();
  }

  function buildLineItems() {
    if (!lineItemsRoot) return;
    lineItemsRoot.innerHTML = PRODUCTS.map((p) => {
      qtyState[p.id] = p.available ? (p.defaultQty || 0) : 0;
      const disabled = !p.available;
      return `
        <div class="line-item${disabled ? " disabled" : ""}" data-product-id="${p.id}">
          <div class="line-item-info">
            <strong>${p.name}</strong>
            <span>${p.sub}</span>
          </div>
          ${disabled ? `
            <span class="badge-soon">Скоро</span>
            <input type="hidden" name="${p.field}" value="0">
          ` : `
            <div class="qty-control">
              <button type="button" class="qty-btn" data-qty-minus="${p.id}" aria-label="меньше">−</button>
              <input type="number" class="qty-input" data-qty-input="${p.id}"
                     name="${p.field}" min="0" max="999" value="${qtyState[p.id]}">
              <button type="button" class="qty-btn" data-qty-plus="${p.id}" aria-label="больше">+</button>
            </div>
          `}
        </div>
      `;
    }).join("");

    lineItemsRoot.querySelectorAll("[data-qty-minus]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.qtyMinus;
        setQty(id, (qtyState[id] || 0) - 1);
      });
    });
    lineItemsRoot.querySelectorAll("[data-qty-plus]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.qtyPlus;
        setQty(id, (qtyState[id] || 0) + 1);
      });
    });
    lineItemsRoot.querySelectorAll("[data-qty-input]").forEach((input) => {
      input.addEventListener("input", () => setQty(input.dataset.qtyInput, input.value));
    });
  }

  function updateSummary() {
    const totalQty = getTotalQty();
    const unitPrice = totalQty > 0 ? getUnitPrice(totalQty, isMaster) : 0;
    const retailUnit = totalQty > 0 ? getUnitPrice(totalQty, false) : 0;
    const delivery = deliveryValue ? deliveryValue.value : "";

    let total = 0;
    const orderParts = [];

    if (summaryLines) summaryLines.innerHTML = "";

    PRODUCTS.forEach((p) => {
      const qty = qtyState[p.id] || 0;
      if (qty > 0) {
        const lineTotal = unitPrice * qty;
        total += lineTotal;
        orderParts.push(p.name + " × " + qty);
        addLine(p.name + " × " + qty, formatMoney(lineTotal));
      }
    });

    if (totalQty === 0) {
      addLine("Добавьте товары", "—");
    } else {
      addLine("Цена за шт", formatMoney(unitPrice) + " · " + getTierLabel(totalQty));
      addLine("Тариф", isMaster ? "Мастер / плиточник" : "Розница");
      const savings = isMaster ? (retailUnit - unitPrice) * totalQty : 0;
      if (savings > 0) addLine("Экономия vs розницы", "− " + formatMoney(savings), "savings");
    }

    if (delivery) addLine("Доставка", delivery);

    if (totalPriceEl) totalPriceEl.textContent = totalQty > 0 ? formatMoney(total) : "0 ₽";

    const summaryField = document.getElementById("hidden-order-summary");
    if (summaryField) summaryField.value = orderParts.join("; ") || "пусто";

    const fields = {
      "hidden-unit-price": unitPrice,
      "hidden-total": total,
      "hidden-total-qty": totalQty,
      "hidden-tariff": isMaster ? "Мастер" : "Розница",
      "hidden-tier": getTierLabel(totalQty),
      "hidden-savings": isMaster && totalQty > 0 ? (retailUnit - unitPrice) * totalQty : 0,
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

  function setupMasterToggle() {
    if (!masterToggle) return;
    masterToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      setMaster(!isMaster);
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
    if (getTotalQty() < 1) return "Добавьте хотя бы один товар в заказ";
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
    if (nextField) nextField.value = new URL("/thanks/", window.location.origin).href;

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
    grid.innerHTML = images.map((img) => `
      <a href="/gallery" class="gallery-preview-item">
        <img src="${img.src}" alt="${img.alt || ""}" loading="lazy">
        <span>${img.caption || ""}</span>
      </a>
    `).join("");
  }

  function setupKitContents() {
    const root = document.getElementById("kit-contents");
    const kits = config.kitContents || [];
    if (!root || kits.length === 0) return;
    root.innerHTML = kits.map((kit) => `
      <article class="kit-card">
        <h3>${kit.title}</h3>
        <ul>${kit.items.map((item) => "<li>" + item + "</li>").join("")}</ul>
      </article>
    `).join("");
  }

  buildLineItems();
  setupMasterToggle();
  setupDelivery();
  setupFaq();
  setupForm();
  setupGalleryPreview();
  setupKitContents();
  updateSummary();
})();
