import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  react: true,
  typescript: true,
  nextjs: true,
  ignores: [
    // Do not lint UI primitives which are installed by 3rd party libraries like shadcn.
    'packages/ui-web/src/primitives',
    'packages/ui-mobile/src/primitives',
    'packages/db/prisma/migrations',
    'apps/app-mobile/src/generated',
    // Next.js automatically generates this file.
    'apps/**/next-env.d.ts',
  ],
}, {
  rules: {
    // Enforce explicit return types on all functions to prevent accidental changes to a function’s signature.
    'ts/explicit-module-boundary-types': 'error',
    // Defining something later in the file can improve readability without harming the code.
    'ts/no-use-before-define': 'off',
    // File name should be kebab-case.
    'unicorn/filename-case': ['error', { cases: { kebabCase: true } }],
    // Not needed — using App Router instead of Pages Router.
    '@next/next/no-html-link-for-pages': 'off',
    // We are not only working in the node environment, allow using `process.env` is pretty safe.
    'node/prefer-global/process': 'off',
    // This bans the use of type assertions ('as' and '<Type>')
    '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
  },
}, {
  files: ['**/README.md', '**/AGENTS.md', '**/CONTRIBUTING.md'],
  rules: {
    'unicorn/filename-case': 'off',
  },
})
