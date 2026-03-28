# Student Spatial Story Template (GitHub Pages)

This folder is a simplified storytelling template for students.

- No build tools
- No package installs
- Works as static files on GitHub Pages
- One config file to edit: `story.config.js`

## Folder Contents

- `index.html`: page structure
- `styles.css`: visual design and responsive layout
- `app.js`: renders sections and keeps map in sync while scrolling
- `story.config.js`: your story title, text, images, and maps

## Step 1: Add Your Story Content

Edit `story.config.js` and replace sample values:

- `title`, `subtitle`, `author`, `intro`
- `heroImage` and `credits`
- each item in `sections`

Each section supports:

- `title`: section heading
- `text`: your narrative paragraph
- `imageUrl`: full URL to an image (or a path to an image in this repo)
- `imageAlt`: accessible alt text for your image
- `mapEmbedUrl`: embeddable map URL shown in the map panel
- `mapSourceUrl`: URL opened by the "Open map in new tab" link

## Step 2: Test Locally

Open `index.html` in your browser.

If your browser blocks some embeds because of local file restrictions, run a simple local web server from this folder.

Example using Python:

```bash
python3 -m http.server 8080
```

Then open:

`http://localhost:8080/index.html`

## Step 3: Publish To GitHub Pages

1. Push your repository to GitHub
2. Open repository Settings > Pages
3. Under Build and deployment, select `Deploy from a branch`
4. Choose your branch (usually `main`) and folder (`/root`)
5. Save and wait for deployment
6. Open your new published Pages URL

## Map Embed Notes

- ArcGIS, Mapbox, and many other web maps provide iframe embed links
- Some providers block iframe embedding unless sharing/privacy settings allow it
- If an embed is blocked, students can still use a public map page URL in `mapSourceUrl`
