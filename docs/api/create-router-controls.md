# `createRouterControls`

::: tip
Introduced in **0.7.0**
:::

Creates external router controls

```ts
import { createRouterControls } from 'atomic-router';
```

## Purpose
Since you create router instance in the initialization layer, using `router.back/forward` might lead to cross-imports.

To solve this issue, you can create external router controls with `$query` store and `back/forward` events.

## Usage

Create controls:

```ts
// @/shared/routing
import { createRouterControls } from 'atomic-router';

export const controls = createRouterControls()

controls.$query   // Store<RouteQuery> Store with current query params
controls.back     // Event<void> Trigger it to call history.back
controls.forward  // Event<void> Trigger it to call history.forward
```

Pass it to `createHistoryRouter`:
```ts
// @/app/router
import { createHistoryRouter } from 'atomic-router'

import { controls } from '@/shared/routing'

const routes = [/* ... */]

export const router = createHistoryRouter({
  routes,
  controls
})
```

Use it anywhere:
```ts
// @/pages/register
import { sample, cancelButtonPressed } from 'effector'

import { controls } from '@/shared/routing'

const cancelButtonPressed = createEvent<MouseEvent>()

sample({
  clock: cancelButtonPressed,
  target: controls.back
})
```
