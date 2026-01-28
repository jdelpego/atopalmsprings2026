# Font Loading Fix - Vercel Repo Suggestions

## Problem
The font URL `https://nectarinefont-ihwpim46d-joaquin-del-pegos-projects.vercel.app/public/fonts/nectarine.woff2` returns **HTTP 401 Unauthorized**, preventing browsers from loading the font.

## Solutions for the Font Repo

### Option 1: Make Deployment Public (Recommended)
1. Go to Vercel Dashboard → Your Project → Settings → General
2. Under "Deployment Protection", disable password protection/SSO
3. Make the deployment public so anyone can access `/public/fonts/nectarine.woff2`

### Option 2: Add CORS Headers
Add a `vercel.json` file to your font repo:

```json
{
  "headers": [
    {
      "source": "/public/fonts/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Option 3: Use Vercel's Public Directory
Ensure fonts are in the `public` directory and accessible without authentication:
- Move `nectarine.woff2` to `public/fonts/nectarine.woff2`
- Ensure Vercel serves the `public` directory publicly

### Option 4: Host Font Locally (Current Solution)
The landing page now loads the font from `/fonts/nectarine.woff2` locally. You need to:
1. Download `nectarine.woff2` from your Vercel deployment
2. Create `public/fonts/` directory in this project
3. Place the font file there

## Testing Font Access

Test if font is accessible:
```bash
curl -I https://nectarinefont-ihwpim46d-joaquin-del-pegos-projects.vercel.app/public/fonts/nectarine.woff2
```

Should return `200 OK`, not `401 Unauthorized`.
