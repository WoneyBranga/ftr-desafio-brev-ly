import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const linkInput = z.object({
  originalUrl: z.string().url(),
  shortUrl: z.string().optional(),
})

type linkInput = z.input<typeof linkInput>

export async function createLink(
  input: linkInput
): Promise<Either<Error, linkInput>> {
  const { originalUrl, shortUrl } = linkInput.parse(input)
  const currentDate = new Date()

  const existingLink = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.originalUrl, originalUrl))
    .limit(1)

  if (existingLink.length > 0) {
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
