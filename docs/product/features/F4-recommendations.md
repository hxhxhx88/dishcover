# F4 — Personalized Dish Recommendations

**Milestone:** M2  
**Priority:** P1  
**Depends on:** F3

---

## Summary

After the menu is displayed, the user can describe their preferences — via free text or quick-select tags — and receive a ranked list of dish recommendations drawn from the current menu. Recommendations appear both in a dedicated "For You" section and as inline badges on the menu items.

---

## User Story

_As a vegetarian visiting a Japanese restaurant, I want to tell the app my diet so it can highlight dishes I can actually eat — without me having to check every item myself._

---

## Acceptance Criteria

### Preference input
- A "Get Recommendations" prompt is visible on the menu screen (M1).
- User can enter free-text preferences (e.g. "first time here, love spicy food, avoid shellfish").
- Quick-select dietary tags are shown alongside the text field:
  - Vegetarian, Vegan, No Pork, No Shellfish, Gluten-Free, Spicy, Local Specialty, Light Meal
- Free text and tags can be combined.
- Preferences are optional; if skipped, the AI attempts a generic "popular/chef's picks" recommendation.

### Recommendations output
- AI returns 3–5 recommended dishes from the current menu.
- Each recommendation includes:
  - Dish name (as shown in the menu)
  - A brief reason (1–2 sentences, e.g. "A regional specialty with no meat")
- Recommendations are shown in a pinned "For You" section at the top of the menu display.
- Recommended items are also marked with a badge inline in their section.

### Updating preferences
- User can edit preferences and re-submit to generate new recommendations.
- Previous recommendation badges are cleared and replaced on re-run.

### Privacy
- Preferences are included in the AI request payload alongside the menu data.
- Preferences are not stored on-device or on the server beyond the duration of the inference call.

---

## Edge Cases

| Scenario | Expected behavior |
|---|---|
| User skips preferences | AI attempts generic "popular" picks; if no confident result, "For You" section is hidden |
| Contradictory preferences ("vegan" + "love steak") | AI surfaces best partial matches; result labeled "Best matches for your preferences" |
| Menu has no items matching preferences | Show message: "No close matches found — here are the closest options" with top 3 |
| Very short menu (< 5 items) | Recommend from what's available; no artificial padding |
| AI fails to return structured recommendations | Error shown in the "For You" section; rest of menu unaffected |

---

## Technical Notes

- The AI call for recommendations is a second inference request, separate from F2 digitization.
- Input to the model: the full structured menu payload (from F2) + user preference string/tags.
- Output: a list of item references (by name or ID) + reason strings, validated against a schema.
- All AI calls go through `packages/api`; preference data never touches the client's outbound network directly.
- The "For You" section in the UI is driven by the response; no client-side ranking logic.
- Quick-select tag list is defined as a constant in `packages/lib` and shared between API and client.
