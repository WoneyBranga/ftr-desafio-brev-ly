import { Link } from 'react-router-dom'
import notFoundImg from '../../assets/404.svg'

export function InvalidLink() {
    return (
        <main className="min-h-dvh bg-gray-200">
            <div className="container mx-auto px-4 py-8 lg:px-8">

                <div className="min-h-dvh bg-gray-200 flex flex-col items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full text-center">
                        <img
                            src={notFoundImg}
                            alt="Link não encontrado"
                            className="w-48 h-auto mx-auto mb-6"
                        />

                        <h1 className="text-xl font-semibold mb-2">Link não encontrado</h1>

                        <p className="text-gray-500 text-md mb-6">
                            O link que você tentou acessar não existe, foi removido ou é uma url inválida. Saiba mais em
                            <a href='https://brev.ly'>brev.ly</a>.
                        </p>

                        <Link
                            to="/"
                            className="bg-blue-dark text-white px-6 py-3 rounded-md inline-block hover:opacity-90 transition-opacity"
                        >
                            Voltar para a página inicial
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    )
}
