# ATO Palm Springs 2026 Landing Page

A beautiful, mobile-first landing page for the ATO UCSB Palm Springs trip.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add the Nectarine font:**
   - Download `nectarine.woff2` from your Vercel deployment
   - Create a `public/fonts/` directory
   - Place `nectarine.woff2` in `public/fonts/`

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Opens at `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```
   Outputs to `dist/` directory

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Vercel will auto-detect Vite and deploy

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`

### GitHub Pages
1. Run `npm run build`
2. Push `dist/` contents to `gh-pages` branch
3. Enable GitHub Pages in repo settings

## Font Setup

**Important:** The Nectarine font must be added locally:

1. Create directory: `mkdir -p public/fonts`
2. Download `nectarine.woff2` and place it in `public/fonts/`
3. The font will be served from `/fonts/nectarine.woff2`

## Fixing Font Loading Issues

If the font doesn't load, check:

1. **Font file exists:** Ensure `public/fonts/nectarine.woff2` exists
2. **Path is correct:** Font URL should be `/fonts/nectarine.woff2` (absolute path)
3. **CORS:** If hosting font separately, ensure CORS headers allow cross-origin access

## Project Structure

```
atopalmsprings2026/
├── public/
│   └── fonts/
│       └── nectarine.woff2  (add this file)
├── index.html
├── styles.css
├── script.js
├── *.png (images)
├── package.json
├── vite.config.js
└── README.md
```
