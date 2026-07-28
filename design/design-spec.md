# sideQUESTdigital — Website Design Spec

> **Derived from:** the canonical brand system at
> `_ds/sidequest-brand-445e24cf-0e8e-4c99-9475-6c33b087ac6f/` (fonts, colors,
> spacing, typography, effects, components) + assets in `assets/` +
> Mobbin references supplied in the brief:
> Retool hero (`e086c44d…`), FLORA hero (`34d18078…`), Coda hero (`0fca63d1…`),
> Square inset-card hero (`f3b33314…`), Webflow marketplace cards (`4db83ddd…`),
> Whop filtered card grid (`fcf29be4…`), ToDesktop icon-tile marquee (`a38a6c2c…`).
>
> **Reference-access caveat:** the Mobbin MCP server was not reachable from the
> session that produced this spec (tool lookup returned nothing; the section URLs
> are auth-gated and return HTTP 403 to an unauthenticated fetch). The seven
> references above were worked from the written descriptions in the brief, not
> from the images. Nothing in this spec depends on an unseen pixel — every value
> is derived from the token files, which *were* read in full. See §9.1.
>
> **Non-negotiable:** Space Grotesk + Space Mono only. No new hexes. No light
> theme. Every colour, space, radius, duration and easing below is an existing
> token or a composite built purely from existing tokens.

---

## 0. What already exists in the repo

| Path | Status |
|---|---|
| `_ds/sidequest-brand-…/styles.css` | Entry point. Import this once, first. |
| `_ds/…/tokens/{fonts,colors,spacing,typography,effects}.css` | Canonical. Do not edit. |
| `_ds/…/components/components.css` | `sq-btn`, `sq-card`, `sq-pill`, `sq-stat`, `sq-statgrid`, `sq-triad`, `sq-wordmark`, `sq-tagline`, `sq-lockup`, `sq-icontile`, `sq-table`, `sq-screen`. Use these; do not re-implement. |
| `assets/sidequest-mark.png` | 201×204, transparent, violet Q+sword. |
| `assets/sidequest-wordmark.png` | Wordmark lockup. |
| `assets/sidequest-lockup-tagline.png` | Wordmark + Play./Build./Launch. |
| `assets/sidequest-icon-night.png` | App icon tile, night background. |
| `support.js` | Generated Claude-Design runtime. **Irrelevant to this build — ignore/delete.** |

Everything this spec adds lives in **one new file, `site.css`**, imported *after*
`styles.css`. `site.css` contains only (a) site-level composite tokens (§4.6)
and (b) the site-specific components in §6. It must not redefine any `--sq-*`
value.

---

## 1. Design thesis

The first pass is a competent SaaS template wearing sideQUEST's colours: sticky
header, hero, marquee, 3-up grid, gradient strip, stat row, CTA panel. Every one
of those blocks is *arranged* correctly and *means* nothing. This spec replaces
arrangement with structure: the site is built on the brand's own spine —
**Play → Build → Launch** — so that layout, colour, navigation and scroll
progress are the same idea expressed four ways rather than four unrelated
decisions.

Three consequences. **One:** the accent is never chosen for looks. Violet is the
site's ambient state; lime and cyan only appear inside a container that is
genuinely *about* a build-stage app, which means every splash of colour on the
site is load-bearing information. **Two:** the page's structural grammar is the
ledger row, not the card — dense, hairline-separated, mono-labelled rows that
make three apps look like a studio's working index rather than three products
padded out to fill a grid. **Three:** the display type goes deliberately,
uncomfortably huge (up to 132px) against near-total restraint everywhere else —
FLORA's one-line hero discipline with Coda's hairline-flanked eyebrow, on
Retool's bottom-left anchor.

### The signature move: **THE STAGE RAIL**

A fixed 72px column pinned to the left viewport edge, present on every view at
≥1360px. It contains the tagline set vertically — `PLAY` `BUILD` `LAUNCH`,
rotated −90°, Space Mono, `--track-mono` widened to `0.28em` — and a 2px
travelling accent segment that runs the rail's length.

The rail does three jobs with one object:

1. **It is the tagline.** The brand's core lockup, always on screen, never
   repeated as a decorative strip.
2. **It is scroll progress.** On Studio / Apps / Team the segment's position
   tracks document scroll, and the site's `--accent` interpolates
   violet → lime → cyan as you descend. The `.sq-field` bloom, links, focus ring
   and buttons all follow, because they read `--accent`. The page *literally
   travels* from Play to Launch as you read it.
3. **It is the stage indicator.** On an app detail view the rail **locks**: it
   stops tracking scroll, the segment parks on that app's word, that word goes
   full accent, the other two drop to `--sq-text-500`, and the whole view is
   scoped to that app's stage. Plantswap is permanently, obviously BUILD.

Its motion counterpart is **the slash wipe** (§7.6): on route change the rail
"throws" a 135° blade of light across the viewport in the incoming view's accent.
Same device, same angle as the sword in the mark, one system.

Below 1360px the rail collapses to a 2px accent progress hairline pinned to the
bottom edge of the header — same information, no chrome.

---

## 2. Layout system

### 2.1 Breakpoints

| Name | Min width | What changes |
|---|---|---|
| `xs` | 0 | 1 column. Gutter 16px. Sections 48px. |
| `sm` | 480px | Meta rows go horizontal; 2-up icon grids. |
| `md` | 768px | Gutter 24px. Sections 64px. 2-up card grids. Nav goes horizontal. |
| `lg` | 1024px | Full 12-col grid. Sections 96px. Parallax enabled. Hero right column appears. |
| `xl` | 1360px | **Stage Rail appears.** Display type reaches its clamp ceiling. |
| `2xl` | 1600px | Gutter 32px. Container stays 1200px. Full-bleed bands gain breathing room. |

Author mobile-first. All queries are `min-width`.

### 2.2 Containers

| Class | Max width | Padding-inline | Use |
|---|---|---|---|
| `.site-container` | `var(--max-content)` = **1200px** | 16 / 24 / 32px per breakpoint | Default for every contained section |
| `.site-container--narrow` | **800px** | same | Section intros, team values, prose blocks |
| `.site-prose` | `var(--max-prose)` = 66ch | — | Any paragraph run. Never exceed 66ch. |
| `.site-bleed` | none (100vw) | 0 | Marquee, stats band, screenshot rail, footer |

All containers are `margin-inline: auto`. At ≥1360px add
`padding-left: calc(var(--gutter) + var(--rail-w))` on `<body>`'s main wrapper so
the Stage Rail never overlaps content — the container recentres inside the
remaining space.

### 2.3 Grid

- 12 columns, `gap: var(--space-5)` (24px) at ≥1024px.
- 6 columns, `gap: var(--space-5)` at 768–1023px.
- 4 columns, `gap: var(--space-4)` (16px) below 768px.
- `grid-template-columns: repeat(12, minmax(0, 1fr))`. Never `auto`.

### 2.4 Section rhythm

| Relationship | ≥1024px | 768–1023px | <768px |
|---|---|---|---|
| Section block padding (top & bottom) | `--space-9` (96px) | `--space-8` (64px) | `--space-7` (48px) |
| Statement section (hero, closing CTA) | `--space-10` (128px) | `--space-9` (96px) | `--space-8` (64px) |
| Section header → section body | `--space-7` (48px) | `--space-6` (32px) | `--space-6` (32px) |
| Sub-block → sub-block inside a section | `--space-7` (48px) | `--space-6` | `--space-6` |
| Heading → its lead paragraph | `--space-4` (16px) | — | — |
| Eyebrow → heading | `--space-3` (12px) | — | — |
| Card padding | `--space-5` (24px) | — | `--space-5` |
| Large panel padding (CTA, app-detail hero) | `--space-8` (64px) | `--space-7` (48px) | `--space-6` (32px) |

Adjacent full-bleed bands (e.g. marquee immediately followed by the stats band)
collapse to a **single** section gap, not two. Never stack two 96px paddings.

### 2.5 Header behaviour on scroll

Three states, driven by `scrollY` and scroll direction:

| State | Trigger | Treatment |
|---|---|---|
| **Top** | `scrollY <= 64` | Height `--header-h` (72px). `background: transparent`. No border. Wordmark 30px (`--logo-height`). |
| **Docked** | `scrollY > 64` | Height `--header-h-scrolled` (56px). `background: var(--surface-card)` + `backdrop-filter: blur(var(--blur-glass))`. `border-bottom: 1px solid var(--border-subtle)`. Wordmark 24px. |
| **Hidden** | `scrollY > 240` **and** scrolling down for >8px | `transform: translateY(-100%)`. Returns to Docked on any upward scroll of >8px. |

- Transition: `height, background, border-color, transform` over `var(--dur-base)` (210ms) `var(--ease)`.
- `position: fixed; inset-inline: 0; top: 0; z-index: 60`.
- Header is **never** stage-tinted. It stays violet-ambient on every view (§5.4).
- `prefers-reduced-motion`: the **Hidden** state is disabled entirely. Top↔Docked
  still swaps but with `transition-duration: 0.01ms` (already forced by
  `effects.css`).
- Below 768px the header never hides — the nav trigger must always be reachable.

### 2.6 Routing

Hash routes, client-side, no reload:

| Route | View |
|---|---|
| `#/` (and empty) | Studio |
| `#/apps` | Apps index |
| `#/apps/plantswap` | App detail — stage `build` |
| `#/apps/vibecheck` | App detail — stage `play` |
| `#/apps/reverse-audit` | App detail — stage `launch` |
| `#/team` | Team |
| any unknown | Studio, with `history.replaceState` to `#/` |

The support slide-over is **not** a route. It is state (`?support` is not used).
Opening it does not push history; Esc/close does not affect history.

---

## 3. Spacing scale in use

Only `--space-1 … --space-10` (4/8/12/16/24/32/48/64/96/128). No intermediate
values, no `em`-derived spacing, no magic numbers. Full mapping:

| Token | px | Every relationship it owns |
|---|---|---|
| `--space-1` | 4 | Stat number → stat label; pill dot → pill text; icon → inline label at 12px |
| `--space-2` | 8 | Button internal gap (`sq-btn` default); pill → pill in a meta row; form label → input; error text → input |
| `--space-3` | 12 | Eyebrow → heading; feature card icon → title; team avatar → name; triad icon → label; nav item → nav item (vertical, mobile) |
| `--space-4` | 16 | Heading → lead; card title → card body; mobile gutter; mobile grid gap; release-note row vertical padding; slide-over field → field |
| `--space-5` | 24 | **Default gutter.** Grid gap. `sq-card` padding. App-ledger row vertical padding. Nav item → nav item (horizontal). Screenshot frame → frame. |
| `--space-6` | 32 | 2xl gutter. Panel padding on mobile. Card grid row gap. Slide-over panel padding. Section header → body on tablet. Stat column → column. |
| `--space-7` | 48 | Section header → section body (desktop). Sub-block → sub-block. Section padding on mobile. Hero eyebrow rule → headline. |
| `--space-8` | 64 | Large panel padding. Section padding on tablet. Hero headline → hero CTA row. Footer band padding. |
| `--space-9` | 96 | **`--section-gap`.** Default section padding, desktop. |
| `--space-10` | 128 | Statement sections: hero top padding, closing CTA panel band, footer wordmark bleed offset. |

**Radius:** `--radius-sm` 8px → inputs, chips, buttons sm/md, checkbox.
`--radius-md` 14px → cards, panels, `sq-btn--lg`, table containers, slide-over
field group. `--radius-lg` 22px → app-index cards, screenshot rail container,
slide-over panel (left corners only). `--radius-xl` 28px → CTA panel, app-detail
hero panel. `--radius-pill` 999px → stage pills, meta pills, status pills only.
`--icon-radius-pct` 22.5% → every app icon tile and every team avatar.

---

## 4. Type ramp in use

One family. Hierarchy from size + weight + **tracking**. The tracking rule is
absolute: **big is tight, small is wide, nothing in between.**

### 4.1 Display and headings

