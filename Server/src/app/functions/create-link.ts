import { env } from '@/env'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'
import { uuidv7 } from 'uuidv7'
import { z } from 'zod'

const linkInput = z.object({
  originalUrl: z.string().url(),
  shortUrl: z.string().optional(),
})

type linkInput = z.input<typeof linkInput>

export async function createLink(
  input: linkInput
): Promise<Either<Error, linkInput>> {
  let { originalUrl, shortUrl } = linkInput.parse(input)
  const currentDate = new Date()

  if (!linkInput.shape.originalUrl.safeParse(originalUrl).success) {
    return makeLeft(new Error('Invalid URL'))
  }

  if (!shortUrl) {
    const generatedShortUrlUuid = uuidv7().slice(-8)
    shortUrl = env.BASE_URL + '/' + generatedShortUrlUuid
  }

  const existingShortLink = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl))
    .limit(1)

  if (existingShortLink.length > 0) {
    return makeLeft(new Error('Link already exists'))
  }

  // Insere o novo link no banco de dados
  await db.insert(schema.links).values({
    originalUrl,
    shortUrl,
    accessCount: 0,
    createdAt: currentDate,
  })
  return makeRight({ originalUrl, shortUrl })
}
