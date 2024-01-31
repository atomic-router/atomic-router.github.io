# `createRoutesView`

It renders a list of routes.

```ts
import { createRoutesView } from 'atomic-router-react';
```

::: tip Please, pay attention for a name

This function is about multiple routes. See also [`createRouteView`](./create-route-view.md).

:::

### Example

```tsx
import { createRoutesView, RouterProvider } from 'atomic-router-react';

// { route: RouteInstance<...>, view: FC<...> }
import { HomePage } from '@/pages/home';
import { Postpage } from '@/pages/post';

import { router } from '@/app/routing';

const RoutesView = createRoutesView({
  routes: [
    { route: HomePage.route, view: HomePage.view },
    { route: HomePage.route, view: PostPage.view },
  ],
  otherwise() {
    return <div>Page not found!</div>;
  },
});

export function App() {
  return (
    <RouterProvider router={router}>
      <RoutesView />
    </RouterProvider>
  );
}
```

Like in [`createRouteView`](./create-route-view.md), you can set only a part of `createRoutesView` config on create and pass the rest of it via props:

```tsx
import { SpecificNotFound } from '@/errors/specific-not-found';

// Set specific otherwise view
const RoutesView = createRoutesView({
  otherwise: SpecificNotFound,
});

// Pass the routes as a prop
export function Example() {
  return <RoutesView routes={routes} />;
}
```

### Layouts

::: tip 
Added in **atomic-router-react@0.8.0**
:::

There's an optional prop `layout` in routes config

```tsx
const RoutesView = createRoutesView({
  routes: [
    { route: Home.route, view: HomePage.view, layout: BaseLayout },
    { route: Posts.route, view: PostsPage.view, layout: BaseLayout },
    { route: SinglePost.route, view: SinglePost.view, layout: SinglePostLayout },
  ],
  otherwise() {
    return <div>Page not found!</div>;
  },
});
```
It will wrap `HomePage` and `PostsPage` into `BaseLayout`, and `SinglePost` into `SinglePostLayout`.  
This is to avoid extra re-renders when switching between pages with the same layout
