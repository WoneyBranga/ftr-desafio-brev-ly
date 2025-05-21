import { deleteLink } from '@/app/functions/delete-link'
import { isLeft, isRight } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/links/:id',
    {
      schema: {
        summary: 'Delete a link by ID',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            success: z.boolean(),
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
      const { id } = request.params as { id: string }

      const result = await deleteLink({ id })

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