| Role | Token / class | Size | Tracking | Where |
|---|---|---|---|---|
| **Display** (site token, §4.6) | `.site-display` | `700 clamp(52px, 9.4vw, 132px)/0.96` | `-0.04em` | **Studio hero headline only.** "Small apps. Absurdly well made." — set on 2 lines with an explicit `<br>` after "apps." |
| Hero (brand) | `.sq-hero` | `clamp(40px,6.5vw,92px)/1.02` | `-0.035em` | Apps-index headline; Team headline; closing-CTA headline |
| H1 | `.sq-h1` | `clamp(32px,4.4vw,60px)/1.06` | `-0.03em` | App-detail app name; support slide-over title |
| H2 | `.sq-h2` | `clamp(24px,3vw,40px)/1.12` | `-0.02em` | Section headings ("What it does", "Release notes", "Known issues", "How we work", "Six time zones…" sub-heads) |
| H3 | `.sq-h3` | `clamp(19px,1.9vw,26px)/1.25` | `-0.012em` | Card titles: app-ledger row name, app-index card name, feature card, value card, team member name, triad step label |
| H4 | `.sq-h4` | `500 17px/1.35` | `-0.005em` | Release-note headline; known-issue title; slide-over success title |

### 4.2 Small, wide, uppercase

| Role | Token / class | Size | Tracking | Where |
|---|---|---|---|---|
| Eyebrow | `.sq-eyebrow` | `500 12px/1.4` uppercase | `0.20em` | Every section's kicker. Studio hero: "Remote studio · Est. 2025". Colour = `--accent-text`. |
| Mono label | `.sq-mono` | `400 12px/1.4` uppercase | `0.06em` | Field labels, meta values, dates, captions under screenshots, footer legal, "01/02/03" indices, section numbers |
| Mono micro | `.site-mono-xs` | `400 11px/1.4` uppercase | `0.10em` | Table headers (matches `sq-table thead th`), rail words (widened to `0.28em`), char count |
| Tagline | `.sq-tagline` | `500 clamp(15px,1.7vw,26px)/1.3` | `0.18em` | Hero right column (stacked, one word per line); footer lockup. **Only two places on the site.** |
| Stage pill | `.sq-pill` | inherits `--text-mono` uppercase | `0.06em` | Stage pills, meta pills, status pills |

### 4.3 Body

| Role | Class | Size | Where |
|---|---|---|---|
| Lead | `.sq-lead` | `clamp(17px,1.35vw,21px)/1.55` | Hero lead paragraph; app-detail blurb; section intro paragraphs. Colour `--text-primary`. Max 46ch in hero, 66ch elsewhere. |
| Body | `.sq-body` | `16px/1.6` | Card bodies, feature card copy, release-note text, values copy. Colour `--text-secondary`. |
| Body small | `.sq-body-sm` | `14px/1.55` | App-ledger row blurb, team member note, known-issue text, footer links |
| Caption | `.sq-caption` | `12px/1.45` | Placeholder disclaimers, helper text under form fields |

### 4.4 Numerals

| Role | Token | Where |
|---|---|---|
| `--text-stat-xl` (site token) | `700 clamp(44px, 6vw, 88px)/1`, tracking `-0.035em`, `font-variant-numeric: tabular-nums` | The 4 Studio stats |
| `--text-stat-sm` | `700 28px/1` | Triad step index "01/02/03" — no, see below |

The triad indices use `.site-mono-xs` at 11px, **not** display numerals — the
triad's weight belongs to the three words, not to counting.

### 4.5 Where type goes deliberately huge

Three places, and only three:

1. **Studio hero headline** — `--text-display`, up to 132px, `-0.04em`. It should
   feel one notch too big for the viewport at `xl`. Two lines, left-aligned,
   bottom-anchored in its grid area.
2. **Studio stats** — `--text-stat-xl`, up to 88px. Four numerals across a
   full-bleed near-black band with nothing else competing.
3. **Footer wordmark** — `sideQUEST` at `clamp(64px, 14vw, 220px)`, weight 700,
   tracking `-0.045em`, colour `var(--sq-slate-800)`, with the **Q** in
   `var(--sq-violet-600)`. Baseline sits below the viewport-clipped footer edge
   so the descender-line is cropped. See §6.14.

Everywhere else the type is restrained and small. That contrast is the point.

### 4.6 Site-level composite tokens (`site.css`)

Built only from existing tokens. No new hexes, no new families.

```css
:root {
  /* Type — extends the existing tight-display rule, same family/weights */
  --text-display:   700 clamp(52px, 9.4vw, 132px) / 0.96 var(--font-display);
  --track-display:  -0.04em;
  --text-stat-xl:   700 clamp(44px, 6vw, 88px) / 1 var(--font-display);
  --text-wordmark:  700 clamp(64px, 14vw, 220px) / 0.82 var(--font-display);
  --track-wordmark: -0.045em;
  --track-rail:     0.28em;

  /* Chrome */
  --rail-w:            72px;
  --header-h:          72px;
  --header-h-scrolled: 56px;
  --z-rail:   40;
  --z-header: 60;
  --z-scrim:  80;
  --z-panel:  90;
  --z-wipe:   100;

  /* Accent tints — derived, never a literal hex */
  --tint-accent-06: color-mix(in srgb, var(--accent) 6%,  transparent);
  --tint-accent-08: color-mix(in srgb, var(--accent) 8%,  transparent);
  --tint-accent-14: color-mix(in srgb, var(--accent) 14%, transparent);

  /* Motion (named in §7) */
  --dur-reveal: 520ms;
  --dur-wipe:   420ms;
  --dur-count:  900ms;
}
```

---

## 5. Colour + accent plan

### 5.1 The rule, restated for this site

> **The page's ambient accent is violet.** Lime and cyan appear only inside an
> element that is *about* an app whose stage is Build or Launch. There is no
> decorative lime and no decorative cyan anywhere on this site.

### 5.2 Ambient (violet) — everything not stage-scoped

Header, nav, footer, Stage Rail base, body links, `:focus-visible` ring, the
Studio/Apps/Team `.sq-field` bloom, the support slide-over when opened from
global chrome, the "more to come" tile, team avatars and values cards.

### 5.3 Stage-scoped containers — the complete list

Apply the scope class on the **container**, never on the child. Every
accent-aware token re-tints in one move.

| Element | Scope class | Accent | `--accent-on` |
|---|---|---|---|
| Studio app-ledger row: Plantswap | `.sq-stage-build` | lime `#A3E635` | `--sq-ink` |
| Studio app-ledger row: Vibecheck | `.sq-stage-play` | violet `#7C3AED` | `--sq-white` |
| Studio app-ledger row: Reverse Audit | `.sq-stage-launch` | cyan `#22D3EE` | `--sq-ink` |
| Apps-index card (each) | matching stage | matching | matching |
| App detail view root `<main>` | matching stage | matching | matching |
| Studio triad step, Play | `.sq-triad__step--play` (existing) | violet-400 text | n/a |
| Studio triad step, Build | `.sq-triad__step--build` | lime-400 text | n/a |
| Studio triad step, Launch | `.sq-triad__step--launch` | cyan-400 text | n/a |
| Studio support CTA panel | `.sq-stage-launch` | cyan | `--sq-ink` |
| App-detail closing CTA panel | that app's stage | matching | matching |
| Support slide-over opened from an app-detail view | that app's stage | matching | matching |

**Why the Studio support CTA is cyan:** the panel is about shipping, listening
and patching — Launch. That is the accent *earned* rather than chosen, and it
gives the Studio page exactly one cyan moment, at the bottom, as the payoff of
the violet→cyan scroll journey the Stage Rail runs.

### 5.4 What must NOT be tinted — ever

- **Header and nav.** Always violet-ambient, on every view including app detail.
  It is site chrome, not app content.
- **Footer.** Always violet-ambient. The Q in the giant wordmark stays
  `--sq-violet-600` on every route.
- **Body copy.** `--text-secondary` / `--text-tertiary`. Only `<strong>` inside
  `.sq-body` / `.sq-lead` picks up `--accent-text`, and only for a word or short
  phrase — never a whole sentence.
- **Status indicators.** Known-issue statuses use `--sq-bad` / `--sq-warn` /
  `--sq-ok` **only**. Lime must never mean "resolved" — the brand file is
  explicit: if lime also means "pass", the brand accent stops working.
- **Form validation.** Errors `--sq-bad`, success tick `--sq-ok`. Never accent.
- **The `--grad-quest` three-stop gradient.** Not used anywhere on this site. The
  three accents together appear only in the tagline lockup (hero right column,
  footer) and the process triad. That is the brand rule and there are no
  exceptions here.
- **Disabled states.** `--sq-slate-700` chrome, `--sq-text-500` label. Never a
  desaturated accent.

### 5.5 The field and the bloom

- `<body>` carries `.sq-field .sq-field--fixed`. The bloom is a single fixed
  70vw circle, upper-left, `opacity: 0.34`, reading `--accent`.
- On Studio / Apps / Team the Stage Rail drives `--accent` on `:root` as you
  scroll (§7.5), so the bloom **cross-fades violet → lime → cyan over the length
  of the page**. Cross-fade duration `--dur-slow` (400ms), so it is felt as a
  temperature change, never seen as a switch.
- On an app detail view `--accent` is set once by the view's stage scope and does
  not move. The bloom is static.
- `.sq-field--grid` (48px hairline grid, masked ellipse) is added on: the Studio
  hero, the app-detail screenshot rail band, and the app-detail hero panel. It is
  the "workspace" texture. **Do not** put it behind app icon tiles or the footer
  wordmark.
- **One bloom per document.** Nested `.sq-field` elements (e.g. inside an
  apps-index card) must set `--bloom-scale` down: use `.sq-field` with
  `::before { opacity: 0.22; width: 90%; }` via a `.site-field--inset` modifier.

### 5.6 The slash and the cut — budget

- **`.sq-slash--beam`: one per view.** Studio → hero, `--slash-x: 68%`.
  Apps index → the header band, `--slash-x: 78%`. App detail → the detail hero
  panel, `--slash-x: 34%`. Team → the header band, `--slash-x: 72%`.
- **Exception, documented:** the process triad uses two hairline `.sq-slash`
  dividers (§6.11). They are *structure*, not decoration — the same argument
  `colors.css` makes for the flat gradient reading as a sequence. This is the
  only place on the site with more than one slash on a surface.
- **`.sq-cut-tr`: one per view.** Studio → the support CTA panel. App detail →
  the closing CTA panel. Apps index → the "more to come" tile. Team → the values
  band. Never on a card that repeats.

### 5.7 Measured contrast (sRGB, computed)

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `--sq-text-100` #F8FAFC | `--sq-night` #0F172A | 17.4 : 1 | AAA |
| `--sq-text-300` #CBD5E1 | #0F172A | 11.9 : 1 | AAA |
| `--sq-text-400` #94A3B8 | #0F172A | **6.86 : 1** | AA all sizes ✓ |
| `--sq-text-500` #64748B | #0F172A | **3.69 : 1** | ✗ body. **Disabled labels only.** |
| `--sq-violet-400` #A78BFA | #0F172A | **6.46 : 1** | AA all sizes ✓ — this is why `--accent-text` is the 400, not the 600 |
| `--sq-violet-600` #7C3AED | #0F172A | **3.09 : 1** | ✗ text. **Fill and 1px borders only.** |
| `--sq-lime-400` #A3E635 | #0F172A | **11.67 : 1** | AAA ✓ |
| `--sq-cyan-400` #22D3EE | #0F172A | **9.74 : 1** | AAA ✓ |
| `--sq-white` | `--sq-violet-600` fill | 5.70 : 1 | AA ✓ — violet fill takes white |
| `--sq-white` | `--sq-lime-400` fill | **1.51 : 1** | **FAIL — forbidden** |
| `--sq-white` | `--sq-cyan-400` fill | **1.81 : 1** | **FAIL — forbidden** |
| `--sq-ink` #0F172A | `--sq-lime-400` fill | **11.67 : 1** | AAA ✓ |
| `--sq-ink` #0F172A | `--sq-cyan-400` fill | **9.74 : 1** | AAA ✓ |

