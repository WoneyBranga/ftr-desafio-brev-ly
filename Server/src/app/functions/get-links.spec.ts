import { env } from '@/env'
import { isLeft, isRight } from '@/shared/either'
import { describe, expect, it } from 'vitest'
import { createLink } from './create-link'
import { getLinks } from './get-links'

describe('get-links', () => {
  it('should use test database', () => {
    expect(env.DATABASE_URL).toContain('links_test')
  })

  it('should be able to get all links', async () => {
    for (let i = 0; i < 10; i++) {
      await createLink({
        originalUrl: `https://example.com/${i}`,
        shortUrl: `https://short.url/abc123${i}`,
      })
    }
    const getResults = await getLinks({})
    expect(isRight(getResults)).toBe(true)
    expect(getResults.right?.links.length).toBe(10)
    expect(getResults.right?.total).toBe(10)
  })

  it('should be able to get all links with pagination', async () => {
    for (let i = 0; i < 7; i++) {
      await createLink({
        originalUrl: `https://example.com/${i}`,
        shortUrl: `https://short.url/abc123${i}`,
      })
    }
    const getResults = await getLinks({
      page: 1,
      pageSize: 5,
    })
    expect(isRight(getResults)).toBe(true)
    expect(getResults.right?.links.length).toBe(5)
    expect(getResults.right?.total).toBe(7)
  })

  it('should be able to get all links with pagination', async () => {
    for (let i = 0; i < 7; i++) {
      await createLink({
        originalUrl: `https://example.com/${i}`,
        shortUrl: `https://short.url/abc123${i}`,
      })
    }
    const getResults = await getLinks({
      page: 2,
      pageSize: 5,
    })
    expect(isRight(getResults)).toBe(true)
    expect(getResults.right?.links.length).toBe(2)
    expect(getResults.right?.total).toBe(7)
  })

  it('should be able to get all links with pagination and order by createdAt', async () => {
    for (let i = 0; i < 7; i++) {
      await createLink({
        originalUrl: `https://example.com/${i}`,
        shortUrl: `https://short.url/abc123${i}`,
      })
    }
    const getResults = await getLinks({
      page: 1,
      pageSize: 5,
      shortUrlQuery: 'abc1234',
    })

    expect(isRight(getResults)).toBe(true)
    expect(getResults.right?.links.length).toBe(1)
    expect(getResults.right?.total).toBe(1)
    expect(getResults.right?.links[0].shortUrl).toBe(
      'https://short.url/abc1234'
    )
  })
})
