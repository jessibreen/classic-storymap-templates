## Attribution

This template is adapted from [storymap-basic](https://github.com/Esri/storymap-basic), a classic Esri Story Maps layout originally developed by Esri and released under the Apache 2.0 license. The original project is no longer actively maintained.

---

# Story Map Basic Replica (GitHub Pages)

This folder replicates the classic Story Map Basic page structure as static files:

- Header bar at the top (title, subtitle, optional logo)
- Full-screen map beneath the header
- Collapsible info panel over the map at bottom-left

No build tools are required.

## Folder Contents

- `index.html`: page structure (you usually do not need to edit this)
- `styles.css`: colors and layout style (optional to edit)
- `app.js`: behavior for the map and info panel (you usually do not need to edit this)
- `story.config.js`: the main file users should edit

## Quick Start

Most users only need to edit `story.config.js`.

1. Open `story.config.js`.
2. Replace these values with your own text:
	- `pageTitle`
	- `header.title`
	- `header.subtitle`
3. Replace the placeholder logo:
	- Swap out `images/logo.svg` with your own logo file.
4. In `story.config.js`, keep `branding.logo` as `"./images/logo.svg"` (or update both the filename on disk and this path to match if you rename it).
5. Add your map links:
	- `map.embedUrl`
	- `map.sourceUrl`
6. Save the file.
7. Refresh the browser tab.

If you get stuck, edit these first:

- `pageTitle`
- `header.title`
- `header.subtitle`
- `map.embedUrl`
- `map.sourceUrl`
- `map.legendTitle`
- `map.legendHtml`

## Optional Customization

You can also edit these if needed:

- `pageTitle`, `metaDescription`
- `header.title`, `header.subtitle`, `header.headerHeight`
- `header.background`, `header.color`, `header.subtitleColor`
- `branding.showLogo`, `branding.logo`, `branding.logoLink`
- `map.embedUrl`, `map.sourceUrl`
- `map.legendTitle`, `map.legendHtml`, `map.legendOpen`

## Step 2: Test Locally

Open `index.html` directly, or run a local server:

```bash
python3 -m http.server 8080
```

Then visit:

`http://localhost:8080/index.html`

If you do not see your updates, refresh the browser tab.

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
