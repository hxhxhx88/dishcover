# Run test locally

Follow these steps to run e2e tests locally.

## Prerequisites

- Create a blank Neon project dedicated to e2e testing.
- Set the required environment variables in `.env.local` as specified in `e2e/src/lib/env.ts`.
- Generate the native projects: `task app-mobile:prebuild`.

## Start server

**Local server:**

- Run `task pnpm -- --filter app-next dev`.
- Set `API_ORIGIN` to `http://localhost:3000` for iOS simulator or `http://10.0.2.2:3000` for Android simulator.

**Remote preview server:**

- Set `API_ORIGIN` to the remote origin.
- If the remote server is a Vercel protected deployment, set `VERCEL_AUTOMATION_BYPASS_SECRET` correctly.

## Test iOS

- Build the app: `task app-mobile:build:ios:local`.
- Run: `task e2e:ios`.

## Test Android

- Build the app: `task app-mobile:build:android:apk:local`.
- Run: `task e2e:android`.
