## Attribution

This template is adapted from [storymap-basic](https://github.com/Esri/storymap-basic), a classic Esri Story Maps layout originally developed by Esri and released under the Apache 2.0 license. The original project is no longer actively maintained.

---

# Student Story Map Basic Replica (GitHub Pages)

This folder replicates the classic Story Map Basic page structure as static files:

- Header bar at the top (title, subtitle, optional logo, share icons)
- Full-screen map beneath the header
- Collapsible info panel over the map at bottom-left

No build tools are required.

## Folder Contents

- `index.html`: Story Map Basic style structure (header + map + info panel)
- `styles.css`: Story Map Basic style layout and visual rules
- `app.js`: connects config to DOM, share links, and info panel toggle
- `story.config.js`: all editable content and styling options

## Step 1: Edit `story.config.js`

Update these sections:

- `pageTitle`, `metaDescription`
- `header.title`, `header.subtitle`, `header.headerHeight`
- `header.background`, `header.color`, `header.subtitleColor`
- `branding.showLogo`, `branding.logo`, `branding.logoLink`
- `social.showSocialIcons`, `social.hashtags`
- `map.embedUrl`, `map.sourceUrl`
- `map.legendTitle`, `map.legendHtml`, `map.legendOpen`

## Step 2: Test Locally

Open `index.html` directly, or run a local server:

```bash
python3 -m http.server 8080
```

Then visit:

`http://localhost:8080/index.html`

## Step 3: Publish To GitHub Pages

1. Push your repository to GitHub.
2. Open repository Settings > Pages.
3. Under Build and deployment, choose `Deploy from a branch`.
4. Select your branch (usually `main`) and folder (`/root`).
5. Save and wait for deployment.

## Map Embed Notes

- Use an embeddable map URL for `map.embedUrl`.
- Some map providers block iframe embedding unless sharing settings are public.
- `map.sourceUrl` is shown as the "Open full map" link.
