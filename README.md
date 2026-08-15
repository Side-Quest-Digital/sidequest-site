# sideQUESTdigital, website

The public marketing + support site for the studio. Static, no build step, no
dependencies: open `index.html` (or serve the folder) and it runs.

## What this is

Imported from the Claude Design project
[App Design Studio Website](https://claude.ai/design/p/7874d80a-bc7f-4ede-9ef9-01523bc0f122)
(`sideQUEST Site.dc.html`), then redesigned against Mobbin references and rebuilt
as a real site rather than a Claude Design runtime component.

## Structure

```
index.html          Shell: header, stage rail, footer, support slide-over
site.css            Site layer, composite tokens + site components only
site.js             Data, hash router, views, interactions
assets/             sideQUEST brand artwork + favicons
assets/apps/        Real icons and screenshots for each app
_ds/sidequest-brand-445e24cf-…/
                    The canonical brand design system. DO NOT EDIT.
design/design-spec.md
                    The design spec everything here is built from
```

`_ds/` is the shared sideQUEST brand system (tokens for colour, type, spacing,
effects, plus the component library). It is imported first; `site.css` layers on
top and never redefines a `--sq-*` value, never adds a hex, never adds a typeface.

## The logo

**"sideQUEST" is never set as plain text.** The Q is always the mark, the
Q-and-sword artwork, built into the wordmark (`.sq-logo` in `site.css`). The Q
on its own is the favicon, the apple-touch icon, and the graphic symbol used in
the "more to come" tile and the oversized hero watermark.

The mark was recovered from the brand icon tile and lives at
`assets/sidequest-mark.png`; `favicon-32.png`, `apple-touch-icon.png` and
`sidequest-icon-512.png` are generated from it on the void squircle.

## App worlds

Each app page adopts its own brand colour by overriding only the accent tokens,
so every accent-aware component re-tints in one move:

| App | Accent | Source |
|---|---|---|
| PlantSwap | `#52B788` | sampled from the real app icon |
| Vibe Check | `#FF4DA6` | its `COLORS.primary` |
| Reverse Audio | `#E554A9` | the Reverse Audio brand kit |

Every accent clears 4.5:1 on the night canvas and takes ink on its own fill.

## The signature move, the Stage Rail

The brand's spine is **Play → Build → Launch**. It describes **how the studio
works**, not the status of any individual app:

- A fixed 72px rail (≥1360px) carries the tagline vertically with a travelling
  accent segment. Below 1360px it becomes a 2px progress hairline under the header.
- Scrolling any page band-switches `<html>` between
  `.sq-stage-play|build|launch`, so `--accent`, and with it the field bloom,
  buttons, links, pills and focus ring, travels violet → lime → cyan as you read.
- Route changes throw a 135° slash of light across the viewport, the same angle
  as the sword in the mark.

**Apps are never labelled with a stage.** An app is either `live` or `soon`
(`status` in the `APPS` array) and says so in plain words, *Live* or *Coming
soon*. The rail used to lock to a per-app stage; that idea is gone, because
"this app is at BUILD" told a visitor nothing useful.

## Release status

| App | `status` | Shows |
|---|---|---|
| PlantSwap | `live` | Live pill, version, channel, store buttons, release notes, known issues |
| Vibe Check | `soon` | Coming soon pill, blurb, screens, features. No version, no store links, no changelog |
| Reverse Audio | `soon` | as above |

Release notes and known issues only render for a `live` app, a changelog for
something that has never shipped is noise. Flipping an app to live is a one-word
data change plus re-adding its `version`, `channel`, `build`, `changes` and
`issues` fields.

## The team page is deliberately anonymous

No names, no faces, no headcount-by-person. The page describes the make-up of
the team, developers, marketers, business side, and nothing else. Do not add
named crew cards back without being asked.

## Routes

| Route | View |
|---|---|
| `#/` | Studio |
| `#/apps` | Apps index |
| `#/apps/plantswap`, `#/apps/vibecheck`, `#/apps/backtrack` | App detail |
| `#/team` | Team, **unpublished**, redirects to Studio (see `SHOW_TEAM` in `site.js`) |

## Local development

```bash
python3 -m http.server 8477
# then open http://localhost:8477/index.html
```

Hash routing means it also works opened straight from the filesystem.

## Accessibility notes

- Skip link, visible focus rings, DOM order matches visual order.
- The support slide-over is a real dialog: focus trap, Esc to close, focus
  returned to the trigger, background `inert`, body scroll locked.
- Every form control has a visible persistent label; errors are announced and
  carry a `!` glyph so they are never colour-only.
- `prefers-reduced-motion` is honoured explicitly for reveal, parallax, marquee,
  rail, route wipe, count-up, hover transforms and the panel slide.
- **The rule that is easiest to break:** anything filled with `--accent` must
  take its text from `--accent-on`. White on lime is 1.51:1 and white on cyan is
  1.81:1, both hard failures. Lime and cyan fills always take ink.

## Where the app assets came from

All three apps are the real workspace projects, not invented ones:

| App | Icon | Screens |
|---|---|---|
| PlantSwap | `Plant Swap/Assets/Apple/App Icon (1024x1024)/` | 5 real app captures from `Assets/Apple/Actual app/` |
| Vibe Check | `Vibe Check/assets/icon-vibecheck.png` | **none yet**, themed placeholder frames |
| Reverse Audio | `reverse/reverse-audio-brand-assets/app-icon-512.png` | 5 frames rendered from `reverse/design/mockups/backtrack-mockups-v1.html` |

Names, taglines, blurbs and feature copy are taken from each project's own
README, brief and brand guide.

## Still placeholder, replace before this is a real launch

- **Vibe Check screens.** The only app without real captures. Run the Expo
  prototype and grab five.
- **Store links.** PlantSwap's App Store / Google Play buttons are deliberately
  inert and labelled "Store links go live with the listing", no URLs exist yet.
  The two coming-soon apps show no store buttons at all.
- **Contact.** Done, the support form POSTs to the live n8n production webhook
  and is verified end to end from a real browser. See [CLAUDE.md](CLAUDE.md) for
  the payload shape. No email address is published anywhere on the site, on
  purpose.
- **Release notes and known issues.** PlantSwap only, and illustrative rather
  than a real changelog, though they track the project's actual history closely.
