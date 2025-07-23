# Catch-All

In this example, we will demonstrate how to implement catch-all route.

## Task

We want to catch all `/foo/bar`, `/foo/bar/baz` and `/foo/bar/baz/test` paths.

## Solution

Since we use [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp/tree/v6.2.0) for path matching, this route won't differ from others:
* important: path-to-regexp version 6.2.0. newest version has different api

```ts
import { createRoute, createHistoryRouter } from 'atomic-router'

// Create a route with array parameter
const fooRoute = createRoute<{ param: string[] }>()

const router = createHistoryRouter({
  routes: [
    // Just add "+" sign after `:param` and it works!
    { path: '/foo/:param+', route: fooRoute }
  ]
})
```

Then, if you'll do:
```ts
fooRoute.open({ param: ['bar', 'baz'] })
```
It will open `/foo/bar/baz`, and `fooRoute.$params` will be `{ param: ['bar', 'baz'] }`
