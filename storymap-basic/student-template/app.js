(function () {
  "use strict";

  var config = window.STORY_CONFIG || {};
  var header = config.header || {};
  var branding = config.branding || {};
  var map = config.map || {};

  var titleNode = document.getElementById("title");
  var subtitleNode = document.getElementById("subtitle");
  var logoLinkNode = document.getElementById("logoLink");
  var logoImgNode = document.getElementById("logoImg");

  var mapFrameNode = document.getElementById("mapFrame");
  var mapSourceLinkNode = document.getElementById("mapSourceLink");

  var legendContainerNode = document.getElementById("legendCon");
  var legendToggleNode = document.getElementById("legendToggle");
  var legendTitleNode = document.getElementById("legTogText");
  var legendContentNode = document.getElementById("legendDiv");
  var legendIconNode = document.getElementById("legToggleIcon");

  function setMetaTag(name, content) {
    var node = document.querySelector('meta[name="' + name + '"]');
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute("name", name);
      document.head.appendChild(node);
    }
    node.setAttribute("content", content || "");
  }

  function applyTheme() {
    var rootStyle = document.documentElement.style;

    rootStyle.setProperty("--bg-color", header.background || "#444444");
    rootStyle.setProperty("--fg-color", header.color || "#ffffff");
    rootStyle.setProperty("--subtitle-color", header.subtitleColor || "#cecece");
    rootStyle.setProperty("--header-height", (header.headerHeight || 115) + "px");
  }

  function populateHeader() {
    titleNode.textContent = header.title || "Untitled Story";
    subtitleNode.textContent = header.subtitle || "";

    if (header.showTitle === false) {
      titleNode.style.display = "none";
    }

    if (header.showSubtitle === false) {
      subtitleNode.style.display = "none";
    }

    if (branding.showLogo === false || !branding.logo) {
      logoLinkNode.style.display = "none";
    } else {
      logoImgNode.src = branding.logo;
      logoImgNode.alt = header.title || "Logo";
      logoLinkNode.href = branding.logoLink || "#";
    }
  }

  function applyMap() {
    mapFrameNode.src = map.embedUrl || "about:blank";

    if (map.sourceUrl) {
      mapSourceLinkNode.href = map.sourceUrl;
    } else {
      mapSourceLinkNode.style.display = "none";
    }
  }

  function applyLegend() {
    legendTitleNode.textContent = map.legendTitle || "About this map";
    legendContentNode.innerHTML = map.legendHtml || "";

    var isOpen = Boolean(map.legendOpen);

    function renderLegendState() {
      legendContentNode.style.display = isOpen ? "block" : "none";
      legendIconNode.textContent = isOpen ? "^" : "v";
    }

    legendToggleNode.addEventListener("click", function () {
      isOpen = !isOpen;
      renderLegendState();
    });

    renderLegendState();

    if (!map.legendTitle && !map.legendHtml) {
      legendContainerNode.style.display = "none";
    }
  }

  function init() {
    document.title = config.pageTitle || header.title || "Story Map";
    setMetaTag("description", config.metaDescription || "");

    applyTheme();
    populateHeader();
    applyMap();
    applyLegend();
  }

  init();
})();
