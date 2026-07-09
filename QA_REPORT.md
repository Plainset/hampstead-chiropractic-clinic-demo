# QA Report

Fix pass for Hampstead Chiropractic Clinic on 2026-07-09. Rendered QA resumed and completed 2026-07-09 (prior session was blocked by an environment usage limit before it could re-run rendered checks).

## Pages Checked

- `index.html`
- `about.html`
- `treatments.html`
- `team.html`
- `testimonials.html`
- `contact.html`

## Fixes Applied (this session)

| Issue | Fix | Evidence |
|---|---|---|
| Horizontal overflow on mobile from the closed mobile nav | `.nav__links` is `position: fixed` and translated off-canvas (`translateX(100%)`), but `overflow-x: clip` was only set on `body`, not `html`. Chrome's viewport (`window.innerWidth`) was measured ballooning from 390px to 710px on `index.html` at 390px width because the translated fixed nav still registered in the root scrollable area. Added `overflow-x: clip` to `html` (alongside the existing `body` rule) in `assets/css/main.css`. | Rendered check before fix: `innerWidth: 710, scrollWidth: 710` at 390px viewport on index.html (nav__links spanned x=390–710). After fix, fresh server + fresh browser cache: `innerWidth: 390, scrollWidth: 390` — confirmed on all 6 pages at 390/768/1440px. |
| Hero heading contrast failure on `index.html` (text-on-photo) | `.hero h1` sits over a real `<img>` (not a CSS background-image, so the automated contrast script's ancestor-walk couldn't see it) with only a horizontal scrim (`.hero__scrim`) fading from 94% to 32% opacity. At mobile width the wrapped heading extends into the low-opacity (32%) zone where the underlying photo is light-toned, producing a measured contrast ratio as low as **2.65:1** (fails the 3:1 minimum for large text). Raised the scrim's floor opacity from 0.32 to 0.65 and added matching `text-shadow` to `.hero h1` (previously only `.hero p` had it) in `assets/css/main.css`. | Pixel-level verification (canvas-sampled actual photo pixels under each rendered text line, blended with the scrim per the CSS gradient math) before fix: min contrast 2.65:1 at 390px. After fix: min contrast 5.86:1 at 390px, 8.28:1 at 768px, 8.04:1 at 1440px — all comfortably above the 4.5:1 normal-text bar, not just the 3:1 large-text bar. The `.banner` construction used on the other 5 pages (photo faded to `opacity:0.32` against a dark teal base, plus a stronger 55–92% vertical scrim) was checked with the same method and was already safe (min ratio 12.74–12.75:1 at mobile/desktop) — no change needed there. |

## Fixes Applied (previous session, carried over)

| Issue | Fix | Evidence |
|---|---|---|
| Missing build evidence/provenance for facts and assets | Added `BUILD_BRIEF.md` with official Hampstead Chiropractic-controlled source URLs, verified fact list, removed/softened claim list, page scope, asset provenance and outreach hook. | `BUILD_BRIEF.md` records sources for 2004 establishment, contact details, insurance/direct billing, prices, practitioner bios, testimonials and image provenance. |
| Unsupported broad credentials/hours | Removed "Est. by Nina van Dyk", "Three GCC-registered chiropractors", blanket "all BCA" language and unsupported 9am weekday rows. Replaced with official-source wording. | `rg` check found no live-page instances of `GCC-registered`, `Est. by`, `All our chiropractors`, or `Every chiropractor`; remaining BCA/GCC references are Samantha bio/general profession copy. |

## Audit Results (rendered, this session)

Ran the shared `.pipeline/qa/contrast-audit.js` and `.pipeline/qa/upscale-audit.js` logic (via `preview_eval` against the live rendered pages, port 4215) on all 6 pages at 390×844 (mobile), 768×1024 (tablet), and 1440×900 (desktop). Lazy (`loading="lazy"`) images were force-eager-loaded and settled before each check to get real `naturalWidth`/`naturalHeight`. A dedicated overflow check (`document.documentElement.scrollWidth` vs `window.innerWidth`) ran at all three widths.

