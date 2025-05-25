import { LinkIcon, DownloadSimpleIcon, CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { useState, useEffect } from 'react'
import { type FormEvent } from 'react'
import axios from 'axios'
import logo from '../../assets/logo-brev-ly.svg'
import { api } from '../../lib/api'

interface Link {
    id: string
    originalUrl: string
    shortUrl: string
    accessCount: number
}

export function Home() {
    const [links, setLinks] = useState<Link[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [originalUrl, setOriginalUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [isFormValid, setIsFormValid] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchLinks()
    }, [])

    useEffect(() => {
        // Valida o formulário sempre que os inputs mudarem
        setIsFormValid(!!originalUrl && originalUrl.includes('.'))
    }, [originalUrl, shortUrl])

    async function fetchLinks() {
        setIsLoading(true)
        try {
            const response = await api.get('/links')
            // A API retorna os links dentro de uma propriedade "links"
            if (response.data && response.data.links) {
                setLinks(response.data.links)
                console.log('Links carregados:', response.data.links)
            } else {
                setLinks([])
                console.log('Nenhum link encontrado ou formato inesperado:', response.data)
            }
            setError('')
        } catch (err) {
            console.error('Erro ao buscar links:', err)
            setError('Falha ao carregar os links. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    async function handleCreateLink(e: FormEvent) {
        e.preventDefault()

        if (!isFormValid) return

        try {
            setIsLoading(true)
            await api.post('/create-url', {
                originalUrl: originalUrl,
                shortUrl: shortUrl || undefined // Envia undefined se estiver vazio para a API gerar um código
            })

            // Limpa o formulário
            setOriginalUrl('')
            setShortUrl('')

            // Recarrega os links
            await fetchLinks()
            setError('')
        } catch (err) {
            console.error('Erro ao criar link:', err)
            setError('Falha ao criar o link. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    async function handleDeleteLink(id: string) {
        try {
            setIsLoading(true)
            // Corrigindo a rota: usando /{id} em vez de /links/{id}
            await api.delete(`/links/${id}`)
            // Recarrega os links
            await fetchLinks()
            setError('')
        } catch (err) {
            console.error('Erro ao excluir link:', err)
            // Mostra detalhes mais específicos do erro
            if (axios.isAxiosError(err)) {
                setError(`Falha ao excluir o link: ${err.response?.status} ${err.response?.statusText}`)
            } else {
                setError('Falha ao excluir o link. Tente novamente.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    function handleCopyLink(shortUrl: string) {
        // Extrai o código curto da URL completa (remove o "brev.ly/")
        const shortCode = shortUrl.replace('brev.ly/', '')
        const fullUrl = `http://localhost:3333/${shortCode}`

        navigator.clipboard.writeText(fullUrl)
            .then(() => {
                // Poderíamos adicionar uma notificação de sucesso aqui
                alert('Link copiado para a área de transferência!')
            })
            .catch((err) => {
                console.error('Erro ao copiar link:', err)
                alert('Falha ao copiar o link')
            })
    }

    function handleDownloadCSV() {
        // Abre uma nova janela com o endpoint de exportação
        window.open('http://localhost:3333/export-csv', '_blank')
    }

    return (
        <main className="min-h-dvh bg-gray-200">
            <div className="container mx-auto px-4 py-8 lg:px-8">
                {/* logo */}
                <div className="flex justify-center lg:justify-start">
                    <img className="w-24 h-auto" src={logo} alt="Brev.ly logo" />
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-7xl mx-auto mt-8">

                    {/* form - 40% do espaço em desktop */}
                    <form onSubmit={handleCreateLink} className="bg-white flex flex-col justify-start p-6 rounded-lg lg:col-span-2">
                        <h2 className="text-lg text-gray-600 mb-4">Novo Link</h2>
                        <label className="text-gray-500 text-xs my-2" htmlFor="original-link">LINK ORIGINAL</label>
                        <input
                            id="original-link"
                            className="text-md p-4 outline-2 rounded-lg w-full outline-gray-200 text-gray-600"
                            placeholder="Insira o link original"
                            type="text"
                            value={originalUrl}
                            onChange={(e) => setOriginalUrl(e.target.value)}
                            required
                        />
                        <label className="text-gray-500 text-xs my-2" htmlFor="short-link">LINK ENCURTADO</label>
                        <input
                            id="short-link"
                            className="text-md p-4 outline-2 rounded-lg w-full outline-gray-200 text-gray-600"
                            placeholder="Nome personalizado (opcional)"
                            type="text"
                            value={shortUrl}
                            onChange={(e) => setShortUrl(e.target.value)}
                        />
                        <button
                            type="submit"
                            className={`my-4 p-4 bg-blue-dark rounded-lg text-white text-center hover:opacity-90 transition-opacity ${!isFormValid ? 'opacity-40 cursor-not-allowed' : ''}`}
                            disabled={!isFormValid || isLoading}
                        >
                            {isLoading ? 'Salvando...' : 'Salvar link'}
                        </button>
                    </form>

                    {/* lista - 60% do espaço em desktop */}
                    <div className="bg-white flex flex-col justify-start p-6 rounded-lg lg:col-span-3">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg text-gray-600">Meus Links</h2>
                            <button
                                className="flex flex-row items-center gap-2 bg-gray-200 p-2 px-3 rounded text-gray-600 hover:bg-gray-200 transition-colors"
                                onClick={handleDownloadCSV}
                                disabled={links.length === 0}
                            >
                                <DownloadSimpleIcon size={20} />
                                <div className='text-gray-500'>Baixar CSV</div>
                            </button>
                        </div>
                        <hr className="border-gray-200" />

                        {isLoading ? (
                            <div className="flex items-center justify-center p-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-dark"></div>
                            </div>
                        ) : links.length > 0 ? (
                            <div className="mt-4 space-y-4">
                                {/* Lista de links aqui */}

                                {links.map((link) => (
                                    <div key={link.id} className="flex flex-row items-center justify-between p-2 border-b border-gray-200">
                                        <div className="flex flex-col">

                                            <span className="text-md text-blue-base max-w-[150px] sm:max-w-xs truncate block">{link.originalUrl}</span>
                                            <span className="text-sm text-gray-500 max-w-[150px] sm:max-w-xs truncate block">{link.shortUrl}</span>
                                        </div>
                                        <div className="flex flex-row items-center gap-1 ">
                                            <span className="text-sm text-gray-500 mr-4">{link.accessCount} cliques</span>
                                            <button
                                                className="flex flex-row items-center gap-2 bg-gray-200 p-2 px-3 rounded text-gray-600 hover:bg-gray-200 transition-colors"
                                                onClick={() => handleCopyLink(link.shortUrl)}
                                            >
                                                <CopyIcon size={20} />
                                            </button>
                                            <button
                                                className="flex flex-row items-center gap-2 bg-gray-200 p-2 px-3 rounded text-gray-600 hover:bg-gray-200 transition-colors"
                                                onClick={() => handleDeleteLink(link.id)}
                                            >
                                                <TrashIcon size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-6">
                                <LinkIcon className="text-gray-400 h-8 w-8 mb-2" />
                                <p className="text-sm text-gray-400">AINDA NÃO EXISTEM LINKS CADASTRADOS</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
