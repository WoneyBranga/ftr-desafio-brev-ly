import { env } from '@/env'
import { isLeft, isRight } from '@/shared/either'
import { describe, expect, it } from 'vitest'
import { createLink } from './create-link'
import { getLinks } from './get-links'
import { registerVisitLink } from './register-visit-link'

describe('register-visit-link', () => {
  it('should use test database', () => {
    expect(env.DATABASE_URL).toContain('links_test')
  })

  it('should be able to register a visit to a link', async () => {
    await createLink({
      originalUrl: 'https://example.com',
      shortUrl: 'https://short.url/abc123',
    })

    let getResults = await getLinks({})

    let registerResult = await registerVisitLink({
      shortUrl: getResults.right?.links[0].shortUrl ?? '',
    })
    expect(isRight(registerResult)).toBe(true)
    expect(registerResult.right?.accessCount).toBe(1)

    registerResult = await registerVisitLink({
      shortUrl: getResults.right?.links[0].shortUrl ?? '',
    })
    getResults = await getLinks({})
    expect(isRight(registerResult)).toBe(true)
    expect(registerResult.right?.accessCount).toBe(2)
  })

  it('should not be able to register a visit to a link that does not exist', async () => {
    const registerResult = await registerVisitLink({
      shortUrl: '11111111-1111-1111-1111-111111111111',
    })

    expect(isLeft(registerResult)).toBe(true)
    expect(registerResult.left?.message).toBe('Link not found')
  })
})
