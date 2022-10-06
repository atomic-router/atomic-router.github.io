# `createRouteView`

It renders a view only if route is opened.

```ts
import { createRouteView } from 'atomic-router-solid';
```

::: tip Please, pay attention for a name

This function is about single route.
See also [`createRoutesView`](./create-routes-view.md).

:::

### Example

```tsx
import { createRoute } from 'atomic-router';
import { createRouteView } from 'atomic-router-solid';
import { restore, createEffect } from 'effector';
import { useUnit } from 'effector-solid';
import { For } from "solid-js"

const homeRoute = createRoute();

const getPostsFx = createEffect(/* ... */);

const $posts = restore(getPostsFx, []);

const postsLoadedRoute = chainRoute({
  route,
  beforeOpen: getPostsFx,
});

const PostsList = createRouteView({
  route: postsLoadedRoute,
  view() {
    const posts = useUnit($posts);

    return (
      <div>
          <For each={posts()}>
              {post => <div>{post.title}</div> }
          </For>
      </div>
    );
  },
  otherwise() {
    return <div>Loading...</div>;
  },
});
```

> Tip: you can pass a Solid-component to a `view` and `otherwise` properties.
