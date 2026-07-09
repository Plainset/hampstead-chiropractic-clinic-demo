# Pipeline Status

Operational handoff only. `LEADS.md` and `OUTREACH_LOG.md` remain the source of truth.

- Current phase: Complete through deploy. Outreach drafting intentionally paused (see below).
- Last trusted commit: `9502f46` ("Fix mobile nav horizontal overflow and hero text contrast") — rendered QA passed on this commit.
- Rendered QA: Completed 2026-07-09. Ran the shared contrast/upscale audit logic plus a horizontal-overflow check across all 6 pages (`index`, `about`, `contact`, `team`, `testimonials`, `treatments`) at 390×844, 768×1024 and 1440×900. Found and fixed two real defects:
  1. Mobile nav (`position: fixed`, translated off-canvas) was expanding the root scrollable area past 390px because `overflow-x: clip` was only on `body`, not `html`. Fixed by adding the rule to `html` too.
  2. Hero `<h1>` on `index.html` dropped to 2.65:1 contrast at mobile width where the wrapped heading text extended into the low-opacity tail of `.hero__scrim`'s gradient (text sits over a real `<img>`, not a CSS background-image, so the automated contrast script couldn't see this — required manual pixel-sampling). Fixed by raising the scrim's floor opacity 0.32→0.65 and adding matching `text-shadow` to the heading. Reverified at 5.86–8.28:1 across all three breakpoints.
  All 18 page/breakpoint combinations are now clean: 0 contrast violations, 0 upscale violations, 0 broken images, 0 horizontal overflow. Full detail in `QA_REPORT.md`.
- Deploy URL: **https://plainset.github.io/hampstead-chiropractic-clinic-demo/** — confirmed live (200 on `/`, `/index.html`, `/assets/css/main.css`; WebFetch confirms homepage renders with heading, nav, and phone number).
- GitHub repo: `Plainset/hampstead-chiropractic-clinic-demo`, `main` branch, Pages serving from root (`/`).
- Outreach state: **Not drafted.** Per explicit instruction for this run, outreach drafting/sending is paused pending resolution of a separate Gmail permission issue. Do not draft or send outreach for this business until that is cleared.
- Flags for Alex: Outreach email still needs drafting (from `vdvalkproductions@gmail.com` only, never sent) once the Gmail permission issue is resolved.
