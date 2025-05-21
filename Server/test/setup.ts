import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { config } from 'dotenv'
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

// Variável para controlar inicialização
let setupDone = false

beforeAll(async () => {
  // Evitar configuração duplicada
  if (setupDone) return

  console.log('Inicializando ambiente de teste...')
  console.log('Usando banco de dados:', process.env.DATABASE_URL)

  try {
    // Criar tabela se não existir
    await db.execute(`
      CREATE TABLE IF NOT EXISTS links (
        id VARCHAR PRIMARY KEY,
        original_url TEXT NOT NULL,
        short_url TEXT NOT NULL UNIQUE,
        access_count INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `)

    // Limpar tabela
    await db.delete(schema.links)
    console.log('Tabela links limpa e pronta para testes')
    setupDone = true
  } catch (error) {
    console.error('Erro ao configurar banco de dados:', error)
    throw error
  }
})

// Limpar tabela antes de cada teste
beforeEach(async () => {
  try {
    await db.delete(schema.links)
  } catch (error) {
    console.error('Erro ao limpar tabela antes do teste:', error)
  }
})

// Limpar após todos os testes
afterAll(async () => {
  console.log('Limpando ambiente após testes')
  try {
    await db.delete(schema.links)
  } catch (error) {
    console.error('Erro ao limpar tabela após testes:', error)
  }
})
