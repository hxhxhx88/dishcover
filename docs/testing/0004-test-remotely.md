# Run test remotely

We use GitHub Actions to run e2e tests remotely. Check `.github/workflows/e2e-test.yaml` for details.

## Prerequisites

- Generate a Vercel [protection bypass token](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation).
- Create required GitHub secrets. Search for `secrets.` in `e2e-test.yaml` to list them.

## Preparation

### Build the target mobile app

Before starting a remote e2e test run, build the target `.app` for iOS and `.apk` for Android on Expo.

- Build iOS: `task app-mobile:build:ios:app`
- Build Android: `task app-mobile:build:android:apk`

Save the **fingerprints** of these Expo builds for later use.

### Deploy the target server

A preview deployment will automatically launch for the branch on Vercel. Wait for it to be ready. Copy its origin.

## Run test

The GitHub Actions workflow can only be triggered manually (or via `gh`). Upon triggering:

- The API origin must be provided — it is the origin of the preview deployment.
- The iOS or Android Expo build fingerprints can be optionally provided, and the corresponding e2e test will run.

> **Caution:** running an Android emulator on GitHub CI runners is notoriously flaky. It is strongly recommended to only run iOS e2e tests on GitHub for now.
