# Prerequisites

## Development tools

- Install [Task](https://taskfile.dev/docs/installation).
- Install [Node.js](https://nodejs.org/en/download).
- Install [pnpm](https://pnpm.io/installation).

## Service providers

- Set up a [Postmark](https://postmarkapp.com/) account for email service.
- Set up two [Neon](https://neon.tech/) projects: one for production and one for testing.
- Set up a [Vercel](https://vercel.com/) project for delivering servers.
- Set up an [EAS](https://expo.dev/) project for delivering mobile apps.

## Mobile development

- Install Xcode to work with iOS simulators.
- Install Android Studio to work with Android emulators.

# Quick start

## Preparation

- Prepare a PostgreSQL database for local development.
- Run `cp .env.example .env.local` and fill in environment variables.
- Run `task pnpm -- install` to install dependencies.
- Run `task db:dev` and `task db:gen` to initialize the database.

## Start development servers

- Run `task dev` to start development servers.

## Start the iOS app

- Run `task app-mobile:prebuild` to generate iOS and Android projects.
- Run `task app-mobile:ios` to install the mobile app on the iOS device `DEV_DEVICE_IOS`.

## Run e2e tests locally

- Run `task app-mobile:build:ios:local` to build the iOS app for local e2e tests.
- Kill the `task dev` session and run `task pnpm -- --filter app-next dev` to start only the `app-next` development server.
- Run `task e2e:ios` to start e2e tests on iOS.

# Next steps

Check `CONTRIBUTING.md` for further details.
