window.STORY_CONFIG = {
  // ==========================================================
  // STUDENT DIRECTIONS
  // Edit only the text inside quotes "..." unless your instructor says otherwise.
  // Keep commas and punctuation exactly as they are.
  //
  // EDIT THESE FIRST (search for REPLACE_ME):
  // 1) pageTitle
  // 2) header.title
  // 3) header.subtitle
  // 4) branding.logo and branding.logoLink (optional)
  // 5) map.embedUrl and map.sourceUrl
  // 6) map.legendTitle and map.legendHtml
  // ==========================================================

  // STEP 1: Browser tab title.
  // Example: "Chicago River Story Map"
  pageTitle: "REPLACE_ME: Your Story Map Title",

  // STEP 2 (optional): Short description for search engines.
  // Example: "A student map about housing and transit access in Chicago."
  metaDescription: "REPLACE_ME (optional): One sentence about your project.",

  // STEP 3: Header text and appearance.
  header: {
    // Main title shown at the top of the page.
    title: "REPLACE_ME: Main Title",

    // Subtitle shown below the main title.
    subtitle: "REPLACE_ME: Subtitle",

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

    // Put your logo image URL here.
    // You can use a full URL or local file path like "./images/my-logo.png".
    logo: "REPLACE_ME (optional): https://example.com/your-logo.png",

    // When users click your logo, this link opens.
    // Example: "https://your-school.edu"
    logoLink: "REPLACE_ME (optional): https://your-site.example"
  },

  // STEP 5: Map and info panel settings.
  map: {
    // REQUIRED: embeddable map URL for the main map window.
    embedUrl: "REPLACE_ME: Paste your embeddable map URL here",

    // REQUIRED: full map link for the "Open full map" button.
    sourceUrl: "REPLACE_ME: Paste your full map URL here",

    // true = info panel starts open, false = starts closed
    legendOpen: false,

    // Title text inside the info panel.
    legendTitle: "REPLACE_ME: About this map",

    // Main text inside the info panel.
    // You can use plain text or simple HTML tags like <strong> and <br>.
    legendHtml: "REPLACE_ME: Add a short explanation of your map, your data source, and what users should notice."
  }
};
