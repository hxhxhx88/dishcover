# Styling configuration

This codebase uses shadcn as the UI framework, and shadcn uses Tailwind CSS for styling.

Styling is configured in these layers:

- `apps/*`
- `packages/ui-*`
- `configs/ui`

`configs/ui/global.css` is the single source of truth for styling tokens.

- In some cases, values in `global.css` cannot be referenced directly.
- For those cases, `configs/ui/colors.ts` duplicates the required values.
- `global.css` and `colors.ts` must stay synchronized.

`packages/ui-web` and `packages/ui-mobile` both reference `configs/ui` in their stylesheet files:

- `packages/ui-*/src/styles/global.css`

Finally, `apps/*` reference the `global.css` files exposed by `ui-*`:

- `apps/*/src/styles/base.css`