**Consequence, and it is the single easiest thing to get wrong on this site:**
any element that fills with `--accent` must take its text from `--accent-on` and
nothing else. `.sq-btn--primary`, `.sq-pill--solid` and `.sq-card--accent`
already do. Anything hand-rolled must too. Never write `color: #fff` on an accent
fill.

---

## 6. Component inventory

Sizes are given at `lg` unless stated. Every component's hover/active states are
suppressed under `prefers-reduced-motion` to colour-only changes (no transform).

---

### 6.1 Stage Rail — `.site-rail`

**Anatomy.** Fixed, `left: 0; top: 0; height: 100vh; width: var(--rail-w)`,
`z-index: var(--z-rail)`. A 1px full-height hairline (`--sq-hairline`) at
`left: 36px` (rail centre). Three word-labels rotated `-90deg`
(`writing-mode: vertical-rl; transform: rotate(180deg)`), centred on that
hairline, distributed at 18% / 50% / 82% of viewport height:
`PLAY` / `BUILD` / `LAUNCH`, `.site-mono-xs`, `letter-spacing: var(--track-rail)`.
A 2px × 64px accent segment sits on the hairline and travels vertically.

**Sizes.** Rail 72px. Hairline 1px. Segment 2px × 64px, `border-radius: 1px`.
Word block-size ~64px each.

**States.**

| State | Treatment |
|---|---|
| Rest (inactive word) | `color: var(--sq-text-500)` |
| Active word | `color: var(--accent-text)`, plus `text-shadow: 0 0 24px var(--accent-glow)` (`.sq-glow-text`) |
| Segment | `background: var(--accent)`, `box-shadow: var(--glow-tight)` |
| Locked (app detail) | Segment parks on the app's word; the other two words drop to `--sq-text-500` at `opacity: 0.5`; segment grows to 96px |
| < 1360px | Rail is `display: none`; replaced by `.site-progress` — a 2px bar pinned to `bottom: -1px` of the header, `width: <scroll %>`, `background: var(--accent)` |

**Interaction.** None. `aria-hidden="true"`, `pointer-events: none`,
not focusable. It is decorative reinforcement of information available in text
elsewhere (the tagline is in the footer; the stage is a pill on every app card).

---

### 6.2 Header / nav — `.site-header`

**Anatomy.** `<header>` → `.site-container` → flex row, `justify-content:
space-between`, `align-items: center`. Left: wordmark link to `#/`
(`assets/sidequest-wordmark.png`, height `--logo-height` 30px → 24px docked,
`alt="sideQUESTdigital — home"`). Right: `<nav>` with 3 links (Studio / Apps /
Team) then a `.sq-btn--secondary .sq-btn--sm` "Report a bug" which opens the
slide-over.

**Sizes.** 72px → 56px. Nav item gap `--space-5` (24px). Nav item font
`500 14px/1` Space Grotesk, `letter-spacing: 0.02em`, sentence case.

**States (nav link).**

| State | Treatment |
|---|---|
| Rest | `color: var(--text-tertiary)` |
| Hover | `color: var(--text-primary)`; a 1px underline in `--accent` grows from left, `transform: scaleX(0)→1`, `transform-origin: left`, `--dur-fast` |
| Active route | `color: var(--text-primary)`; underline permanently at `scaleX(1)`; `aria-current="page"` |
| Focus-visible | Base ring: `2px solid var(--focus-ring)`, offset 3px |
| Disabled | n/a |

**Mobile (<768px).** Nav collapses to a 44×44 icon button (three 2px lines,
`--text-primary`) which opens a full-screen sheet: `--surface-deep` at 96%
opacity + `blur(--blur-glass)`, links stacked at `.sq-h3`, gap `--space-3`,
"Report a bug" as `.sq-btn--primary .sq-btn--md` full-width at the bottom. Same
focus-trap + Esc rules as the slide-over (§6.13). Trigger gets
`aria-expanded` / `aria-controls`.

---

### 6.3 Studio hero — `.site-hero`

**Anatomy** (12-col, `min-height: 88vh`, `align-content: end`,
`padding-block: var(--space-10) var(--space-8)`; `.sq-field .sq-field--grid`
with one `.sq-slash--beam` at `--slash-x: 68%`):

1. **Row A** — cols 1–12. `.sq-eyebrow` "Remote studio · Est. 2025", then a
   full-width 1px `--border-subtle` rule immediately below it, gap `--space-3`
   above the rule and `--space-7` below. *(Coda: tiny wide eyebrow, hairline
   flanking.)*
2. **Row B** — cols 1–8: `.site-display` headline, two lines:
   `Small apps.` / `Absurdly well made.` Bottom-anchored. Cols 9–12: the tagline
   lockup **stacked vertically**, one word per line, right-aligned,
   `.sq-tagline` with `.sq-tagline__play/__build/__launch`, line gap `--space-2`.
   Bottom-aligned to the headline's baseline block. This is the only full-colour
   triad on the page above the fold, and it is the Stage Rail's legend.
3. **Row C** — cols 1–6: `.sq-lead`, max 46ch: *"sideQUESTdigital is a remote crew
   that ships apps we'd actually keep on our own home screens. Three live, more in
   the forge."* Gap from Row B: `--space-8`.
4. **Row D** — cols 1–6: CTA row, gap `--space-3`.
   `.sq-btn--primary .sq-btn--lg` "See the apps" → `#/apps`.
   `.sq-btn--secondary .sq-btn--lg` "Report a bug" → opens slide-over.
   Gap from Row C: `--space-5`.
5. **Watermark.** `assets/sidequest-mark.png` at 520px, `opacity: 0.10`,
   absolutely positioned so its sword axis is collinear with the beam;
   `right: -60px; bottom: -40px`. `aria-hidden="true"`. Hidden below 1024px.

**Responsive.** <1024px: single column, tagline moves under the headline and goes
horizontal (`Play. Build. Launch.` on one line, `white-space: nowrap`). <768px:
`min-height: auto`, headline clamps to 52px, CTAs stack full-width, watermark
hidden.

---

### 6.4 App ledger row — `.site-approw` *(Studio only)*

The replacement for the generic 3-up card grid. A dense, hairline-separated index
of the studio's shipped work.

**Anatomy.** `<a href="#/apps/{slug}">` as a grid row, stage-scoped on the `<a>`
itself. `grid-template-columns: 96px 1fr auto`, `gap: var(--space-5)`,
`padding-block: var(--space-5)`, `border-top: 1px solid var(--border-subtle)`;
last row also gets `border-bottom`.

- **Col 1:** `.sq-icontile` at `--tile-size: 96px`, `--night` variant, containing
  `assets/sidequest-icon-night.png` (placeholder for all three until real icons
  land — see §9).
- **Col 2:** `.sq-h3` app name; `.sq-body-sm` blurb (`--text-secondary`,
  `-webkit-line-clamp: 2`), max 62ch.
- **Col 3:** right-aligned stack, gap `--space-2`: `.sq-pill` (stage word, with
  `.sq-pill__dot`), then `.sq-mono` version string (`v2.4.1`), then `.sq-mono`
  platforms (`iOS · Android`).

**States.**

| State | Treatment |
|---|---|
| Rest | Transparent background. Borders `--border-subtle`. |
| Hover | `background: var(--tint-accent-06)`; top+bottom border → `--accent` at 40% (`color-mix(in srgb, var(--accent) 40%, transparent)`); a `.sq-slash` (2px, `--slash-x` animating 10% → 90%) sweeps across the row once over `--dur-slow`; icon tile `transform: scale(1.03)`; name → `--accent-text` |
| Active (pressed) | `background: var(--tint-accent-08)`, no transform |
| Focus-visible | Base ring, `outline-offset: -2px` (the row is full-bleed within the container, so an outset ring would clip) |
| Reduced motion | Background tint + name colour only. No slash sweep, no icon scale. |

**Responsive.** <768px: `grid-template-columns: 64px 1fr`; col 3 wraps under
col 2 as a horizontal pill row; icon tile 64px.

---

### 6.5 App card — `.site-appcard` *(Apps index only)*

*(Webflow marketplace: full-bleed tinted art, icon top-left, "Learn more ↗".)*
Deliberately a different treatment from the Studio ledger row so the two views do
not read as duplicates.

**Anatomy.** `<a>` → `.sq-card` with `border-radius: var(--radius-lg)`,
`padding: 0`, `overflow: hidden`. Stage-scoped on the `<a>`.

1. **Art band** — 240px tall, `.sq-field .site-field--inset` (bloom at 0.22
   opacity, 90% width) so the band glows in that app's accent. Inside, at
   `inset: var(--space-5) auto auto var(--space-5)`: `.sq-icontile` at
   `--tile-size: 88px`.
   Bottom-right of the band, `inset: auto var(--space-5) var(--space-5) auto`:
   `.sq-pill` stage word.
2. **Body** — `padding: var(--space-5)`. `.sq-h3` name → `--space-3` →
   `.sq-body-sm` blurb (3-line clamp) → `--space-4` → a `.sq-mono` meta row
   (`v2.4.1 · iOS · Android · 38 MB`) → `--space-4` → `.sq-btn--ghost .sq-btn--sm`
   "Learn more ↗".

**States.**

| State | Treatment |
|---|---|
| Rest | `border: 1px solid var(--border-subtle)` |
| Hover | Inherits `.sq-card--link`: `border-color: var(--accent)`, `translateY(-3px)`. Plus: art-band bloom `opacity: 0.22 → 0.34`; the `↗` in "Learn more" translates `4px, -4px` over `--dur-fast` |
| Active | `translateY(-1px)` |
| Focus-visible | Base ring, offset 3px |
| Loading / empty | n/a — content is static |

**Responsive.** 2-up at ≥768px (`grid-column: span 6`), 1-up below. Art band
drops to 180px below 768px.

---

### 6.6 "More to come" tile — `.site-forge`

