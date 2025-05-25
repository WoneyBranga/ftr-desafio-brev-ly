import { LinkIcon, DownloadSimpleIcon } from '@phosphor-icons/react'
import logo from '../../assets/logo-brev-ly.svg'

export function Home() {
    let links = [
        {
            id: 1,
            original: 'https://www.exemploa.com.br',
            short: 'brev.ly/aa',
            clicks: 10
        },
        {
            id: 2,
            original: 'https://www.exemplob.com',
            short: 'brev.ly/bb',
            clicks: 5
        },
        {
            id: 3,
            original: 'https://www.exemploc.com',
            short: 'brev.ly/cc',
            clicks: 0
        }
    ]

    return (
        <main className="min-h-dvh bg-gray-200">
            <div className="container mx-auto px-4 py-8 lg:px-8">
                {/* logo */}
                <div>
                    <img className="w-24 h-auto" src={logo} alt="Brev.ly logo" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mt-8">
                    {/* form */}
                    <div className="bg-white flex flex-col justify-start p-6 rounded-md shadow-sm">
                        <h2 className="text-lg font-medium my-4">Novo Link</h2>
                        <label className="text-gray-500 text-xs my-2" htmlFor="original-link">LINK ORIGINAL</label>
                        <input
                            id="original-link"
                            className="text-md p-4 outline-2 rounded-lg w-full outline-gray-200 text-gray-600"
                            placeholder="Insira o link original"
                            type="text"
                        />
                        <label className="text-gray-500 text-xs my-2" htmlFor="short-link">LINK ENCURTADO</label>
                        <input
                            id="short-link"
                            className="text-md p-4 outline-2 rounded-lg w-full outline-gray-200 text-gray-600"
                            placeholder="Nome personalizado (opcional)"
                            type="text"
                        />
                        <button
                            className="my-4 p-4 bg-blue-dark rounded-lg text-white text-center hover:opacity-90 transition-opacity opacity-40"
                            disabled={true}
                        >
                            Salvar link
                        </button>
                    </div>

                    {/* lista */}
                    <div className="bg-white flex flex-col justify-start p-6 rounded-md shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium">Meus Links</h2>
                            <button className="flex flex-row items-center gap-2 bg-gray-100 p-2 px-3 rounded text-gray-500 hover:bg-gray-200 transition-colors">
                                <DownloadSimpleIcon size={20} />
                                <span>Baixar CSV</span>
                            </button>
                        </div>
                        <hr className="border-gray-200" />

                        {links.length > 0 ? (
                            <div className="mt-4 space-y-4">
                                {/* Lista de links aqui */}
                                <p>Lista de links seria exibida aqui</p>
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
