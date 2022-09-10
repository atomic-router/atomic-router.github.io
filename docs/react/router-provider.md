# `RouterProvider`

It provides router instance to your app.

```ts
import { RouterProvider } from 'atomic-router-react';
```

### Example

```tsx
import { createHistoryRouter } from 'atomic-router';
import { RouterProvider, Route } from 'atomic-router-react';

import { routes } from './routes';

const router = createHistoryRouter({ routes });

const App = () => {
  return (
    <RouterProvider router={router}>
      <Route route={homeRoute} view={HomePage} />
    </RouterProvider>
  );
};
```

> Note: `Route`, `Link`, and hooks won't work without `RouterProvider`
