# Digitization & Translation

## Summary

Captured menu images are sent to an AI vision model which extracts and structures the menu items, translates all text into the user's display language, and returns a typed, schema-validated payload the app can render.

---

## User Story

_As a user who photographed a French menu, I want the app to automatically extract every dish and translate it into Mandarin (my device language) so I can understand the full menu without using a separate app._

---

## Acceptance Criteria

### Extraction
- The model detects and extracts menu sections (e.g. Starters, Mains, Desserts, Drinks).
- For each item the model extracts:
  - Original name (as printed)
  - Translated name (in device display language)
  - Description (translated, if present on the menu)
  - Price (as printed, if visible)
- Items with no detectable section are grouped under a catch-all (see [0004-menu-display.md](0004-menu-display.md)).

### Translation
- Output language matches the device's system locale by default.
- If a menu item's text cannot be translated with confidence, the original text is returned with a flag so the UI can display a note.
- Menu sections that are already in the device language are passed through unchanged.

### Performance
- Target: processing complete in under 15 seconds for up to 5 pages on a typical connection.
- A loading state with progress indication is shown for the full duration.
- If processing exceeds 30 seconds, a timeout error is surfaced with a retry option.

### Output validation
- The API response is validated against a strict schema before the app attempts to render it.
- If the response fails validation, the user sees an error screen with a retry option. The raw response is logged for debugging.

### Privacy
- Only the menu images and a system prompt are sent to the AI provider.
- No user identity, location, or device data is included in the request.

---

## Edge Cases

| Scenario | Expected behavior |
|---|---|
| Handwritten menu | Best-effort extraction; quality warning shown to user |
| Menu in multiple languages (e.g. French + English) | Translate the non-device-language portions; leave device-language text unchanged |
| Menu image is a QR code only | Error: "No menu text detected. Try photographing the printed menu." |
| AI provider returns a partial response | Render what was extracted; indicate incomplete results in the UI |
| Network unavailable | Error shown immediately (pre-flight check); retry when connectivity restored |
| AI provider rate limit or error | User-facing retry; exponential backoff (max 2 retries) |

---

## Technical Notes

- AI provider: Gemini Vision (primary). The provider is abstracted behind an interface to allow future swaps (e.g. GPT-4o).
- The structured output format is requested via the model's JSON mode / structured output feature — not parsed from free text.
- All AI calls are made from the API backend (`packages/api`), not directly from the client, to avoid exposing API keys.
- The response schema lives in `packages/lib` and is shared between the API and mobile client.
- The digitized menu payload is the canonical data model consumed by all downstream features: menu display, recommendations, beverage pairing, and session history.
