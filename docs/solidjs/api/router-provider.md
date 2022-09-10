# `RouterProvider`

It provides router instance to your app.

```ts
import { RouterProvider } from 'atomic-router-solid';
```

### Example

```tsx
import { createHistoryRouter } from 'atomic-router';
import { RouterProvider, Route } from 'atomic-router-solid';

import { routes } from './routes';

const router = createHistoryRouter({ routes });

export function App() {
  return (
    <RouterProvider router={router}>
      <Route route={homeRoute} view={HomePage} />
    </RouterProvider>
  );
}
```

::: warning
`Route`, `Link`, and hooks won't work without `RouterProvider`
:::