| Check | Result | Evidence |
|---|---|---|
| Contrast audit (automated, all pages × 3 widths = 18 runs) | PASS | 0 violations on every run. `needsManualCheck` counts (gradient/background-image text the script can't auto-verify): index 4, about 5, contact 0, team 4, testimonials 3, treatments 3 — all manually verified below. |
| Contrast — hero/banner text-on-photo (manual, pixel-sampled) | PASS (after fix) | See "Fixes Applied" above. Hero min ratio 5.86–8.28:1 across breakpoints after fix (was 2.65:1 before). Banner min ratio 12.74–12.75:1, no change needed. |
| Contrast — cta-band / team-placeholder gradients (manual) | PASS | Both stops of every flagged gradient are dark brand teals (`--color-teal #0E5960`, `--color-teal-deep #082F34`); white text on either stop is high-contrast by design (tokens.css documents 7.35:1+ for teal on paper). No further check needed. |
| Upscale mobile (390px) | PASS | 0 violations, 0 broken images, 0 aspect mismatches, 0 not-loaded, across all 6 pages. |
| Upscale tablet (768px) | PASS | 0 violations, 0 broken images, 0 aspect mismatches, 0 not-loaded, across all 6 pages. |
| Upscale desktop (1440px) | PASS | 0 violations, 0 broken images, 0 aspect mismatches, 0 not-loaded, across all 6 pages. |
| Broken images | PASS | 0 broken images on any page/width (49 total visible-image checks across all runs). |
| Horizontal overflow (mobile/tablet/desktop) | PASS (after fix) | Before fix: overflow on every page at 390px (`nav__links` off-canvas element). After fix: `scrollWidth <= innerWidth` on all 6 pages at all 3 widths. Also manually verified the mobile nav open/close cycle causes no overflow (`innerWidth`/`scrollWidth` both 390 with nav open). |
| Mobile nav interaction | PASS | Opened `.nav__toggle` at 390px: `body.nav-open` applied, nav panel renders on-screen, no horizontal scroll introduced. Screenshot taken. |
| Source provenance | PASS | `BUILD_BRIEF.md` created from official website/WordPress/Facebook-controlled sources only. Unsupported claims were removed or softened. |
| Static hygiene | PASS | `rg` found no lorem/TODO/FIXME or removed unsupported claim strings in live pages. `git diff --check` passed. |

## Manual Checks

| Check | Result | Notes |
|---|---|---|
| Text on photo | PASS (after fix) | Hero fixed this session (see above); banner already safe. Two screenshots taken (desktop + mobile) confirming legible white text over both hero and (via prior review) banner sections. |
| Gradient/::before backgrounds | PASS | cta-band and team-photo-placeholder gradients checked and confirmed safe (see above). |
| Image/content match | PASS | `BUILD_BRIEF.md` records official image/source provenance and adjacent-copy match notes. No images were replaced in this session. |
| Fabricated claims | PASS | High-risk unsupported claims from review were either sourced in `BUILD_BRIEF.md` or removed/softened in page copy (previous session). |
| Mobile layout | PASS | Overflow fixed and reverified; nav open/close verified with no reflow issues. |

## Blocking Issues

None remaining. All previously blocking issues (rendered QA/deploy blocked by environment usage limit) were resolved this session — rendered QA has now actually run and both defects it found (nav-driven horizontal overflow, hero text contrast) have been fixed and reverified.

## Fixed Verification

| Issue | Fix | Recheck result |
|---|---|---|
| Missing build evidence/provenance for facts and assets | Added compact `BUILD_BRIEF.md`; removed or softened unsupported claim wording. | PASS by source-file inspection and static claim search (previous session). |
| Mobile/tablet horizontal overflow on all pages | Added `overflow-x: clip` to `html` (previous session's `body`-only clip was insufficient against the fixed+translated mobile nav). | PASS. Rendered scroll-width check now clean (`innerWidth === scrollWidth`) on all 6 pages × 3 widths. |
| Hero heading contrast failure at mobile width | Raised `.hero__scrim` floor opacity 0.32→0.65 and added `text-shadow` to `.hero h1`. | PASS. Pixel-sampled min contrast 5.86:1 (mobile), 8.28:1 (tablet), 8.04:1 (desktop) — was 2.65:1 (mobile) before. |

## Verdict

PASS — deployed to https://plainset.github.io/hampstead-chiropractic-clinic-demo/ (GitHub Pages, `Plainset/hampstead-chiropractic-clinic-demo`, `main` branch, root path). Live URL and CSS fix both confirmed served (200 responses on `/`, `/index.html`, `/assets/css/main.css`; fetched CSS confirmed to contain the `html { overflow-x: clip }` and updated `.hero__scrim` fixes).
