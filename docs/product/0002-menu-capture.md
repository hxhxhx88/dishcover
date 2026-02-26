# Menu Capture

## Summary

The user photographs one or more pages of a restaurant menu using the device camera or selects images from their photo library. All captured pages are collected into a single session before processing begins.

---

## User Story

_As a diner at a foreign restaurant, I want to photograph all pages of the menu so the app can process the complete menu at once._

---

## Acceptance Criteria

### Capture flow

- User can launch the camera directly from the main screen to photograph a menu page.
- User can import one or more images from the photo library.
- After each capture or import, the user is shown a preview of the page and can add more pages or proceed.
- Pages are displayed in a thumbnail strip in capture order.
- User can remove any page before submission.
- Minimum: 1 page. Maximum: 10 pages per session.

### Image quality

- If a captured image is detected as blurry or too dark, a quality warning is shown and the user is offered a retake.
- Low-quality images can still be submitted after the warning (user override).
- Supported input formats: JPEG, HEIC, PNG.

### Non-menu input

- If the submitted image(s) clearly contain no menu content, the app returns a graceful error: _"This doesn't look like a menu. Try photographing the menu pages."_

### Performance

- Image selection and preview must feel instantaneous (no processing at capture stage).
- Image compression applied before upload to keep payloads manageable (target: ≤ 1.5 MB per page after compression, with no visible quality loss for typical menu photography).

---

## Edge Cases

| Scenario                                 | Expected behavior                                            |
| ---------------------------------------- | ------------------------------------------------------------ |
| User adds 10 pages and tries to add more | Add button is disabled; informational message shown          |
| User cancels mid-capture                 | Returns to previous state; no session started                |
| Photo library permission denied          | Prompt to open Settings; camera-only path remains available  |
| Camera permission denied                 | Prompt to open Settings; library-only path remains available |
| Image in an unsupported format           | Silently convert on-device or show a clear error             |

---

## Technical Notes

- Image capture: `expo-camera` or `expo-image-picker` (React Native / Expo).
- Compression: resize to max 2048px on the long edge before encoding as JPEG at 85% quality.
- No server interaction at this stage; captured images are held in local state until the user submits for processing.
- The collected image URIs are passed to the digitization step on submission.
