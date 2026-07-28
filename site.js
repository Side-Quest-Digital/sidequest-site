/* ============================================================================
   sideQUESTdigital — site
   Vanilla JS, no build step. Implements design/design-spec.md.
   ============================================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  /* The tile supplies the night background; the artwork inside it is the bare
     transparent mark. Nesting the full icon-night tile would double the border. */
  var MARK = 'assets/sidequest-mark.png';

  /* ---------------------------------------------------------------- data -- */

  var STAGES = {
    play:   { cls: 'sq-stage-play',   label: 'Play' },
    build:  { cls: 'sq-stage-build',  label: 'Build' },
    launch: { cls: 'sq-stage-launch', label: 'Launch' }
  };

  var APPS = [
    {
      id: 'plantswap', name: 'Plantswap', initial: 'P', stage: 'build',
      tagline: 'Trade cuttings with people down the road instead of letting them root in a jam jar forever.',
      blurb: 'A local swap board for houseplants. List what you have spare, find what you want, meet somewhere sensible. No shipping, no shop.',
      platforms: 'iOS · Android', version: '2.4.1', size: '38 MB', age: '12+',
      shots: [
        { label: 'SCREEN 01', caption: 'Nearby swaps, mapped' },
        { label: 'SCREEN 02', caption: 'Your shelf' },
        { label: 'SCREEN 03', caption: 'Swap chat' },
        { label: 'SCREEN 04', caption: 'Care reminders' }
      ],
      features: [
        { title: 'Local first', body: 'Everything is filtered by walking, cycling or short-drive distance. Nothing ships.' },
        { title: 'Your shelf', body: 'Photograph a plant once; it becomes a listing, a care log and a swap record.' },
        { title: 'Swap chat', body: 'Arrange the handover without giving out a phone number.' }
      ],
      changes: [
        { ver: '2.4.1', date: '2026-07-18', head: 'Map pins behave in dense cities', note: 'Fixed the cluster that hid swaps when too many listings shared one street.' },
        { ver: '2.4.0', date: '2026-07-02', head: 'Care reminders respect your timezone', note: 'They now fire at the hour you actually set, wherever you happen to be.' },
        { ver: '2.3.2', date: '2026-06-11', head: 'Faster photo upload', note: 'Large photos compress on device before they leave it.' }
      ],
      issues: [
        { title: 'Duplicate notifications on Android 15', text: 'Some swap alerts arrive twice within a few seconds.', status: 'review' },
        { title: 'Cultivar spellings missed in search', text: 'Species search does not match every cultivar variant yet.', status: 'investigating' }
      ]
    },
    {
      id: 'vibecheck', name: 'Vibecheck', initial: 'V', stage: 'play',
      tagline: 'One question a day about how you actually felt. Ten seconds, then it leaves you alone.',
      blurb: 'A mood tracker that refuses to become homework. One prompt a day, a colour for the answer, and a year view that quietly shows you the pattern.',
      platforms: 'iOS · Android', version: '1.9.0', size: '22 MB', age: '4+',
      shots: [
        { label: 'SCREEN 01', caption: "Today's prompt" },
        { label: 'SCREEN 02', caption: 'Year in colour' },
        { label: 'SCREEN 03', caption: 'Streaks, gently' },
        { label: 'SCREEN 04', caption: 'Export and leave' }
      ],
      features: [
        { title: 'Ten seconds', body: 'One prompt, one tap. Skip a day and nothing scolds you for it.' },
        { title: 'Year in colour', body: 'A full year on one screen. Patterns surface without a single chart.' },
        { title: 'On device', body: 'Entries never leave your phone unless you export them yourself.' }
      ],
      changes: [
        { ver: '1.9.0', date: '2026-07-21', head: 'Widgets, finally', note: 'Home screen widgets on both platforms, in the same colours as your year.' },
        { ver: '1.8.1', date: '2026-06-30', head: 'Colour picker on small screens', note: 'Fixed the picker clipping on devices under five inches.' },
        { ver: '1.8.0', date: '2026-06-09', head: 'CSV export', note: 'Take your entries with you whenever you like. No account needed.' }
      ],
      issues: [
        { title: 'Year view slows past 400 entries', text: 'Older devices stutter when scrubbing a dense year.', status: 'open' }
      ]
    },
    {
      id: 'reverse-audit', name: 'Reverse Audit', initial: 'R', stage: 'launch',
      tagline: 'Point it at your subscriptions and it argues, politely, for cancelling most of them.',
      blurb: 'A subscription auditor that starts from the assumption you should cancel. Scan your statements, see the real annual cost, and get a cancel script you can actually send.',
      platforms: 'iOS · Android', version: '1.2.3', size: '31 MB', age: '12+',
      shots: [
        { label: 'SCREEN 01', caption: 'The verdict list' },
        { label: 'SCREEN 02', caption: 'True annual cost' },
        { label: 'SCREEN 03', caption: 'Cancel script' },
        { label: 'SCREEN 04', caption: 'Household view' }
      ],
      features: [
        { title: 'Guilty until useful', body: 'Every subscription starts flagged. You justify keeping it, not the other way round.' },
        { title: 'True cost', body: 'Monthly prices shown as what they actually cost you over a year.' },
        { title: 'Cancel scripts', body: 'Pre-written, firm and polite. Copy, send, done.' }
      ],
      changes: [
        { ver: '1.2.3', date: '2026-07-24', head: 'Foreign-currency renewals', note: 'Annual renewals billed abroad are now detected and converted properly.' },
        { ver: '1.2.0', date: '2026-07-05', head: 'Shared household audits', note: 'Audit a household together without sharing bank logins.' },
        { ver: '1.1.4', date: '2026-06-14', head: 'No more duplicates on re-scan', note: 'Re-scanning a statement stops creating a second copy of every entry.' }
      ],
      issues: [
        { title: "Some challenger bank exports won't parse", text: 'A handful of statement formats are not supported yet.', status: 'open' },
        { title: 'Household invites expire too quickly', text: 'Invites time out after an hour, which is too tight.', status: 'review' }
      ]
    }
  ];

  var TEAM = [
    { initials: 'AM', role: 'Founder · iOS',   note: 'Writes the Swift, argues for fewer features.', tz: 'UTC+1' },
    { initials: 'JK', role: 'Android',         note: 'Believes in Material until it stops being useful.', tz: 'UTC−5' },
    { initials: 'SR', role: 'Design',          note: 'Owns the sword, the violet and the kerning.', tz: 'UTC+8' },
    { initials: 'DB', role: 'Support · QA',    note: 'Reads every bug report. Yes, really.', tz: 'UTC+11' }
  ];

  var VALUES = [
    { title: 'Ship small, ship often', body: 'A version every couple of weeks beats a masterpiece next year.' },
    { title: 'Answer everyone', body: 'Every report gets a reply from a person who can actually fix it.' },
    { title: 'No dark patterns', body: 'No fake urgency, no buried unsubscribe, no selling you on.' }
  ];

  var TRIAD = [
    { key: 'play',   label: 'Play.',   note: "We build the daft version first. If it isn't fun to hold at week one, it never will be." },
    { key: 'build',  label: 'Build.',  note: 'Native on both platforms. No web view wearing an app costume.' },
    { key: 'launch', label: 'Launch.', note: 'Ship, listen, patch. Every bug report lands in the channel we work in.' }
  ];

  var STATUS = {
    open:          { label: 'Open',          cls: 'site-status--open' },
    investigating: { label: 'Investigating', cls: 'site-status--investigating' },
    review:        { label: 'Fix in review', cls: 'site-status--review' }
  };

  var KINDS = ['Bug report', 'Question', 'Feature idea', 'Something nice'];

  /* ------------------------------------------------------------- helpers -- */

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function appById(id) {
    for (var i = 0; i < APPS.length; i++) if (APPS[i].id === id) return APPS[i];
    return null;
  }

  function fmtDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    var m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return d.getDate() + ' ' + m[d.getMonth()] + ' ' + d.getFullYear();
  }

  function setStage(stage) {
    var root = document.documentElement;
    root.classList.remove('sq-stage-play', 'sq-stage-build', 'sq-stage-launch');
    root.classList.add(STAGES[stage].cls);
  }

  function announce(msg) {
    var el = $('[data-announce]');
    if (el) { el.textContent = ''; setTimeout(function () { el.textContent = msg; }, 30); }
  }

  /* ------------------------------------------------------------ partials -- */

  function tile(size, cls) {
    return '<span class="sq-icontile sq-icontile--night ' + (cls || '') + '">' +
             '<img class="sq-icontile__mark" src="' + MARK + '" alt="">' +
           '</span>';
  }

  function sechead(eyebrow, title, count, lead) {
    return '<header class="site-sechead">' +
      '<p class="sq-eyebrow">' + esc(eyebrow) + '</p>' +
      '<div class="site-sechead__top">' +
        '<h2 class="sq-h2">' + esc(title) + '</h2>' +
        '<span class="site-sechead__rule"></span>' +
        '<span class="sq-mono site-sechead__count">' + esc(count) + '</span>' +
      '</div>' +
      (lead ? '<p class="sq-lead site-sechead__lead">' + esc(lead) + '</p>' : '') +
    '</header>';
  }

  function ctaPanel(stage, eyebrow, head, sub, label, appId) {
    return '<section class="site-section ' + STAGES[stage].cls + '" data-reveal>' +
      '<div class="site-container">' +
        '<div class="sq-card sq-card--accent sq-cut-tr site-cta">' +
          '<div>' +
            '<p class="sq-eyebrow">' + esc(eyebrow) + '</p>' +
            '<h2 class="sq-h2">' + esc(head) + '</h2>' +
            '<p class="sq-body site-cta__sub">' + esc(sub) + '</p>' +
          '</div>' +
          '<button class="sq-btn sq-btn--lg site-btn--oninverse" data-support-open' +
            (appId ? ' data-app="' + appId + '"' : '') + '>' + esc(label) + '</button>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  /* --------------------------------------------------------------- views -- */

  function viewStudio() {
    var rows = APPS.map(function (a, i) {
      return '<a class="site-approw ' + STAGES[a.stage].cls + '" href="#/apps/' + a.id + '"' +
             ' data-reveal style="--i:' + i + '">' +
        '<span class="site-approw__sweep" aria-hidden="true"></span>' +
        '<span class="site-approw__icon">' + tile(96) + '</span>' +
        '<span class="site-approw__body">' +
          '<span class="sq-h3 site-approw__name">' + esc(a.name) + '</span>' +
          '<span class="sq-body-sm site-approw__blurb">' + esc(a.tagline) + '</span>' +
        '</span>' +
        '<span class="site-approw__meta">' +
          '<span class="sq-pill"><span class="sq-pill__dot"></span>' + esc(STAGES[a.stage].label) + '</span>' +
          '<span class="sq-mono">v' + esc(a.version) + '</span>' +
          '<span class="sq-mono">' + esc(a.platforms) + '</span>' +
        '</span>' +
      '</a>';
    }).join('');

    var marqueeItems = APPS.map(function (a) {
      return '<span class="site-marquee__item">' + tile(56) +
             '<span class="sq-mono">' + esc(a.name) + '</span></span>';
    }).join('') +
      '<span class="site-marquee__item">' + tile(56) + '<span class="sq-mono">In the forge</span></span>' +
      '<span class="site-marquee__item">' + tile(56) + '<span class="sq-mono">In the forge</span></span>';

    var triad = TRIAD.map(function (t, i) {
      return '<div class="site-triad__step site-triad__step--' + t.key + '" data-reveal style="--i:' + (i * 1.5) + '">' +
        '<span class="site-mono-xs sq-mono site-triad__idx">0' + (i + 1) + '</span>' +
        '<span class="site-triad__label">' + esc(t.label) + '</span>' +
        '<p class="site-triad__note">' + esc(t.note) + '</p>' +
      '</div>';
    }).join('');

    var stats = [
      { num: '3',    label: 'Apps live' },
      { num: '2',    label: 'Platforms, natively' },
      { num: '<24h', label: 'Typical first reply', accent: true },
      { num: '100%', label: 'Remote, since day one' }
    ].map(function (s, i) {
      return '<div class="sq-stat site-stat" data-reveal style="--i:' + i + '">' +
        '<span class="sq-stat__num' + (s.accent ? ' sq-stat__num--accent' : '') + '"' +
          ' data-count-to="' + esc(s.num) + '">' + esc(s.num) + '</span>' +
        '<span class="sq-stat__label">' + esc(s.label) + '</span>' +
      '</div>';
    }).join('');

    return '' +
    '<section class="site-hero site-band sq-field--grid">' +
      '<div class="sq-slash sq-slash--beam" style="--slash-x:68%" data-parallax="0.12" aria-hidden="true"></div>' +
      '<img class="site-hero__mark" src="assets/sidequest-mark.png" alt="" data-parallax="0.06" aria-hidden="true">' +
      '<div class="site-container">' +
        '<p class="sq-eyebrow">Remote studio · Est. 2025</p>' +
        '<div class="site-hero__rule"></div>' +
        '<div class="site-hero__row">' +
          '<h1 class="site-hero__display">Small apps.<br>Absurdly well made.</h1>' +
          '<p class="sq-tagline site-hero__tagline">' +
            '<span class="sq-tagline__play">Play.</span>' +
            '<span class="sq-tagline__build">Build.</span>' +
            '<span class="sq-tagline__launch">Launch.</span>' +
          '</p>' +
        '</div>' +
        '<p class="sq-lead site-hero__lead">sideQUESTdigital is a remote crew that ships apps ' +
          "we'd actually keep on our own home screens. Three live, more in the forge.</p>" +
        '<div class="site-hero__cta">' +
          '<a class="sq-btn sq-btn--lg sq-btn--primary" href="#/apps">See the apps</a>' +
          '<button class="sq-btn sq-btn--lg sq-btn--secondary" data-support-open>Report a bug</button>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<div class="site-marquee site-band" aria-hidden="true">' +
      '<div class="site-marquee__track">' + marqueeItems + marqueeItems + '</div>' +
    '</div>' +

    '<section class="site-section">' +
      '<div class="site-container">' +
        sechead('The work', 'Three live, more in the forge.', '03 apps',
                'Every one of them is something at least one of us wanted on their own phone first.') +
        '<div class="site-ledger">' + rows + '</div>' +
        '<div class="site-approw__more">' +
          '<a class="sq-btn sq-btn--md sq-btn--ghost" href="#/apps">See all apps →</a>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<section class="site-section">' +
      '<div class="site-container">' +
        sechead('How we work', 'Three moves, in order.', '03 stages') +
        '<div class="sq-card site-triad">' +
          '<span class="site-triad__slash" style="left:33.333%" aria-hidden="true"></span>' +
          '<span class="site-triad__slash" style="left:66.666%" aria-hidden="true"></span>' +
          triad +
        '</div>' +
      '</div>' +
    '</section>' +

    '<div class="site-statband site-band">' +
      '<div class="site-container">' +
        '<div class="site-statgrid">' + stats + '</div>' +
      '</div>' +
    '</div>' +

    ctaPanel('launch', 'Support', 'Found a bug? Brilliant. Tell us.',
             'No ticket portal, no bot. It goes straight to the people who wrote the code.',
             'Report a bug');
  }

  function viewApps() {
    var cards = APPS.map(function (a, i) {
      return '<a class="sq-card sq-card--link site-appcard ' + STAGES[a.stage].cls + '"' +
             ' href="#/apps/' + a.id + '" data-reveal style="--i:' + i + '">' +
        '<span class="site-appcard__art">' +
          tile(88, 'site-appcard__tile') +
          '<span class="sq-pill site-appcard__stage"><span class="sq-pill__dot"></span>' +
            esc(STAGES[a.stage].label) + '</span>' +
        '</span>' +
        '<span class="site-appcard__body">' +
          '<span class="sq-h3">' + esc(a.name) + '</span>' +
          '<span class="sq-body-sm site-appcard__blurb">' + esc(a.blurb) + '</span>' +
          '<span class="sq-mono site-appcard__meta">v' + esc(a.version) + ' · ' +
            esc(a.platforms) + ' · ' + esc(a.size) + '</span>' +
          '<span class="site-appcard__more">Learn more ' +
            '<span class="site-appcard__arrow" aria-hidden="true">↗</span></span>' +
        '</span>' +
      '</a>';
    }).join('');

    return '' +
    '<section class="site-section site-section--statement site-band" style="padding-top:calc(var(--header-h) + var(--space-9))">' +
      '<div class="sq-slash sq-slash--beam" style="--slash-x:78%" aria-hidden="true"></div>' +
      '<div class="site-container">' +
        '<p class="sq-eyebrow">The catalogue</p>' +
        "<h1 class=\"sq-hero\">Everything we've shipped,<br>and what's next.</h1>" +
        '<p class="sq-lead site-hero__lead">Pick an app for release notes, known issues, and a direct ' +
          'line to the people who maintain it.</p>' +
      '</div>' +
    '</section>' +

    '<section class="site-section" style="padding-top:0">' +
      '<div class="site-container">' +
        '<div class="site-appgrid">' + cards +
          '<div class="site-forge sq-cut-tr" data-reveal style="--i:3">' +
            '<img src="assets/sidequest-mark.png" alt="" aria-hidden="true">' +
            '<h3 class="sq-h3">More to come</h3>' +
            '<p class="sq-mono">Two in the forge</p>' +
            '<p class="sq-caption">We\'ll announce them when they\'re worth announcing.</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  function viewApp(app) {
    var shots = app.shots.map(function (s, i) {
      return '<figure class="site-shot">' +
        '<div class="sq-screen">' +
          '<div class="sq-screen__notch" aria-hidden="true"></div>' +
          '<div class="sq-screen__inner site-shot__inner" role="img"' +
               ' aria-label="Placeholder screenshot ' + (i + 1) + ' of ' + app.shots.length +
               ' — ' + esc(app.name) + '">' +
            '<span class="site-shot__initial" aria-hidden="true">' + esc(app.initial) + '</span>' +
            '<span class="sq-mono site-shot__tag">' + esc(s.label) + '</span>' +
            '<span class="sq-mono site-shot__ph">Placeholder</span>' +
            '<span class="sq-slash" style="--slash-x:70%;opacity:.35" aria-hidden="true"></span>' +
          '</div>' +
        '</div>' +
        '<figcaption class="sq-mono">' + esc(s.caption) + '</figcaption>' +
      '</figure>';
    }).join('');

    var features = app.features.map(function (f, i) {
      return '<div class="sq-card sq-card--edge site-feature" data-reveal style="--i:' + i + '">' +
        '<span class="sq-mono">0' + (i + 1) + '</span>' +
        '<h3 class="sq-h3 site-feature__title">' + esc(f.title) + '</h3>' +
        '<p class="sq-body site-feature__body">' + esc(f.body) + '</p>' +
      '</div>';
    }).join('');

    var releases = app.changes.map(function (c, i) {
      return '<li class="site-release' + (i === 0 ? ' is-latest' : '') + '" data-reveal style="--i:' + i + '">' +
        '<span class="sq-mono site-release__ver">v' + esc(c.ver) + '</span>' +
        '<div class="site-release__body">' +
          '<h3 class="sq-h4">' + esc(c.head) +
            (i === 0 ? '<span class="sq-pill sq-pill--solid site-release__latest">Latest</span>' : '') +
          '</h3>' +
          '<p class="sq-body-sm site-release__note">' + esc(c.note) + '</p>' +
        '</div>' +
        '<time class="sq-mono site-release__date" datetime="' + esc(c.date) + '">' +
          esc(fmtDate(c.date)) + '</time>' +
      '</li>';
    }).join('');

    var issues = app.issues.length
      ? app.issues.map(function (n, i) {
          var st = STATUS[n.status];
          return '<li class="site-issue" data-reveal style="--i:' + i + '">' +
            '<div>' +
              '<h3 class="sq-h4">' + esc(n.title) + '</h3>' +
              '<p class="sq-body-sm site-issue__text">' + esc(n.text) + '</p>' +
            '</div>' +
            '<span class="sq-pill site-status ' + st.cls + '">' +
              '<span class="sq-pill__dot"></span>' + esc(st.label) + '</span>' +
          '</li>';
        }).join('')
      : '<li class="sq-card site-allclear">' +
          '<span class="sq-pill sq-pill--solid">All clear</span>' +
          '<p class="sq-body-sm">Nothing outstanding. Tell us if you find something.</p>' +
        '</li>';

    return '' +
    '<section class="site-section site-band" style="padding-top:calc(var(--header-h) + var(--space-7))">' +
      '<div class="site-container">' +
        '<a class="sq-btn sq-btn--sm sq-btn--ghost site-back" href="#/apps">← All apps</a>' +
        '<div class="sq-card sq-card--raised sq-field--grid site-detailhero">' +
          '<div class="sq-slash sq-slash--beam" style="--slash-x:34%" aria-hidden="true"></div>' +
          '<div>' + tile(160, 'site-detailhero__tile sq-glow') + '</div>' +
          '<div>' +
            '<div class="site-detailhero__top">' +
              '<span class="sq-pill sq-pill--solid">' + esc(STAGES[app.stage].label) + '</span>' +
              '<span class="sq-mono">Version ' + esc(app.version) + '</span>' +
            '</div>' +
            '<h1 class="sq-h1 site-detailhero__name">' + esc(app.name) + '</h1>' +
            '<p class="sq-lead site-detailhero__blurb">' + esc(app.blurb) + '</p>' +
            '<div class="site-detailhero__pills">' +
              '<span class="sq-pill sq-pill--muted">' + esc(app.platforms) + '</span>' +
              '<span class="sq-pill sq-pill--muted">' + esc(app.size) + '</span>' +
              '<span class="sq-pill sq-pill--muted">' + esc(app.age) + '</span>' +
            '</div>' +
            '<div class="site-detailhero__actions">' +
              '<span class="sq-btn sq-btn--md" aria-disabled="true">App Store ↗</span>' +
              '<span class="sq-btn sq-btn--md" aria-disabled="true">Google Play ↗</span>' +
              '<button class="sq-btn sq-btn--md sq-btn--primary" data-support-open data-app="' +
                app.id + '">Report a bug</button>' +
            '</div>' +
            '<p class="sq-caption site-detailhero__storenote">Store links go live with the listing.</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<section class="site-section" style="padding-top:0">' +
      '<div class="site-container">' +
        sechead('Screens', 'What it looks like.', '0' + app.shots.length + ' screens') +
      '</div>' +
      '<div class="site-shotrail" tabindex="0" role="region" aria-label="Screenshots">' + shots + '</div>' +
    '</section>' +

    '<section class="site-section" style="padding-top:0">' +
      '<div class="site-container">' +
        sechead('Features', 'What it does.', '0' + app.features.length + ' things') +
        '<div class="site-features">' + features + '</div>' +
      '</div>' +
    '</section>' +

    '<section class="site-section">' +
      '<div class="site-container site-twocol">' +
        '<div>' +
          sechead('History', 'Release notes.', '0' + app.changes.length + ' releases') +
          '<ol class="site-releases">' + releases + '</ol>' +
        '</div>' +
        '<div>' +
          sechead('Honesty', 'Known issues.',
                  app.issues.length ? '0' + app.issues.length + ' open' : 'all clear') +
          '<ul class="site-issues">' + issues + '</ul>' +
          '<p class="sq-caption" style="margin-top:var(--space-5)">Hit something not on this ' +
            'list? That is exactly what the button below is for.</p>' +
        '</div>' +
      '</div>' +
    '</section>' +

    ctaPanel(app.stage, 'Support', 'Something off in ' + app.name + '?',
             "Tell us and we'll look today. It goes to the people who maintain it.",
             'Reach out', app.id);
  }

  function viewTeam() {
    var people = TEAM.map(function (p, i) {
      return '<div class="sq-card site-person" data-reveal style="--i:' + i + '">' +
        '<span class="site-person__avatar" aria-hidden="true">' + esc(p.initials) + '</span>' +
        '<h3 class="sq-h3 site-person__name">Placeholder name</h3>' +
        '<p class="sq-mono site-person__role">' + esc(p.role) + '</p>' +
        '<p class="sq-body-sm site-person__note">' + esc(p.note) + '</p>' +
        '<p class="sq-mono site-person__tz">' + esc(p.tz) + '</p>' +
      '</div>';
    }).join('');

    var values = VALUES.map(function (v, i) {
      return '<div class="sq-card site-value" data-reveal style="--i:' + i + '">' +
        '<span class="sq-mono">0' + (i + 1) + '</span>' +
        '<h3 class="sq-h3 site-value__title">' + esc(v.title) + '</h3>' +
        '<p class="sq-body site-value__body">' + esc(v.body) + '</p>' +
      '</div>';
    }).join('');

    return '' +
    '<section class="site-section site-section--statement site-band" style="padding-top:calc(var(--header-h) + var(--space-9))">' +
      '<div class="sq-slash sq-slash--beam" style="--slash-x:72%" aria-hidden="true"></div>' +
      '<div class="site-container">' +
        '<p class="sq-eyebrow">The crew</p>' +
        '<h1 class="sq-hero">Six time zones,<br>one group chat,<br>no office plant.</h1>' +
        '<p class="sq-lead site-hero__lead">sideQUESTdigital started in 2025 as a side project that ' +
          'refused to stay one. We are remote by default — the apps get built wherever the wifi holds.</p>' +
      '</div>' +
    '</section>' +

    '<section class="site-section" style="padding-top:0">' +
      '<div class="site-container">' +
        '<div class="site-people">' + people + '</div>' +
        '<div class="site-placeholder">' +
          '<span class="sq-pill sq-pill--muted">Placeholder</span>' +
          "<span class=\"sq-caption\">Photos and bios land when the crew's happy with them.</span>" +
        '</div>' +
      '</div>' +
    '</section>' +

    '<div class="site-valueband site-band sq-cut-tr">' +
      '<div class="site-container">' +
        sechead('How we behave', 'Three rules we actually keep.', '03 rules') +
        '<div class="site-values">' + values + '</div>' +
      '</div>' +
    '</div>' +

    ctaPanel('play', 'Say hello', 'Want to talk to us?',
             'Bug, idea, or just a thought. One short form, a human at the other end.',
             'Say hello');
  }

  /* -------------------------------------------------------------- router -- */

  var view = $('[data-view]');
  var current = null;

  function parseRoute() {
    var h = (location.hash || '#/').replace(/^#/, '');
    var parts = h.split('/').filter(Boolean);
    if (!parts.length) return { name: 'home' };
    if (parts[0] === 'apps') {
      if (parts[1]) {
        var a = appById(parts[1]);
        return a ? { name: 'app', app: a } : { name: 'apps' };
      }
      return { name: 'apps' };
    }
    if (parts[0] === 'team') return { name: 'team' };
    return { name: 'home', unknown: true };
  }

  function render(route) {
    var html, title, stage;

    if (route.name === 'apps')      { html = viewApps();  title = 'Apps';  stage = 'play'; }
    else if (route.name === 'app')  { html = viewApp(route.app); title = route.app.name; stage = route.app.stage; }
    else if (route.name === 'team') { html = viewTeam();  title = 'Team';  stage = 'play'; }
    else                            { html = viewStudio(); title = 'Studio'; stage = 'play'; }

    view.innerHTML = html;
    document.title = title + ' — sideQUESTdigital';

    railLocked = (route.name === 'app');
    setStage(stage);
    if (railLocked) lockRail(route.app.stage);
    else unlockRail();

    $$('.site-nav__link').forEach(function (l) {
      var match = (l.getAttribute('href') === '#/' && route.name === 'home') ||
                  (l.getAttribute('href') === '#/apps' && (route.name === 'apps' || route.name === 'app')) ||
                  (l.getAttribute('href') === '#/team' && route.name === 'team');
      if (match) l.setAttribute('aria-current', 'page');
      else l.removeAttribute('aria-current');
    });

    window.scrollTo(0, 0);
    armReveals();
    armParallax();
    updateRail();

    var h1 = $('h1', view);
    if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
    announce(title + ' — sideQUESTdigital');
  }

  function navigate() {
    var route = parseRoute();
    if (route.unknown) { history.replaceState(null, '', '#/'); }

    if (supportOpen) { closeSupport(true); }

    var key = JSON.stringify([route.name, route.app && route.app.id]);
    if (key === current) return;
    var first = current === null;
    current = key;

    if (first || reduced.matches) { render(route); return; }

    var wipe = document.createElement('div');
    wipe.className = 'site-wipe';
    document.body.appendChild(wipe);
    setTimeout(function () { render(route); }, 210);
    setTimeout(function () { wipe.remove(); }, 440);
  }

  /* ---------------------------------------------------------------- rail -- */

  var railSeg   = $('[data-rail-seg]');
  var railWords = $$('.site-rail__word');
  var railEl    = $('.site-rail');
  var progress  = $('[data-progress]');
  var railLocked = false;
  var BANDS = ['play', 'build', 'launch'];

  function lockRail(stage) {
    railEl.classList.add('is-locked');
    railWords.forEach(function (w) {
      w.classList.toggle('is-active', w.dataset.railWord === stage);
    });
    var idx = BANDS.indexOf(stage);
    railSeg.style.top = [18, 50, 82][idx] + '%';
    if (progress) progress.style.width = '100%';
  }

  function unlockRail() { railEl.classList.remove('is-locked'); }

  function updateRail() {
    if (railLocked) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    var band = p < 0.34 ? 'play' : (p < 0.67 ? 'build' : 'launch');

    setStage(band);
    railWords.forEach(function (w) { w.classList.toggle('is-active', w.dataset.railWord === band); });
    railSeg.style.top = (p * (window.innerHeight - 64)) + 'px';
    if (progress) progress.style.width = (p * 100) + '%';
  }

  /* -------------------------------------------------------------- header -- */

  var header = $('[data-header]');
  var lastY = 0;

  function onScrollHeader() {
    var y = window.scrollY;
    header.classList.toggle('is-docked', y > 64);
    if (window.innerWidth >= 768 && !reduced.matches && !supportOpen) {
      if (y > 240 && y - lastY > 8) header.classList.add('is-hidden');
      else if (lastY - y > 8) header.classList.remove('is-hidden');
    } else {
      header.classList.remove('is-hidden');
    }
    lastY = y;
  }

  /* ------------------------------------------------------------- reveals -- */

  var io = null;
  function armReveals() {
    if (reduced.matches) {
      $$('[data-reveal]', view).forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    $$('[data-reveal]', view).forEach(function (el) {
      var i = parseFloat(el.style.getPropertyValue('--i') || 0);
      if (i > 5) el.style.setProperty('--i', 5);
      io.observe(el);
    });

    var nums = $$('[data-count-to]', view);
    if (nums.length) {
      var sio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { countUp(e.target); sio.unobserve(e.target); }
        });
      }, { threshold: 0.4 });
      nums.forEach(function (n) { sio.observe(n); });
    }
  }

  function countUp(el) {
    if (reduced.matches) return;
    var raw = el.dataset.countTo;
    var m = raw.match(/\d+/);
    if (!m) return;
    var target = parseInt(m[0], 10);
    var pre = raw.slice(0, m.index);
    var post = raw.slice(m.index + m[0].length);
    var start = performance.now();

    function step(now) {
      var t = Math.min(1, (now - start) / 900);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = pre + Math.round(target * eased) + post;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = raw;
    }
    requestAnimationFrame(step);
  }

  /* ------------------------------------------------------------ parallax -- */

  var parallaxEls = [];
  function armParallax() {
    parallaxEls = (reduced.matches || window.innerWidth < 1024) ? [] : $$('[data-parallax]', view);
  }
  function onScrollParallax() {
    if (!parallaxEls.length || window.scrollY > 900) return;
    var y = window.scrollY;
    parallaxEls.forEach(function (el) {
      el.style.transform = 'translate3d(0,' + (y * parseFloat(el.dataset.parallax)) + 'px,0)' +
                           (el.classList.contains('sq-slash') ? ' rotate(45deg)' : '');
    });
  }

  /* --------------------------------------------------------- slide-over -- */

  var panel    = $('[data-support]');
  var scrim    = $('[data-scrim]');
  var form     = $('[data-support-form]');
  var done     = $('[data-support-done]');
  var kindsBox = $('[data-kinds]');
  var emailEl  = $('#support-email');
  var msgEl    = $('#support-message');
  var appEl    = $('[data-field-app]');
  var countEl  = $('[data-count]');
  var summary  = $('[data-error-summary]');
  var submitBtn= $('[data-submit]');

  var supportOpen = false;
  var lastFocused = null;
  var kind = KINDS[0];
  var touched = {};

  KINDS.forEach(function (k, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'site-kind';
    b.setAttribute('role', 'radio');
    b.setAttribute('aria-checked', i === 0 ? 'true' : 'false');
    b.tabIndex = i === 0 ? 0 : -1;
    b.textContent = k;
    b.addEventListener('click', function () { selectKind(k); });
    b.addEventListener('keydown', function (e) {
      var idx = KINDS.indexOf(k), next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (idx + 1) % KINDS.length;
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   next = (idx - 1 + KINDS.length) % KINDS.length;
      if (next !== null) { e.preventDefault(); selectKind(KINDS[next]); kindsBox.children[next].focus(); }
    });
    kindsBox.appendChild(b);
  });

  function selectKind(k) {
    kind = k;
    Array.prototype.forEach.call(kindsBox.children, function (b, i) {
      var on = KINDS[i] === k;
      b.setAttribute('aria-checked', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
    });
  }

  function openSupport(opts) {
    opts = opts || {};
    lastFocused = document.activeElement;
    supportOpen = true;

    // Scope the panel to the app's stage when opened from an app context.
    panel.classList.remove('sq-stage-play', 'sq-stage-build', 'sq-stage-launch');
    if (opts.app) {
      var a = appById(opts.app);
      if (a) { panel.classList.add(STAGES[a.stage].cls); appEl.value = a.id; }
    }
    if (opts.kind) selectKind(opts.kind);

    scrim.hidden = false; panel.hidden = false;
    view.setAttribute('inert', '');
    $('.site-footer').setAttribute('inert', '');
    header.setAttribute('inert', '');
    document.body.classList.add('is-locked');

    requestAnimationFrame(function () {
      scrim.classList.add('is-open');
      panel.classList.add('is-open');
    });
    $('[data-support-close]', panel).focus();
  }

  function closeSupport(immediate) {
    if (!supportOpen) return;
    supportOpen = false;
    scrim.classList.remove('is-open');
    panel.classList.remove('is-open');
    view.removeAttribute('inert');
    $('.site-footer').removeAttribute('inert');
    header.removeAttribute('inert');
    document.body.classList.remove('is-locked');

    var delay = immediate ? 0 : 210;
    setTimeout(function () { scrim.hidden = true; panel.hidden = true; }, delay);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function focusables() {
    return $$('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])', panel)
      .filter(function (el) { return el.offsetParent !== null; });
  }

  panel.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { e.preventDefault(); closeSupport(); return; }
    if (e.key !== 'Tab') return;
    var f = focusables();
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  scrim.addEventListener('click', function () { closeSupport(); });

  document.addEventListener('click', function (e) {
    var open = e.target.closest('[data-support-open]');
    if (open) {
      e.preventDefault();
      openSupport({ app: open.dataset.app, kind: open.dataset.kind });
      return;
    }
    if (e.target.closest('[data-support-close]')) { e.preventDefault(); closeSupport(); return; }
    if (e.target.closest('[data-support-again]')) { e.preventDefault(); resetForm(); return; }
    if (e.target.closest('[aria-disabled="true"]')) { e.preventDefault(); }
  });

  /* --- validation --- */

  var RULES = {
    email: function (v) {
      if (!v.trim()) return 'We need an email to reply to.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return "That doesn't look like an email address.";
      return null;
    },
    message: function (v) {
      if (!v.trim()) return 'Tell us what happened.';
      if (v.trim().length < 10) return 'A little more detail, please.';
      return null;
    }
  };

  function showError(el, msg) {
    var box = $('#' + el.id + '-error');
    if (msg) {
      el.setAttribute('aria-invalid', 'true');
      el.setAttribute('aria-describedby', el.id + '-help ' + el.id + '-error');
      box.textContent = msg; box.hidden = false;
    } else {
      el.removeAttribute('aria-invalid');
      el.setAttribute('aria-describedby', el.id + '-help');
      box.textContent = ''; box.hidden = true;
    }
  }

  function validate(el) {
    var msg = RULES[el.name] ? RULES[el.name](el.value) : null;
    showError(el, msg);
    return msg;
  }

  [emailEl, msgEl].forEach(function (el) {
    el.addEventListener('blur', function () { touched[el.name] = true; validate(el); });
    el.addEventListener('input', function () { if (touched[el.name]) validate(el); });
  });

  msgEl.addEventListener('input', function () {
    var n = msgEl.value.length;
    countEl.textContent = n + ' / 1000';
    countEl.style.color = n >= 1000 ? 'var(--sq-bad)' : (n >= 900 ? 'var(--sq-warn)' : '');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    touched.email = touched.message = true;

    var errs = [];
    [emailEl, msgEl].forEach(function (el) {
      var m = validate(el);
      if (m) errs.push({ el: el, msg: m });
    });

    if (errs.length) {
      summary.hidden = false;
      summary.innerHTML = '<p>' + errs.length + (errs.length === 1 ? ' problem' : ' problems') +
        ' with your message.</p><ul>' + errs.map(function (x) {
          return '<li><a href="#' + x.el.id + '">' + esc(x.msg) + '</a></li>';
        }).join('') + '</ul>';
      errs[0].el.focus();
      return;
    }

    summary.hidden = true;
    submitBtn.classList.add('is-loading');
    submitBtn.setAttribute('aria-busy', 'true');
    submitBtn.setAttribute('aria-disabled', 'true');
    submitBtn.style.minWidth = submitBtn.offsetWidth + 'px';
    submitBtn.innerHTML = reduced.matches
      ? 'Sending…'
      : '<span class="site-spinner" aria-hidden="true"></span>Sending…';

    setTimeout(finishSubmit, 700);
  });

  function finishSubmit() {
    var opt = appEl.options[appEl.selectedIndex];
    var label = appEl.value === 'general' ? 'the studio' : opt.text;
    var ref = 'SQ-' + Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase().padStart(6, '0');

    $('[data-done-body]', done).textContent =
      'We have logged this against ' + label + '. You will hear from one of us at ' +
      emailEl.value.trim() + ', usually inside a day.';
    $('[data-done-ref]', done).textContent = 'Reference ' + ref;

    form.hidden = true;
    done.hidden = false;
    $('[data-done-title]', done).focus();
    announce('Message sent.');
  }

  function resetForm() {
    form.reset();
    selectKind(KINDS[0]);
    touched = {};
    showError(emailEl, null); showError(msgEl, null);
    countEl.textContent = '0 / 1000'; countEl.style.color = '';
    summary.hidden = true;
    submitBtn.classList.remove('is-loading');
    submitBtn.removeAttribute('aria-busy');
    submitBtn.removeAttribute('aria-disabled');
    submitBtn.style.minWidth = '';
    submitBtn.textContent = 'Send it';
    done.hidden = true;
    form.hidden = false;
    emailEl.focus();
  }

  /* ----------------------------------------------------------- mobile nav */

  var navToggle = $('[data-navtoggle]');
  var nav = $('[data-nav]');
  navToggle.addEventListener('click', function () {
    var open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    navToggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    nav.classList.toggle('is-open', !open);
    document.body.classList.toggle('is-locked', !open);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a, button') && nav.classList.contains('is-open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      document.body.classList.remove('is-locked');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) navToggle.click();
  });

  /* ---------------------------------------------------------------- boot -- */

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      onScrollHeader();
      onScrollParallax();
      updateRail();
      ticking = false;
    });
  }, { passive: true });

  window.addEventListener('resize', function () { armParallax(); updateRail(); });
  window.addEventListener('hashchange', navigate);

  navigate();
})();
