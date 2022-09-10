# `Route`

It renders some component if passed route is matched.

```ts
import { Route } from 'atomic-router-react';
```

### Example

```tsx
import { createRoute } from 'atomic-router';
import { Route } from 'atomic-router-react';

function RenderMe() {
  return <div>This will render only on /demo route</div>;
}

export const demoRoute = createRoute();

export function Example() {
  return <Route route={demoRoute} view={RenderMe} />;
}
```
