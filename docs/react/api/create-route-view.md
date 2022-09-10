# `createRouteView`

It renders a view only if route is opened.

```ts
import { createRouteView } from 'atomic-router-react';
```

> Tip: please, pay attention for a name. This function is about single route.
>
> See also [`createRoutesView`](docs/react/api/create-routes-view.mdoutes-view.md).

### Example

```tsx
import { createRoute } from 'atomic-router';
import { createRouteView } from 'atomic-router-react';
import { restore, createEffect } from 'effector';

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
    const posts = useStore($posts);

    return (
      <div>
        {posts.map((post) => (
          <div>{post.title}</div>
        ))}
      </div>
    );
  },
  otherwise() {
    return <div>Loading...</div>;
  },
});
```

> Tip: you can pass a React-component to a `view` and `otherwise` properties.
