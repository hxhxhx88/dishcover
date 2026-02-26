# I18n configuration

The codebase uses [Lingui](https://lingui.dev/) to handle i18n. `packages/i18n` is the single source of truth for i18n-related concerns, such as supported locales and their translations. The latter lives in `packages/i18n/locales`, which is the central place to look for translation resources.

- In `packages/i18n/lingui.config.ts`, configure where to search for translatable texts.
- For mobile app configuration, check files in `apps/app-mobile`:
  - `lingui.config.ts`
  - `babel.config.js`
  - `src/lib/i18n.tsx`
  - `src/providers/i18n.tsx`
- For web app configuration, check files in `apps/app-next`:
  - `next.config.ts`
  - `src/lib/i18n.ts`
  - `src/providers/i18n.tsx`
- The backend API also has an i18n middleware:
  - `packages/api/src/middlewares/i18n.ts`
