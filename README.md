# sideQUESTdigital — website

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
site.css            Site layer — composite tokens + site components only
site.js             Data, hash router, views, interactions
assets/             Brand artwork (mark, wordmark, lockup, icon tiles)
_ds/sidequest-brand-445e24cf-…/
                    The canonical brand design system. DO NOT EDIT.
design/design-spec.md
                    The design spec everything here is built from
```

`_ds/` is the shared sideQUEST brand system (tokens for colour, type, spacing,
effects, plus the component library). It is imported first; `site.css` layers on
top and never redefines a `--sq-*` value, never adds a hex, never adds a typeface.

## The signature move — the Stage Rail

The brand's spine is **Play → Build → Launch**. The site is built on it:

- A fixed 72px rail (≥1360px) carries the tagline vertically with a travelling
  accent segment. Below 1360px it becomes a 2px progress hairline under the header.
- Scrolling Studio / Apps / Team band-switches `<html>` between
  `.sq-stage-play|build|launch`, so `--accent` — and with it the field bloom,
  buttons, links, pills and focus ring — travels violet → lime → cyan as you read.
- On an app detail view the rail **locks** to that app's stage. Plantswap is
  permanently, obviously BUILD.
- Route changes throw a 135° slash of light across the viewport — the same angle
  as the sword in the mark.

Accent colour is therefore never decorative. Every splash of lime or cyan means
"this thing is at this stage".

## Routes

| Route | View |
|---|---|
| `#/` | Studio |
| `#/apps` | Apps index |
| `#/apps/plantswap`, `#/apps/vibecheck`, `#/apps/reverse-audit` | App detail |
| `#/team` | Team |

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
  1.81:1 — both hard failures. Lime and cyan fills always take ink.

## Placeholders — replace before this is a real launch

- **App icons.** All three apps currently render the sideQUEST mark. They need
  three real icons.
- **Screenshots.** The phone frames are designed placeholders, not real screens.
- **Team.** Names are "Placeholder name"; photos are initials avatars.
- **Store links.** App Store / Google Play buttons are deliberately inert and
  labelled "Store links go live with the listing" — no URLs have been supplied.
- **Contact.** The support form has no backend; it resolves to a local success
  state. No email address is published anywhere on the site, on purpose.
- **Copy.** Release notes, known issues and features are plausible placeholder
  content, not real changelogs.