**Anatomy.** A non-interactive fourth grid cell, same footprint as
`.site-appcard`. `border: 1px dashed var(--border-subtle)`,
`border-radius: var(--radius-lg)`, no background, `.sq-cut-tr` applied (the Apps
view's one cut). Centred column, gap `--space-4`:

- `assets/sidequest-mark.png` at 48px, `opacity: 0.30`, `aria-hidden="true"`
- `.sq-h3` "More to come"
- `.sq-mono` "Two in the forge"
- `.sq-caption` "We'll announce them when they're worth announcing."

**States.** `cursor: default`. Not a link, not focusable, no hover. Ambient
violet (no stage scope). Announced to AT as ordinary text; do **not** give it
`role="button"` or `aria-disabled`.

---

### 6.7 App-detail hero — `.site-detailhero`

**Anatomy.** A contained panel: `.sq-card--raised` at
`border-radius: var(--radius-xl)`, `padding: var(--space-8)`,
`.sq-field--grid` behind it, one `.sq-slash--beam` at `--slash-x: 34%`. The whole
`<main>` carries the app's stage scope, so this panel and everything below it is
already the right colour.

Grid `160px 1fr`, `gap: var(--space-7)`:

- **Left:** `.sq-icontile` `--tile-size: 160px`, `--night` variant, with
  `.sq-glow` (accent glow, picks up the stage colour automatically).
- **Right, stacked:**
  1. Row of `.sq-pill` (stage, solid: `.sq-pill--solid`) + `.sq-mono` version.
     Gap `--space-2`.
  2. `--space-4` → `.sq-h1` app name.
  3. `--space-4` → `.sq-lead` blurb, max 60ch.
  4. `--space-5` → meta pill row: three `.sq-pill--muted` — `iOS · Android`,
     `38 MB`, `12+`. Gap `--space-2`, `flex-wrap: wrap`.
  5. `--space-6` → store button row, gap `--space-3`:
     `.sq-btn--primary .sq-btn--md` "App Store ↗",
     `.sq-btn--secondary .sq-btn--md` "Google Play ↗",
     `.sq-btn--ghost .sq-btn--md` "Report a bug" (opens the slide-over,
     pre-scoped and pre-filled to this app).

**States.** Store buttons follow §6.15. The panel itself is static.

**Responsive.** <1024px: single column, icon tile 120px, panel padding
`--space-6`. <768px: buttons full-width stacked, tile 96px.

---

### 6.8 Phone screenshot frame — `.site-shot`

Uses the existing `.sq-screen` / `.sq-screen__inner` / `.sq-screen__notch`.

**Anatomy.** A `<figure>`: `.sq-screen` at `--screen-w: 280px` (aspect 9/19.5 →
607px tall), then `--space-4` → `<figcaption>` `.sq-mono`, max 28ch, left-aligned.

**Placeholder content** (no real screenshots exist). The inner is not a grey box
— it is designed:

- Background: the app's stage-scoped `.sq-field` (bloom at 0.28).
- Centred: the app's initial letter (`P` / `V` / `R`) at `--text-display` sized
  to 220px, `color: var(--text-primary)`, `opacity: 0.08`.
- Top-left, inset `--space-4`: `.site-mono-xs` `SCREEN 01`.
- Bottom-left, inset `--space-4`: `.site-mono-xs` `PLACEHOLDER` in
  `--sq-text-500`.
- A single 1px `.sq-slash` at `--slash-x: 70%`, `opacity: 0.35`.
- `role="img"` with `aria-label="Placeholder screenshot 1 of 4 — {app name}"`.

**Container — `.site-shotrail`.** Full-bleed (`.site-bleed`) horizontal scroller.
`display: flex; gap: var(--space-5); overflow-x: auto;`
`scroll-snap-type: x mandatory` with `scroll-snap-align: start` per figure.
`padding-inline: max(var(--gutter), calc((100vw - var(--max-content)) / 2))` on
the left so the first frame aligns to the container, and
`padding-right: var(--space-9)` so the last frame bleeds toward the edge rather
than stopping flush — the row must read as continuing. Custom scrollbar:
2px track `--sq-hairline`, thumb `--accent` at 60%.

**States.**

| State | Treatment |
|---|---|
| Rest | `box-shadow: var(--shadow-lift)` (from `.sq-screen`) |
| Hover (per frame) | `transform: translateY(-6px)`, `--dur-base --ease-snap`; caption → `--text-primary` |
| Focus-within | The scroller itself is focusable (`tabindex="0"`, `role="region"`, `aria-label="Screenshots"`) so keyboard users can arrow-scroll it. Base focus ring on the scroller. |
| Reduced motion | No lift. `scroll-behavior: auto`. |

**Sizes.** 280px at ≥1024px; 240px at 768–1023px; 220px below 768px.
4 frames per app.

---

### 6.9 Feature card — `.site-feature` *("What it does", 3 per app)*

**Anatomy.** `.sq-card .sq-card--edge` (3px left stripe in `--accent` — the
brand file's prescribed "cheap accent" for 3–4 tinted cards; a solid fill on
three cards would shout). `padding: var(--space-5)`, `border-radius:
var(--radius-md)`.

Contents: `.site-mono-xs` index (`01` / `02` / `03`) → `--space-3` → `.sq-h3`
feature title → `--space-3` → `.sq-body` description (max 44ch).

**States.**

| State | Treatment |
|---|---|
| Rest | `background: var(--surface-card)`, `border: 1px solid var(--border-subtle)`, left stripe `--accent` |
| Hover | `border-color: var(--border-strong)`; left stripe widens 3px → 5px, `--dur-fast`. **No lift** — these are not links. |
| Focus | n/a — not interactive |

**Grid.** 3-up at ≥1024px (`span 4`), 2-up at 768–1023px, 1-up below.

---

### 6.10 Release-notes row — `.site-release`

A ledger, not a table component — it needs to reflow on mobile, which
`.sq-table` does not do gracefully.

**Anatomy.** `<ol>` reset. Each `<li>` is
`grid-template-columns: 88px 1fr 120px`, `gap: var(--space-5)`,
`padding-block: var(--space-4)`, `border-bottom: 1px solid var(--sq-hairline)`;
last child no border.

- **Col 1** — version, `.sq-mono`, `color: var(--accent-text)`,
  `font-variant-numeric: tabular-nums`.
- **Col 2** — `.sq-h4` headline + `--space-2` → `.sq-body-sm` note.
- **Col 3** — date, `.sq-mono`, `color: var(--text-tertiary)`, right-aligned,
  `<time datetime="YYYY-MM-DD">`.

**Latest row.** `box-shadow: inset 3px 0 0 var(--accent)` (matching
`.sq-table tbody tr.is-self`), `padding-left: var(--space-4)`, and a
`.sq-pill--solid` reading `LATEST` inline after the `.sq-h4`.

**States.**

| State | Treatment |
|---|---|
| Rest | as above |
| Hover | `background: var(--surface-card)` (a 4% lift), `--dur-fast`. Cosmetic only — rows are not links. |
| Empty | If an app has no notes: a single `.sq-card` with `.sq-mono` "No releases yet." Never render an empty `<ol>`. |

**Responsive.** <768px: `grid-template-columns: 1fr auto`; version and date sit
on one row above the text, both `.sq-mono`.

---

### 6.11 Known-issue row — `.site-issue`

**Anatomy.** `<ul>` reset. Each `<li>`: `grid-template-columns: 1fr auto`,
`gap: var(--space-4)`, `padding-block: var(--space-4)`,
`border-bottom: 1px solid var(--sq-hairline)`.

- **Left** — `.sq-h4` issue title + `--space-2` → `.sq-body-sm` detail.
- **Right** — status pill, `.sq-pill` variant `.site-status`, with a 6px
  `.sq-pill__dot`.

**Status vocabulary — the only three, and they never use the accent:**

| Status label | Border + text | Dot | Meaning |
|---|---|---|---|
| `OPEN` | `--sq-bad` #EF4444 | `--sq-bad` | Reproduced, not yet fixed |
| `INVESTIGATING` | `--sq-warn` #F59E0B | `--sq-warn` | Can't reproduce reliably yet |
| `FIX IN REVIEW` | `--sq-ok` #10B981 | `--sq-ok` | Fixed, awaiting store review |

Contrast: all three against `--sq-night` clear 4.5:1 at 12px. Status is conveyed
by the **word**, not the colour — the colour is redundant reinforcement only.

**Empty state.** If an app has no known issues, render a `.sq-card` containing a
`.sq-pill--solid` with `--accent-on` text reading `ALL CLEAR` plus `.sq-body-sm`
"Nothing outstanding. Tell us if you find something." That is a designed empty
state, not a blank section.

---

### 6.12 Stat — `.site-stat`

Built on `.sq-stat` / `.sq-statgrid` with `--cols: 4`.

**Anatomy.** Full-bleed band, `background: var(--surface-deep)` (#020617),
`border-block: 1px solid var(--border-subtle)`,
`padding-block: var(--space-9)`. Inside, `.site-container` →
`.sq-statgrid` with `--cols: 4`, `gap: var(--space-6)`.

Each column: a 1px `--border-subtle` rule across the top → `--space-5` →
`.sq-stat__num` at `--text-stat-xl`, `tabular-nums` → `--space-1` →
`.sq-stat__label` (`.sq-mono`).

The four: `3` / apps live · `2` / platforms, natively · `<24h` / typical first
reply · `100%` / remote.

**Accent.** The `<24h` figure takes `.sq-stat__num--accent` — one accented
numeral out of four, and it is the one that is a promise rather than a fact.
The other three stay `--text-primary`. Because the stats band sits mid-page on
Studio, the Stage Rail will have driven `--accent` to roughly lime by then; that
is intentional and correct (this band is about how the studio *builds*).

**States.**

| State | Treatment |
|---|---|
| Pre-reveal | `opacity: 0`, `translateY(16px)` |
| Reveal | Fade + rise (§7.2). Numerals count from 0 to target over `--dur-count` (900ms), `cubic-bezier(0.22,0.61,0.36,1)`. `<24h` counts `24` only, keeping `<` and `h` static. `100%` counts `100`. `2` and `3` count too (they're short — that's fine and reads as intentional). |
| Reduced motion | Final value rendered immediately, no count, no rise. |
| Rest | Static |

`aria-hidden` on the animating numeral is **not** used — instead the count-up
mutates `textContent` on an element with `aria-live="off"` and the final value is
present in the DOM from first paint under reduced motion.

**Responsive.** 4-up ≥1024px, 2×2 at 480–1023px, 1-up below.

---

### 6.13 Process triad — `.site-triad`

Uses `.sq-triad` with a new `.site-triad--slashed` modifier.

**Anatomy.** Contained, `.sq-card` shell at `--radius-xl`, `overflow: hidden`,
`position: relative`, `padding: 0`. Three `.sq-triad__step` at
`padding: var(--space-8) var(--space-5)`, `border-left: 0` (overridden).

Between steps, two absolutely-positioned `.sq-slash` elements at
`--slash-x: 33.333%` and `66.666%`, `--slash-w: 1px`, `opacity: 0.35`,
`background: var(--sq-border)` (not accent — these are structure). The rotation
gives the true 135° sword fall, so the panel is divided by the blade rather than
by a ruler. **This is the documented two-slash exception (§5.6).**

Each step, top to bottom:
`.site-mono-xs` index (`01`/`02`/`03`, `--sq-text-500`) → `--space-4` →
`.sq-triad__label` at `.sq-h3` sizing, in that step's stage colour
(`--play` violet-400 / `--build` lime-400 / `--launch` cyan-400) → `--space-3` →
`.sq-triad__note` `.sq-body-sm`, `--text-secondary`, max 34ch.

Copy:
- **Play.** "We build the daft version first…"
- **Build.** "Native on both platforms. No web view wearing an app costume."
- **Launch.** "Ship, listen, patch…"

**Do not** use `.sq-triad--gradient` on this site. The flat violet→cyan gradient
panel is a brand-sheet treatment; on a near-black page it reads as the one loud
block the first pass already had. Restraint here is the differentiator.

**States.**

| State | Treatment |
|---|---|
| Rest | as above |
| Hover (per step) | Step background → `color-mix(in srgb, currentColor 5%, transparent)` where `currentColor` is that step's stage colour; label gets `.sq-glow-text`. `--dur-base`. Non-interactive otherwise. |
| Reveal | Steps stagger in left→right, 90ms apart (§7.2) |
| Reduced motion | No stagger, no glow |

**Responsive.** <768px: `grid-template-columns: 1fr`; slashes become horizontal
1px `--border-subtle` rules (a rotated slash across a stacked column reads as
damage). Steps get `padding: var(--space-6) var(--space-5)`.

---

### 6.14 CTA panel — `.site-cta`

**Anatomy.** `.sq-card--accent` (solid `--accent` fill, text auto-flips to
`--accent-on`) at `border-radius: var(--radius-xl)`, `padding: var(--space-8)`,
with `.sq-cut-tr` — the view's one cut. Grid `1fr auto`, `gap: var(--space-7)`,
`align-items: center`.

- **Left:** `.sq-eyebrow` (colour overridden to `--accent-on` at 70% opacity —
  the default `--accent-text` is invisible on an accent fill) → `--space-3` →
  `.sq-h2` headline → `--space-4` → `.sq-body` sub-line at `opacity: 0.82`.
- **Right:** the action.

**Studio instance.** Scope `.sq-stage-launch` (cyan, ink text).
Eyebrow "Support" · Headline "Found a bug? Brilliant. Tell us." · Sub "We read
everything and usually reply the same day." · Action: a button on an accent fill
cannot be `.sq-btn--primary` (accent on accent). Use `.site-btn--oninverse`:
`background: var(--sq-ink)`, `color: var(--sq-text-100)`,
`border-radius: var(--radius-sm)`, sizing `.sq-btn--lg`. Label "Report a bug".

**App-detail instance.** Scope = that app's stage. Headline "Something off in
{App}?" · Sub "Tell us and we'll look today." · Same inverse button.

**States (`.site-btn--oninverse`).**

| State | Treatment |
|---|---|
| Rest | `background: var(--sq-ink)`, `color: var(--sq-text-100)` |
| Hover | `background: var(--sq-void)`, `translateY(-2px)` |
| Active | `translateY(0)` |
| Focus-visible | `outline: 2px solid var(--sq-ink)` + `box-shadow: 0 0 0 4px rgba(248,250,252,0.9)` — the violet default ring is invisible on lime/cyan. **See §8.2.** |
| Disabled | n/a |

**Responsive.** <768px: single column, action full-width below the copy, cut
removed (`clip-path: none` — a 28px notch on a 320px panel eats the corner).

---

### 6.15 Buttons — from `components.css`

Use `.sq-btn` + size + variant as shipped. Additions:

| Variant | Use on this site |
|---|---|
| `.sq-btn--primary` | Hero "See the apps"; app-detail "App Store ↗"; slide-over submit |
| `.sq-btn--secondary` | Hero "Report a bug"; header "Report a bug"; app-detail "Google Play ↗"; slide-over "Close" |
| `.sq-btn--ghost` | "Learn more ↗"; app-detail "Report a bug"; slide-over "Send another" |
| `.sq-btn--launch` | **Not used.** The violet→cyan gradient competes with the stage system on a page where the accent already means something. |
| `.site-btn--oninverse` | The only button that sits on an accent fill (§6.14) |

**States** are defined in `components.css` (hover: `translateY(-2px)` +
`--glow-tight`; active: `translateY(0)`). Add these, missing from the base:

```
.sq-btn:disabled,
.sq-btn[aria-disabled="true"] {
  background: var(--sq-slate-700);
  color: var(--sq-text-500);
  box-shadow: none;
  transform: none;
  cursor: not-allowed;
  pointer-events: none;   /* but keep it focusable via aria-disabled, not :disabled, on the submit */
}
.sq-btn.is-loading { pointer-events: none; }
```

**Loading state** (submit only): label swaps to "Sending…", a 16px spinner
(2px ring, `--accent-on`, `border-top-color: transparent`, 700ms linear
rotation) appears before the label, `aria-busy="true"`, `aria-disabled="true"`.
Button width is locked to its rest width (`min-width` captured before the swap)
so it does not reflow. Reduced motion: spinner is replaced by a static 3-dot
ellipsis; `aria-busy` still set.

**Touch sizing.** At ≤768px every `.sq-btn` gets `min-height: 44px`.
`.sq-btn--sm` (9px padding → ~34px) is desktop-only; below `md` it upgrades to
`--md` sizing.

---

### 6.16 Team member card — `.site-person`

**Anatomy.** `.sq-card`, `padding: var(--space-5)`, centred column.

- **Avatar** — 88px square, `border-radius: var(--icon-radius-pct)` (squircle,
  same shape language as the app tiles), `background: var(--surface-raised)`,
  `border: 1px solid var(--border-subtle)`, initials centred at
  `600 30px/1 var(--font-display)`, `letter-spacing: -0.01em`,
  `color: var(--text-tertiary)`.
- `--space-4` → `.sq-h3` "Placeholder name"
- `--space-2` → `.sq-mono` role
- `--space-3` → `.sq-body-sm` one-line note, max 30ch
- `--space-3` → `.site-mono-xs` time zone (`UTC+1`, `UTC−5`, `UTC+8`, `UTC+11`) —
  four distinct offsets so the "six time zones" headline is supported by visible
  data rather than asserted.

**States.**

| State | Treatment |
|---|---|
| Rest | as above |
| Hover | Avatar gains `box-shadow: 0 0 0 1px var(--accent)`; `--dur-fast`. Card border → `--border-strong`. No lift (not a link). |
| Focus | n/a |

**Grid.** 4-up ≥1024px (`span 3`), 2-up 480–1023px, 1-up below.

**Placeholder note.** Below the grid: `--space-5` → a `.sq-pill--muted` reading
`PLACEHOLDER` + `.sq-caption` "Photos and bios land when the crew's happy with
them." Left-aligned, in the container.

---

### 6.17 Value card — `.site-value`

Three cards: *Ship small, ship often* / *Answer everyone* / *No dark patterns*.

`.sq-card` at `--radius-md`, `padding: var(--space-6)`.
`.site-mono-xs` index → `--space-4` → `.sq-h3` title → `--space-3` → `.sq-body`.
Ambient violet. Hover: `border-color: var(--border-strong)` only. 3-up ≥768px.

The band containing them carries `.sq-cut-tr` (the Team view's one cut) and
`background: var(--surface-deep)`, full-bleed.

---

### 6.18 Marquee — `.site-marquee`

*(ToDesktop: edge-bleeding rows of icon tiles.)*

**Anatomy.** Full-bleed band, `padding-block: var(--space-6)`,
`border-block: 1px solid var(--border-subtle)`, `overflow: hidden`,
`mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)`.

A single track: five items (Plantswap, Vibecheck, Reverse Audit, and two
`.site-forge`-flavoured "In the forge" tiles), duplicated once for a seamless
loop (`aria-hidden="true"` on the duplicate). Each item:
`.sq-icontile` at `--tile-size: 56px` + `--space-3` gap + `.sq-mono` name.
Item gap `--space-8` (64px).

**States.**

| State | Treatment |
|---|---|
| Rest | `animation: marquee 36s linear infinite` on the track |
| Hover / focus-within | `animation-play-state: paused` |
| Reduced motion | Animation removed. Track becomes `overflow-x: auto` with the same mask; the five real items are all visible/scrollable. |

Marquee items on Studio are **not** links (the ledger rows below are the
navigation). The whole band is `aria-hidden="true"` — every app it names appears
as a real link within 400px of it.

---

### 6.19 Support slide-over — `.site-support`

**Trigger points.** Header "Report a bug"; hero "Report a bug"; Studio CTA panel;
app-detail hero ghost button; app-detail closing CTA; footer "Report a bug".

**Scrim.** `position: fixed; inset: 0; z-index: var(--z-scrim)`,
`background: rgba(2, 6, 23, 0.72)`, `backdrop-filter: blur(8px)`.
Click closes. `aria-hidden="true"`.

**Panel.** `position: fixed; top: 0; right: 0; height: 100dvh;`
`width: min(480px, 100vw - var(--space-6));` `z-index: var(--z-panel)`.
`background: var(--surface-raised)` — **solid, not glass.** The brand file is
explicit that glass muddies content sitting on top, and form fields on glass on a
blurred page are unreadable. `border-left: 1px solid var(--border-strong)`,
`border-radius: var(--radius-lg) 0 0 var(--radius-lg)`,
`box-shadow: var(--shadow-lift)`, `padding: var(--space-6)`,
`overflow-y: auto`, `overscroll-behavior: contain`.

`role="dialog" aria-modal="true" aria-labelledby="support-title"`.

**Header row.** `.sq-h1` (clamped by its own token to ~32px here) "Tell us
what's up" with `id="support-title"`, and a 44×44 close button (× glyph,
`--text-tertiary`, `aria-label="Close"`), `justify-content: space-between`.
`--space-6` below.

**Fields**, gap `--space-4` between field groups. Every field group is
`label` (`.sq-mono`, `--text-tertiary`, `--space-2` below) → control →
optional helper (`.sq-caption`) / error.

**1 — Kind selector.** `role="radiogroup" aria-labelledby="kind-label"`. 2×2 grid
of `<button role="radio">`, gap `--space-2`, each `min-height: 44px`,
`border-radius: var(--radius-sm)`, `padding: var(--space-3) var(--space-4)`,
label `500 14px`. Options: **Bug report** (default) / **Question** /
**Feature idea** / **Something nice**.

| State | Treatment |
|---|---|
| Rest | `background: var(--surface-card)`, `border: 1px solid var(--border-subtle)`, `color: var(--text-secondary)` |
| Hover | `background: var(--surface-card-hi)`, `border-color: var(--border-strong)` |
| Selected | `background: var(--tint-accent-08)`, `border-color: var(--accent)`, `color: var(--accent-text)`, `aria-checked="true"` |
| Focus-visible | Base ring, offset 2px |
| Keyboard | Arrow keys move selection within the group (roving `tabindex`); the group is one tab stop |

**2 — App.** `<select id="support-app">`, label "Which app?".
`height: 44px`, `border-radius: var(--radius-sm)`, `background:
var(--surface-card)`, `border: 1px solid var(--border-subtle)`,
`padding-inline: var(--space-4) var(--space-8)`, `appearance: none`, custom
chevron (SVG, `--text-tertiary`, `right: var(--space-4)`).
Options: `Plantswap`, `Vibecheck`, `Reverse Audit`, `Not app-specific`.
Pre-filled and pre-selected when opened from an app-detail view. Not required.

**3 — Email.** `<input type="email" id="support-email" required
autocomplete="email" inputmode="email">`. Label "Your email". Same box styling as
the select. Helper: "So we can reply. Nothing else, ever."

**4 — Message.** `<textarea id="support-message" required maxlength="1000"
rows="6">`, `min-height: 140px`, `resize: vertical`, same box styling,
`padding: var(--space-3) var(--space-4)`, `font: var(--text-body)`.
Below-right: char count, `.site-mono-xs`, `aria-live="off"`, format `0 / 1000`.

| Count | Colour |
|---|---|
| 0–899 | `--text-tertiary` |
| 900–999 | `--sq-warn` |
| 1000 | `--sq-bad` |

**5 — Diagnostics.** `<input type="checkbox" id="support-diag">` +
`<label>` "Attach anonymous diagnostics" + `.sq-caption` "App version, device
model, OS. No personal data." Checkbox 20×20, `border-radius: var(--radius-sm)`,
`border: 1px solid var(--border-strong)`. Checked: `background: var(--accent)`,
border transparent, a 12px check stroked in `var(--accent-on)`. The label + box
together form a ≥44px tap row.

**6 — Submit.** `.sq-btn--primary .sq-btn--md`, `width: 100%`,
`margin-top: var(--space-5)`. Label "Send it".

**Input states (applies to select, email, textarea):**

| State | Treatment |
|---|---|
| Rest | `background: var(--surface-card)`, `border: 1px solid var(--border-subtle)`, `color: var(--text-primary)` |
| Placeholder | `color: var(--sq-text-500)` |
| Hover | `border-color: var(--border-strong)` |
| Focus-visible | `border-color: var(--accent)` + base outline ring, offset 2px |
| Invalid | `border-color: var(--sq-bad)`, `aria-invalid="true"`, `aria-describedby` → error id |
| Disabled | `background: var(--sq-slate-700)`, `color: var(--sq-text-500)`, `cursor: not-allowed` |

**Validation.**

- Validate on `blur` (per field, only after first blur) and on `submit` (all).
- Never validate on `input` before a field has been blurred once. After a field
  has shown an error, re-validate on `input` so the error clears live.
- Rules: email non-empty and matches `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`;
  message non-empty and ≥10 characters.
- Error text: `.sq-caption`, `color: var(--sq-bad)`, prefixed with a `!` in a
  12px circle so the error is not colour-only. `--space-2` above the field's
  bottom edge.
  - Email empty → "We need an email to reply to."
  - Email malformed → "That doesn't look like an email address."
  - Message empty → "Tell us what happened."
  - Message <10 chars → "A little more detail, please."
- On failed submit: focus moves to the **first** invalid field, and a
  `role="status" aria-live="polite"` region at the top of the form announces
  "2 problems with your message." The region is visually a `.sq-card` with a
  `--sq-bad` left edge, listing the errors as links to their fields.

**Submit → success.** No backend. On valid submit: 700ms simulated latency in the
loading state, then the form cross-fades out and the success state cross-fades in
over `--dur-base` (both absolutely positioned in the same stacking box so the
panel does not jump).

**Success state:**
- 64px circle, `border: 2px solid var(--sq-ok)`, `background:
  color-mix(in srgb, var(--sq-ok) 12%, transparent)`, 28px check stroked
  `--sq-ok`. **Status green, not the accent** — per the brand rule that lime must
  never mean "pass".
- `--space-5` → `.sq-h4` "Message away."
- `--space-3` → `.sq-body` "We reply to everything, usually inside a day."
- `--space-3` → `.sq-mono` a fake reference id, `SQ-{6 hex}`, `--text-tertiary`.
- `--space-6` → `.sq-btn--ghost .sq-btn--md` "Send another" (resets the form,
  returns focus to the first field) and `.sq-btn--secondary .sq-btn--md`
  "Close".
- Focus moves to the success heading (`tabindex="-1"`), and a
  `role="status"` region announces "Message sent."

**Open / close behaviour.**

| Concern | Rule |
|---|---|
| Enter | Panel `translateX(100%) → 0` over `--dur-slow` (400ms) `--ease`; scrim `opacity 0 → 1` over `--dur-base` |
| Exit | Reverse, `--dur-base` (210ms) — closing is always faster than opening |
| Focus on open | First focusable element (the close button), **not** the first input — so screen-reader users hear the title and their escape route first |
| Focus trap | Tab cycles within the panel; Shift+Tab wraps backwards. Implement by querying focusable descendants on open and on DOM change |
| Esc | Closes, from anywhere in the panel, including inside the textarea |
| Focus on close | Returns to the element that opened it, stored on open |
| Background | `inert` attribute on the app root (fallback: `aria-hidden="true"` + `tabindex="-1"` sweep) |
| Body scroll | `overflow: hidden` on `<html>` plus `scrollbar-gutter: stable` on `<html>` at all times so the page does not shift horizontally |
| Route change while open | Panel closes first (`--dur-base`), then the route transition runs |
| Reduced motion | No `translateX`. Opacity fade only, 120ms, both directions |

**Responsive.** <520px the panel is full-width (`width: 100vw`),
`border-radius: 0`, `border-left: 0`, and gains a 4px `--border-strong` top
handle bar for affordance. Kind selector goes 1-up column.

---

### 6.20 Footer — `.site-footer`

**Anatomy.** Full-bleed, `background: var(--surface-deep)`,
`border-top: 1px solid var(--border-subtle)`, `padding-top: var(--space-8)`,
`overflow: hidden`, `position: relative`. Ambient violet on every route.

1. **Link band** — `.site-container`, grid `2fr 1fr 1fr 1fr`, `gap: var(--space-6)`:
   - Col 1: `assets/sidequest-wordmark.png` at 30px → `--space-4` →
     `.sq-tagline` lockup (horizontal, `Play. Build. Launch.`) → `--space-4` →
     `.sq-body-sm` "A remote studio. Three apps live, more in the forge."
   - Col 2 — `.sq-mono` heading "Apps": Plantswap / Vibecheck / Reverse Audit
   - Col 3 — `.sq-mono` heading "Studio": Studio / Team / Report a bug
   - Col 4 — `.sq-mono` heading "Say hello": the studio email as a `mailto:`
     link. *(See §9 — no other contact channels are specified.)*
   - Link items: `.sq-body-sm`, `--text-tertiary`; hover `--text-primary` with a
     1px `--accent` underline growing from the left, `--dur-fast`; gap
     `--space-2` between items.
2. **`--space-8`** → hairline `--border-subtle` across the container.
3. **Legal row** — `--space-5` padding-block, flex `space-between`, `.sq-mono`:
   left "© 2025–2026 sideQUESTdigital · Remote", right "Report a bug" (opens the
   slide-over, styled as a link).
4. **The giant wordmark** — `--space-9` above it. `sideQUEST` at
   `--text-wordmark` (`clamp(64px, 14vw, 220px)`, weight 700, tracking
   `-0.045em`), `color: var(--sq-slate-800)`, `white-space: nowrap`,
   `margin-bottom: calc(var(--space-8) * -1)` so the baseline and descender clip
   against the document's bottom edge. The **Q** is wrapped in a span at
   `color: var(--sq-violet-600)` — the wordmark's own rule, applied at 220px.
   `aria-hidden="true"` (the accessible wordmark is the `<img>` in col 1).

**Responsive.** <768px: link band stacks 1-up (col 1 first, then the three link
columns as a 3-up row at ≥480px, 1-up below); legal row stacks with `--space-3`
gap; giant wordmark clamps to 64px and stays clipped.

**States.** Static except link hovers.

---

### 6.21 Section header — `.site-sechead`

Reused everywhere so sections do not each invent a heading treatment.

`.sq-eyebrow` → `--space-3` → `.sq-h2` → (optional) `--space-4` →
`.sq-lead` at `--text-secondary`, max 56ch. Left-aligned in a 6-of-12 column at
≥1024px. Optional right-aligned `.sq-mono` counter on the same baseline as the
h2 (e.g. `03 APPS`, `04 RELEASES`) — a hairline rule fills the gap between the
h2 and the counter. That hairline-plus-counter is the site's section signature
and appears on every `<h2>`.

---

### 6.22 Skip link — `.site-skip`

`<a href="#main">` as the first focusable element.
Rest: `position: absolute; top: -100px`. Focus: `top: var(--space-4);
left: var(--space-4); z-index: 200`, styled `.sq-btn--primary .sq-btn--sm`.

---

## 7. Motion spec

Every duration and easing below is a token from `effects.css` or a `site.css`
composite. **No bare ms values in component CSS.**

| Name | Duration | Easing | Properties |
|---|---|---|---|
| `t-hover` | `--dur-fast` 130ms | `--ease` | `color`, `border-color`, `background`, `opacity` |
| `t-lift` | `--dur-base` 210ms | `--ease-snap` | `transform` only |
| `t-ui` | `--dur-base` 210ms | `--ease` | header height/background, input borders, scrim |
| `t-panel` | `--dur-slow` 400ms | `--ease` | slide-over `translateX`, accent cross-fade |
| `t-reveal` | `--dur-reveal` 520ms | `--ease` | scroll reveal `opacity` + `translateY` |
| `t-wipe` | `--dur-wipe` 420ms | `--ease` | route-change slash wipe |
| `t-count` | `--dur-count` 900ms | `--ease` | stat count-up |

### 7.1 Global rule

`effects.css` already ships a blanket
`@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`.
That kills durations but **not** transforms, parallax offsets, or JS-driven
animation. Every reduced-motion note below is therefore about behaviour the
blanket rule does not cover, and each must be implemented explicitly against
`window.matchMedia('(prefers-reduced-motion: reduce)')`.

### 7.2 Scroll reveal

- `IntersectionObserver`, `threshold: 0.15`, `rootMargin: '0px 0px -8% 0px'`,
  `unobserve` after first fire (reveal once, never re-hide).
- From `opacity: 0; transform: translateY(16px)` to `opacity: 1; translateY(0)`,
  `t-reveal`.
- **Staggered children:** `transition-delay: calc(var(--i) * 60ms)`, `--i` set
  per child, **capped at index 5** (delay never exceeds 300ms). Triad steps use
  90ms. Applies to: app ledger rows, app cards, feature cards, stat columns,
  triad steps, team cards, value cards, release rows (cap 5).
- Section headers and hero content are **not** revealed — above-the-fold content
  is painted at final state. Reveal starts at the first section below the hero.
- **Reduced motion:** observer is not attached; all elements render at final
  state on first paint. Do not rely on a CSS transition being fast — set the
  final class immediately.

### 7.3 Hero parallax

- Two layers, `rAF`-throttled `scroll` listener, `transform: translate3d(0, Ypx, 0)`:
  - `.sq-slash--beam`: `Y = scrollY * 0.12`
  - mark watermark: `Y = scrollY * 0.06`
- Disabled below 1024px (`matchMedia`), and unsubscribed once `scrollY > 900`.
- **Reduced motion:** listener never attached; both layers static.

### 7.4 Marquee

`@keyframes marquee { to { transform: translate3d(-50%, 0, 0) } }`,
`36s linear infinite` on a track duplicated exactly once.
Paused on `:hover` and `:focus-within`.
**Reduced motion:** animation removed, track becomes a horizontal scroller.

### 7.5 Stage Rail accent drive

- On Studio / Apps / Team: a `rAF`-throttled scroll handler computes
  `p = scrollY / (scrollHeight - innerHeight)` clamped `[0, 1]`.
- `p < 0.34` → `play`; `0.34 ≤ p < 0.67` → `build`; `p ≥ 0.67` → `launch`.
  The scope class is swapped on `<html>`, so `--accent` and everything reading it
  change once per band — **not** continuously interpolated. Interpolating three
  brand hexes through intermediate values would invent colours the brand does not
  own; band-switching keeps every rendered accent an exact token.
- The transition between bands is a 400ms (`t-panel`) cross-fade because
  `--accent` feeds `background`/`color`/`box-shadow` on elements that already
  carry transitions. Add `transition: background-color var(--dur-slow) var(--ease)`
  to `.sq-field::before` explicitly.
- The rail segment's `top` is `calc(p * (100vh - 64px))`, `t-ui`.
- **Locked on app detail:** handler not attached; scope set once from the route.
- **Reduced motion:** no cross-fade transition on the accent (instant swap is
  fine — it's a colour change, not motion), and the rail segment jumps rather
  than travels. The rail still functions.

### 7.6 Route change — the slash wipe

1. On route change, a full-viewport `.site-wipe` element
   (`position: fixed; inset: -20%; z-index: var(--z-wipe); pointer-events: none`)
   containing a 135° gradient band
   (`linear-gradient(var(--sword-angle), transparent 40%, var(--accent) 50%, transparent 60%)`)
   sweeps `translateX(-140%) → translateX(140%)` over `--dur-wipe` (420ms),
   `--ease`. `--accent` on the wipe is the **incoming** view's accent.
2. At **210ms** (mid-sweep, the blade covering the centre) the view swaps:
   old view unmounts, new view mounts, `window.scrollTo(0, 0)` instantly
   (`behavior: 'auto'`), stage scope updated on `<html>`.
3. At 420ms the wipe element is removed.
4. Focus moves to the new view's `<h1>` / `.sq-hero` (`tabindex="-1"`, and
   `outline: none` on that programmatic focus only — the focus-visible ring is
   noise here).
5. A `role="status" aria-live="polite"` region announces the new view's title
   ("Apps — sideQUESTdigital").
6. `document.title` updated.

**Reduced motion:** no wipe element. Old view fades to `opacity: 0` over 120ms,
swaps, new view fades in over 120ms. Steps 2–6 unchanged.

### 7.7 Hover motion budget

Transforms are permitted only on: `.sq-btn` (−2px), `.sq-card--link` /
`.site-appcard` (−3px), `.site-shot` (−6px), app-ledger icon tile (scale 1.03).
Nothing else moves on hover. Under reduced motion **all four become colour-only**
— explicitly override, because the blanket rule zeroes duration but still applies
the transform instantly, which is worse than not moving at all.

```css
@media (prefers-reduced-motion: reduce) {
  .sq-btn:hover, .sq-card--link:hover, .site-appcard:hover,
  .site-shot:hover, .site-approw:hover .sq-icontile { transform: none !important; }
}
```

---

## 8. Accessibility

### 8.1 Focus order

1. `.site-skip` skip link
2. Header: wordmark → Studio → Apps → Team → "Report a bug"
3. `#main` — view content in DOM order
4. Footer: link columns in reading order → legal-row "Report a bug"

The Stage Rail, marquee, hero watermark, slash elements, giant footer wordmark
and the marquee's duplicated track are all `aria-hidden="true"` and
`pointer-events: none`. None is a tab stop.

DOM order equals visual order everywhere. The one risk is the hero: the tagline
column is visually to the right of the headline but must come **after** the
headline, lead and CTAs in the DOM. Achieve the visual position with explicit
`grid-row` / `grid-column`, not with `order`.

### 8.2 Focus-visible treatment

Base (from `styles.css`): `2px solid var(--focus-ring)` (violet-400), offset 3px,
radius 4px. That ring is 6.46:1 on `--sq-night` — good.

**It fails on lime and cyan fills** (violet-400 on lime-400 ≈ 1.8:1). Override
for any focusable element sitting on an `--accent` fill inside
`.sq-stage-build` / `.sq-stage-launch`:

```css
.sq-stage-build .sq-card--accent :focus-visible,
.sq-stage-launch .sq-card--accent :focus-visible,
.site-btn--oninverse:focus-visible {
  outline: 2px solid var(--sq-ink);
  outline-offset: 2px;
  box-shadow: 0 0 0 5px rgba(248, 250, 252, 0.92);
}
```

Ink-on-lime is 11.67:1 and the white halo separates it from the fill. Never
remove `outline` without an equivalent replacement.

Rows that are full-bleed within their container (`.site-approw`) use
`outline-offset: -2px` so the ring is not clipped by the container's overflow.

### 8.3 Contrast decisions

- `--accent-text` is always the **400** step, never the 600. Violet-600 is
  3.09:1 on night — fill and 1px borders only, never text.
- Every `--accent` fill takes `--accent-on`. White on lime is 1.51:1 and white on
  cyan is 1.81:1; both are hard failures. This is the single highest-risk error
  on the site — add a lint note in the implementation PR.
- `--sq-text-500` (3.69:1) is **disabled text only**. Never body, never captions,
  never placeholder text that carries meaning. (It *is* used for input
  placeholders — acceptable because every input also has a persistent visible
  `<label>`, so no information lives only in the placeholder.)
- The `.sq-eyebrow` inside `.sq-card--accent` must be overridden to
  `--accent-on` at `opacity: 0.7` — the inherited `--accent-text` would be
  accent-on-accent.
- Status colours on `--sq-night`: `--sq-bad` #EF4444 4.55:1, `--sq-warn` #F59E0B
  8.7:1, `--sq-ok` #10B981 6.9:1 — all pass at 12px. Status is always
  accompanied by its word.

### 8.4 Reduced motion

Every clause in §7 has an explicit fallback. The blanket rule in `effects.css` is
necessary but not sufficient; implement the JS `matchMedia` guards for: scroll
reveal (§7.2), parallax (§7.3), marquee (§7.4), rail segment (§7.5), route wipe
(§7.6), count-up (§6.12), hover transforms (§7.7), slide-over translate (§6.19).

Also honour `prefers-reduced-transparency`: drop `backdrop-filter` on the header,
`.sq-glass`, `.sq-card` and the scrim, substituting `background:
var(--surface-raised)` and `rgba(2,6,23,0.94)` respectively.

### 8.5 Slide-over keyboard contract

Restated because it is the most-missed piece: focus trap on open, focus to the
close button, `Esc` closes from anywhere including the textarea, focus returns to
the trigger, `inert` on the background, body scroll locked with
`scrollbar-gutter: stable`, `role="dialog" aria-modal="true"` +
`aria-labelledby`. Tab from the last focusable wraps to the first.

### 8.6 Forms

- Every control has a **visible persistent `<label>`** with `for`/`id`. No
  placeholder-as-label anywhere.
- Required fields: `required` attribute plus the word "Required" in the label's
  `.sq-mono` run — never a bare red asterisk.
- Errors: `aria-invalid="true"` + `aria-describedby` pointing at the error's
  `id`. Error summary in `role="status" aria-live="polite"` at the top of the
  form on failed submit. Errors carry a `!` glyph so they are not colour-only.
- Char count is `aria-live="off"` (announcing every keystroke is hostile);
  instead the textarea's `aria-describedby` includes a static helper "Up to 1000
  characters."
- Kind selector is a real `radiogroup` with roving `tabindex` and arrow-key
  navigation — one tab stop, four options.
- Success is announced via `role="status"` and focus is moved to the success
  heading.

### 8.7 Touch, sizing, scaling

- Minimum tap target 44×44 at ≤768px. `.sq-btn--sm` upgrades to `--md` sizing
  below `md`. Nav trigger, close button and kind-selector options are already 44px.
- No fixed heights on any text-bearing container. Cards grow.
- `line-clamp` is used in exactly two places (app-ledger blurb: 2 lines;
  app-card blurb: 3 lines) and the full text is reachable one click away on the
  detail view.
- The site must survive `text-size-adjust` to 200% at 1280px without horizontal
  overflow. The clamp ceilings on `--text-display` and `--text-wordmark` are the
  main risk — both are `vw`-driven and therefore scale with the viewport, not the
  text size, which is correct.
- `html { scroll-behavior: smooth }` ships in `styles.css`; wrap it in
  `@media (prefers-reduced-motion: no-preference)`.

---

## 9. Per-view wireframes

Legend: `▛▜` full-bleed (100vw) · `▙▟` contained (1200px) · `┄` hairline rule

### 9.1 Studio — `#/`

```
▛▜  .site-header                       fixed, 72→56px, glass on scroll, VIOLET
     [wordmark]                    Studio  Apps  Team   [Report a bug ▸]
─────────────────────────────────────────────────────────────────────────────
│▌   .site-rail  (fixed left, ≥1360px)  PLAY ▍ BUILD ▍ LAUNCH  + travelling seg
─────────────────────────────────────────────────────────────────────────────
▛▜  .site-hero    .sq-field .sq-field--grid + ONE .sq-slash--beam @68%
▙▟   REMOTE STUDIO · EST. 2025                              (eyebrow, violet)
     ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
     ┌── cols 1–8 ─────────────────────┐ ┌── cols 9–12 ──┐
     │  Small apps.                    │ │        Play.  │  ← tagline stacked,
     │  Absurdly well made.            │ │       Build.  │    right-aligned,
     │        (132px, -0.04em)         │ │      Launch.  │    3 accents (legal)
     └─────────────────────────────────┘ └───────────────┘
     sideQUESTdigital is a remote crew that ships apps we'd
     actually keep on our own home screens. Three live, more
     in the forge.                                    (lead, ≤46ch, cols 1–6)

     [ See the apps ]  [ Report a bug ]              (btn lg primary/secondary)
                                        ⟨mark.png 520px @ 10%, on the beam⟩
─────────────────────────────────────────────────────────────────────────────
▛▜  .site-marquee    36s, edge-masked, aria-hidden
     ◧ Plantswap   ◧ Vibecheck   ◧ Reverse Audit   ◧ In the forge   ◧ …
─────────────────────────────────────────────────────────────────────────────
▙▟  .site-sechead   THE WORK  /  "Three live, more in the forge."  ┄┄ 03 APPS
     .site-approw × 3    (each stage-scoped; hairline separated)
     ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
     ◧96  Plantswap        Trade cuttings with…      ⟨BUILD⟩ v2.4.1  ← LIME
     ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
     ◧96  Vibecheck        One question a day…       ⟨PLAY⟩  v1.9.0  ← VIOLET
     ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
     ◧96  Reverse Audit    Point it at your subs…    ⟨LAUNCH⟩ v1.2.3 ← CYAN
     ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
                                                   [ See all apps → ]  ghost
─────────────────────────────────────────────────────────────────────────────
▙▟  .site-sechead   HOW WE WORK  /  "Three moves, in order."  ┄┄ 03 STAGES
     .site-triad--slashed   (radius-xl card, two 135° hairline slashes)
     ┌──────────────╲──────────────╲──────────────┐
     │ 01           ╲ 02           ╲ 03           │
     │ Play.        ╲ Build.       ╲ Launch.      │
     │ We build the ╲ Native on    ╲ Ship, listen,│
     │ daft version ╲ both platfor-╲ patch…       │
     │ first…       ╲ ms. No web   ╲              │
     │              ╲ view wearing ╲              │
     │              ╲ an app cost- ╲              │
     │              ╲ ume.         ╲              │
     └──────────────╲──────────────╲──────────────┘
      violet-400     lime-400       cyan-400
─────────────────────────────────────────────────────────────────────────────
▛▜  .site-stat band     background: --surface-deep, border-block hairline
▙▟   ┄┄┄┄┄┄┄┄┄┄┄  ┄┄┄┄┄┄┄┄┄┄┄  ┄┄┄┄┄┄┄┄┄┄┄  ┄┄┄┄┄┄┄┄┄┄┄
      3            2            <24h         100%      ← 88px, count-up
      APPS LIVE    PLATFORMS,   TYPICAL      REMOTE       <24h is accented
                   NATIVELY     FIRST REPLY
─────────────────────────────────────────────────────────────────────────────
▙▟  .site-cta   .sq-stage-launch  .sq-card--accent  .sq-cut-tr        ⟍CUT
     ┌──────────────────────────────────────────────────────────────⟍──┐
     │ SUPPORT                                                          │
     │ Found a bug? Brilliant. Tell us.        [ Report a bug ]  ← ink  │
     │ We read everything and usually reply the same day.        button │
     └──────────────────────────────────────────────────────────────────┘
       CYAN FILL · ALL TEXT --sq-ink · the page's one Launch moment
─────────────────────────────────────────────────────────────────────────────
▛▜  .site-footer      (§6.20)  — always violet, giant clipped wordmark
```

### 9.2 Apps index — `#/apps`

```
▛▜  .site-header  (violet)          ▏ .site-rail (violet, scroll-driven)
─────────────────────────────────────────────────────────────────────────────
▛▜  header band   .sq-field + ONE .sq-slash--beam @78%   pad-block --space-10
▙▟   THE CATALOGUE                                              (eyebrow)
     ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
     Everything we've shipped,                              (.sq-hero, 92px)
     and what's next.
     Three live. Two in the forge. We'd rather ship four good
     ones than forty.                                      (.sq-lead, ≤56ch)
─────────────────────────────────────────────────────────────────────────────
▙▟  2-col grid, gap --space-5, row-gap --space-6
     ┌─ .site-appcard  BUILD/LIME ─┐  ┌─ .site-appcard  PLAY/VIOLET ─┐
     │ ┌ art band 240px, lime bloom│  │ ┌ art band 240px, violet     │
     │ │ ◧88                       │  │ │ ◧88                        │
     │ │                  ⟨BUILD⟩  │  │ │                  ⟨PLAY⟩    │
     │ ├───────────────────────────│  │ ├────────────────────────────│
     │ │ Plantswap                 │  │ │ Vibecheck                  │
     │ │ Trade cuttings with peop… │  │ │ One question a day about…  │
     │ │ v2.4.1 · iOS · Android ·  │  │ │ v1.9.0 · iOS · Android ·   │
     │ │ 38 MB                     │  │ │ 22 MB                      │
     │ │ Learn more ↗              │  │ │ Learn more ↗               │
     └─────────────────────────────┘  └────────────────────────────-─┘
     ┌─ .site-appcard  LAUNCH/CYAN ┐  ┌─ .site-forge  (dashed, cut-tr) ⟍┐
     │ ┌ art band 240px, cyan      │  │           ⟨mark 48px @30%⟩      │
     │ │ ◧88             ⟨LAUNCH⟩  │  │           More to come          │
     │ ├───────────────────────────│  │           TWO IN THE FORGE      │
     │ │ Reverse Audit             │  │  We'll announce them when       │
     │ │ Point it at your subscri… │  │  they're worth announcing.      │
     │ │ v1.2.3 · iOS · Android ·  │  │                                 │
     │ │ 31 MB · Learn more ↗      │  │        (not a link, no hover)   │
     └─────────────────────────────┘  └─────────────────────────────────┘
─────────────────────────────────────────────────────────────────────────────
▛▜  .site-footer
```

### 9.3 App detail — `#/apps/{slug}`

`<main class="sq-stage-{build|play|launch}">` — the entire view is scoped.
Header and footer stay violet.

```
▛▜  .site-header  (VIOLET — never tinted)   ▏ .site-rail LOCKED on this stage
─────────────────────────────────────────────────────────────────────────────
▙▟  ← Back to apps                                    (.sq-btn--ghost --sm)
     .site-detailhero  .sq-card--raised radius-xl + grid + ONE beam @34%
     ┌───────────────────────────────────────────────────────────────────┐
     │  ┌────────┐   ⟨BUILD⟩  v2.4.1                                     │
     │  │ ◧ 160  │   Plantswap                              (.sq-h1 60px)│
     │  │ .sq-glow│   Trade cuttings with people down the road instead   │
     │  └────────┘   of letting them root in a jam jar forever.  (lead)  │
     │               (iOS · Android) (38 MB) (12+)      muted meta pills │
     │               [ App Store ↗ ] [ Google Play ↗ ]  Report a bug     │
     └───────────────────────────────────────────────────────────────────┘
─────────────────────────────────────────────────────────────────────────────
▛▜  .site-shotrail   FULL-BLEED, snap-scroll, last frame bleeds right
     first frame aligns to container ↓
     ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──
     │ SCR01│ │ SCR02│ │ SCR03│ │ SCR04│ │
     │   P  │ │   P  │ │   P  │ │   P  │ │   ← placeholder screens: stage
     │      │ │      │ │      │ │      │ │     field + 220px initial @8%
     │PLACE-│ │PLACE-│ │PLACE-│ │PLACE-│ │     + one 1px slash
     └──────┘ └──────┘ └──────┘ └──────┘ └──
     Caption  Caption  Caption  Caption        (.sq-mono, ≤28ch)
─────────────────────────────────────────────────────────────────────────────
▙▟  .site-sechead   WHAT IT DOES  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ 03 FEATURES
     ┌▌ 01 ─────────┐ ┌▌ 02 ─────────┐ ┌▌ 03 ─────────┐   ← .sq-card--edge
     │ Feature title│ │ Feature title│ │ Feature title│      3px accent stripe
     │ Description… │ │ Description… │ │ Description… │
     └──────────────┘ └──────────────┘ └──────────────┘
─────────────────────────────────────────────────────────────────────────────
▙▟  .site-sechead   RELEASE NOTES  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ 04 RELEASES
     ▌v2.4.1 │ Faster swap matching  ⟨LATEST⟩ │        12 JUN 2026
             │ Matching now runs locally…     │
     ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
      v2.4.0 │ Cutting care reminders         │        02 MAY 2026
     ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
      v2.3.2 │ …                              │        18 MAR 2026
     (version col = --accent-text mono; latest row = inset 3px accent bar)
─────────────────────────────────────────────────────────────────────────────
▙▟  .site-sechead   KNOWN ISSUES  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ 02 OPEN
      Photos rotate on some Androids         ⟨● INVESTIGATING⟩  ← --sq-warn
      Detail line…
     ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
      Notifications fire twice on iOS 18.2   ⟨● FIX IN REVIEW⟩   ← --sq-ok
      Detail line…                     STATUS COLOURS ONLY — never the accent
─────────────────────────────────────────────────────────────────────────────
▙▟  .site-cta  (this app's stage) .sq-card--accent .sq-cut-tr        ⟍CUT
     Something off in Plantswap?              [ Report a bug ]  ← ink button
     Tell us and we'll look today.               opens slide-over, pre-scoped
                                                 and pre-filled to this app
─────────────────────────────────────────────────────────────────────────────
▛▜  .site-footer  (VIOLET)
```

### 9.4 Team — `#/team`

```
▛▜  .site-header  (violet)          ▏ .site-rail (violet, scroll-driven)
─────────────────────────────────────────────────────────────────────────────
▛▜  header band  .sq-field + ONE .sq-slash--beam @72%
▙▟   THE CREW                                                    (eyebrow)
     ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
     Six time zones, one group chat,                        (.sq-hero 92px)
     no office plant.
─────────────────────────────────────────────────────────────────────────────
▙▟  4-col grid (span 3 each), gap --space-5
     ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
     │  ▢ LQ  │ │  ▢ AB  │ │  ▢ CD  │ │  ▢ EF  │   ← 88px squircle, initials
     │Placehol│ │Placehol│ │Placehol│ │Placehol│      accent ring on hover
     │der name│ │der name│ │der name│ │der name│
     │ROLE    │ │ROLE    │ │ROLE    │ │ROLE    │      (.sq-mono)
     │one-line│ │one-line│ │one-line│ │one-line│      (.sq-body-sm)
     │UTC+1   │ │UTC−5   │ │UTC+8   │ │UTC+11  │      (.site-mono-xs)
     └────────┘ └────────┘ └────────┘ └────────┘
     ⟨PLACEHOLDER⟩  Photos and bios land when the crew's happy with them.
─────────────────────────────────────────────────────────────────────────────
▛▜  values band   --surface-deep, full-bleed, .sq-cut-tr           ⟍CUT
▙▟   WHAT WE ACTUALLY DO  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ 03 VALUES
     ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
     │ 01           │ │ 02           │ │ 03           │
     │ Ship small,  │ │ Answer       │ │ No dark      │
     │ ship often   │ │ everyone     │ │ patterns     │
     │ body copy…   │ │ body copy…   │ │ body copy…   │
     └──────────────┘ └──────────────┘ └──────────────┘
─────────────────────────────────────────────────────────────────────────────
▙▟  .site-cta   (violet — Team is ambient; NOT stage-scoped)
     Want to work with us, or on us?   [ Say hello ]  → opens slide-over
                                                        kind = "Something nice"
─────────────────────────────────────────────────────────────────────────────
▛▜  .site-footer
```

### 9.5 Support slide-over — overlay, no route

```
                                        ╔═══════════════════════════════╗
   scrim rgba(2,6,23,.72) + blur(8px)   ║  .site-support  480px          ║
   click closes                         ║  --surface-raised (SOLID)      ║
                                        ║                                ║
                                        ║  Tell us what's up        [×]  ║ 44px
                                        ║                                ║
                                        ║  WHAT KIND?                    ║ mono
                                        ║  ┌────────────┬────────────┐   ║
                                        ║  │ Bug report │ Question   │   ║ radio
                                        ║  ├────────────┼────────────┤   ║ group
                                        ║  │Feature idea│Something   │   ║ 44px
                                        ║  │            │nice        │   ║
                                        ║  └────────────┴────────────┘   ║
                                        ║                                ║
                                        ║  WHICH APP?                    ║
                                        ║  ┌────────────────────────┐▾   ║ 44px
                                        ║  │ Plantswap              │    ║
                                        ║  └────────────────────────┘    ║
                                        ║                                ║
                                        ║  YOUR EMAIL  · REQUIRED        ║
                                        ║  ┌────────────────────────┐    ║ 44px
                                        ║  └────────────────────────┘    ║
                                        ║  So we can reply. Nothing      ║
                                        ║  else, ever.                   ║
                                        ║                                ║
                                        ║  WHAT HAPPENED?  · REQUIRED    ║
                                        ║  ┌────────────────────────┐    ║
                                        ║  │                        │    ║ 140px
                                        ║  │                        │    ║ min
                                        ║  └────────────────────────┘    ║
                                        ║                     0 / 1000   ║ mono
                                        ║                                ║
                                        ║  ☐ Attach anonymous            ║ 20px
                                        ║    diagnostics                 ║ box
                                        ║    App version, device model,  ║
                                        ║    OS. No personal data.       ║
                                        ║                                ║
                                        ║  ┌────────────────────────┐    ║
                                        ║  │       Send it          │    ║ full
                                        ║  └────────────────────────┘    ║ width
                                        ╚════════════════════════════════╝
                                          slides in from right, 400ms
                                          exits in 210ms

   ── SUCCESS STATE (cross-fades in place, panel does not resize) ────────
                                        ╔════════════════════════════════╗
                                        ║                           [×]  ║
                                        ║            ╭───╮               ║ 64px
                                        ║            │ ✓ │  --sq-ok      ║ ring
                                        ║            ╰───╯  NOT accent   ║
                                        ║        Message away.           ║ h4
                                        ║  We reply to everything,       ║
                                        ║  usually inside a day.         ║
                                        ║        SQ-4F9A2C               ║ mono
                                        ║   [ Send another ]  [ Close ]  ║
                                        ╚════════════════════════════════╝
```

---

## 10. Open questions and assumptions

### 10.1 Blocking — implementer or Luke must decide

1. **Mobbin references were not viewable from this session.** The MCP server was
   unreachable and the section URLs are auth-gated (403). This spec is derived
   from the token files (read in full) plus the written descriptions of the seven
   references. If a re-run with working Mobbin access surfaces a changelog,
   support-panel, product-detail, team-page or footer reference that contradicts
   §6.10, §6.19, §6.7, §6.16 or §6.20, those five sections are the ones to
   revisit. Nothing else in the spec depends on an unseen image.
2. **App icons.** `assets/` contains one generic `sidequest-icon-night.png`. All
   three apps currently share it. Either supply three real icons or accept that
   every tile on the site is the same image — which materially weakens the app
   ledger, the app cards and the marquee. **Recommend supplying three icons
   before build.**
3. **Store URLs.** No App Store or Google Play links were given. Placeholder
   `href="#"` with `aria-disabled` is not acceptable on a live studio site —
   either supply real URLs or the store buttons should be omitted per app until
   they exist.
4. **Contact email.** The footer's "Say hello" column needs a real `mailto:`.
   None was specified.
5. **Release-notes and known-issues content.** The brief specifies the *shape*
   (version / note / date; text + status) but no actual entries. The wireframes
   use invented examples as placeholders. Supply 3–4 real releases and 0–2 real
   issues per app, or the section ships as visible filler.
6. **Feature card content.** "3 each" is specified; the titles and copy are not.
7. **Team roles.** Four placeholder people with roles — the roles themselves are
   unspecified. Assumed generic (e.g. `ENGINEERING`, `DESIGN`, `SUPPORT`,
   `EVERYTHING ELSE`); confirm or replace.

### 10.2 Deliberate decisions taken here (not in the brief)

| Decision | Rationale |
|---|---|
| Studio apps preview is a **ledger row list**, not a 3-up card grid | Differentiates from the Apps index; reads as a working studio index; each row can carry its own stage scope legitimately |
| Apps index uses **full-bleed tinted cards**, not ledger rows | The two views must not duplicate each other; matches the Webflow marketplace reference |
| `.sq-triad--gradient` is **not** used | The flat violet→cyan panel is the single loudest block in the brand sheet; on a near-black page it recreates exactly the generic "gradient triad strip" the brief is trying to escape |
| `.sq-btn--launch` is **not** used | Its gradient competes with the stage system on a site where accent = information |
| `--grad-quest` is **not** used | Would put all three accents on a non-tagline, non-triad surface, against the brand rule |
| Studio support CTA is **cyan** (Launch) | Support = ship, listen, patch. The accent is earned, and it is the payoff of the rail's violet→cyan descent |
| Stage Rail switches accent in **three bands**, not continuous interpolation | Interpolating between brand hexes would render colours the brand does not own |
| Team time zones added to member cards | Turns the headline's claim into visible data; placeholder-safe |
| Placeholder screenshots are **designed**, not grey boxes | The site is the portfolio piece; a grey rectangle is the tell |
| Giant clipped footer wordmark | The brand's own wordmark rule (violet Q) applied at 220px; costs nothing, high recall |
| Slide-over panel is **solid**, not glass | `effects.css` says explicitly to use `.sq-solid` "when content sits on top and glass would muddy it" — a form is exactly that case |
| Two slashes on the triad | Documented exception; they are structure, not decoration. The only surface on the site with more than one |

### 10.3 Things the implementer must not silently change

- The `--accent-on` discipline on every accent fill (§5.7). This is the one
  failure that is both easy to make and a hard WCAG failure.
- `--accent-text` is always the 400 step.
- Status colours never borrow the accent, and lime never means "pass".
- One `.sq-slash--beam` and one `.sq-cut-*` per view, plus the documented triad
  exception.
- The tracking rule: nothing between `-0.005em` and `+0.06em` exists on this site.
- Spacing values come from `--space-1…10` only.
```
