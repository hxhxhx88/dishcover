# F3 — Structured Menu Display

**Milestone:** M1  
**Priority:** P0  
**Depends on:** F2

---

## Summary

The digitized menu is rendered in a clean, scrollable, categorized layout. The user can browse sections, search for items, and see recommendation badges (populated by F4). This screen is the central view of the app.

---

## User Story

_As a user who just scanned a 60-item Spanish menu, I want to browse it by section and search for "lamb" so I can quickly find what interests me._

---

## Acceptance Criteria

### Layout
- Menu items are grouped by detected section (Starters, Mains, Desserts, Drinks, etc.).
- Sections are displayed as collapsible groups with a header showing the section name and item count.
- Each item card shows:
  - Translated name (primary, larger)
  - Original name (secondary, smaller, muted)
  - Translated description (if available)
  - Price (if available)
  - Recommendation badge (if F4 has surfaced this item)

### Search
- A search bar is persistently visible at the top of the menu.
- Search filters items in real-time by translated name, original name, or description.
- When active, section grouping is preserved for matched items; empty sections are hidden.
- Clearing the search restores the full menu.

### Empty and error states
- If a section has no items after search filtering, it is hidden.
- If the digitized menu has no detected sections, all items appear under a single "All Items" group.
- If the menu payload is empty (no items extracted), an empty state is shown with a re-scan option.

### Performance
- Menus with up to 200 items must render without jank or delay.
- Section collapse/expand is instant.

### Navigation
- From the menu screen, user can navigate to:
  - Preference input (F4)
  - Beverage pairing for a selected item (F5)
  - Back to capture to start a new scan

---

## Edge Cases

| Scenario | Expected behavior |
|---|---|
| Menu with 1 section only | Section header still shown; collapsible but starts expanded |
| Very long item descriptions | Description truncated at ~3 lines with "read more" expansion |
| Missing price | Price field hidden (not shown as blank) |
| Missing description | Description field hidden |
| Search with no results | "No items match your search" placeholder shown |
| Section names in a language other than device language | Translate section names as part of F2 output |

---

## Technical Notes

- Implemented in `apps/app-mobile` using React Native + NativeWind.
- The menu payload received from F2 is the direct data source; no additional API calls at render time.
- The "For You" section surfaced by F4 recommendations is rendered as a pinned section at the top of the menu screen (not a separate screen).
- Recommendation badge state is held in local React state; re-runs when preferences change (F4).
