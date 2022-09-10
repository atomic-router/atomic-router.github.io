# `useLink`

The hook resolves a path into a _href_ from a route.

```ts
import { useLink } from 'atomic-router-react';
```

Be sure, route is passed into `routes` for [`createHistoryRouter`](docs/api/create-router.md).
Otherwise, the hook will throw `[useLink] Route not found`.

Also, `useLink` requires to be used inside a [`RouterProvider`](docs/react/api/router-provider.mdr-provider.md).

### Example

```tsx
import { useLink } from 'atomic-router-react';
import { createRoute } from 'atomic-router';

// example path: /some/route/:someId
const someRoute = createRoute<{ someId: number }>();

function SomeComponent() {
  const path = useLink(someRoute, { someId: 1 });
  // -> /some/route/1
}
```
