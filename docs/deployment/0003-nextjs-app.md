# Next.js app

All Next.js apps will be deployed on [Vercel](https://vercel.com/). Each `*-next` folder in `apps` will have a corresponding project in Vercel.

- Create a new project in Vercel.
- Link the project to the GitHub repository.
- Specify the "Root Directory" as `apps/*-next`.
- Add all environment variables defined in `lib/env.ts` for the app and its dependent `@repo/*` packages.
  - **Use the pooling connection string** for `DATABASE_URL`.
- Confirm deployment.
- After a short wait, a functional deployment of `*-next` will be online.

If the iOS or Android store app has not been created yet, set `STORE_ID_IOS` or `STORE_ID_ANDROID` to a placeholder value like `000000`.
