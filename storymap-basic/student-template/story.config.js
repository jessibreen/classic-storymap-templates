window.STORY_CONFIG = {
  // ==========================================================
  // STUDENT DIRECTIONS
  // Edit only the text inside quotes "..." unless your instructor says otherwise.
  // Keep commas and punctuation exactly as they are.
  //
  // EDIT THESE FIRST:
  // 1) pageTitle
  // 2) header.title
  // 3) header.subtitle
  // 4) branding.logo and branding.logoLink (optional)
  // 5) map.embedUrl and map.sourceUrl
  // 6) map.legendTitle and map.legendHtml
  // ==========================================================

  // STEP 1: Browser tab title.
  // Example: "Chicago River Story Map"
  pageTitle: "Your Story Map Title",

  // STEP 2 (optional): Short description for search engines.
  // Example: "A student map about housing and transit access in Chicago."
  metaDescription: "One sentence about your project.",

  // STEP 3: Header text and appearance.
  header: {
    // Main title shown at the top of the page.
    title: "Main Title",

    // Subtitle shown below the main title.
    subtitle: "Subtitle",

    // Header height in pixels. 115 is a good default.
    headerHeight: 115,

    // Keep these true unless you want to hide title/subtitle.
    showTitle: true,
    showSubtitle: true,

    // Header colors.
    // If you do not know color codes, leave these as-is.
    background: "#444444",
    color: "#ffffff",
    subtitleColor: "#cecece"
  },

  // STEP 4: Logo in the top-right corner (optional).
  branding: {
    // true = show logo, false = hide logo
    showLogo: true,

    // Put your logo file path here (inside this repo).
    // STEP: Add a file at student-template/images/logo.png
    // You can rename the file, but then update this path to match.
    logo: "./images/logo.png",

    // When users click your logo, this link opens.
    // Example: "https://your-school.edu"
    logoLink: "https://your-site.example"
  },

  // STEP 5: Map and info panel settings.
  map: {
    // REQUIRED: embeddable map URL for the main map window.
    // This starter URL is functional. Replace it with your own map when ready.
    embedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=-74.03%2C40.70%2C-73.93%2C40.78&layer=mapnik",

    // REQUIRED: full map link for the "Open full map" button.
    // This starter URL is functional. Replace it with your own map page URL.
    sourceUrl: "https://www.openstreetmap.org/",

    // true = info panel starts open, false = starts closed
    legendOpen: false,

    // Title text inside the info panel.
    legendTitle: "About this map",

    // Main text inside the info panel.
    // You can use plain text or simple HTML tags like <strong> and <br>.
    legendHtml: "Add a short explanation of your map, your data source, and what users should notice."
  }
};
