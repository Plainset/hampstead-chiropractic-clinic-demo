# QA Report

Fix pass for Hampstead Chiropractic Clinic on 2026-07-09.

## Pages Checked

- `index.html`
- `about.html`
- `treatments.html`
- `team.html`
- `testimonials.html`
- `contact.html`

## Fixes Applied

| Issue | Fix | Evidence |
|---|---|---|
| Missing build evidence/provenance for facts and assets | Added `BUILD_BRIEF.md` with official Hampstead Chiropractic-controlled source URLs, verified fact list, removed/softened claim list, page scope, asset provenance and outreach hook. | `BUILD_BRIEF.md` now records sources for 2004 establishment, contact details, insurance/direct billing, prices, practitioner bios, testimonials and image provenance. |
| Unsupported broad credentials/hours | Removed "Est. by Nina van Dyk", "Three GCC-registered chiropractors", blanket "all BCA" language and unsupported 9am weekday rows. Replaced with official-source wording. | `rg` check found no live-page instances of `GCC-registered`, `Est. by`, `All our chiropractors`, or `Every chiropractor`; remaining BCA/GCC references are Samantha bio/general profession copy. |
| Mobile/tablet horizontal overflow | Closed mobile nav is now hidden/non-interactive while translated off canvas; `body` clips horizontal overflow; footer grid collapses to one column below 520px with `overflow-wrap:anywhere`. | CSS changed in `assets/css/main.css`; `git diff --check` passed. Rendered scroll-width recheck could not be completed because preview/browser launch was blocked by the environment usage limit. |

## Audit Results

| Check | Result | Evidence |
|---|---|---|
| Contrast audit | NOT RE-RUN | Required rendered browser audit could not be completed. Local preview server escalation and browser launch were blocked by the environment usage-limit notice. Previous independent review had 0 automatic contrast violations at mobile/tablet/desktop. |
| Upscale mobile | NOT RE-RUN | Required rendered image audit could not be completed for the same environment reason. Previous independent review passed after scrolling lazy images into view: 0 violations, 0 broken images, 0 aspect mismatch advisories at 375x812. |
| Upscale tablet | NOT RE-RUN | Required rendered image audit could not be completed for the same environment reason. Previous independent review passed after scrolling lazy images into view: 0 violations, 0 broken images, 0 aspect mismatch advisories at 768x1024. |
| Upscale desktop | NOT RE-RUN | Required rendered image audit could not be completed for the same environment reason. Previous independent review passed after scrolling lazy images into view: 0 violations, 0 broken images, 0 aspect mismatch advisories at 1440x1000. |
| Broken images | NOT RE-RUN | Rendered image audit blocked. Previous independent review found 0 broken images after scrolling all pages. |
| Horizontal overflow | PARTIAL | CSS fix applied for known sources. Rendered `documentElement.scrollWidth` check could not be re-run due environment usage-limit/browser block. |
| Source provenance | PASS | `BUILD_BRIEF.md` created from official website/WordPress/Facebook-controlled sources only. Unsupported claims were removed or softened. |
| Static hygiene | PASS | `rg` found no lorem/TODO/FIXME or removed unsupported claim strings in live pages. `git diff --check` passed. |

## Manual Checks

| Check | Result | Notes |
|---|---|---|
| Text on photo | NOT RE-RUN | Previous independent review passed. No hero/banner visual changes were made in this fix pass. |
| Gradient/::before backgrounds | NOT RE-RUN | Previous independent review passed. No color/gradient changes were made in this fix pass. |
| Image/content match | PASS | `BUILD_BRIEF.md` records official image/source provenance and adjacent-copy match notes. No images were replaced in this fix pass. |
| Fabricated claims | PASS | High-risk unsupported claims from review were either sourced in `BUILD_BRIEF.md` or removed/softened in page copy. |
| Mobile layout | PARTIAL | Known CSS overflow causes were fixed. Rendered mobile/tablet confirmation is pending because live browser QA could not run in this environment. |

## Blocking Issues

| Issue | Evidence | Required fix |
|---|---|---|
| Rendered QA/deploy blocked by environment usage limit | Approval attempts for network/media page fetch and local preview server returned: "You've hit your usage limit. Upgrade to Pro ... try again at 4:28 PM." Playwright was installed but bundled browser was missing; system Chrome headless launch aborted with OS-level process errors. | Re-run rendered contrast, image and overflow gates once approvals/browser are available, then deploy and draft outreach. |

## Fixed Verification

| Issue | Fix | Recheck result |
|---|---|---|
| Missing build evidence/provenance for facts and assets | Added compact `BUILD_BRIEF.md`; removed or softened unsupported claim wording. | PASS by source-file inspection and static claim search. |
| Mobile/tablet horizontal overflow on all pages | Hid/pointer-disabled closed `.nav__links`, added horizontal clipping, and collapsed narrow footer to one column. | PARTIAL. CSS fix applied; rendered scroll-width verification blocked by environment usage limit. |

## Verdict

BLOCKED for deploy until rendered QA can be re-run.
