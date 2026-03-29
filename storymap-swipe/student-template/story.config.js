// ============================================================
//  Story Map Swipe — Configuration File
//
//  INSTRUCTIONS: This is the only file you need to edit.
//  Fill in your own text and map URLs below.
//
//
//  ┌───────────────────────────────────────────────────────┐
//  │  EDIT THESE FIRST — most important settings           │
//  │                                                       │
//  │  1. pageTitle          — browser tab label            │
//  │  2. header.title       — big headline on the page     │
//  │  3. header.subtitle    — smaller line below           │
//  │  4. maps.map1.embedUrl — URL for the RIGHT/BACK map   │
//  │  5. maps.map2.embedUrl — URL for the LEFT/FRONT map   │
//  │  6. description.html   — side panel text              │
//  └───────────────────────────────────────────────────────┘
// ============================================================

window.STORY_CONFIG = {

  // ── STEP 1: Browser tab label ──────────────────────────────
  // This appears in the browser tab and bookmark title.
  pageTitle: 'Your Story Map Title',


  // ── STEP 2: Header bar text ────────────────────────────────
  header: {
    // The large headline shown at the top of the page:
    title: 'Your Map Comparison Title',

    // A short description shown below the headline:
    subtitle: 'Describe what you are comparing and why',

    // Colors — you can leave these as-is or customize them.
    // Use a color name like "navy" or a hex code like "#003366".
    bgColor:       '#444444',   // header background
    fgColor:       '#ffffff',   // title text color
    subtitleColor: '#C5D5D5',   // subtitle text color
  },


  // ── STEP 3: Logo ───────────────────────────────────────────
  branding: {
    showLogo: true,

    // Your logo file goes in the "images" folder.
    // A grey placeholder (images/logo.svg) is already there.
    // Swap it out with your own image and keep the filename,
    // OR rename both the file AND this path to match.
    logo: './images/logo.svg',

    // Where should the logo link when clicked?
    // Replace with your school or organization URL.
    // To leave it unlinked, delete the URL but keep the quotes: ''
    logoLink: 'https://yourschool.edu',
  },


  // ── STEP 4: Your two maps ──────────────────────────────────
  //
  // This template shows two maps with a draggable divider.
  // Drag the divider left or right to reveal more of each map.
  //
  // HOW TO GET AN EMBED URL:
  //
  //   OpenStreetMap:
  //     1. Go to openstreetmap.org and navigate to your area.
  //     2. Click the Share icon (arrow pointing right) on the right side.
  //     3. Check "Include map data" if you want, then select the HTML tab.
  //     4. Copy the URL inside src="..." from the <iframe> code shown.
  //
  //   ArcGIS Online:
  //     1. Open your web map in ArcGIS Online.
  //     2. Click Share → Embed in Website.
  //     3. Copy the src="..." URL from the <iframe> code shown.
  //
  //   Google Maps:
  //     1. Search for your location.
  //     2. Click Share → Embed a map.
  //     3. Copy the src="..." URL from the <iframe> code shown.
  //
  //   Felt.com:
  //     1. Open your map.
  //     2. Click Share → Embed → copy the src URL.
  //
  maps: {

    // MAP 1 — shown on the RIGHT / BEHIND the divider
    map1: {
      // Paste your embed URL here (replace the openstreetmap.org URL):
      embedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=-80.1,24.8,-64.9,35.2&layer=mapnik',

      // Short label shown in the bottom-right corner of the map:
      label: 'Right Map Name',

      // ── Legend for this map (shown in the right half of the legend panel) ──
      // Delete or leave blank if this map doesn't need a legend.
      //
      // You can use basic HTML. To add a colour swatch, use:
      //   <span class="swatch" style="background: #e63946"></span> Label
      //
      // Example — a simple choropleth legend:
      //
      //   legendHtml: '<ul style="list-style:none;padding:0;margin:0">'
      //     + '<li><span class="swatch" style="background:#d73027"></span> > 50%</li>'
      //     + '<li><span class="swatch" style="background:#fc8d59"></span> 40–50%</li>'
      //     + '<li><span class="swatch" style="background:#fee090"></span> 30–40%</li>'
      //     + '<li><span class="swatch" style="background:#e0f3f8"></span> 20–30%</li>'
      //     + '<li><span class="swatch" style="background:#4575b4"></span> < 20%</li>'
      //   + '</ul>',
      //
      legendHtml: '',   // ← paste your legend HTML here, or leave empty
    },

    // MAP 2 — shown on the LEFT / IN FRONT of the divider
    map2: {
      // Paste your embed URL here (replace the openstreetmap.org URL):
      embedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=-80.1,24.8,-64.9,35.2&layer=hot',

      // Short label shown in the bottom-left corner of the map:
      label: 'Left Map Name',

      // ── Legend for this map (shown in the left half of the legend panel) ──
      legendHtml: '',   // ← paste your legend HTML here, or leave empty
    },

    // Where the divider line starts when the page first loads.
    // 0 = all the way left (only map 1 visible)
    // 50 = centered (default — shows equal halves of each map)
    // 100 = all the way right (only map 2 visible)
    initialPosition: 50,
  },


  // ── STEP 5: Legend (optional) ────────────────────────────────
  // The bottom of the side panel can show a colour legend for each map.
  // Add your legend HTML inside map1.legendHtml and map2.legendHtml above.
  // To customize the legend section title, change the text below:
  legend: {
    title: 'Legend',
  },


  // ── STEP 6: Side panel text ───────────────────────────────────
  // This panel slides open on the left side of the screen.
  // Use it to explain what the two maps show and why it matters.
  description: {
    show: true,   // set to false to hide the panel entirely

    // Panel heading:
    title: 'About this comparison',

    // Panel body — you can use basic HTML tags:
    //   <p> paragraph     <b> bold      <i> italic
    //   <ul><li> list     <a href="..."> link
    html: '<p>Add a description of what the two maps show and why the comparison matters. What should viewers look for as they drag the divider?</p>',
  },

};
