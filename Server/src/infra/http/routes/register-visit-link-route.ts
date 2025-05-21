import { registerVisitLink } from '@/app/functions/register-visit-link'
import { isLeft, isRight } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const registerVisitLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/register-visit',
    {
      schema: {
        summary: 'Register a visit to a link and increment its access counter',
        body: z.object({
          shortUrl: z.string(),
        }),
        response: {
          200: z.object({
            originalUrl: z.string(),
            accessCount: z.number(),
          }),
          404: z.object({
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.body as { shortUrl: string }

      const result = await registerVisitLink({ shortUrl })

      if (isLeft(result)) {
        const error = result.left

        if (error.message === 'Link not found') {
          return reply.status(404).send({ message: error.message })
        }

        return reply.status(400).send({ message: error.message })
      }

      if (isRight(result)) {
        return reply.status(200).send(result.right)
      }
    }
  )
}
