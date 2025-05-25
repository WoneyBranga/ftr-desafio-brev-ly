import { LinkIcon, DownloadSimpleIcon, CopyIcon, TrashIcon } from '@phosphor-icons/react'
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
            short: 'brev.ly/ccasdasdasdasdasdasdasd',
            clicks: 0
        }
    ]

    return (
        <main className="min-h-dvh bg-gray-200">
            <div className="container mx-auto px-4 py-8 lg:px-8">
                {/* logo */}
                <div className="flex justify-center lg:justify-start">
                    <img className="w-24 h-auto" src={logo} alt="Brev.ly logo" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-7xl mx-auto mt-8">

                    {/* form - 40% do espaço em desktop */}
                    <div className="bg-white flex flex-col justify-start p-6 rounded-lg lg:col-span-2">
                        <h2 className="text-lg text-gray-600 mb-4">Novo Link</h2>
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

                    {/* lista - 60% do espaço em desktop */}
                    <div className="bg-white flex flex-col justify-start p-6 rounded-lg lg:col-span-3">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg text-gray-600">Meus Links</h2>
                            <button className="flex flex-row items-center gap-2 bg-gray-200 p-2 px-3 rounded text-gray-600  hover:bg-gray-200 transition-colors">
                                <DownloadSimpleIcon size={20} />
                                <div className='text-gray-500'>Baixar CSV</div>
                            </button>
                        </div>
                        <hr className="border-gray-200" />

                        {links.length > 0 ? (
                            <div className="mt-4 space-y-4">
                                {/* Lista de links aqui */}

                                {links.map((link) => (
                                    <div key={link.id} className="flex flex-row items-center justify-between p-2 border-b border-gray-200">
                                        <div className="flex flex-col">

                                            <span className="text-md text-blue-base max-w-[150px] sm:max-w-xs truncate block">{link.original}</span>
                                            <span className="text-sm text-gray-500 max-w-[150px] sm:max-w-xs truncate block">{link.short}</span>
                                        </div>
                                        <div className="flex flex-row items-center gap-1 ">
                                            <span className="text-sm text-gray-500 mr-4">{link.clicks} cliques</span>
                                            <button className="flex flex-row items-center gap-2 bg-gray-200 p-2 px-3 rounded text-gray-600 hover:bg-gray-200 transition-colors">
                                                <CopyIcon size={20} />
                                            </button>
                                            <button className="flex flex-row items-center gap-2 bg-gray-200 p-2 px-3 rounded text-gray-600 hover:bg-gray-200 transition-colors">
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
