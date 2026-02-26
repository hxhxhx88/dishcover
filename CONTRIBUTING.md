# Contribution guide

For comprehensive guidelines and further information, please refer to the `docs` directory:

- `philosophy`: General principles for design and decision-making
- `development`: Development instructions and best practices
- `engineering`: Technical specifications and architectural design
- `product`: Product specifications
- `testing`: Testing methodology and instructions
- `deployment`: Deployment guides and infrastructure

## Repository shape

- This is a pnpm monorepo with Turborepo (`pnpm-workspace.yaml`, `turbo.json`).
- Deployable apps live in `apps/*`:
  - `apps/app-next` (public website, Next.js, `dev` on port `3000`)
  - `apps/admin-next` (admin website, Next.js, `dev` on port `3001`)
  - `apps/app-mobile` (Expo React Native app)
- Shared packages live in `packages/*`:
  - `@repo/api`, `@repo/db`, `@repo/email`, `@repo/i18n`, `@repo/lib`
  - `@repo/ui-web`, `@repo/ui-mobile`
- Shared config packages live in `configs/*`:
  - `@repo/ts-config`, `@repo/ui-config`
- Root task entrypoint is `taskfile.yaml`, with scoped tasks in `tasks/*.yaml`.

## Source of truth by domain

- API contracts and handlers: `packages/api/src`
- API routing mount in Next.js: `apps/app-next/src/app/api/[[...route]]/route.ts`
- OpenAPI doc endpoint: `/api/doc` (declared in `packages/api/src/index.ts`)
- Database schema and migrations: `packages/db/prisma/schema.prisma`
- i18n locale resources: `packages/i18n/locales/*/messages.po`
- Shared schemas: `packages/lib/src/schemas/*`
- Shared web UI primitives: `packages/ui-web/src/primitives`
- Shared mobile UI primitives: `packages/ui-mobile/src/primitives`
- Mobile API client (generated): `apps/app-mobile/src/generated/api-client.ts` (do not edit manually)
- Orval generation config: `orval.config.ts`

## Dependency boundaries

- Keep imports flowing down the architecture:
  - `apps/*` can import from `packages/*`
  - backend packages (`api`, `email`) can import `db`, `lib`, `i18n`
  - UI packages (`ui-web`, `ui-mobile`) can import `lib`, `i18n`
  - core packages (`db`, `lib`, `i18n`) should stay independent from higher layers
- Do not import app-to-app (`apps/*` must not import other `apps/*`).
- Avoid deep imports when an `index` export exists.
- Move cross-app shared code into `packages/*`, not into another app.

## Workflow commands

- List tasks: `task --list-all`
- Preferred command wrapper: use `task ...` so `.env.local` is loaded automatically
- Run all dev pipelines: `task dev`
- Run a single workspace with Turbo filter: `task dev -- --filter=...`
- Run quality loop: `task check`
- Run full build gate: `task build`
- Run `task pnpm -- ...` instead of `pnpm ...`.

## API, DB, and i18n workflows

- API change workflow:
  - implement route/schema in `packages/api/src/routes/...`
  - regenerate client with `task gen:api`
- DB change workflow:
  - edit `packages/db/prisma/schema.prisma`
  - run `task db:dev` (or `task db:new` then `task db:dev` for manual migration edits)
  - run `task db:gen`
- i18n workflow:
  - extract messages with `task i18n`
  - complete missing translations in `packages/i18n/locales`

## Environment variables

- Use `.env.example` as the template for `.env.local`.

## Coding conventions that matter in this repo

- Naming uses reverse order (for example `table-user.tsx`, `action-user-create.ts`, `ScreenMain`).
- Prefer named over default exports.
- Prefer server actions for internal web frontend-backend communication.
- Use Lingui macros (`t`, `<Trans>`) for end-user text, except admin website text.
- Keep `configs/ui/global.css` and `configs/ui/colors.ts` aligned.
- Follow docs style rules when editing Markdown:
  - sentence case headings
  - unnumbered lists
