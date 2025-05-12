import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const createUrlRoute: FastifyPluginAsyncZod = async server => {
  server.get('/create-url', () => {
    return 'creating url'
  })
}
