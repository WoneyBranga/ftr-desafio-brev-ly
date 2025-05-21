import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'

const registerVisitLinkInput = z.object({
  id: z.string(),
})

type RegisterVisitLinkInput = z.input<typeof registerVisitLinkInput>

type RegisterVisitLinkError = {
  message: string
}

type RegisterVisitLinkOutput = {
  originalUrl: string
  accessCount: number
}

export async function registerVisitLink(
  input: RegisterVisitLinkInput
): Promise<Either<RegisterVisitLinkError, RegisterVisitLinkOutput>> {
  try {
    const { id } = registerVisitLinkInput.parse(input)

    const result = await db
      .update(schema.links)
      .set({
        accessCount: sql`${schema.links.accessCount} + 1`,
      })
      .where(eq(schema.links.id, id))
      .returning({
        originalUrl: schema.links.originalUrl,
        accessCount: schema.links.accessCount,
      })

    if (result.length === 0) {
      return makeLeft({ message: 'Link not found' })
    }

    return makeRight({
      originalUrl: result[0].originalUrl,
      accessCount: result[0].accessCount,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return makeLeft({ message: 'Validation error' })
    }

    return makeLeft({ message: 'Failed to register visit' })
  }
}
