import { env } from '@/env'
import { isLeft, isRight } from '@/shared/either'
import { describe, expect, it } from 'vitest'
import { ZodError } from 'zod'
import { createLink } from './create-link'

describe('create-links', () => {
  it('should use test database', () => {
    expect(env.DATABASE_URL).toContain('links_test')
  })

  it('should be able create a link with shortUrl', async () => {
    const createResult = await createLink({
      originalUrl: 'https://example.com',
      shortUrl: 'https://short.url/abc123',
    })
    expect(isRight(createResult)).toBe(true)
  })

  it('should be able create a link without a shortUrl', async () => {
    const createResult = await createLink({
      originalUrl: 'https://example.com',
    })
    expect(isRight(createResult)).toBe(true)
  })

  it('should be able not create a duplicated  shortUrl', async () => {
    const createResult = await createLink({
      originalUrl: 'https://example.com',
      shortUrl: 'https://short.url/abc123',
    })
    expect(isRight(createResult)).toBe(true)

    const duplicateResult = await createLink({
      originalUrl: 'https://example.com',
      shortUrl: 'https://short.url/abc123',
    })

    expect(isLeft(duplicateResult)).toBe(true)

    if (isLeft(duplicateResult)) {
      expect(duplicateResult.left.message).toBe('Link already exists')
    }
  })

  it('should not create a link with invalid originalUrl', async () => {
    try {
      const createResult = await createLink({
        originalUrl: 'invalid-url',
      })
      expect.fail('Should have thrown an error for invalid URL')
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError)

      if (error instanceof ZodError) {
        const urlError = error.errors.find(e => e.path[0] === 'originalUrl')
        expect(urlError).toBeDefined()
        expect(urlError?.message).toBe('Invalid url')
      }
    }
  })
})
