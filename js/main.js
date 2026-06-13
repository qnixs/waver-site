(function () {
  const PRICES = {
    retail: { 1: 3241, 10: 3241, 20: 3241, 30: 3241 },
    master: { 1: 2990, 10: 2850, 20: 2690, 30: 2550 },
  };

  const config = window.WAVER_CONFIG || {};
  const form = document.getElementById("order-form");
  const qtyInput = document.getElementById("qty");
  const isMasterInput = document.getElementById("is-master");
  const summaryLines = document.getElementById("summary-lines");
  const totalPriceEl = document.getElementById("total-price");
  const deliveryValue = document.getElementById("delivery-value");
  const formError = document.getElementById("form-error");
  const submitBtn = document.getElementById("submit-btn");

  function formatMoney(value) {
    return value.toLocaleString("ru-RU") + " ₽";
  }

  function getUnitPrice(qty, isMaster) {
    const table = isMaster ? PRICES.master : PRICES.retail;
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

  function updateSummary() {
    const qty = clampQty(qtyInput.value);
    qtyInput.value = qty;

    const isMaster = isMasterInput.checked;
    const unitPrice = getUnitPrice(qty, isMaster);
    const retailUnit = getUnitPrice(qty, false);
    const total = unitPrice * qty;
    const savings = isMaster ? (retailUnit - unitPrice) * qty : 0;
    const delivery = deliveryValue.value;

    summaryLines.innerHTML = "";

    addLine(`Розетка × ${qty} шт`, `${formatMoney(unitPrice)}/шт`);
    addLine("Тариф", isMaster ? "Тариф мастера" : "Розница");

    if (savings > 0) {
      addLine("Экономия vs розницы", `− ${formatMoney(savings)}`, "savings");
    }

    addLine("Доставка", delivery);
    totalPriceEl.textContent = formatMoney(total);

    document.getElementById("hidden-unit-price").value = unitPrice;
    document.getElementById("hidden-total").value = total;
    document.getElementById("hidden-tariff").value = isMaster ? "Мастер" : "Розница";
    document.getElementById("hidden-savings").value = savings;
  }

  function addLine(label, value, extraClass) {
    const row = document.createElement("div");
    row.className = "summary-line" + (extraClass ? " " + extraClass : "");
    row.innerHTML = `<span>${label}</span><span>${value}</span>`;
    summaryLines.appendChild(row);
  }

  function setupQtyButtons() {
    document.getElementById("qty-minus").addEventListener("click", () => {
      qtyInput.value = clampQty(Number(qtyInput.value) - 1);
      updateSummary();
    });
    document.getElementById("qty-plus").addEventListener("click", () => {
      qtyInput.value = clampQty(Number(qtyInput.value) + 1);
      updateSummary();
    });
    qtyInput.addEventListener("input", updateSummary);
    isMasterInput.addEventListener("change", updateSummary);
  }

  function setupDelivery() {
    document.querySelectorAll(".delivery-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".delivery-option").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        deliveryValue.value = btn.dataset.delivery;
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

  function setupContacts() {
    const tg = document.getElementById("footer-telegram");
    const wa = document.getElementById("footer-whatsapp");
    if (tg && config.telegram) {
      tg.href = config.telegram;
      if (config.telegramLabel) tg.textContent = config.telegramLabel;
    }
    if (wa && config.whatsapp) {
      wa.href = config.whatsapp;
      if (config.whatsappLabel) wa.textContent = config.whatsappLabel;
    }
  }

  function validateForm() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name) return "Укажите имя";
    if (!phone || phone.replace(/\D/g, "").length < 10) return "Укажите корректный телефон";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Проверьте email";

    if (!config.formspreeId || config.formspreeId === "YOUR_FORM_ID") {
      return "Сначала укажи Formspree ID в файле js/config.js";
    }

    return "";
  }

  function setupForm() {
    if (!form) return;

    const formspreeId = config.formspreeId;
    if (formspreeId && formspreeId !== "YOUR_FORM_ID") {
      form.action = `https://formspree.io/f/${formspreeId}`;
      form.method = "POST";
    }

    form.addEventListener("submit", async (e) => {
      const error = validateForm();
      if (error) {
        e.preventDefault();
        formError.textContent = error;
        formError.classList.add("visible");
        return;
      }

      formError.classList.remove("visible");

      if (!form.action || form.action.includes("YOUR_FORM_ID")) {
        e.preventDefault();
        formError.textContent = "Укажи Formspree ID в js/config.js";
        formError.classList.add("visible");
        return;
      }

      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.textContent = "Отправляем…";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          window.location.href = "thanks.html";
          return;
        }

        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Не удалось отправить заявку");
      } catch (err) {
        formError.textContent = err.message || "Ошибка отправки. Попробуй ещё раз.";
        formError.classList.add("visible");
        submitBtn.disabled = false;
        submitBtn.textContent = "Оформить заказ →";
      }
    });
  }

  setupQtyButtons();
  setupDelivery();
  setupFaq();
  setupContacts();
  setupForm();
  updateSummary();
})();
