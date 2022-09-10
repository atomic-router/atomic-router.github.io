# `Link`

It renders `a` with handling routing

```tsx
import { Link } from 'atomic-router-react';
```

### Examples

```tsx
import { createRoute } from 'atomic-router';
import { Link } from 'atomic-router-react';

const homeRoute = createRoute();
const postRoute = createRoute<{ postId: string }>();

function Example() {
  return (
    <div>
      <Link to={homeRoute}>Route link</Link>
      <Link to={postRoute} params={{ postId: 1 }}>
        Route link with params
      </Link>
      <Link to="https://example.com">External link</Link>
    </div>
  );
}
```

All params:

```tsx
import { Link } from 'atomic-router-react';

<Link
  to={route}
  params={{ foo: 'bar' }}
  query={{ bar: 'baz' }}
  activeClassName="font-semibold text-red-400"
  inactiveClassName="opacity-80"
/>;
```
