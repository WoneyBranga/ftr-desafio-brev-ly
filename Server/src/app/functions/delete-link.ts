import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const deleteLinkInput = z.object({
  id: z.string().uuid(),
})

type DeleteLinkInput = z.input<typeof deleteLinkInput>

type DeleteLinkError = {
  message: string
}

type DeleteLinkOutput = {
  success: boolean
}

export async function deleteLink(
  input: DeleteLinkInput
): Promise<Either<DeleteLinkError, DeleteLinkOutput>> {
  try {
    const { id } = deleteLinkInput.parse(input)

    const existingLink = await db
      .select({ id: schema.links.id })
      .from(schema.links)
      .where(eq(schema.links.id, id))
      .limit(1)

    if (existingLink.length === 0) {
      return makeLeft({ message: 'Link not found' })
    }

    await db.delete(schema.links).where(eq(schema.links.id, id))

    return makeRight({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return makeLeft({ message: 'Validation error' })
    }

    return makeLeft({ message: 'Failed to delete link' })
  }
}
