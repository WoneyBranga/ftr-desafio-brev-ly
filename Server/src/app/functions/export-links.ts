import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'

import { db, pg } from '@/infra/db'
import { links } from '@/infra/db/schemas/links'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'
import { makeRight } from '@/shared/either'
import { stringify } from 'csv-stringify'
import { uuidv7 } from 'uuidv7'

export async function exportLinks() {
  const { sql, params } = db.select().from(links).toSQL()
  const cursor = pg.unsafe(sql, params as string[]).cursor(2)

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      {
        key: 'id',
        header: 'ID',
      },
      {
        key: 'original_url',
        header: 'Original URL',
      },
      {
        key: 'short_url',
        header: 'Short URL',
      },
      {
        key: 'access_count',
        header: 'Access Count',
      },
      {
        key: 'created_at',
        header: 'Uploaded At',
      },
    ],
  })

  const fileName = `${uuidv7().split('-')[0]}-links.csv`
  const uploadToStorageStream = new PassThrough()

  const createCSVTransformStream = () => {
    return new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }
        callback()
      },
    })
  }

  const csvPipeline = pipeline(
    cursor,
    createCSVTransformStream(),
    csv,
    uploadToStorageStream
  )

  const uploadToStorage = uploadFileToStorage({
    folder: 'downloads',
    fileName,
    contentType: 'text/csv',
    contentStream: uploadToStorageStream,
  })

  const [{ url }] = await Promise.all([uploadToStorage, csvPipeline])

  return makeRight({
    reportUrl: url,
  })
}
