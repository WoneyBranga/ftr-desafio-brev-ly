import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'

import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createUrlRoute } from './routes/create-url-route'
import { deleteLinkRoute } from './routes/delete-link-route'
import { exportLinksRoute } from './routes/export-links-route'
import { getLinksRoute } from './routes/get-links-route'
import { registerVisitLinkRoute } from './routes/register-visit-link-route'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})

server.register(fastifyCors, { origin: '*' })
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Upload Server',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})
server.register(createUrlRoute)
server.register(getLinksRoute)
server.register(deleteLinkRoute)
server.register(registerVisitLinkRoute)
server.register(exportLinksRoute)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP Server running!')
})
