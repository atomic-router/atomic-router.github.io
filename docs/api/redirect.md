# `redirect`

Declarative operator for setting up redirects on a certain events

```ts
import { redirect } from 'atomic-router';
```

## Usage

```ts
import { createEvent } from 'effector';
import { createRoute, redirect } from 'atomic-router';

const goHomePressed = createEvent<MouseEvent>();

const homeRoute = createRoute();

redirect({
  clock: goHomePressed,
  route: homeRoute,
});
```

::: tip The following is read as:
Whenever `goHomePressed` is triggered,  
Trigger `homeRoute.navigate` with `{ params: {}, query: {} }`
:::

## Passing params

You can pass parameters in different ways:

### 1. Object notation - static params/query

```ts
import { createEvent } from 'effector';
import { createRoute, redirect } from 'atomic-router';

const readMorePressed = createEvent<MouseEvent>();

const readPostRoute = createRoute<{ postId: string }>();

redirect({
  clock: readMorePressed,
  params: { postId: 1 },
  query: { foo: 'bar' },
  route: readPostRoute,
});
```

::: tip The following is read as:
Whenever `readMorePressed` is triggered,  
Trigger `homeRoute.navigate` with `{ params: { postId: 1 }, query: { foo: "bar" } }`
:::

### 2. Store notation - dynamic params/query taken from store

```ts
import { createRoute, redirect } from 'atomic-router';
import { createStore, createEvent } from 'effector';

const readPostRoute = createRoute<{ postId: string }>();

const readMorePressed = createEvent<MouseEvent>();

const $post = createStore({ postId: 1 });

redirect({
  clock: editPostPressed,
  params: $post,
  query: $someQuery,
  route: editPostRoute,
});
```

::: tip The following is read as:
Whenever `editPostPressed` is triggered,  
Trigger `editPostRoute.navigate` with `{ params: <state from $post store>, query: <state from $someQuery store> }`
:::

### 3. Function notation - get params/query directly from clock

```ts
import { createRoute, redirect } from 'atomic-router';
import { createStore, createEvent } from 'effector';

const readPostRoute = createRoute<{ postId: string }>();

const readPostPressed = createEvent<{ postId: string }>();

redirect({
  clock: editPostPressed,
  params: (payload) => ({ postId: payload.postId }),
  route: editPostRoute,
});
```

::: tip The following is read as:
Whenever `editPostPressed` is triggered,  
Trigger `editPostRoute.navigate` with `{ params: payload.postId }` (`payload` is from `editPostPressed`)
:::

## Return redirect

You can skip `clock` param to create `Event` that will trigger redirect.

it's useful in combination with `split` and other operators:

```ts
import { split, createEffect } from 'effector'
import { createRoute, redirect } from "atomic-router";

import { notFoundRoute, notAuthorizedRoute } from '@/shared/common-routes'

const getPostFx = createEffect(() => /* ... */)

split({
  source: getPostFx.failData,
  match: {
    401: err => err.code === 401,
    404: err => err.code === 404,
  },
  cases: {
    401: redirect({ route: notAuthorizedRoute }),
    404: redirect({ route: notFoundRoute }),
  }
})
```

::: tip The following is read as:

Whenever `getPostFx.failData` is triggered,

If `err.code` is 401 trigger `notAuthorizedRoute.navigate` with `{ params: {}, query: {} }`

If `err.code` is 404 trigger `notFoundRoute.navigate` with `{ params: {}, query: {} }`

:::
