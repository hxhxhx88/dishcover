# F6 — Session History

**Milestone:** M3  
**Priority:** P2  
**Depends on:** F2, F3

---

## Summary

After a menu is scanned and digitized, the session is automatically saved to on-device storage. The user can browse a chronological list of past scans, reopen any of them, and delete individual sessions.

---

## User Story

_As someone who liked a dish last week at a restaurant I'm revisiting, I want to pull up the menu I scanned before so I can order the same thing again._

---

## Acceptance Criteria

### Auto-save
- Every successfully digitized session (F2 output) is automatically saved to local storage immediately after processing completes.
- No user action is required to save.
- Saving must not block or delay the transition to the menu display (F3); save happens in the background.

### History list
- A history screen is accessible from the main navigation.
- Sessions are listed in reverse chronological order (most recent first).
- Each entry shows:
  - Restaurant name (if detected by F2) or fallback: _"Menu — [date]"_
  - Date of scan (formatted to device locale)
  - Thumbnail of the first captured page

### Reopen a session
- Tapping a history entry opens the full digitized menu in the F3 display view.
- The reopened session is read-only; re-running recommendations (F4) or pairings (F5) is permitted using the stored menu data (no re-scan required).

### Deletion
- Each entry has a delete action (swipe-to-delete or contextual menu).
- Deletion requires a single confirmation.
- Deleted sessions are immediately removed from the list and from storage.

### Capacity
- Maximum 20 sessions stored on-device.
- When the 21st session is saved, the oldest session is automatically removed.
- The capacity limit is transparent to the user (documented in app; no mid-session warnings).

### Persistence
- History survives app restarts.
- History is cleared when the user clears app data or reinstalls (expected behavior; no backup in MVP).

---

## Edge Cases

| Scenario | Expected behavior |
|---|---|
| Digitization fails (F2 error) | Session is not saved |
| User closes app during save | Session save is atomic; partial saves are discarded on next launch |
| Device storage full | Save fails gracefully; user sees a non-blocking warning; oldest session may be pruned to free space |
| Restaurant name not detectable | Fallback label used; no error |
| User reinstalls app | History lost; this is expected and documented |
| Two scans at the same restaurant | Saved as two separate entries; no deduplication |

---

## Technical Notes

- Storage: `expo-secure-store` for small metadata; `AsyncStorage` or `expo-file-system` for full menu JSON and compressed thumbnail.
- The stored payload per session: `{ id, createdAt, restaurantName, thumbnailPath, menuPayload }`.
- `menuPayload` is the full F2 output, serialized as JSON.
- Thumbnail: compressed JPEG of the first captured image, max 200×200px, stored on the local filesystem.
- The 20-session cap is enforced at write time in the storage layer.
- No server-side component; this feature is entirely local.
