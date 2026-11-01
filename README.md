# Apex TV

Free TV, MilkDrop visuals and party tools for a TV or phone browser. Plain HTML, CSS and JavaScript, no build step.

- `index.html`: home. `settings/`: per-device settings. `shared/`: design system (`style.css`), shell (`app.js`), icons, defaults (`config.js`).
- Each app is a folder: `kapang`, `beatdeckvis`, `requests`, `fixtures`, `hub`, `clock`, `dashboard` and Labs (`lights`, `nowplaying`, `adpreview`, `fastcheck`, `archive`, `quiz`, `scoreboard`, `timers`).
- `config.js` is public. Never put a secret key in it. Only a Supabase public (anon) key is safe, with `requests/supabase_requests.sql` applied.
- BeatDeck Visuals bundles butterchurn and butterchurn-presets (MIT, licences in `beatdeckvis/lib`).
- Not included on purpose: apps that stream paid-rights sport from unofficial sites.
