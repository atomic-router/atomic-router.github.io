# Scope and SSR support

You need just replace all imports from `atomic-router-react` to `atomic-router-react/scope`.

Example:

```ts
// No scope
import { Route, createRoutesView } from 'atomic-router-react';

// Scoped imports (correct for SSR)
import { Route, createRoutesView } from 'atomic-router-react/scope';
```
