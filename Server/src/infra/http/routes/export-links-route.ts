import { exportLinks } from '@/app/functions/export-links'
import { unwrapEither } from '@/shared/either'
import {
  FastifyPluginAsyncZod,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { z } from 'zod'

export const exportLinksRoute: FastifyPluginAsyncZod = async app => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/export-csv',
    schema: {
      response: {
        201: z.object({
          reportUrl: z.string(),
        }),
        400: z.object({
          message: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      const result = await exportLinks()

      const { reportUrl } = unwrapEither(result)

      return reply.status(201).send({
        reportUrl,
      })
    },
  })
}
