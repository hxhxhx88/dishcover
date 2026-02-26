# Codebase structure

The project is organized as a **monorepo**. Below is the top-level folder structure.

```text
.
├── apps/                  # Deployable applications (websites, mobile apps, CLI tools, etc.)
│   └── {name}-{runtime}/  # `name` identifies the application; `runtime` specifies the
│                          # delivery target. Use `browser`, `server`, etc. when the
│                          # boundary is clear, or the framework name (e.g. `next`) for
│                          # full-stack frameworks that blur the client/server boundary.
├── packages/              # Non-deliverable internal packages.
│   ├── api(-{name})/      # API layer for the application named `name`. The `name` can be omitted if is obvious.
│   ├── db/                # Database schemas and migrations — the single source of truth
│   │                      # for the project's data structures.
│   ├── email/             # Email templates.
│   ├── i18n/              # Centralized i18n configuration, utilities, and translations.
│   ├── lib/               # Miscellaneous shared utilities.
│   ├── ui-mobile/         # Common mobile UI primitives and components.
│   └── ui-web/            # Common web UI primitives and components.
├── configs/               # Shared configuration files.
│   ├── ts/                # TypeScript-related configuration.
│   └── ui/                # UI-related configuration.
├── examples/              # Example codes for doc and demo purposes. Never use them in reality.
├── tasks/                 # Task definitions for various scopes.
├── taskfile.yaml          # Entry point for all tasks.
├── orval.config.ts        # Orval configuration for API client generation.
└── ...                    # Other root-level configuration files.
```
