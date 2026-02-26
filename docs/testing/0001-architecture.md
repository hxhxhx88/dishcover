# Architecture

We use [Neon branches](https://neon.com/docs/manage/branches) to manage isolated databases for test cases. The branches are organized as follows:

```text
root-branch                     # A dedicated blank Neon project for e2e testing. Do not modify it.
└── schema-branch               # Spawned from the root branch at the start of a test run to migrate
    │                           # the schema. Contains no data. Created in the `onPrepare` hook
    │                           # of `wdio.conf.ts`.
    ├── data-branch-0001        # Spawned from the schema branch and populated with initial data.
    │   │                       # Corresponds to one `describe` block in Mocha and is created in
    │   │                       # its `before` hook.
    │   ├── case-branch-0001    # Spawned from a data branch for a specific test case to ensure
    │   │                       # isolation. Corresponds to one `it` block in Mocha and is created
    │   │                       # in the `beforeEach` hook.
    │   ├── case-branch-0002
    │   └── ...
    ├── data-branch-0002
    │   └── ...
    └── ...
```
