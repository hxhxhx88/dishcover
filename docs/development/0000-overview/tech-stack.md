# Tech stack

The codebase is built on modern open-source projects from the TypeScript ecosystem, following an opinionated set of current best practices.

## Language

The primary language is [TypeScript](https://www.typescriptlang.org/).

## Frontend

|            | Website                                  | Mobile                                                          |
| ---------- | ---------------------------------------- | --------------------------------------------------------------- |
| Framework  | [Next.js](https://nextjs.org/)           | [Expo](https://expo.dev/)                                       |
| Components | [shadcn](https://ui.shadcn.com/)         | [React Native Reusables](https://www.reactnativereusables.com/) |
| Styling    | [Tailwind CSS](https://tailwindcss.com/) | [Nativewind](https://www.nativewind.dev/)                       |

## Backend

- [Hono](https://hono.dev/) — standalone backend API framework.
- [@hono/zod-openapi](https://hono.dev/examples/zod-openapi) — defines API routes as OpenAPI schemas using Zod, integrated with Hono.
- [Orval](https://orval.dev/) — generates typed API clients from the OpenAPI spec.
- [Prisma](https://www.prisma.io/) — database ORM.
- [PostgreSQL](https://www.postgresql.org/) — relational database.

## Libraries

- [Zod](https://zod.dev/) — schema validation at both build time and runtime.
- [Zustand](https://github.com/pmndrs/zustand) — frontend state management.
- [React Query](https://tanstack.com/query/latest/docs/framework/react/overview) — server state management and data fetching.
- [React Hook Form](https://react-hook-form.com/) — form state and validation.
- [Lingui](https://lingui.dev/) — internationalization (i18n).
- [react-email](https://github.com/resend/react-email) - building email templates.

## Tooling

- [Task](https://taskfile.dev/) — defines and runs CLI tasks for common operations.
- [pnpm](https://pnpm.io/) — monorepo package management.
- [antfu/eslint-config](https://eslint-config.antfu.me/) — linting and formatting.
