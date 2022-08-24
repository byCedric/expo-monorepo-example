import { createReactQueryHooks } from '@trpc/react';

// It's important to only type-import this.
// We don't want to import all server related code. 
import type { AppRouter } from './routes/_app';

/**
 * A set of strongly-typed React hooks from your `AppRouter` type signature with `createReactQueryHooks`.
 * @see https://trpc.io/docs/react#3-create-trpc-hooks
 */
export const trpc = createReactQueryHooks<AppRouter>();
