# `createHistoryRouter`

Creates router instance and sync routes state with the passed history instance.

```ts
import { createHistoryRouter } from 'atomic-router';
```

## Usage

```ts
import { sample } from 'effector';
import { createHistoryRouter } from 'atomic-router';
import { createBrowserHistory, createMemoryHistory } from 'history';

import { homeRoute } from '@/pages/home';
import { postsRoute } from '@/pages/posts';
import { postRoute } from '@/pages/post';

import { appStarted } from '@/shared/init';

// 1. Define routes and URLs map
const routesMap = [
  { path: '/', route: homeRoute },
  { path: '/posts', route: postsRoute },
  { path: '/posts/:postId', route: postRoute },
];

// 2. Create router
const router = createHistoryRouter({
  routes: routesMap,
});

// 3. Create history
const history = isSSR ? createMemoryHistory() : createBrowserHistory();

// 4. Attach it to router
sample({
  clock: appStarted,
  fn: () => history,
  target: router.setHistory,
})
```

## Handling 404 errors

### `notFoundRoute` param

You can pass `notFoundRoute` param to mark speicific route as 404:

```ts
import { createRoute, createHistoryRouter } from 'atomic-router';

const notFoundRoute = createRoute();

const router = createHistoryRouter({
  routes: [
    /*...*/
  ],
  notFoundRoute,
});
```

::: tip `notFoundRoute` mechanics

Every time path changes:

- If 0 routes matched and `notFoundRoute.$isOpened` is `false`, trigger `notFoundRoute.opened`
- If 0 routes matched and `notFoundRoute.$isOpened` is `true`, trigger `notFoundRoute.updated`
- If there's at least 1 route matched and `notFoundRoute.$isOpened` is `true`, trigger `notFoundRoute.closed`

:::

### `routeNotFound` event

There's also a `router.routeNotFound` event.  
This event triggers every time the path changes and no routes matched:

```ts
import { createRoute, createHistoryRouter } from 'atomic-router';

const router = createHistoryRouter({
  routes: [
    /*...*/
  ],
});

sample({
  clock: router.routeNotFound,
  target: goToHomePage,
});
```

::: warning Warning

Make sure that subscription to `router.routeNotFound` is set **before** `router.setHistory` is triggered.  
Otherwise, it won't be triggered for the first time, if app is already started with 404

:::

## `base` param

You can add an optional `base` param to `createHistoryRouter`:

```ts
const router = createHistoryRouter({
  base: '/dashboard',
  routes,
});
```

This will add `/dashboard` to all paths of the passed routes.
