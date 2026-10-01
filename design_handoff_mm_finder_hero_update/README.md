# Handoff Update: Body finder + hero (delta to design_handoff_mm_therapiepraxis)

This is a **delta**. It only describes what changed after the main handoff (`design_handoff_mm_therapiepraxis`). Everything not mentioned here stays as specified there. The files are HTML/React **design references**. Recreate them in the target codebase; do not ship them as is.

Fidelity: high fidelity. The interaction model is copied 1:1 from the "Therapiezentrum Straehl v4" finder.

---

## 1. Hero (mobile)

**Before:** centred layout, H1 "Bewegung ist Leben. Leben ist Bewegung.", a text link "Was hilft mir?", and a 4:5 portrait.

**Now:**
- **H1:** "Spüren Sie wieder Leichtigkeit."
  - Line break before "Leichtigkeit.". That word is set in the accent `--tint #B4553C`.
  - The 4 words animate in one by one (delay `i*85ms + 120ms`).
  - Font size `clamp(42px,11.6vw,96px)`, so "Leichtigkeit." fits on 360px screens.
- **Alignment:** everything is **left aligned on all breakpoints**: `.hero-t{text-align:left;justify-items:start;gap:16px}`. The trust row and CTA row use `justify-content:flex-start`.
- **CTAs:** primary "Termin vereinbaren" (→ #kontakt) plus **secondary button** "Was hilft mir? ›" (`btn-s`: background `--tint-fill #F6E4DB`, text `--tint-ink #8A3A26`, → #finder).
  - Mobile: height 50px, horizontal padding 20px, gap 10px.
  - Desktop: height 52px, horizontal padding 26px.
- **Sub text:** 18px on mobile, max-width 36ch; 21px on desktop.
- **Photo:** `aspect-ratio:5/4`, full width, `object-position:center 22%` (the face must stay visible). From 600px: 4:5, max-width 440px.
- **Spacing:** hero padding `84px 0 24px` on mobile (`150px 0 50px` on desktop); grid gap 28px.

## 2. "Auf einen Blick" tiles (bento)
- **Bug fixed:** icons were absolutely positioned and overlapped the text on mobile.
- **Now:** the icon (`.wg-ic`, 34×34, radius 10px) sits **in the flex flow** at the top of the tile (margin-bottom 10px). The title is pushed down with `margin-top:auto`.
- **Titles:** 17px on mobile (19px on desktop), with `overflow-wrap:anywhere; hyphens:auto`.
- **Min height:** no fixed min-height on the small tiles any more.

## 3. Body finder: new interaction model (Straehl v4)

### What was removed
- The figure no longer shrinks or moves up when a zone is selected (`transform:none` in every state).
- The in-card bottom sheet (`.ff-sheet`) is removed.

### Figure card
- **Height:**
  - Mobile: `min(74svh,640px)`, min-height 500px.
  - Desktop (≥960px): `calc(100svh - 140px)`, min 620px, max 860px. The right-hand panel has the same height.
- **Stage inset:** `66px 12px 62px`. The figure keeps its aspect ratio 360:840 and fills the height.
- **Other card elements:**
  - Segmented control "Vorne / Hinten" at the top.
  - Bottom glass pill "Auf eine Stelle tippen" while nothing is selected.
  - The "Hier tippen" hint on the neck until the first interaction.
- **Tap:** a ripple at the pointer position plus an 8ms vibration.
- **Toggle:** tapping the same zone again deselects it.

### Mobile: docked inspector (<960px)
- **Placement:** rendered through a **portal into `<body>`**, so it is fixed to the viewport, not to the card:
  - `.ff-dock{position:fixed;left:0;right:0;bottom:0;z-index:70;padding:0 8px calc(8px + env(safe-area-inset-bottom))}`
  - Inspector: max-width 560px, centred, radius 30px, padding `2px 16px 14px`, `max-height:calc(100svh - 90px)`, flex column.
- **Glass:** `rgba(255,255,255,.9)` + `backdrop-filter:blur(24px) saturate(1.8)` + shadow `0 24px 50px -16px rgba(90,40,20,.45)`.
- **Entrance:** `translateY(110%) → 0`, .55s `cubic-bezier(.34,1.56,.64,1)`.
- **Layout:**
  - Header (grab handle 36×5px, number tile, title, prev/next, close) is fixed at the top.
  - The **body scrolls** (`overflow-y:auto; overscroll-behavior:contain`, scrollbar hidden).
  - **CTA row** ("Termin vereinbaren" / "Anrufen") is fixed at the bottom, outside the scroll area.
- **Gestures on the header (grip):** pointer capture, `touch-action:none`.
  - While dragging: `translate(dx*.35 if horizontal, dy if down, dy/5 if up)` with transitions off.
  - Release with **dy > 80px → close**.
  - Release with **|dx| > 60px → next/previous zone** (not for the general topics).
  - Otherwise spring back (.45s spring).
- **Auto close:** an IntersectionObserver on the figure card closes the inspector when less than 25% of the card is visible. It starts 900ms after opening.
- **Tab bar:** `body.ff-docked` is toggled while the dock is open. The floating tab bar slides out (`translateY(170%)`, .5s spring) and comes back when the dock closes.
- **"Termin vereinbaren"** in the dock also closes the dock.

### Mobile: zone chips under the card
- **Label:** "Oder Stelle wählen" (sentence case, 14px, 650, `--ink3`).
- **Chips:** one per zone of the current view. Each is 40px high with a 30px round number badge (`--tint-fill` / `--tint-ink`) and the zone name.
  - The active chip is filled with the tint and its badge turns white at 20%.
- **General topics** follow below as before: "Oder eher allgemein?" with Erschöpfung, Schlafstörungen, Stress, Einfach entspannen.

### Desktop (≥960px)
- Two columns: figure card on the left, white panel on the right (radius 32px).
- **Nothing selected:** picker with an accent header "Wo tut es weh?" / "Zeigen Sie auf eine Stelle, sie leuchtet am Körper auf." and a 2-column grid of the zones in the current view.
  - **Hover or focus preview:** hovering or focusing a grid item highlights that zone on the figure. `BodyFigure active` = the hovered id. The item gets the `.on` state: tint-fill background, 1.5px tint inset ring, number tile rotated -8deg and filled with the tint.
- **Zone selected:** the inline inspector replaces the picker (same content as mobile, no grab handle, no gestures). The CTA is sticky at the bottom of the panel.

### State (React)
- `view`: 'front' | 'back'.
- `act`: zone id | general id | null.
- `prev`: hovered zone id (desktop preview).
- `touched`: hides the hint after the first interaction.
- `dir`: 'fwd' | 'bwd', for the title slide.
- `wide`: `matchMedia('(min-width:960px)')`.
- **Side effects:**
  - IO auto close (mobile only).
  - `body.ff-docked` class.
  - On a view switch, clear `act` if the active zone is not present in the new view.

## Files in this folder
- `mm-finder.jsx`: the complete new finder component (`Insp` with a `docked` prop and gestures, `Finder` with the portal dock, chips, desktop preview).
- `mm-finder.css`: finder styles. The **"v5: Straehl-style finder behaviour"** block at the end contains the changes; it overrides earlier rules.
- `mm2-v5-additions.css`: only the new hero and bento CSS (append it after the existing styles, or merge it into the hero and bento rules).
- `straehl-figure.jsx`: the `BodyFigure` SVG (unchanged, included for completeness).

Hero markup change (in `MM Therapiepraxis v2.html`):
```html
<h1 class="h1"><span class="w" style="--i:0">Spüren</span> <span class="w" style="--i:1">Sie</span> <span class="w" style="--i:2">wieder</span><br><span class="gt w" style="--i:3">Leichtigkeit.</span></h1>
...
<a class="btn btn-s" href="#finder">Was hilft mir? <svg>…chevron…</svg></a>
```
