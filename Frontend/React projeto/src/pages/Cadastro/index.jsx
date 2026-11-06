
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

export default function Cadastro() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [mensagem, setMensagem] = useState('')
    const [erro, setErro] = useState('')
    const [enviando, setEnviando] = useState(false)

    async function cadastrar(event) {
        event.preventDefault()
        setMensagem('')
        setErro('')
        setEnviando(true)

        const form = event.currentTarget
        const formData = new FormData(form)

        try {
            const response = await fetch('/api/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                }),
            })
            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.erro || 'Não foi possível criar a conta.')
            }

            setMensagem('Conta criada com sucesso.')
            form.reset()
        } catch (error) {
            setErro(error.message || 'Não foi possível conectar ao servidor.')
        } finally {
            setEnviando(false)
        }
    }

    return (
        <div className="mx-auto max-w-md bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Cadastro</h2>
            <form className="flex flex-col gap-6" onSubmit={cadastrar}>
                <input ref={nameRef} name="name" placeholder="Nome" type="text" required className="w-full px-3 border border-gray-300 rounded-md focus:outline-none" />
                <input ref={emailRef} name="email" placeholder="Email" type="email" required className="w-full px-3 border border-gray-300 rounded-md focus:outline-none" />
                <input ref={passwordRef} name="password" placeholder="Senha" type="password" required className="w-full px-3 border border-gray-300 rounded-md focus:outline-none" />
                <button type="submit" disabled={enviando} className="bg-blue-500 hover:bg-blue-400 gap-6 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50">
                    {enviando ? 'Cadastrando...' : 'Cadastrar'}
                </button>
            </form>
            {mensagem && <p role="status" className="mt-4 text-green-700">{mensagem}</p>}
            {erro && <p role="alert" className="mt-4 text-red-700">{erro}</p>}
            <Link to="/login" className="text-blue-500 hover:text-blue-700 block">
                Já possui uma conta? Faça login
            </Link>
        </div>
    )
}
