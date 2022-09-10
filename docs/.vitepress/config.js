export default {
  title: 'Atomic Router',
  description: 'Platform-agnostic router that does not break your architecture',
  themeConfig: {
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is Atomic Router', link: '/' },
          { text: 'Getting Started', link: '/getting-started' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Data Fetching', link: '/examples/data-fetching' },
          { text: 'Protected route', link: '/examples/protected-route' },
          { text: 'Catch All', link: '/examples/catch-all' },
          { text: 'Redirect', link: '/examples/redirect' },
          { text: 'Query Params Sync', link: '/examples/query-params-sync' },
          { text: 'SSR Support', link: '/examples/ssr' },
          { text: 'Micro-frontends', link: '/examples/micro-frontends' },
          { text: 'Browser extension', link: '/examples/browser-extension' },
        ],
      },
      {
        text: 'API',
        items: [
          { text: 'createRoute', link: '/api/create-route' },
          { text: 'createRouter', link: '/api/create-router' },
          { text: 'redirect', link: '/api/redirect' },
          { text: 'chainRoute', link: '/api/chain-route' },
        ],
      },
      {
        text: 'React',
        items: [
          { text: 'Installation', link: '/react/installation' },
          { text: 'Scope and SSR', link: '/react/scope' },
          {
            text: 'API',
            items: [
              { text: 'RouterProvider', link: '/react/api/router-provider' },
              { text: 'Link', link: '/react/api/link' },
              { text: 'Route', link: '/react/api/route' },
              { text: 'createRouteView', link: '/react/api/create-route-view' },
              { text: 'createRoutesView', link: '/react/api/create-routes-view' },
              { text: 'useLink', link: '/react/api/use-link' },
            ],
          },
        ],
      },
      {
        text: 'Another view-libraries bindings',
        items: [
          {
            text: 'Forest',
            link: 'https://github.com/atomic-router/forest',
          },
          {
            text: 'Solid',
            link: 'https://github.com/atomic-router/solid',
          },
        ],
      },
    ],
    editLink: {
      pattern: 'https://github.com/atomic-router/atomic-router.github.io/edit/master/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },
};
