/**
 * map.js
 * Initialises the Leaflet contact map with a pulsing cyan marker.
 * Requires Leaflet 1.x to be loaded before this script.
 */

(function initContactMap() {
  const LNG = 78.9629;
  const LAT  = 20.5937;

  function tryInit() {
    if (typeof L === 'undefined') { setTimeout(tryInit, 100); return; }

    const map = L.map('contact-map', {
      center: [LAT, LNG],
      zoom: 12,
      zoomControl: false,
      attributionControl: false,
    });

    /* Dark CartoDB tile layer */
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    /* Custom pulsing marker icon */
    const icon = L.divIcon({
      className: '',
      html: '<div class="pulse-marker"><div class="ring"></div><div class="dot"></div></div>',
      iconSize:    [20, 20],
      iconAnchor:  [10, 10],
      popupAnchor: [0, -14],
    });

    L.marker([LAT, LNG], { icon })
      .addTo(map)
      .bindPopup('📍 India 🇮🇳 — Sahil More')
      .openPopup();

    /* Custom zoom buttons */
    document.getElementById('map-zoom-in').addEventListener('click',
      () => map.setZoom(map.getZoom() + 1));
    document.getElementById('map-zoom-out').addEventListener('click',
      () => map.setZoom(map.getZoom() - 1));
  }

  tryInit();
})();
