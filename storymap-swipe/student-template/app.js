(function () {
  'use strict';

  // Shared Leaflet map instances — created by initMaps(), used by initSwipe()
  var _map1 = null, _map2 = null;

  // ─── Check that a URL is real and not still a placeholder ───────────────────
  function isValidUrl(url) {
    return (
      typeof url === 'string' &&
      /^https?:\/\//i.test(url) &&
      url.indexOf('REPLACE_ME') === -1
    );
  }

  // ─── Apply colour theme from config ─────────────────────────────────────────
  function applyTheme(cfg) {
    var h = cfg.header || {};
    var root = document.documentElement;
    if (h.bgColor)       root.style.setProperty('--bg-color',       h.bgColor);
    if (h.fgColor)       root.style.setProperty('--fg-color',       h.fgColor);
    if (h.subtitleColor) root.style.setProperty('--subtitle-color', h.subtitleColor);
  }

  // ─── Populate the header bar ─────────────────────────────────────────────────
  function applyHeader(cfg) {
    var h = cfg.header || {};
    var b = cfg.branding || {};

    document.title = cfg.pageTitle || h.title || 'Story Map Swipe';

    var titleEl    = document.getElementById('title');
    var subtitleEl = document.getElementById('subtitle');
    var logoLink   = document.getElementById('logoLink');
    var logoImg    = document.getElementById('logoImg');

    if (titleEl)    titleEl.textContent = h.title || '';
    if (subtitleEl) {
      if (h.subtitle) {
        subtitleEl.textContent = h.subtitle;
      } else {
        subtitleEl.style.display = 'none';
      }
    }

    // Logo
    if (!b.showLogo || !b.logo) {
      if (logoLink) logoLink.style.display = 'none';
    } else {
      if (logoImg) {
        logoImg.src = b.logo;
        logoImg.onerror = function () { logoLink.style.display = 'none'; };
      }
      if (logoLink) {
        if (isValidUrl(b.logoLink)) {
          logoLink.href = b.logoLink;
        } else {
          logoLink.removeAttribute('href');
          logoLink.style.cursor = 'default';
        }
      }
    }
  }

  // ─── Initialize both Leaflet maps and synchronize pan/zoom ─────────────────
  function initMaps(cfg) {
    var maps   = cfg.maps || {};
    var m1     = maps.map1 || {};
    var m2     = maps.map2 || {};
    var center = Array.isArray(maps.center) ? maps.center : [39.5, -98.35];
    var zoom   = (maps.zoom != null) ? Number(maps.zoom) : 4;

    // Both maps always use the same neutral grey basemap so choropleth
    // colours are the focus of the comparison, not the background style.
    var BASEMAP_URL  = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    var BASEMAP_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

    _map1 = L.map('map1Container', { zoomControl: true  }).setView(center, zoom);
    L.tileLayer(BASEMAP_URL, { attribution: BASEMAP_ATTR, subdomains: 'abcd', maxZoom: 20 }).addTo(_map1);

    _map2 = L.map('map2Container', { zoomControl: false }).setView(center, zoom);
    L.tileLayer(BASEMAP_URL, { attribution: BASEMAP_ATTR, subdomains: 'abcd', maxZoom: 20 }).addTo(_map2);

    // Give map2's container the full panel width so Leaflet renders all tiles
    // even though #swipeDiv clips the visual output.
    var mapPanel      = document.getElementById('mapPanel');
    var map2Container = document.getElementById('map2Container');
    if (map2Container && mapPanel) {
      map2Container.style.width = mapPanel.offsetWidth + 'px';
    }

    // Synchronize pan and zoom between both maps in real time.
    // A boolean mutex prevents infinite feedback loops.
    var syncing = false;
    _map1.on('move', function () {
      if (syncing) return;
      syncing = true;
      _map2.setView(_map1.getCenter(), _map1.getZoom(), { animate: false });
      syncing = false;
    });
    _map2.on('move', function () {
      if (syncing) return;
      syncing = true;
      _map1.setView(_map2.getCenter(), _map2.getZoom(), { animate: false });
      syncing = false;
    });

    // Corner labels
    var labelLeft  = document.getElementById('labelLeft');
    var labelRight = document.getElementById('labelRight');
    if (labelLeft)  { labelLeft.textContent  = m2.label || ''; if (!m2.label) labelLeft.style.display  = 'none'; }
    if (labelRight) { labelRight.textContent = m1.label || ''; if (!m1.label) labelRight.style.display = 'none'; }

    // Load optional GeoJSON data layers on top of each basemap
    loadGeoJsonLayer(_map1, m1);
    loadGeoJsonLayer(_map2, m2);
  }

  // ─── Load a GeoJSON layer onto a Leaflet map with choropleth styling ────────────
  //
  // Accepts either a local file path ('./data/my-map.geojson') or a full
  // URL ('https://username.github.io/my-leaflet-map/layers/layer.geojson').
  // GitHub Pages always serves GeoJSON with open CORS headers, so URLs from
  // any public GitHub Pages site work without extra configuration.
  //
  function loadGeoJsonLayer(leafletMap, mapCfg) {
    var url = mapCfg.geojson;
    if (!url || url.indexOf('REPLACE_ME') !== -1) return;

    var s           = mapCfg.style || {};
    var property    = s.property    || '';
    var colorScale  = Array.isArray(s.colorScale) && s.colorScale.length ? s.colorScale : ['#cccccc'];
    var breaks      = Array.isArray(s.breaks)     ? s.breaks              : [];
    var fillOpacity = (s.fillOpacity != null) ? Number(s.fillOpacity) : 0.7;
    var strokeColor = s.strokeColor || '#ffffff';
    var strokeWidth = (s.strokeWidth != null) ? Number(s.strokeWidth) : 1;

    // Return the colour from the scale that corresponds to a data value.
    // Breaks divide the scale: values <= breaks[0] → colorScale[0], etc.
    // Values above the last break get the last colour.
    function classifyColor(value) {
      if (value == null || value === '') return colorScale[0];
      var v = Number(value);
      for (var i = 0; i < breaks.length; i++) {
        if (v <= Number(breaks[i])) return colorScale[i];
      }
      return colorScale[colorScale.length - 1];
    }

    function featureStyle(feature) {
      var val = feature.properties ? feature.properties[property] : null;
      return {
        fillColor:   classifyColor(val),
        fillOpacity: fillOpacity,
        color:       strokeColor,
        weight:      strokeWidth
      };
    }

    // fetch() works for same-origin paths AND cross-origin GitHub Pages URLs.
    fetch(url)
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status + ' loading ' + url);
        return response.json();
      })
      .then(function (geojson) {
        var layer = L.geoJSON(geojson, {
          style: property ? featureStyle : { color: strokeColor, weight: strokeWidth, fillOpacity: fillOpacity }
        }).addTo(leafletMap);

        // If no center/zoom was given, zoom the map to fit the data
        var cfg = window.STORY_CONFIG || {};
        var maps = cfg.maps || {};
        if (!maps.center) {
          leafletMap.fitBounds(layer.getBounds());
        }
      })
      .catch(function (err) {
        console.warn('[swipe template] Could not load GeoJSON from "' + url + '":', err.message);
      });
  }

  // ─── Populate the description side panel ────────────────────────────────────
  function applyDescription(cfg) {
    var d     = cfg.description || {};
    var panel = document.getElementById('sidePanel');

    if (d.show === false) {
      if (panel) panel.style.display = 'none';
      return;
    }

    var titleEl   = document.getElementById('descriptionTitle');
    var contentEl = document.getElementById('descriptionContent');
    if (titleEl)   titleEl.textContent = d.title || '';
    if (contentEl) contentEl.innerHTML = d.html  || '';
  }

  // ─── Swipe mechanic ─────────────────────────────────────────────────────────
  function initSwipe(cfg) {
    var mapPanel    = document.getElementById('mapPanel');
    var swipeDiv    = document.getElementById('swipeDiv');
    var map2Container = document.getElementById('map2Container');
    var swipeHandle = document.getElementById('swipeHandle');
    var dragOverlay = document.getElementById('dragOverlay');
    var labelLeft   = document.getElementById('labelLeft');
    var labelRight  = document.getElementById('labelRight');

    if (!mapPanel || !swipeDiv || !swipeHandle) return;

    var initialPct  = (cfg.maps && cfg.maps.initialPosition != null) ? cfg.maps.initialPosition : 50;
    var currentPct  = initialPct;
    var isDragging  = false;

    // Update all swipe-related positions from a single percentage value
    function setSwipePosition(pct) {
      currentPct = Math.max(2, Math.min(98, pct));
      var panelWidth = mapPanel.offsetWidth;
      var x = panelWidth * currentPct / 100;

      swipeDiv.style.width   = x + 'px';
      swipeHandle.style.left = x + 'px';

      // Fade labels when the divider crowds them out
      if (labelLeft)  labelLeft.style.opacity  = currentPct > 12 ? '1' : '0';
      if (labelRight) labelRight.style.opacity = currentPct < 88 ? '1' : '0';
    }

    // Convert a mouse or touch event to a pixel offset inside mapPanel
    function panelXfromEvent(e) {
      var src  = e.touches ? e.touches[0] : e;
      var rect = mapPanel.getBoundingClientRect();
      return src.clientX - rect.left;
    }

    function startDrag(e) {
      isDragging = true;
      if (dragOverlay) dragOverlay.style.display = 'block';
      e.preventDefault();
    }

    function moveDrag(e) {
      if (!isDragging) return;
      e.preventDefault();
      setSwipePosition(panelXfromEvent(e) / mapPanel.offsetWidth * 100);
    }

    function endDrag() {
      isDragging = false;
      if (dragOverlay) dragOverlay.style.display = 'none';
    }

    swipeHandle.addEventListener('mousedown',  startDrag);
    document.addEventListener('mousemove',     moveDrag);
    document.addEventListener('mouseup',       endDrag);

    swipeHandle.addEventListener('touchstart', startDrag,  { passive: false });
    document.addEventListener('touchmove',     moveDrag,   { passive: false });
    document.addEventListener('touchend',      endDrag);

    // Re-calculate pixel positions and Leaflet tile grids after a window resize
    window.addEventListener('resize', function () {
      if (map2Container && mapPanel) {
        map2Container.style.width = mapPanel.offsetWidth + 'px';
      }
      setSwipePosition(currentPct);
      if (_map1) _map1.invalidateSize();
      if (_map2) _map2.invalidateSize();
    });

    // Set opening position
    setSwipePosition(initialPct);
  }

  // ─── Legend panel ─────────────────────────────────────────────────────────────
  function applyLegend(cfg) {
    var maps         = cfg.maps || {};
    var legend0Html  = (maps.map2 && maps.map2.legendHtml) || '';
    var legend1Html  = (maps.map1 && maps.map1.legendHtml) || '';
    var legend0Title = (maps.map2 && maps.map2.label) || '';
    var legend1Title = (maps.map1 && maps.map1.label) || '';

    var legend0El  = document.getElementById('legend0');
    var legend1El  = document.getElementById('legend1');
    var legendSec  = document.getElementById('legendSection');
    var legendTitle = document.getElementById('legendTitle');

    // If neither map provides legend HTML, hide the whole section
    if (!legend0Html && !legend1Html) {
      if (legendSec) legendSec.classList.add('hidden');
      return;
    }

    if (legend0El) {
      legend0El.innerHTML = (legend0Title ? '<div class="legend-map-title">' + legend0Title + '</div>' : '') + legend0Html;
    }
    if (legend1El) {
      legend1El.innerHTML = (legend1Title ? '<div class="legend-map-title">' + legend1Title + '</div>' : '') + legend1Html;
    }

    // If only one map has a legend, make it full-width
    if (legend0Html && !legend1Html && legend0El) legend0El.style.flex = '1 1 100%';
    if (legend1Html && !legend0Html && legend1El) legend1El.style.flex = '1 1 100%';

    var customTitle = cfg.legend && cfg.legend.title;
    if (customTitle && legendTitle) legendTitle.textContent = customTitle;
  }

  // ─── Side panel open/close toggle ───────────────────────────────────────────
  function initSidePanel() {
    var panel  = document.getElementById('sidePanel');
    var toggle = document.getElementById('sidePanelToggle');
    if (!panel || !toggle) return;

    var isOpen = true;

    function updateArrow() {
      toggle.innerHTML = isOpen ? '&#8249;' : '&#8250;'; // ‹ or ›
      toggle.title     = isOpen ? 'Collapse panel' : 'Expand panel';
    }

    toggle.addEventListener('click', function () {
      isOpen = !isOpen;
      panel.classList.toggle('collapsed', !isOpen);
      updateArrow();
    });

    updateArrow();
  }

  // ─── Boot ────────────────────────────────────────────────────────────────────
  function init() {
    var cfg = window.STORY_CONFIG || {};
    applyTheme(cfg);
    applyHeader(cfg);
    initMaps(cfg);
    applyDescription(cfg);
    applyLegend(cfg);
    initSwipe(cfg);
    initSidePanel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
