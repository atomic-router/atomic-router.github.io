# `querySync`

::: tip
Introduced in **0.7.1**
:::

Synchronizes chosen stores with query params from [`createRouterControls`](/api/create-router-controls.md)

```ts
import { querySync } from 'atomic-router';
```

## Usage

### Basic example

```ts
import { createStore } from 'effector'
import { createRoute, querySync } from 'atomic-router'

import { controls } from '@/shared/routing'

const $utmSource = createStore("")

querySync({
  source: { utm_source: $utmSource },
  controls
})
```

This will 
- Update `$utmSource` whenever `utm_source` from query params is updated
- Update `utm_source` from query params whenever `$utmSource` is updated

### Only on a specific route

You can pass `route` param if you want this sync to work only for a specific route:

```ts
import { createStore } from 'effector'
import { createRoute, querySync } from 'atomic-router'

import { controls } from '@/shared/routing'

const searchRoute = createRoute()

const $q = createStore("")

querySync({
  source: { q: $q },
  route: searchRoute, 
  controls
})
```

### With a `clock`

If we don't want to spam route updates, there's a `clock` parameter.  
If it's passed, `querySync` will update route only when `clock` it's triggered:

```ts
import { createRoute, querySync } from 'atomic-router'
import { createStore, createEvent } from 'effector'

import { controls } from '@/shared/routing'

const canvasEditorRoute = createRoute()

const canvasDragged = createEvent()
const canvasDragEnded = createEvent()

const $x = createStore('0')
const $y = createStore('0')

$x.on(canvasDragged, (_, { x }) => x)

$y.on(canvasDragged, (_, { y }) => y)

querySync({
  source: { x: $x, y: $y },
  route: canvasEditorRoute,
  clock: canvasDragEnded, 
  controls
})
```

## `cleanup` parameter

You can also customize cleanup strategy:

```ts
querySync({
  source: { q: $q },
  cleanup: {
    // Strip all params which aren't present in `source`
    irrelevant: true,
    // Strip empty params ('', 0, false, null)
    empty: true,
    // Preserves params that should've been removed by irerelevant/empty params
    preserve: ['utm_source']
  }, 
  controls
})
```

- `cleanup` is optional. Default strategy is `{ irrelevant: true, empty: false, preserve: [] }`
- All `cleanup` options are optional. Config will be merged with the default one.
- Also supports shorthands:
  - `cleanup: true` means `{ irrelevant: true, empty: true, preserve: [] }`
  - `cleanup: false` means `{ irrelevant: false, empty: false, preserve: [] }`
