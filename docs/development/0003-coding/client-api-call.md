# Client API call

The Orval-generated API client is the single source of truth for making API calls in the client (e.g., mobile app).

- To make requests in components, use the generated hooks:

  ```tsx
  import { useGetConfigV1 } from '@/generated/api-client'

  export function MyComponent(): JSX.Element {
    const { data } = useGetConfigV1()
    // ...
  }
  ```

- To make requests functionally, use the generated functions:

  ```tsx
  import { postMeV1Refresh } from '@/generated/api-client'

  export async function runPostMeV1Refresh(): Promise<void> {
    const resp = await postMeV1Refresh(/* ... */)
  }
  ```
