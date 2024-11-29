import { unstable_vitePlugin as remix } from '@remix-run/dev'
import { flatRoutes } from 'remix-flat-routes'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    port: 5555,
  },
  plugins: [
    remix({
      ignoredRouteFiles: [
        '**/*',
        '**/.DS_Store',
        '**/*.css',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/__*.*',
      ],
      routes: async (defineRoutes) => {
        return flatRoutes('routes', defineRoutes)
      },
      serverModuleFormat: 'esm',
    }),
    tsconfigPaths(),
  ],
})
