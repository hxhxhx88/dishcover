# Product Roadmap — DishCover MVP

## Overview

The MVP is delivered in three milestones. Each milestone produces a complete, usable slice of value and can be tested end-to-end before the next begins.

| Milestone | Name | Goal |
|---|---|---|
| M1 | Core Scan-to-Menu | User photographs a menu and reads it in their language |
| M2 | Intelligence Layer | User receives personalized dish and beverage recommendations |
| M3 | History & Retention | User can revisit previously scanned menus |

---

## Feature Index

| ID | Name | Milestone | Priority | Spec |
|---|---|---|---|---|
| F1 | Menu Capture | M1 | P0 | [0003-menu-capture.md](0003-menu-capture.md) |
| F2 | Digitization & Translation | M1 | P0 | [0004-digitization-translation.md](0004-digitization-translation.md) |
| F3 | Structured Menu Display | M1 | P0 | [0005-menu-display.md](0005-menu-display.md) |
| F4 | Personalized Recommendations | M2 | P1 | [0006-recommendations.md](0006-recommendations.md) |
| F5 | Beverage Pairing | M2 | P1 | [0007-beverage-pairing.md](0007-beverage-pairing.md) |
| F6 | Session History | M3 | P2 | [0008-session-history.md](0008-session-history.md) |

---

## Dependency Graph

```
F1 (Capture)
  └── F2 (Digitization)
        ├── F3 (Display)
        │     ├── F4 (Recommendations)
        │     └── F5 (Beverage Pairing)
        └── F6 (Session History)
```

F1 → F2 → F3 is the critical path. F4 and F5 layer on top of F3. F6 is independent of F4/F5 but requires F2 (digitized data to store) and F3 (UI entry point).

---

## Milestones

### M1 — Core Scan-to-Menu

**Goal:** A user can open the app, photograph one or more pages of a restaurant menu, and immediately read it in their own language, organized by category.

**Features:** F1, F2, F3

**Definition of done:**
- User can capture 1–10 menu photos via camera or gallery
- Digitization and translation complete in under 15 seconds for up to 5 pages
- Menu is displayed in a browsable, categorized, searchable layout
- All text in user's device language; original names shown as secondary

**Key risk:** AI model latency and output quality on noisy/handwritten menus. Mitigation: set user expectations with a quality warning for difficult inputs; validate output schema before rendering.

---

### M2 — Intelligence Layer

**Goal:** The app gives the user actionable guidance — dish recommendations based on their preferences, and drink pairings when a beverage menu is available.

**Features:** F4, F5

**Depends on:** M1 complete

**Definition of done:**
- User can enter preferences (free text or quick-select tags) and receive 3–5 ranked dish suggestions with reasons
- If a drinks/wine section was detected, user can tap any dish to see pairing suggestions
- Preference data never stored beyond the inference call

**Key risk:** Recommendation quality degrades on short or poorly structured menus. Mitigation: graceful fallback messaging; do not force a recommendation if the AI can't produce a confident one.

---

### M3 — History & Retention

**Goal:** Users can browse and revisit their past scans, supporting repeat restaurant visits and post-meal reflection.

**Features:** F6

**Depends on:** M1 complete (M2 not required)

**Definition of done:**
- Last 20 sessions stored on-device
- Each entry shows: date, restaurant name or fallback label, thumbnail, full digitized menu
- Sessions can be individually deleted
- History survives app restart; clears on app data wipe (documented behavior)

**Key risk:** Storage size on low-capacity devices. Mitigation: cap at 20 sessions and compress thumbnails.
