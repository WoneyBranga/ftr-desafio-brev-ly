import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string().url().startsWith('postgresql://'),
  BASE_URL: z.string().url().default('http://localhost:3333'),
})

export const env = envSchema.parse(process.env)
