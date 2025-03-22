# `createRoute`

Creates a route.  
You can `.open()` it subscribe to its `opened/closed` events, and watch for `$params/$query`

```ts
import { createRoute } from 'atomic-router';
```

## Common stuff

- `RouteParams` - type for route params. Extends `Record<string, any>`
- `RouteQuery` - type for route query. Extends `Record<string, any>`
- `RouteParamsAndQuery<Params>` - extends `{ params: Params, query: RouteQuery }`
- **"Route opened"** - means that we enter the route when it's not opened
- **"Route updated"** - means that currently opened route changes its params/query

## Usage

```ts
import { createRoute } from 'atomic-router';

export const homeRoute = createRoute();
export const postRoute = createRoute<{ postId: string }>();

// prefer `sample` over imperative events call
homeRoute.open(); // Effect
postRoute.open({ postId: '123' }); // Effect<{ postId: string }>

postRoute.$params.watch(console.log);
```

## Methods

### `.navigate`

Open the route with specified params and query

```ts
sample({
  clock: someThingHappened,
  fn: () => ({
    params: { postId: '123' },
    query: { foo: 'bar' },
  }),
  target: postRoute.navigate,
})
// /posts/:postId -> /posts/123?foo=bar
```

You can also add `replace: true` option to do `history.replace` instead of `history.push`:

```ts
sample({
  clock: someThingHappened,
  fn: () => ({
    params: { postId: '123' },
    query: { foo: 'bar' },
    replace: true,
  }),
  target: postRoute.navigate,
})
```

**Signature:** `Effect<RouteParamsAndQuery<RouteParams> & { replace?: boolean }, RouteParamsAndQuery<RouteParams>>`

### `.open`

The same as `.navigate` but with params only

```ts
sample({
  clock: somethingHappened,
  fn: () => ({ postId: '123' }),
  target: postRoute.open,
})
// /posts/:postId -> /posts/123
```

**Signature:** `Effect<RouteParams, RouteParamsAndQuery<RouteParams>>`

## Events

### `.opened`

Triggers whenever route is opened

```ts
sample({
  clock: postRoute.opened,
  fn: ({ params }) => ({ postId: params.postId }),
  target: fetchPostFx,
});
```

::: warning
` route.opened` does not trigger when the opened route updates!  
If you want to re-fetch data on parameter change, use both `[route.opened, route.updated` or subscribe to `route.$params`
:::

**Signature:** `Event<RouteParamsAndQuery<RouteParams>>`

### `.updated`

Triggers when params/query of the **currently opened** route get updated.

```ts
sample({
  clock: postRoute.updated,
  fn: ({ params }) => ({ postId: params.postId }),
  target: refetchPostFx,
});
```

**Signature:** `Event<RouteParamsAndQuery<RouteParams>>`

### `.closed`

Triggers when route gets closed

```ts
sample({
  clock: postRoute.closed,
  target: cleanup,
});
```

**Signature:** `Event<void>`

## Stores

### `$isOpened`

Detects whether the route is currently opened or not.

```ts
postRoute.$isOpened; // true/false
```

**Signature:** `Store<boolean>`

### `$params`

Current route params. These params are used as tokens for URL set in **router**.

If route is not opened, `$params` will be `{}`

```ts
postRoute.$params; // { postId: 123 }
```

**Signature:** `Store<RouteParams>`

### `$query`

Current route query. These are used to build [**Query String**](https://en.wikipedia.org/wiki/Query_string)

If route is not opened, `$query` will be `{}`

```ts
postRoute.$query; // { foo: 'bar' }
```

**Signature:** `Store<RouteQuery>`
