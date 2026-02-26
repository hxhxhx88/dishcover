# API package structure

The single source of truth for API definition is in `packages/api`. The directory structure is:

```text
packages/api
├── src
│   ├── index.ts # The entry point to the API package.
│   ├── routes # Definition and implementation of all routes.
│   │   ├── [resource]
│   │   │   ├── index.ts
│   │   │   ├── v1
│   │   │   │   ├── index.ts
│   │   │   │   ├── [verb].ts
│   │   │   │   └── ...
│   │   │   └── v2
│   │   │       └── ...
│   │   └── ...
└── ...
```

The API routes are defined in the following pattern: `[resource]/[version]/[verb]`. For example:

- `users/v1/create.ts`
- `products/v2/delete.ts`

Routes within a directory are exported from `index.ts` at their own scope and bubbled up to the root `index.ts`.

## General design guide

Follow Google's [API design guide](https://docs.cloud.google.com/apis/design), i.e. the resource-oriented design.

Map the following standard actions and HTTP methods:

| Action | Method                 |
| ------ | ---------------------- |
| Get    | GET /resources/{id}    |
| List   | GET /resources         |
| Create | POST /resources        |
| Update | POST /resources/{id}   |
| Delete | DELETE /resources/{id} |

For actions falling outside the above standard ones, define custom verbs with sensible HTTP methods and endpoints.
