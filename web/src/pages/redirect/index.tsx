import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import icon from '../../assets/icon-brev-ly.svg'
import { api } from '../../lib/api'

export function Redirect() {
    const { shortCode } = useParams()
    const navigate = useNavigate()
    const [originalUrl, setOriginalUrl] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    // const location = useLocation()
    const visitRegistered = useRef(false)

    useEffect(() => {
        const fetchRedirectUrl = async () => {
            if (visitRegistered.current) return;

            try {
                const response = await api.get(`links?shortUrlQuery=${shortCode}`)

                if (response.data && response.data.links[0].originalUrl) {
                    const url = response.data.links[0].originalUrl
                    const linkId = response.data.links[0].id
                    setOriginalUrl(url)

                    if (linkId && !visitRegistered.current) {
                        visitRegistered.current = true;
                        try {
                            await api.post('/register-visit', { id: linkId })
                            console.log('Visita registrada com sucesso')
                        } catch (visitErr) {
                            console.log('Erro ao registrar visita:', visitErr)
                        }
                    }
                    setTimeout(() => {
                        window.location.href = url
                    }, 1500)
                } else {
                    navigate('/invalid-link')
                }
            } catch (err) {
                console.log('Erro ao buscar URL de redirecionamento:', err)
                setError(true)
                navigate('/invalid-link')
            } finally {
                setIsLoading(false)
            }
        }

        fetchRedirectUrl()
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

                            <h1 className="text-xl font-semibold mb-4">
                                {error ? "Ops! Algo deu errado" : "Redirecionando..."}
                            </h1>
                            <div className="text-gray-500 text-md mb-4">
                                {isLoading ? (
                                    <div className="flex items-center justify-center mt-2">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-dark"></div>
                                    </div>
                                ) : error ? (
                                    <div>Não foi possível redirecionar para o link solicitado.</div>
                                ) : (
                                    <>
                                        <div>O link será aberto automaticamente em alguns instantes.</div>
                                        <div>Não foi redirecionado? <a href={originalUrl} className="text-blue-base hover:underline">Acesse aqui</a>.</div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
