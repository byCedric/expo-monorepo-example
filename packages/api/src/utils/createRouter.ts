import { router } from '@trpc/server';

import type { AppContext } from './createContext';

/**
 * Create a new tRPC router, optionally with a predefined context.
 * @see https://trpc.io/docs/router
 * @see https://trpc.io/docs/context
 */
export function createRouter() {
  return router<AppContext>();
}
