(function () {
  "use strict";

  var FALLBACK_EMBED_URL = "https://www.openstreetmap.org/export/embed.html?bbox=-74.03%2C40.70%2C-73.93%2C40.78&layer=mapnik";
  var FALLBACK_SOURCE_URL = "https://www.openstreetmap.org/";

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
      logoImgNode.onerror = function () {
        logoLinkNode.style.display = "none";
      };
      logoImgNode.src = branding.logo;
      logoImgNode.alt = header.title || "Logo";
      logoLinkNode.href = branding.logoLink || "#";
    }
  }

  function applyMap() {
    var embedUrl = typeof map.embedUrl === "string" ? map.embedUrl.trim() : "";
    var sourceUrl = typeof map.sourceUrl === "string" ? map.sourceUrl.trim() : "";

    var hasValidEmbed = /^https?:\/\//i.test(embedUrl) && embedUrl.indexOf("REPLACE_ME") === -1;
    var hasValidSource = /^https?:\/\//i.test(sourceUrl) && sourceUrl.indexOf("REPLACE_ME") === -1;

    mapFrameNode.src = hasValidEmbed ? embedUrl : FALLBACK_EMBED_URL;
    mapSourceLinkNode.href = hasValidSource ? sourceUrl : FALLBACK_SOURCE_URL;
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
