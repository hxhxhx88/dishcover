# Mobile app

All mobile apps are deployed with [Expo Application Services (EAS)](https://expo.dev/eas). Each `*-mobile` directory in `apps` maps to one EAS project.

> In the examples below, we use `app-mobile`.

## Prerequisites

Set the following variable in `.env.local`:

- `EAS_PROJECT_ID_APP`: the EAS project ID for `app-mobile`

Then set all environment variables used by `apps/app-mobile/src/lib/env.ts` in the EAS project settings.

- Look for `process.env.EXPO_PUBLIC_*` references.
- Store `EXPO_PUBLIC_*` values as plain text in EAS.

Intall the `eas-cli` by:

```
npm install --global eas-cli
```

## Build iOS

Create the iOS app before running the first production build.

- Create an App ID in the [Apple Developer console](https://developer.apple.com/account/resources/identifiers/list).
- Create the app in [App Store Connect](https://appstoreconnect.apple.com/).
- Copy the numeric Apple ID to `apps/app-mobile/eas.json` at `submit.production.ios.ascAppId`.
  - EAS does not currently support providing this value at runtime, so it is committed to the repository.

For the first build, run this command and follow the interactive prompts.

```
task app-mobile:build:ios INTERACTIVE=1
```

After the first successful build, use the non-interactive command.

```
task app-mobile:build:ios
```

## Build Android

Create the Android app before running the first production build.

- Create the app in Google Play Console.
- [Configure](https://github.com/expo/fyi/blob/main/creating-google-service-account.md) a Google service account key for Play Store submissions with EAS.

For the first build, run this command and follow the interactive prompts.

```
task app-mobile:build:android INTERACTIVE=1
```

After the first successful build, use the non-interactive command.

```
task app-mobile:build:android
```

**Note:** auto-submission only works for Android after an initial manual release, so the first auto-submission will fail by design.

- Google Play uses the initial manual submission to register the package name. Upload the first `.aab` manually from EAS to Google Play Console.
- Subsequent auto-submissions will fail with `Google Api Error: Invalid request - Only releases with status draft may be created on draft app.`. To [resolve this](https://expo-release-it.mjstudio.net/troubleshooting#android-google-api-error-invalid-request---only-releases-with-status-draft-may-be-created-on-draft-app), fill out all required metadata manually, publish the app manually for the first time, then retry.
