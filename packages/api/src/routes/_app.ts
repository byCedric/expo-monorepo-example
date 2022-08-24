import { transformer } from '../utils/config';
import { createRouter } from '../utils/createRouter';
import { weatherRouter } from './weather';

/**
 * Create the type definition of our API.
 * Only this type is shared with the client, to avoid mixing server and client code.
 */
export type AppRouter = typeof appRouter;

/**
 * Create the root tRPC router for your API.
 * This router contains all sub routers we define in each separate file.
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  /**
   * Use the prefered data transformer, defined in `utils/config.ts`.
   * @link https://trpc.io/docs/data-transformers
   */
  .transformer(transformer)
  /**
   * Add the weather sub router with the prefix `weather`.
   * This will create paths like `weather.location`.
   */
  .merge('weather.', weatherRouter);
