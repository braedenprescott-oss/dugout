# The Rebels Dugout

A season tracker and lineup builder for The Rebels baseball team. Mobile-first PWA — installs to your home screen, works offline at the field.

![icon](icon.png)

## Features

- **Roster management** — add players one at a time or bulk-paste a list
- **Per-round lineup** — dynamic batting order (9+ slots, with Extra Hitters), field positions on an interactive diamond, substitution tracking
- **Auto-suggest** — builds a role-based batting order (leadoff, cleanup, etc.) and field positions from historical + season stats
- **Stats tracking** — batting and pitching per-round; season-long Batting / Pitching / Fielding tables with sortable columns
- **Fixtures panel** — upcoming round highlighted, results on past rounds, tap to jump in
- **Facebook post generator** — auto-builds a scoreboard-style post for each round
- **Printable lineup card** — formatted for printing or screenshot
- **Save / load** — IndexedDB autosave, JSON export/import, and an **Email** button that attaches the season file via the native share sheet (or falls back to mailto+download on desktop)
- **Light / dark theme** — toggle in the top toolbar, remembered across sessions
- **Offline-ready** — service worker caches the app shell

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `rebels-dugout`) and push these files to the `main` branch:
   - `index.html`
   - `sw.js`
   - `manifest.json`
   - `icon.png`
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
- **Icon** — replace `icon.png` (512×512 PNG, same filename) with your own. The manifest references it.
- **Theme colors** — tweak the CSS variables in the `:root` and `body.light` blocks at the top of `<style>` in `index.html`.

## Updating

When you push a new `index.html` (or anything else in the app shell), **bump `CACHE_VERSION`** in `sw.js` so existing installs pick up the new version. The old cache is cleared on the next load.

## Data

- Stored locally via **IndexedDB** (autosave) and **localStorage** (theme preference). Nothing is sent anywhere.
- **Export** button downloads a JSON snapshot. **Import** restores one.
- **Email** button shares the same JSON via the native share sheet (mobile) or downloads + opens your mail client (desktop) — useful for moving data between devices.

## Tech

Single-file HTML app. Vanilla JS, no build step, no dependencies. Google Fonts (Big Shoulders Display, Fraunces, JetBrains Mono) loaded from CDN. Service worker for offline. ~3300 lines of hand-written HTML + CSS + JS.

## License

Personal project by Braeden Prescott. Reuse and adapt freely — attribution appreciated.
