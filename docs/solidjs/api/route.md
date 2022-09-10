# `Route`

It renders some component if passed route is matched.

```ts
import { Route } from 'atomic-router-react';
```

### Example

```tsx
import { createRoute } from 'atomic-router';
import { Route } from 'atomic-router-solid';

export const homeRoute = createRoute();

function HomePage() {
  return <div>This will render only on home route</div>;
}

export function App() {
  return <Route route={homeRoute} view={HomePage} />;
}
```
