# Package structure

Both web (Next.js) and mobile (Expo) applications follow a unified directory structure:

```text
apps/*-(mobile|next)
├── src
│   ├── app                # File-based routing directory for routes and layouts.
│   │   └── ...
│   ├── components         # Application-specific components.
│   │   └── ...            # Note: shared components belong in `packages/ui-*`.
│   ├── generated          # Auto-generated code (e.g., API clients); do not edit manually.
│   ├── lib                # Application-specific utilities and constants.
│   │   ├── routes.ts      # Centralized route URL definitions mirroring `app` routes.
│   │   └── ...
│   ├── providers          # Global application providers (e.g., React Query, Theme, I18n).
│   │   └── ...
│   ├── screens            # Full-screen components.
│   │   └── ...            # Standard for mobile apps. In Next.js, these serve as client-side views,
│   │                      # while the `app` directory handles routing and server-side logic.
│   ├── styles             # Global stylesheets and theme configuration.
│   │   └── ...
│   └── types              # Global TypeScript type definitions (`.d.ts`).
│       └── ...
├── package.json
├── tsconfig.json
└── ...
```
