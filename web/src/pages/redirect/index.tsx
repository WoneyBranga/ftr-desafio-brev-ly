import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import icon from '../../assets/icon-brev-ly.svg'

export function Redirect() {
    const { shortCode } = useParams()
    const navigate = useNavigate()
    const [originalUrl, setOriginalUrl] = useState('')

    useEffect(() => {
        const fetchRedirectUrl = async () => {
            setTimeout(() => {
                const url = "https://www.exemplo.com.br"
                setOriginalUrl(url)

                window.location.href = url

            }, 1500)
        }

        // fetchRedirectUrl()

        // if (!linkFound) navigate('/invalid-link')

    }, [shortCode, navigate])

    return (
        <main className="min-h-dvh bg-gray-200">
            <div className="container mx-auto px-4 py-8 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-1  max-w-7xl mx-auto ">

                    <div className="min-h-dvh bg-gray-200 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full text-center">
                            <img
                                src={icon}
                                alt="Brev.ly logo"
                                className="w-16 h-auto mx-auto mb-6"
                            />

                            <h1 className="text-xl font-semibold mb-4">Redirecionando...</h1>
                            <div className="text-gray-500 text-md mb-4">
                                <div>O link será aberto automaticamente em alguns instantes.</div>
                                <div>Não foi redirecionado? <a href={originalUrl} className="text-blue-base hover:underline">Acesse aqui</a>.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
