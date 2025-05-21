import { config } from 'dotenv'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { afterAll, beforeAll, beforeEach } from 'vitest'

// Carrega as variáveis de ambiente do arquivo .env.test
config({ path: '.env.test' })

// Verifica se estamos usando o banco de dados de teste
const isTestDatabase = process.env.DATABASE_URL?.includes('links_test')
if (!isTestDatabase) {
  throw new Error(
    'Testes devem usar o banco de dados de teste (links_test)! ' +
    'Verifique se DATABASE_URL em .env.test aponta para o banco correto.'
  )
}

// Antes de todos os testes, criamos as tabelas necessárias
beforeAll(async () => {
  try {
    // Cria a tabela links caso não exista
    await db.execute(`
      CREATE TABLE IF NOT EXISTS links (
        id VARCHAR PRIMARY KEY,
        original_url TEXT NOT NULL,
        short_url TEXT NOT NULL UNIQUE,
        access_count INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `)
    console.log('Tabela de links criada no banco de dados de teste')
  } catch (error) {
    console.error('Erro ao preparar o banco de dados para testes:', error)
    throw error
  }
})

// Antes de cada teste, limpamos os dados da tabela
beforeEach(async () => {
  await db.delete(schema.links)
})

// Após todos os testes, podemos limpar completamente o banco
afterAll(async () => {
  // Normalmente não droparíamos a tabela, apenas limparíamos os dados
  // mas caso queira resetar completamente:
  // await db.execute(`DROP TABLE IF EXISTS links;`)
  
  // Limpamos os dados
  await db.delete(schema.links)
  console.log('Tabela de links limpa após os testes')
})