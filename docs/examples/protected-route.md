# Protected route

Example with a protected route.

## Task

Imagine that we have a private dashboard.  
We want to allow access to the route only for authorized users.  
And we also don't want to run any logic until we know if user is allowed to visit this route.

## Solution

Suppose that we have some auth model.  
We won't deep-dive into authorization logic details.  
Let's just consider user authorized if we have their token:  

```ts
// @/shared/auth
import { createEvent, createStore } from 'effector'

export const tokenReceived = createEvent<string>()
export const tokenErased = createEvent()

export const $token = createStore('')

export const $isAuthorized = $token.map(Boolean)

$token
  .on(tokenReceived, (prev, token) => token)
  .reset(tokenErased)
```

Then, we can create a simple wrapper:

```ts
// @/shared/route
import { chainRoute } from 'atomic-router'
import { createEvent } from 'effector'

import { $isAuthorized, tokenReceived } from '@/shared/auth'

export const authorizedRoute = <Params>(route: RouteInstance<Params>) => {
  const sessionCheckStarted = createEvent<any>()

  const alreadyAuthorized = sample({
    clock: sessionCheckStarted,
    filter: $isAuthorized,
  })

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthorized, tokenReceived],
  })
}
```

And now we can wrap any route with that:

```ts
import { createRoute } from 'atomic-router'
import { authorizedRoute } from '@/shared/route'

export const editUsersRoute = createRoute()

export const authorizedEditUsersRoute = authorizedRoute(editUsersRoute)
```
:::tip How it works
When we open `editUsersRoute`
- If `$isAuthorized` is true, open `authorizedEditUsersRoute` immediately
- If not, wait until `tokenReceived` is trigger, and open the route if we're still on this page
:::

Now you can combine it with another `chainRoute`:

```ts
import { createRoute, chainRoute } from 'atomic-router'
import { authorizedRoute } from '@/shared/route'

import { getUsersFx } from './model'

export const editUsersRoute = createRoute()

export const usersLoadedRoute = chainRoute({
  route: authorizedRoute(editUsersRoute),
  beforeOpen: getUsersFx
})
```

This will trigger `getUsersFx` only when user is authorized.
