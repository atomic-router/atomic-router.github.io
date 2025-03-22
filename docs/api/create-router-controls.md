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

Also, external controls are required for [`querySync`](/api/query-sync) method.

## Usage

Create controls:

```ts
// @/shared/routing
import { createRouterControls } from 'atomic-router';

export const controls = createRouterControls();

controls.$query;   // StoreWritable<RouteQuery> Store with current query params
controls.back;     // EventCallable<void> Trigger it to call history.back
controls.forward;  // EventCallable<void> Trigger it to call history.forward
```

Pass it to `createHistoryRouter`:
```ts
// @/app/router
import { createHistoryRouter } from 'atomic-router';
import { controls } from '@/shared/routing';

const routesMap = [/* ... */];

export const router = createHistoryRouter({
  routes: routesMap,
  controls,
});
```

Use it anywhere:
```ts
// @/pages/register
import { sample, createEvent } from 'effector'
import { controls } from '@/shared/routing'

export const cancelButtonPressed = createEvent();

sample({
  clock: cancelButtonPressed,
  target: controls.back,
});
```
