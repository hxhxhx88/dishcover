# Codebase

All e2e testing code is in the `e2e` folder.

```text
e2e
├── package.json
├── src
│   ├── lib
│   │   ├── env-worker.ts       # Environment variables for the worker process.
│   │   ├── env.ts              # Environment variables for the main process at launch.
│   │   ├── wdio.conf.ts        # Shared wdio configuration.
│   │   └── ...
│   ├── pages                   # Page objects for each screen (one class per screen).
│   │   ├── *.page.ts
│   │   └── ...
│   └── specs                   # Folder for all test cases, grouped by scenario (e.g., `dishes`).
│       ├── dishes
│       │   └── *.e2e.ts        # Test case files.
│       └── ...
├── wdio.android.conf.ts        # Android configuration.
├── wdio.ios.conf.ts            # iOS configuration.
└── ...
```

- See `e2e/src/specs/dev/example.e2e.ts` for an example of how to write test cases.
- Following the [page object pattern](https://webdriver.io/docs/pageobjects/).

## Runtime configuration

The API origin and database URL can be configured at runtime to avoid rebuilding the client and redeploying the server.

- Visit `/dev/reset-state` in the mobile app to reset its state, including the `databaseUrl` and `apiOrigin`.
- Attach an `apiHeaders.database` header (defined in `packages/lib/src/http.ts`) to instruct the server to use a specific database URL.

With this approach, we only need to deploy the server once and build the mobile app once to run all test cases.
