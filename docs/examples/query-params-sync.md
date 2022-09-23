# Query Params Sync

In this example, we will demonstrate how to use [`querySync`](/api/query-sync)

## Task

Imagine that we have some search form.  
And we want to update query whenever we change it.  
We also want to fill the search field if we open this page with query passed.

## Solution

Suppose that we have a search page with this model:

```ts
// @/pages/search
import { createRoute } from 'atomic-router'
import { createEvent, createStore } from 'effector'

export const searchPageRoute = createRoute()

export const qChanged = createEvent<string>()

export const $q = createStore("")

$q.on(qChanged, (_, q) => q)
```

First of all, create router controls (if not yet created):

```ts
// @/shared/routing
import { createRouterControls} 

export const controls = createRouterControls()
```

In order for `controls.$query` to work, we need to pass it to our router:

```ts{3,9}
// @/app/routing
import { createHistoryRouter } from 'atomic-router'
import { controls } from '@/shared/routing'

const routes = [/* ... */]

const router = createHistoryRouter({
  routes,
  controls
})
```

Now we can just use [`querySync`](/api/query-sync) method in our model:

```ts{2,13-16}
// @/pages/search
import { createRoute, querySync } from 'atomic-router'
import { createEvent, createStore } from 'effector'

export const searchPageRoute = createRoute()

export const qChanged = createEvent<string>()

export const $q = createStore("")

$q.on(qChanged, (_, q) => q)

querySync({
  source: { q: $q },
  route: searchPageRoute
})
```

## Edge-cases

### Debounce

If we don't want to spam query updates, we can pass `clock` parameter.

Combined with [`patronum/debounce`](https://patronum.effector.dev/methods/debug/) it'll look like this:

```ts{2,16}
// @/pages/search
import { debounce } from 'patronum'
import { createRoute, querySync } from 'atomic-router'
import { createEvent, createStore } from 'effector'

export const searchPageRoute = createRoute()

export const qChanged = createEvent<string>()

export const $q = createStore("")

$q.on(qChanged, (_, q) => q)

querySync({
  source: { q: $q },
  clock: debounce({ source: qChanged, timeout: 30 }),
  route: searchPageRoute
})
```

This will update every 30ms

### Keep empty parameters

If we want to keep `q` in query even if it's empty, we can use `cleanup` parameter

```ts{18-21}
// @/pages/search
import { debounce } from 'patronum'
import { createRoute, querySync } from 'atomic-router'
import { createEvent, createStore } from 'effector'

export const searchPageRoute = createRoute()

export const qChanged = createEvent<string>()

export const $q = createStore("")

$q.on(qChanged, (_, q) => q)

querySync({
  source: { q: $q },
  clock: debounce({ source: qChanged, timeout: 30 }),
  route: searchPageRoute,
  cleanup: {
    empty: false
    // or preserve: ['q']
  }
})
```
