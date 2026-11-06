import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const [mensagem, setMensagem] = useState('')
    const [erro, setErro] = useState('')
    const [enviando, setEnviando] = useState(false)
    const navigate = useNavigate()

    async function entrar(event) {
        event.preventDefault()
        setMensagem('')
        setErro('')
        setEnviando(true)

        console.log("Formulário enviado! Iniciando processo de login...");

        const form = event.currentTarget
        const formData = new FormData(form)

        console.log("Dados capturados:", {
        email: formData.get('email'),
        password: '****' // Escondendo a senha por segurança no log
    });

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password'),
                }),
            })

            console.log("Resposta bruta do servidor recebida:", response);
            
            const responseText = await response.text()
            let result = {}

            if (responseText) {
                try {
                    result = JSON.parse(responseText)
                } catch {
                    throw new Error(`O servidor retornou uma resposta inesperada (HTTP ${response.status}).`)
                }
            }

            if (!response.ok) {
                throw new Error(result.erro || `Não foi possível fazer login (HTTP ${response.status}).`)
            }

            if (typeof result.token !== 'string' || !result.token) {
                throw new Error('O servidor respondeu sem retornar um token de autenticação.')
            }

            localStorage.setItem('token', result.token)
            setMensagem(`Login realizado com sucesso. Olá, ${result.user?.name ?? ''}!`)
            form.reset()

            navigate('/lista-usuarios')
            
        } catch (error) {
            setErro(error.message || 'Não foi possível conectar ao servidor.')
        } finally {
            setEnviando(false)
        }
    }

    return (
        <div className="mx-auto max-w-md bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            <form className="flex flex-col gap-6" onSubmit={entrar}>
                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-3 border border-gray-300 rounded-md focus:outline-none"
                />
                <input
                    name="password"
                    placeholder="Senha"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full px-3 border border-gray-300 rounded-md focus:outline-none"
                />
                <button
                    type="submit"
                    disabled={enviando}
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"
                >
                    {enviando ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
            {mensagem && <p role="status" className="mt-4 text-green-700">{mensagem}</p>}
            {erro && <p role="alert" className="mt-4 text-red-700">{erro}</p>}
            <Link to="/cadastro" className="text-blue-500 hover:text-blue-700 block mt-4">
                Ainda não tem conta? Cadastre-se
            </Link>
        </div>
    )
}
