# Made-O

Website for **Made Original** — consulting for export-oriented pump, machinery and engineering manufacturers. Live at [made-o.com](https://made-o.com) via GitHub Pages.

## Structure

```
index.html              Home page (content, SEO meta, JSON-LD)
404.html                Not-found page (served by GitHub Pages)
assets/css/styles.css   All styles (light/dark tokens, responsive breakpoints)
assets/js/main.js       Mobile menu and contact form
assets/img/og-image.png Social preview image (1200×630)
assets/img/logo.png     Hexagon mark, 512×512 transparent (structured-data logo)
favicon.svg             Favicon (Steel Red hexagon mark)
apple-touch-icon.png    iOS home-screen icon (180×180)
robots.txt, sitemap.xml Search engine crawling
CNAME                   Custom domain
```

No build step — edit the files and push to `main`.

When the page content changes, update `<lastmod>` in `sitemap.xml`.

## Brand

Colours are defined as tokens at the top of `styles.css`:
Forge `#0C1015` · Steel Red `#C0392B` · Warm White `#F0ECE4` · Iron `#5A6270`.
Typeface: Space Grotesk (headings, wordmark), IBM Plex Sans (body).
