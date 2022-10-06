# `createRoutesView`

It renders a list of routes.

```ts
import { createRoutesView } from 'atomic-router-solid';
```

::: tip Please, pay attention for a name

This function is about multiple routes. See also [`createRouteView`](./create-route-view.md).

:::

### Example

```tsx
import { createRoutesView, RouterProvider } from 'atomic-router-solid';

// { route: RouteInstance<...>, view: FC<...> }
import { HomePage } from '@/pages/home';
import { Postpage } from '@/pages/post';

import { router } from '@/app/routing';

const RoutesView = createRoutesView({
  routes: [
    { route: Home.route, view: HomePage.view },
    { route: Post.route, view: PostPage.view },
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
