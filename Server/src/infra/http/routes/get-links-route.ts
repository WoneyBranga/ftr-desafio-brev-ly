import { createLink } from '@/app/functions/create-link'
import { getLinks } from '@/app/functions/get-links'
import { isLeft, isRight } from '@/shared/either'
import { or } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
export const getLinksRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/links',
    {
      schema: {
        summary: 'Get all links',
        querystring: z.object({
          shortUrlQuery: z.string().optional(),
          sortBy: z.enum(['createdAt']).optional(),
          sortDirection: z.enum(['asc', 'desc']).optional(),
          page: z.coerce.number().optional(),
          pageSize: z.coerce.number().optional(),
        }),
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.string(),
                originalUrl: z.string().url(),
                shortUrl: z.string(),
                accessCount: z.number(),
                createdAt: z.string(),
              })
            ),
            total: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await getLinks(request.query)

      if (isRight(result)) {
        const data = result.right

        const links = data.links.map(link => ({
          ...link,
          createdAt: link.createdAt.toISOString(),
        }))

        return reply.status(200).send({ links, total: data.total })
      }
    }
  )
}
