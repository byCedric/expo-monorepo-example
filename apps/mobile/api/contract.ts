import { initContract } from '@ts-rest/core';
import { z } from 'zod';

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  description: string;
}

const c = initContract();
export const contract = c.router({
  createPost: {
    method: 'POST',
    path: '/posts',
    //     ^ Note! This is the full path on the server, not just the sub-path of a route
    responses: {
      201: c.type<Post>(),
    },
    body: z.object({
      title: z.string(),
      content: z.string(),
      published: z.boolean().optional(),
      description: z.string().optional(),
    }),
    summary: 'Create a post',
    metadata: { role: 'user' } as const,
  },
  getPosts: {
    method: 'GET',
    path: '/posts',
    responses: {
      200: c.type<{ posts: Post[]; total: number }>(),
    },
    headers: z.object({
      pagination: z.string().optional(),
    }),
    query: z.object({
      take: z.string().transform(Number).optional(),
      skip: z.string().transform(Number).optional(),
      search: z.string().optional(),
    }),
    summary: 'Get all posts',
    metadata: { role: 'guest' } as const,
  },
});
