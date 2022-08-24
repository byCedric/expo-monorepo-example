import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';

/**
 * Create the type definition of our API context.
 * @see `createContext()`
 */
export type AppContext = inferAsyncReturnType<typeof createContext>;

/**
 * The `createContext()` function is called for each request and the result is propagated to all resolvers.
 * You can use this to pass contextual data down to the resolvers.
 * @see https://trpc.io/docs/context
 */
export async function createContext({ req, res }: CreateNextContextOptions) {
  return { req, res };
}
