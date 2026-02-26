# Dependency installation

## Web UI primitive

To install a web UI primitive, run:

```bash
task ui:web -- [name]
```

where `name` is the name of a [shadcn component](https://ui.shadcn.com/docs/components).

## Mobile UI primitive

To install a mobile UI primitive, run:

```bash
task ui:mobile -- [name]
```

where `name` is the name of a [React Native Reusable component](https://reactnativereusables.com/docs/components/accordion).

## Mobile package

**ALWAYS** run:

```bash
task app-mobile:install -- [dependencies]
```

to install mobile dependencies. Behind the scenes, it calls `pnpm expo install` to ensure version compatibility.

## General installation

To install a dependency for a specific package, run:

```
pnpm --filter [package] add [dependency]
```
