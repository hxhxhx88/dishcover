# Database

The project uses PostgreSQL as its database. In production, we use [Neon](https://neon.tech).

To get started, create a project in Neon, and grab the connection string for `DATABASE_URL`.

- Use the **pooling connection string** (e.g. `...-pooler...`) for serverless backends like the app on Vercel.
- Use the **direct connection string** for development and maintenance (e.g. updating schema and dumping data).

## Migration

You can migrate the schema in either of these ways:

- Run the workflow in `.github/workflows/migrate-database.yaml` through GitHub Actions.
- Set `DATABASE_URL` to your remote database URL and run `task db:dev` locally.
