# sideQUESTdigital website — session rules

## ALWAYS pull before doing anything

**At the start of every session, before reading or editing a single file, fetch
the latest code from GitHub.** Other developers push to this repo; the local
copy is routinely stale, and editing a stale file means silently reverting
someone else's work.

```bash
cd "SideQUEST - Website"
git fetch origin
git status          # confirm the working tree is clean first
git pull --ff-only  # fast-forward only — never auto-merge or rebase silently
```

Rules around it:

- If the working tree is **dirty**, stop and tell Luke what is uncommitted
  before pulling. Do not stash or discard anything without being asked.
- If `--ff-only` **fails** (local and remote have diverged), stop and report it.
  Do not merge or rebase on your own initiative.
- Report what came down — "already up to date" or a summary of the incoming
  commits — so Luke knows what changed underneath him.
- Repeat the pull before any push, and never push to `main` without being told.

Remote: [`Side-Quest-Digital/sidequest-site`](https://github.com/Side-Quest-Digital/sidequest-site)
· branch `main`.

## Two content rules that are easy to break

1. **Apps have a release `status`, never a stage.** `live` or `soon` in the
   `APPS` array; the UI says *Live* or *Coming soon*. Play / Build / Launch is
   the studio's process and the rail's job — it must never be attached to an
   individual app. Only PlantSwap is `live`. Version numbers, store buttons,
   release notes and known issues render for `live` apps only.
2. **The team page is anonymous.** No names, no photos, no per-person cards —
   it describes the mix (developers, marketers, business side). Do not
   reintroduce named crew cards without being asked.
3. **The team page is currently unpublished.** `SHOW_TEAM = false` at the top of
   [site.js](site.js) pulls its nav and footer links out of the DOM at boot and
   redirects `#/team` to the studio page. The view itself (`viewTeam()`), its
   copy and its CSS are all intact — flipping the flag to `true` puts it back,
   no other change needed. Do not delete the view while the flag exists.

## Support form → n8n

There is exactly one form on the site: the support slide-over
(`[data-support-form]` in [index.html](index.html), handled in
[site.js](site.js)). It covers all four request kinds — Bug report, Question,
Feature idea, Something nice — via the `kind` radiogroup, so every submission
type lands on the same webhook.

Destination is the `SUPPORT_WEBHOOK` constant at the top of [site.js](site.js),
now pointed at the **production** path and verified end to end:

```
https://personal.sleepingaigiant.com/webhook/34123681-468b-439f-aae1-7330dac8c0f9
```

- **Production** (`/webhook/<id>`) — live while the workflow is activated in
  n8n. Returns `200 {"message":"Workflow was started"}` and answers the CORS
  preflight, echoing whatever `Origin` it is given. This is what the site uses.
- **Test** (`/webhook-test/<id>`, same id) — only accepts a request while n8n is
  listening after "Execute workflow", and only **one** call per arming. A 404
  with `"is not registered"` means it is not armed; it is not a site bug. Its
  preflight also 404s, so a browser can never reach it — only curl can.

Payload (JSON, POST):

| Field | Notes |
|---|---|
| `ref` | `SQ-XXXXXX`, generated client-side, shown on the success screen |
| `kind` | `Bug report` \| `Question` \| `Feature idea` \| `Something nice` |
| `app` / `appLabel` | `general` \| `plantswap` \| `vibecheck` \| `backtrack` |
| `email`, `message` | the two required fields |
| `diagnostics` | the "attach anonymous diagnostics" checkbox |
| `submittedAt`, `source`, `page`, `userAgent`, `language`, `viewport` | context |

The send is a single CORS `application/json` POST whose status is checked; any
failure shows in the existing error summary instead of the success screen.

**Keep "Allowed Origins (CORS)" set on the n8n Webhook node.** If it is cleared,
n8n stops answering the `OPTIONS` preflight and every browser submission fails —
that was the original symptom here. A `no-cors` fallback was tried and removed
on purpose: an opaque response cannot be inspected, so a 404 from a dead webhook
rendered as a success screen while the message was silently dropped. Fail loudly.
