(function () {
  const config = window.WAVER_CONFIG || {};
  const mapConfig = config.yandexMaps || {};
  const container = document.getElementById("delivery-map");
  const placeholder = document.getElementById("delivery-map-placeholder");
  const mapBlock = document.getElementById("delivery-map-block");
  const pickupBlock = document.getElementById("delivery-pickup-block");
  const selectedEl = document.getElementById("delivery-map-selected");
  const cityInput = document.getElementById("city");
  const addressInput = document.getElementById("address");
  const coordsField = document.getElementById("delivery-coords");
  const deliveryOptions = document.querySelectorAll(".delivery-option");

  if (!container || !cityInput || !addressInput) return;

  let map = null;
  let placemark = null;
  let suggestView = null;
  let mapsReady = false;

  function setSelectedText(text) {
    if (selectedEl) selectedEl.textContent = text || "";
  }

  function isPickupMode() {
    const value = document.getElementById("delivery-value")?.value || "";
    return /Самовывоз|Pickup/i.test(value);
  }

  function updateDeliveryUi() {
    const pickup = isPickupMode();
    if (mapBlock) mapBlock.hidden = pickup;
    if (pickupBlock) pickupBlock.hidden = !pickup;
    if (pickup && config.pickupAddress) {
      cityInput.value = "Тюмень";
      addressInput.value = config.pickupAddress;
      setSelectedText("");
      if (coordsField) coordsField.value = "";
    }
  }

  deliveryOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      setTimeout(updateDeliveryUi, 0);
    });
  });
  updateDeliveryUi();

  function applyGeocodeResult(geoObject) {
    if (!geoObject) return;
    const city = geoObject.getLocalities().slice(-1)[0] || geoObject.getAdministrativeAreas()[0] || "";
    const addressLine = geoObject.getAddressLine();
    const street = geoObject.getThoroughfare();
    const house = geoObject.getPremiseNumber() || geoObject.getPremise();
    const line = [street, house].filter(Boolean).join(", ") || addressLine;

    if (city) cityInput.value = city;
    addressInput.value = line || addressLine;
    setSelectedText(addressLine);
  }

  function setPoint(coords) {
    if (!map) return;
    if (placemark) {
      placemark.geometry.setCoordinates(coords);
    } else {
      placemark = new ymaps.Placemark(
        coords,
        { hintContent: "Точка доставки — перетащите при необходимости" },
        { draggable: true, preset: "islands#orangeDotIcon" }
      );
      placemark.events.add("dragend", () => {
        geocodeCoords(placemark.geometry.getCoordinates());
      });
      map.geoObjects.add(placemark);
    }

    if (coordsField) coordsField.value = coords[0].toFixed(6) + ", " + coords[1].toFixed(6);
    geocodeCoords(coords);
  }

  function geocodeCoords(coords) {
    ymaps.geocode(coords).then((res) => {
      applyGeocodeResult(res.geoObjects.get(0));
    });
  }

  function initMap() {
    mapsReady = true;
    if (placeholder) placeholder.hidden = true;
    container.hidden = false;

    map = new ymaps.Map(container, {
      center: mapConfig.defaultCenter || [57.1522, 65.5272],
      zoom: mapConfig.defaultZoom || 11,
      controls: ["zoomControl", "geolocationControl", "searchControl"],
    });

    map.events.add("click", (e) => {
      if (isPickupMode()) return;
      setPoint(e.get("coords"));
    });

    ymaps.geolocation.get({ mapStateAutoApply: true }).catch(() => {});

    if (addressInput && ymaps.SuggestView) {
      suggestView = new ymaps.SuggestView("address", {
        results: 5,
        boundedBy: map.getBounds(),
      });
      suggestView.events.add("select", (e) => {
        const value = e.get("item").value;
        ymaps.geocode(value).then((res) => {
          const obj = res.geoObjects.get(0);
          if (!obj) return;
          applyGeocodeResult(obj);
          const coords = obj.geometry.getCoordinates();
          map.setCenter(coords, 15);
          setPoint(coords);
        });
      });
    }
  }

  function boot() {
    if (!mapConfig.apiKey) {
      if (placeholder) placeholder.hidden = false;
      container.hidden = true;
      return;
    }

    if (window.ymaps) {
      ymaps.ready(initMap);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?apikey=" + encodeURIComponent(mapConfig.apiKey) + "&lang=ru_RU&suggest_apikey=" + encodeURIComponent(mapConfig.apiKey);
    script.async = true;
    script.onerror = function () {
      if (placeholder) placeholder.hidden = false;
      container.hidden = true;
    };
    script.onload = function () {
      ymaps.ready(initMap);
    };
    document.head.appendChild(script);
  }

  boot();
})();
