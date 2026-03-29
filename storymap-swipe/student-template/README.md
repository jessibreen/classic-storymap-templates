# Story Map Swipe — Student Template

A self-contained web page that replicates the look of the Esri Story Map Swipe layout. Visitors drag a handle left and right to compare two maps side by side.

No coding background required. You only need to edit **one file**.

---

## Quick Start

### Step 1 — Open the config file

Open `story.config.js` in a text editor (Notepad, TextEdit, VS Code, etc.).

### Step 2 — Find everything you need to change

Use **Cmd+F** (Mac) or **Ctrl+F** (Windows) and search for `REPLACE_ME`.  
Each result is a field that needs your text or URL.

### Step 3 — Fill in your title and description

Replace the `REPLACE_ME` text in:
- `pageTitle`
- `header.title`
- `header.subtitle`
- `description.html` (explain what the two maps show)

### Step 4 — Add your two maps

This template compares two maps with a draggable divider — one behind/right, one in front/left.

**How to get an embed URL:**

- **OpenStreetMap:** Go to [openstreetmap.org](https://www.openstreetmap.org), navigate to your area, click the **Share** icon on the right, select the **HTML** tab, and copy the URL from inside `src="..."` in the iframe code.
- **ArcGIS Online:** Open your web map → **Share** → **Embed in Website** → copy the `src` URL.
- **Google Maps:** Search your area → **Share** → **Embed a map** → copy the `src` URL.
- **Felt.com:** Open your map → **Share** → **Embed** → copy the `src` URL.

Paste your URLs into `maps.map1.embedUrl` (right/behind map) and `maps.map2.embedUrl` (left/front map).

### Step 5 — Replace the logo

Swap out `images/logo.svg` with your own image file (PNG, JPG, or SVG).

- If you keep the filename `logo.svg`, you're done — the config already points to it.
- If you rename the file, also update `branding.logo` in `story.config.js` to match.

### Step 6 — Preview your map

Open a terminal in this folder and run:

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in a browser.

> **Why not just open index.html directly?**  
> Browsers block embedded iframes when you open files straight from disk. The local server fixes this.

---

## Publishing to GitHub Pages

1. Commit all files and push to GitHub.
2. In your repository → **Settings** → **Pages**.
3. Under **Branch**, select your branch and set the folder to `/student-template` (or wherever this folder lives in the repo).
4. Click **Save**. Your site will be live at the URL shown within a minute or two.

---

## What each file does

| File | Purpose |
|---|---|
| `story.config.js` | **The file you edit.** All your content and settings live here. |
| `index.html` | The page structure — you don't need to edit this. |
| `styles.css` | Visual styling — you don't need to edit this. |
| `app.js` | Wires your config to the page — you don't need to edit this. |
| `images/logo.svg` | Placeholder logo — replace with your own image. |
