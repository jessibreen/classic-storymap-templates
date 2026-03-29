(function () {
  'use strict';

  // ─── Fallback embed URLs used when a student hasn't replaced the placeholders ───
  var FALLBACK_EMBED_1 = 'https://www.openstreetmap.org/export/embed.html?bbox=-80.1,24.8,-64.9,35.2&layer=mapnik';
  var FALLBACK_EMBED_2 = 'https://www.openstreetmap.org/export/embed.html?bbox=-80.1,24.8,-64.9,35.2&layer=hot';

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

  // ─── Load both map iframes ───────────────────────────────────────────────────
  function applyMaps(cfg) {
    var maps = cfg.maps || {};
    var m1   = maps.map1 || {};
    var m2   = maps.map2 || {};

    var embed1 = isValidUrl(m1.embedUrl) ? m1.embedUrl : FALLBACK_EMBED_1;
    var embed2 = isValidUrl(m2.embedUrl) ? m2.embedUrl : FALLBACK_EMBED_2;

    var frame1 = document.getElementById('map1Frame');
    var frame2 = document.getElementById('map2Frame');
    if (frame1) frame1.src = embed1;
    if (frame2) frame2.src = embed2;

    // Corner labels
    var labelLeft  = document.getElementById('labelLeft');
    var labelRight = document.getElementById('labelRight');
    if (labelLeft)  { labelLeft.textContent  = m2.label || ''; if (!m2.label) labelLeft.style.display  = 'none'; }
    if (labelRight) { labelRight.textContent = m1.label || ''; if (!m1.label) labelRight.style.display = 'none'; }
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
    var mapPanel   = document.getElementById('mapPanel');
    var swipeDiv   = document.getElementById('swipeDiv');
    var map2Frame  = document.getElementById('map2Frame');
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

      swipeDiv.style.width     = x + 'px';
      swipeHandle.style.left   = x + 'px';
      if (map2Frame) map2Frame.style.width = panelWidth + 'px';

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

    // Re-calculate pixel positions after a window resize (percentage stays the same)
    window.addEventListener('resize', function () {
      setSwipePosition(currentPct);
    });

    // Set opening position
    setSwipePosition(initialPct);
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
    applyMaps(cfg);
    applyDescription(cfg);
    initSwipe(cfg);
    initSidePanel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());
