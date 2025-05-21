import { env } from '@/env'
import { isLeft, isRight } from '@/shared/either'
import { uuid } from 'drizzle-orm/gel-core'
import { describe, expect, it } from 'vitest'
import { ZodError } from 'zod'
import { createLink } from './create-link'
import { deleteLink } from './delete-link'
import { getLinks } from './get-links'

describe('delete-link', () => {
  it('should use test database', () => {
    expect(env.DATABASE_URL).toContain('links_test')
  })

  it('should be able a link', async () => {
    await createLink({
      originalUrl: 'https://example.com',
      shortUrl: 'https://short.url/abc123',
    })

    const getResults = await getLinks({})

    const deleteResult = await deleteLink({
      id: getResults.right?.links[0].id ?? '',
    })
    expect(isRight(deleteResult)).toBe(true)
  })

  it('should not be able to delete a link that does not exist', async () => {
    const deleteResult = await deleteLink({
      id: '11111111-1111-1111-1111-111111111111',
    })

    expect(isLeft(deleteResult)).toBe(true)
    expect(deleteResult.left?.message).toBe('Link not found')
  })
})
