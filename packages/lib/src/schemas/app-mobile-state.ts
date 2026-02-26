import z from 'zod'

export const appStateSchema = z.object({
  accessToken: z.string().optional(),
  refreshToken: z.string().optional(),

  // Following fields are for development and testing purposes.
  databaseUrl: z.string().optional(), // the database URL sent to the server.
  apiOrigin: z.string().optional(), // the API origin to override the default one.
  apiHeaders: z.record(z.string(), z.string()).optional(), // any extra headers to be sent with API requests.
})

export type AppState = z.infer<typeof appStateSchema>
