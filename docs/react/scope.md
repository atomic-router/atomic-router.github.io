# Scope and SSR support

You need just replace all imports from `atomic-router-react` to `atomic-router-react/scope`.

Example:

```ts
// No scope
import { Route, createRoutesView } from 'atomic-router-react';

// Scoped imports (correct for effector < 23 and atomic-router-react < 0.9)
// On newer versions you can safely use `atomic-router-react` without `/scope` in the SSR or SPA
import { Route, createRoutesView } from 'atomic-router-react/scope';
```
