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
  //  │  1. pageTitle              — browser tab label        │
  //  │  2. header.title           — big headline on the page │
  //  │  3. header.subtitle        — smaller line below       │
  //  │  4. maps.center & zoom     — starting view (optional) │
  //  │  5. maps.map1.geojson      — GeoJSON URL, right map   │
  //  │  6. maps.map2.geojson      — GeoJSON URL, left map    │
  //  │  7. maps.map1/map2.style   — choropleth colour scales │
  //  │  8. description.html       — side panel text          │
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


  // ── STEP 4: Your two choropleth maps ─────────────────────────
  //
  // Both maps display your data on the same neutral grey basemap
  // (CartoDB Positron) so your colours stand out clearly.
  //
  // Both maps are LIVE and SYNCHRONIZED — panning or zooming one
  // map automatically moves the other in real time.
  //
  // ── How to get your GeoJSON from QGIS ──────────────────────────
  //   1. In QGIS, right-click your layer → Export → Save Features As…
  //   2. Format: GeoJSON. Save the file — e.g. "map1.geojson".
  //   3. Add that file to your GitHub Pages repo (e.g. in a "data/" folder).
  //   4. The public URL will look like:
  //        https://YOUR-USERNAME.github.io/YOUR-REPO/data/map1.geojson
  //      GitHub Pages always serves files with open CORS headers, so
  //      this template can fetch GeoJSON from any public GitHub Pages URL.
  //   5. Paste that URL into the "geojson" field for each map below.
  //
  // ── Choropleth colour settings (the "style" block) ─────────────
  //   - property:   the column name in your QGIS attribute table
  //   - colorScale: hex colours from lowest to highest value
  //   - breaks:     data thresholds that separate colour classes
  //                 (one fewer entry than colorScale:
  //                  4 breaks for 5 colours, 3 breaks for 4 colours, etc.)
  //
  // ── Local testing alternative ──────────────────────────────────
  //   Place your file in a "data/" folder next to index.html and use:
  //     geojson: './data/map1.geojson'
  //
  maps: {

    // Where the map starts when the page first loads.
    // Format: [latitude, longitude]  — find yours at latlong.net
    // Leave this out entirely to auto-fit the map to your GeoJSON data.
    center: [39.5, -98.35],   // centre of the contiguous United States
    zoom: 4,                   // 1 = world, 10 = city, 15 = street level

    // MAP 1 — shown on the RIGHT / BEHIND the divider
    map1: {
      // Short label shown in the bottom-right corner of the map:
      label: 'REPLACE_ME: Right Map Name',

      // ── GeoJSON choropleth layer ───────────────────────────────────
      // Local file:  './data/map1.geojson'
      // GitHub URL:  'https://username.github.io/repo/data/map1.geojson'
      geojson: '',

      // How to colour the GeoJSON features (choropleth styling).
      // Only needed if geojson is set.
      style: {
        // The column name from your QGIS attribute table:
        property: 'REPLACE_ME: your_column_name',

        // Colours from lowest to highest value. Use any hex codes.
        // The number of colours = number of classes.
        colorScale: ['#f7fbff', '#c6dbef', '#6baed6', '#2171b5', '#08306b'],

        // One threshold per colour boundary (one fewer than colorScale).
        // Example: 4 breaks for 5 colours means:
        //   <= breaks[0] → color[0], <= breaks[1] → color[1], ... else last color
        breaks: [20, 40, 60, 80],

        fillOpacity: 0.75,   // 0 = invisible, 1 = fully opaque
        strokeColor: '#ffffff',
        strokeWidth: 1,
      },

      // ── Legend for this map (shown in the right half of the legend panel) ──
      // Build this to match your colorScale and breaks above.
      // Example:
      //   legendHtml: '<ul style="list-style:none;padding:0;margin:0">'
      //     + '<li><span class="swatch" style="background:#08306b"></span> > 80%</li>'
      //     + '<li><span class="swatch" style="background:#2171b5"></span> 60–80%</li>'
      //     + '<li><span class="swatch" style="background:#6baed6"></span> 40–60%</li>'
      //     + '<li><span class="swatch" style="background:#c6dbef"></span> 20–40%</li>'
      //     + '<li><span class="swatch" style="background:#f7fbff"></span> < 20%</li>'
      //   + '</ul>',
      legendHtml: '',
    },

    // MAP 2 — shown on the LEFT / IN FRONT of the divider
    map2: {
      label: 'REPLACE_ME: Left Map Name',

      // ── GeoJSON choropleth layer ───────────────────────────────────
      // Local file:  './data/map2.geojson'
      // GitHub URL:  'https://username.github.io/repo/data/map2.geojson'
      geojson: '',

      style: {
        property: 'REPLACE_ME: your_column_name',
        colorScale: ['#fff5f0', '#fcbba1', '#fb6a4a', '#cb181d', '#67000d'],
        breaks: [20, 40, 60, 80],
        fillOpacity: 0.75,
        strokeColor: '#ffffff',
        strokeWidth: 1,
      },

      legendHtml: '',
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
