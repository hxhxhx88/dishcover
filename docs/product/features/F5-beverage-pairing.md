# F5 — Beverage Pairing

**Milestone:** M2  
**Priority:** P1  
**Depends on:** F3

---

## Summary

When a drinks or wine section is detected in the scanned menu, the app offers pairing suggestions for individual dishes. The user taps any dish to see which beverages from the restaurant's list pair well with it, along with a brief reason.

---

## User Story

_As someone ordering a ribeye steak, I want to know which wine from this restaurant's list goes best with it — without having to ask the waiter or guess._

---

## Acceptance Criteria

### Detection
- The presence of a drinks/wine section is determined by F2 at digitization time.
- If no drinks section is detected, the pairing feature is entirely hidden (no empty states, no prompts).
- If a drinks section is detected, a "Pair with a drink" indicator is shown on food item cards.

### Pairing flow
- User taps a food item card.
- A pairing panel (sheet or modal) opens showing:
  - The selected dish name
  - Up to 3 beverage matches from the menu's drinks section
  - Each match: drink name + brief pairing reason (1–2 sentences)
- Applies to: wine, beer, cocktails, and non-alcoholic options — any item in the detected drinks section.

### Performance
- Pairing results are fetched on demand (per dish tap), not pre-computed for all items.
- Target response time: under 8 seconds per pairing request.
- Loading state shown while pairing is being fetched.

### Privacy
- Only the selected dish and the drinks section data are sent to the AI for each pairing call.
- No user identity or preference data is included in pairing requests.

---

## Edge Cases

| Scenario | Expected behavior |
|---|---|
| Drinks menu and food menu captured in separate sessions | Not supported in MVP; inform user both must be in the same session |
| Drinks section detected but has fewer than 3 items | Return as many matches as available (1 or 2) |
| Very large wine list (100+ items) | AI selects top 3 matches; no pagination needed |
| Non-alcoholic-only drinks menu | Feature works identically; "Pair with a drink" label unchanged |
| User taps a drinks item (not a food item) | Pairing indicator not shown on drink items |
| AI returns no confident pairing | Panel shows: "No strong pairing found for this dish" |

---

## Technical Notes

- Pairing call input: the targeted food item (name + description) + all items in the detected drinks section.
- Output: list of up to 3 `{drink_name, reason}` objects, validated against a schema.
- All AI calls go through `packages/api`.
- The drinks section flag (`hasBeverageMenu: boolean`) is part of the F2 response schema in `packages/lib`.
- Pairing results can be cached in local session state to avoid repeat AI calls for the same dish within the same session.
