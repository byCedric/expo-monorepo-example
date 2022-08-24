import superjson from 'superjson';

/**
 * The tRPC transfomer that allows us to use standard `Date`/`Map`/`Set` values between server and client.
 * @see https://trpc.io/docs/data-transformers#using-superjson
 */
export const transformer = superjson;
