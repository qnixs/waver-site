(function () {
  const mapConfig = (window.WAVER_CONFIG || {}).yandexMaps;
  const container = document.getElementById("yandex-map");
  const placeholder = document.getElementById("map-placeholder");
  const openLink = document.getElementById("map-open-yandex");

  if (!container || !mapConfig) return;

  const marker = mapConfig.marker || {};
  const coords = marker.coords || mapConfig.center;
  const lon = coords[1];
  const lat = coords[0];

  if (openLink && lon && lat) {
    openLink.href = "https://yandex.ru/maps/?ll=" + lon + "," + lat + "&z=" + (mapConfig.zoom || 16) + "&pt=" + lon + "," + lat + ",pm2dml";
    openLink.hidden = false;
  }

  if (!mapConfig.apiKey) {
    if (placeholder) {
      placeholder.hidden = false;
      placeholder.querySelector("[data-map-key-hint]")?.classList.remove("hidden");
    }
    container.hidden = true;
    return;
  }

  function initMap() {
    const map = new ymaps.Map(container, {
      center: mapConfig.center || coords,
      zoom: mapConfig.zoom || 16,
      controls: ["zoomControl", "fullscreenControl"],
    });

    const placemark = new ymaps.Placemark(
      marker.coords || mapConfig.center,
      {
        hintContent: marker.hint || marker.title || "WaverStore",
        balloonContent: marker.balloon || marker.title || "WaverStore",
      },
      { preset: "islands#orangeDotIcon" }
    );

    map.geoObjects.add(placemark);
    placemark.balloon.open();
  }

  if (window.ymaps) {
    ymaps.ready(initMap);
    return;
  }

  const script = document.createElement("script");
  script.src = "https://api-maps.yandex.ru/2.1/?apikey=" + encodeURIComponent(mapConfig.apiKey) + "&lang=ru_RU";
  script.async = true;
  script.onerror = function () {
    if (placeholder) {
      placeholder.hidden = false;
      container.hidden = true;
    }
  };
  script.onload = function () {
    ymaps.ready(initMap);
  };
  document.head.appendChild(script);
})();
