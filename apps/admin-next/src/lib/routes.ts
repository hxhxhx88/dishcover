export const routes = {
  home: '/',
  users: {
    list: '/users',
    detail: (id: string): string => `/users/${id}`,
  },
}
