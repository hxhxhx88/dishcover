# API workflow

We use `@hono/zod-openapi` to define the API according to the OpenAPI standard using Zod, and serve it with Hono.

Follow these principles when working on APIs:

- **Schema first**: when defining an API, always define its request and response schema first.
- **Backward compatibility**: always ensure that future updates are backward compatible. If they cannot be, increment the version.
- **Downstream oriented**: design the interface based on the downstream's needs, instead of internal convenience.

After updating the code, run `task gen:api` to generate the client.
