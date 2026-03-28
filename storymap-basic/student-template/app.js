(function () {
  "use strict";

  var config = window.STORY_CONFIG;

  if (!config || !Array.isArray(config.sections) || config.sections.length === 0) {
    throw new Error("STORY_CONFIG is missing or has no sections.");
  }

  var sectionContainer = document.getElementById("storySections");
  var storyTitle = document.getElementById("storyTitle");
  var storySubtitle = document.getElementById("storySubtitle");
  var storyKicker = document.getElementById("storyKicker");
  var storyAuthor = document.getElementById("storyAuthor");
  var storyIntro = document.getElementById("storyIntro");
  var storyCredits = document.getElementById("storyCredits");
  var heroImage = document.getElementById("heroImage");
  var activeSectionTitle = document.getElementById("activeSectionTitle");
  var mapFrame = document.getElementById("mapFrame");
  var mapSourceLink = document.getElementById("mapSourceLink");

  var sectionElements = [];
  var activeSectionId = null;

  storyTitle.textContent = config.title || "Untitled Story";
  storySubtitle.textContent = config.subtitle || "";
  storyKicker.textContent = config.kicker || "";
  storyAuthor.textContent = config.author || "";
  storyIntro.textContent = config.intro || "";
  storyCredits.textContent = config.credits || "";

  if (config.heroImage) {
    heroImage.src = config.heroImage;
    heroImage.alt = config.title || "Story hero image";
  } else {
    heroImage.style.display = "none";
  }

  function createSectionCard(section) {
    var card = document.createElement("article");
    card.className = "story-card";
    card.id = section.id;
    card.setAttribute("tabindex", "0");

    var title = document.createElement("h3");
    title.textContent = section.title || "Untitled Section";

    var text = document.createElement("p");
    text.textContent = section.text || "";

    card.appendChild(title);
    card.appendChild(text);

    if (section.imageUrl) {
      var image = document.createElement("img");
      image.className = "story-image";
      image.src = section.imageUrl;
      image.alt = section.imageAlt || section.title || "Section image";
      image.loading = "lazy";
      card.appendChild(image);
    }

    card.addEventListener("click", function () {
      setActiveSection(section.id, true);
    });

    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setActiveSection(section.id, true);
      }
    });

    return card;
  }

  function setActiveSection(sectionId, shouldScrollIntoView) {
    if (activeSectionId === sectionId) {
      return;
    }

    var target = null;
    for (var i = 0; i < config.sections.length; i += 1) {
      if (config.sections[i].id === sectionId) {
        target = config.sections[i];
        break;
      }
    }

    if (!target) {
      return;
    }

    activeSectionId = sectionId;
    activeSectionTitle.textContent = target.title || "";
    mapFrame.src = target.mapEmbedUrl || "about:blank";
    mapSourceLink.href = target.mapSourceUrl || target.mapEmbedUrl || "#";

    sectionElements.forEach(function (el) {
      el.classList.toggle("is-active", el.id === sectionId);
    });

    if (shouldScrollIntoView) {
      var node = document.getElementById(sectionId);
      if (node) {
        node.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  config.sections.forEach(function (section, index) {
    if (!section.id) {
      section.id = "section-" + (index + 1);
    }

    var card = createSectionCard(section);
    sectionContainer.appendChild(card);
    sectionElements.push(card);
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id, false);
      }
    });
  }, {
    threshold: 0.55
  });

  sectionElements.forEach(function (el) {
    observer.observe(el);
  });

  setActiveSection(config.sections[0].id, false);
})();