import { or } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
export const createUrlRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/create-url',
    {
      schema: {
        summary: 'Upload an image',
        body: z.object({
          originalUrl: z.string().url(),
          shortUrl: z.string().optional(),
          accessCount: z.number().optional(),
          createdAt: z.string().optional(),
        }),
        response: {
          201: z.object({ linkId: z.string() }),
          409: z
            .object({ message: z.string() })
            .describe('Upload already exists.'),
        },
      },
    },
    async (request, reply) => {
      return reply.status(201).send({ linkId: '123' })
    }
  )
}
