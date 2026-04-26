# The Rebels Dugout

A season tracker and lineup builder for The Rebels baseball team. Mobile-first PWA — installs to your home screen, works offline at the field.

![icon](icon.png)

## Features

- **Roster management** — add players one at a time or bulk-paste a list. Upload a photo for each player (tap the avatar circle).
- **Per-round lineup** — dynamic batting order (9+ slots, with Extra Hitters), field positions on an interactive diamond, substitution tracking. Filling out the lineup auto-populates the batting stats table.
- **Auto-suggest** — builds a role-based batting order (leadoff, cleanup, etc.) and field positions from historical + season stats.
- **Stats tracking** — explicit 1B-2B-3B-HR breakdown for batting (no derived singles guesswork). Pitching includes ERA, WHIP, K/9, pitch counts, strike%, and pitches/BF.
- **Sortable Stats tab** — Batting / Pitching / Fielding sub-tabs with full season totals; tap any column to sort.
- **Fixtures panel** — upcoming round highlighted, results on past rounds, tap to jump in.
- **Player of the Round** — nominate per round with photo, pitcher/batter toggle, and a 1-2 sentence summary that appears on the hero card.
- **Facebook post generator** — auto-builds a stat-driven post for each round.
- **Stats image export** — generates a sharp scorecard PNG with team logo, score, batting + pitching tables, and the Player of the Round hero card. Native share sheet on mobile, download on desktop.
- **Printable lineup card** — formatted for printing or screenshot.
- **Save / load** — IndexedDB autosave, JSON export/import, and an **Email** button that attaches the season file via the native share sheet (or falls back to mailto+download on desktop).
- **Light / dark theme** — toggle in the top toolbar, remembered across sessions.
- **Offline-ready** — service worker caches the app shell.

## Files in this repo

| File | Purpose |
|---|---|
| `index.html` | The app — single-file HTML/CSS/JS, no build step |
| `sw.js` | Service worker (offline support, app-shell caching) |
| `manifest.json` | PWA manifest — name, icons, theme colors |
| `icon.png` | 512×512 app icon (used for home-screen install) |
| `icon-192.png` | 192×192 app icon |
| `README.md` | This file |
| `.gitignore` | Standard ignores (saved as `.gitignore` — note the leading dot) |

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `rebels-dugout`) and push these files to the `main` branch:
   - `index.html`
   - `sw.js`
   - `manifest.json`
   - `icon.png`
   - `icon-192.png`
2. Go to **Settings → Pages → Build and deployment**.
3. Under **Source**, pick **Deploy from a branch**.
4. Select branch `main`, folder `/ (root)`, and save.
5. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

The service worker only registers on `http://` or `https://`, so it won't activate when opening `index.html` directly from the filesystem — that's expected.

## Install on a phone

- **iOS Safari**: open the site, tap Share → Add to Home Screen.
- **Android Chrome**: open the site, tap the menu → Install app (or Add to Home Screen).

After installing, the app runs standalone, works offline, and stores data locally.

## Customization

- **Team name / season** — edit inline in the header. Auto-saves.
- **App title / brand** — change the `<title>`, `.brand h1` text, and `manifest.json` `"name"` / `"short_name"` to rename.
- **Icon** — replace `icon.png` and `icon-192.png` with your own. The manifest references them.
- **Theme colors** — tweak the CSS variables in the `:root` and `body.light` blocks at the top of `<style>` in `index.html`.

## Updating

When you push a new `index.html` (or anything else in the app shell), **bump `CACHE_VERSION`** in `sw.js` so existing installs pick up the new version. The old cache is cleared on the next load.

The current version is `rebels-dugout-v7`.

## Data

- Stored locally via **IndexedDB** (autosave + player photos) and **localStorage** (theme preference). Nothing is sent anywhere.
- **Export** button downloads a JSON snapshot. **Import** restores one. (Photos are stored separately and don't travel with JSON exports — they live on each device.)
- **Email** button shares the same JSON via the native share sheet (mobile) or downloads + opens your mail client (desktop) — useful for moving roster/stats data between devices.

## Tech

Single-file HTML app. Vanilla JS, no build step, no dependencies. Google Fonts (Big Shoulders Display, Fraunces, JetBrains Mono) loaded from CDN. Service worker for offline. ~4000 lines of hand-written HTML + CSS + JS.

## License

Personal project. Reuse and adapt freely — attribution appreciated.
