import { createLink } from '@/app/functions/create-link'
import { isLeft, isRight } from '@/shared/either'
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
          201: z.object({
            originalUrl: z.string(),
            shortUrl: z.string().optional(),
          }),
          409: z
            .object({ message: z.string() })
            .describe('Upload already exists.'),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl, accessCount, createdAt } =
        request.body as {
          originalUrl: string
          shortUrl?: string
          accessCount?: number
          createdAt?: string
        }

      const result = await createLink({
        originalUrl,
        shortUrl,
      })

      if (isLeft(result)) {
        const error = result.left
        if (error.message === 'Link already exists') {
          return reply.status(409).send({ message: error.message })
        }
        if (error.message === 'Invalid URL') {
          return reply.status(400).send({ message: error.message })
        }
        return reply.status(500).send({ message: 'Internal server error' })
      }

      if (isRight(result)) {
        const { originalUrl, shortUrl } = result.right
        return reply.status(201).send({ originalUrl, shortUrl })
      }
    }
  )
}
