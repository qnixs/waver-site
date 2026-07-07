(function () {
  const config = window.WAVER_CONFIG || {};
  const isEnglish = location.pathname.startsWith("/english");
  const langPrefix = isEnglish ? "/english" : "";
  const t = (ru, en) => (isEnglish ? en : ru);

  const PRICES = config.prices || {
    retail: { 1: 4500, 5: 4350, 10: 4250, 20: 4150, 30: 4050 },
    master: { 1: 4200, 5: 4100, 10: 4000, 20: 3900, 30: 3800 },
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
    if (totalQty >= 30) return t("от 30 шт", "30+ pcs");
    if (totalQty >= 20) return t("от 20 шт", "20+ pcs");
    if (totalQty >= 10) return t("от 10 шт", "10+ pcs");
    if (totalQty >= 5) return t("от 5 шт", "5+ pcs");
    return t("1–4 шт", "1–4 pcs");
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
    if (masterHidden) masterHidden.value = on ? t("да", "yes") : t("нет", "no");
    if (masterToggle) {
      masterToggle.classList.toggle("on", on);
      masterToggle.setAttribute("aria-pressed", on ? "true" : "false");
      const label = document.getElementById("master-label");
      if (label) {
        label.textContent = on
          ? t("Тариф мастера включён", "Pro pricing enabled")
          : t("Тариф мастера выключен", "Pro pricing disabled");
      }
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
            <span class="badge-soon">${t("Скоро", "Soon")}</span>
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

  function getBaseUnitPrice(master) {
    // Цена без скидки за количество (тариф 1–4 шт)
    return (master ? PRICES.master : PRICES.retail)[1];
  }

  function getNextTier(totalQty) {
    const thresholds = [5, 10, 20, 30];
    for (const threshold of thresholds) {
      if (totalQty < threshold) return threshold;
    }
    return null;
  }

  function updateSummary() {
    const totalQty = getTotalQty();
    const unitPrice = totalQty > 0 ? getUnitPrice(totalQty, isMaster) : 0;
    const retailUnit = totalQty > 0 ? getUnitPrice(totalQty, false) : 0;
    const baseUnit = getBaseUnitPrice(isMaster);
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

    // Скидка за количество: экономия относительно цены 1–4 шт
    const qtySavings = totalQty > 0 ? (baseUnit - unitPrice) * totalQty : 0;
    const baseTotal = baseUnit * totalQty;

    if (totalQty === 0) {
      addLine(t("Добавьте товары", "Add products"), "—");
    } else {
      if (qtySavings > 0) {
        addLine(
          t("Цена за шт", "Unit price"),
          '<s class="old-unit">' + formatMoney(baseUnit) + "</s> " +
            '<span class="new-unit">' + formatMoney(unitPrice) + "</span> · " + getTierLabel(totalQty)
        );
      } else {
        addLine(t("Цена за шт", "Unit price"), formatMoney(unitPrice) + " · " + getTierLabel(totalQty));
      }
      addLine(t("Тариф", "Pricing"), isMaster ? t("Мастер / плиточник", "Pro / tiler") : t("Розница", "Retail"));
      if (qtySavings > 0) {
        addLine(t("Скидка за количество", "Quantity discount"), "− " + formatMoney(qtySavings), "savings");
      }
    }

    if (delivery) addLine(t("Доставка", "Delivery"), delivery);

    // Итог: зачёркнутая старая цена + зелёная новая при активной скидке
    if (totalPriceEl) {
      if (totalQty === 0) {
        totalPriceEl.textContent = "0 ₽";
      } else if (qtySavings > 0) {
        totalPriceEl.innerHTML =
          '<s class="old-total">' + formatMoney(baseTotal) + "</s>" +
          '<span class="new-total">' + formatMoney(total) + "</span>";
      } else {
        totalPriceEl.textContent = formatMoney(total);
      }
    }

    updateNudge(totalQty, unitPrice, baseUnit);

    const summaryField = document.getElementById("hidden-order-summary");
    if (summaryField) summaryField.value = orderParts.join("; ") || "пусто";

    const fields = {
      "hidden-unit-price": unitPrice,
      "hidden-total": total,
      "hidden-total-qty": totalQty,
      "hidden-tariff": isMaster ? t("Мастер", "Pro") : t("Розница", "Retail"),
      "hidden-tier": getTierLabel(totalQty),
      "hidden-savings": qtySavings > 0 ? qtySavings : 0,
    };
    Object.entries(fields).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    });
  }

  function updateNudge(totalQty, unitPrice, baseUnit) {
    const nudge = document.getElementById("order-nudge");
    if (!nudge) return;
    if (totalQty <= 0) {
      nudge.hidden = true;
      return;
    }
    const nextTier = getNextTier(totalQty);
    if (!nextTier) {
      nudge.hidden = true;
      return;
    }
    const need = nextTier - totalQty;
    // Подсказываем, только если до скидки осталось 1–2 шт
    if (need > 2) {
      nudge.hidden = true;
      return;
    }
    const nextUnit = getUnitPrice(nextTier, isMaster);
    if (nextUnit >= unitPrice) {
      nudge.hidden = true;
      return;
    }
    const perUnitSave = baseUnit - nextUnit;
    nudge.hidden = false;
    nudge.innerHTML = isEnglish
      ? "Add <strong>" + need + " more</strong> to reach <strong>" + nextTier +
        " pcs</strong> — the price drops to <strong>" + formatMoney(nextUnit) +
        "/pc</strong>."
      : "Добавьте ещё <strong>" + need + " шт</strong> до <strong>" + nextTier +
        " шт</strong> — цена снизится до <strong>" + formatMoney(nextUnit) +
        "/шт</strong> (−" + formatMoney(perUnitSave) + " с каждой).";
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

  function validateForm() {
    if (getTotalQty() < 1) return t("Добавьте хотя бы один товар в заказ", "Add at least one product");
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    if (!name) return t("Укажите имя", "Enter your name");
    if (!phone || phone.replace(/\D/g, "").length < 10) return t("Укажите корректный телефон", "Enter a valid phone number");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return t("Проверьте email", "Check your email");
    if (!config.formspreeId) return t("Форма временно недоступна", "Form is temporarily unavailable");
    return "";
  }

  function setupForm() {
    if (!form) return;
    if (config.formspreeId) {
      form.action = "https://formspree.io/f/" + config.formspreeId;
      form.method = "POST";
    }
    const nextField = document.getElementById("form-next");
    if (nextField) nextField.value = new URL(langPrefix + "/thanks/", window.location.origin).href;

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
      submitBtn.textContent = t("Отправляем…", "Sending…");
    });
  }

  function setupGalleryPreview() {
    const grid = document.getElementById("gallery-preview");
    const images = config.galleryImages || [];
    if (!grid || images.length === 0) return;
    grid.innerHTML = images.map((img) => `
      <a href="${langPrefix}/gallery" class="gallery-preview-item">
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

  function renderPriceTable() {
    const root = document.getElementById("price-table-root");
    if (!root) return;

    const tiers = [
      { key: 1, label: t("1–4 шт", "1–4 pcs") },
      { key: 5, label: t("от 5 шт", "5+ pcs"), highlight: true },
      { key: 10, label: t("от 10 шт", "10+ pcs") },
      { key: 20, label: t("от 20 шт", "20+ pcs") },
      { key: 30, label: t("от 30 шт", "30+ pcs") },
    ];

    root.innerHTML = `
      <table class="price-table price-table--dual">
        <thead>
          <tr>
            <th>${t("Заказ", "Quantity")}</th>
            <th>${t("Розница", "Retail")}</th>
            <th>${t("Мастера", "Pro")}</th>
          </tr>
        </thead>
        <tbody>
          ${tiers.map((tier) => `
            <tr${tier.highlight ? ' class="highlight"' : ""}>
              <td>${tier.label}${tier.highlight ? ` <span class="badge">${t("выгодно", "popular")}</span>` : ""}</td>
              <td>${formatMoney(PRICES.retail[tier.key])}</td>
              <td>${formatMoney(PRICES.master[tier.key])}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  buildLineItems();
  setupMasterToggle();
  setupDelivery();
  setupForm();
  setupGalleryPreview();
  setupKitContents();
  renderPriceTable();
  updateSummary();
})();
