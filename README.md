# Made-O

Website for **Made Original** — consulting for export-oriented pump, machinery and engineering manufacturers. Live at [made-o.com](https://made-o.com) via GitHub Pages.

## Editing content (Pages CMS)

1. Go to [app.pagescms.org](https://app.pagescms.org) and sign in with GitHub.
2. Open **Made-Original/Made-O** and pick the branch the site is published from (`main`).
3. Edit a section from the sidebar — each part of the home page, the Insights blog, and **Site settings & SEO**.
4. Click **Save**. Each save is a commit; GitHub Pages rebuilds the site in about a minute.

Images uploaded in the CMS are stored in `assets/uploads/`. Every image field is optional — leave it empty and the built-in illustration or icon is shown instead.

**Insights:** a new note starts with *Coming soon* off. While *Coming soon* is on, the card shows "Publishing soon", the article page is hidden from search engines, and it's left out of the sitemap.

## Structure

The site is built by Jekyll, which GitHub Pages runs automatically — there is nothing to build locally.

```
_data/settings.yml      Site name, contact email, SEO, menu, footer text
_data/home/*.yml        One file per home-page section (hero, services, products…)
_insights/*.md          Insights blog notes (published at /insights/<file-name>/)
_layouts/               Page templates (default, insight)
_includes/              Head/SEO, header, footer, structured data, icons, hero illustration
index.html              Home page template
404.html                Not-found page
sitemap.xml             Generated sitemap (home + published notes)
assets/css/styles.css   All styles (brand tokens, light/dark, responsive)
assets/js/main.js       Mobile menu and contact form
assets/img/             Social preview image and logo
assets/uploads/         Images uploaded through the CMS
.pages.yml              Pages CMS configuration (editing forms)
favicon.svg, apple-touch-icon.png, robots.txt, CNAME
```

GitHub Pages must be set to **Deploy from a branch** (Settings → Pages) so that it runs Jekyll.

## Brand

Colours are defined as tokens at the top of `styles.css`:
Forge `#0C1015` · Steel Red `#C0392B` · Warm White `#F0ECE4` · Iron `#5A6270`.
Typeface: Space Grotesk (headings, wordmark), IBM Plex Sans (body).
