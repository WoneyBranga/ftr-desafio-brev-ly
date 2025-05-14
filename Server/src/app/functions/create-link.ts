import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { z } from 'zod'

const linkInput = z.object({
  originalUrl: z.string().url(),
  shortUrl: z.string().optional(),
})

type linkInput = z.input<typeof linkInput>

export async function createLink(input: linkInput) {
  const { originalUrl, shortUrl } = linkInput.parse(input)
  const currentDate = new Date()

  await db.insert(schema.links).values({
    originalUrl,
    shortUrl,
    accessCount: 0,
    createdAt: currentDate,
  })
}
