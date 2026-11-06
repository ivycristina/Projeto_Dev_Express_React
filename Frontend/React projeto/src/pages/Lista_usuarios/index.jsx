import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function loadUsers() {
      const token = localStorage.getItem('token')

      if (!token) {
        setErro('Faça login para listar os usuários.')
        setCarregando(false)
        return
      }

      try {
        const response = await fetch('/api/listar-usuarios', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const responseText = await response.text()
        let result

        try {
          result = responseText ? JSON.parse(responseText) : null
        } catch {
          throw new Error(`O servidor retornou uma resposta inesperada (HTTP ${response.status}).`)
        }

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token')
          }
          throw new Error(result?.erro || `Não foi possível carregar os usuários (HTTP ${response.status}).`)
        }

        if (!Array.isArray(result)) {
          throw new Error('O servidor retornou uma lista de usuários inválida.')
        }

        setUsuarios(result)
      } catch (error) {
        setErro(error.message || 'Não foi possível conectar ao servidor.')
      } finally {
        setCarregando(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <div className="mx-auto max-w-2xl bg-white p-8 border border-gray-300 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Lista de Usuários</h2>
      <ul className="space-y-2">
        {usuarios.map((user) => (
            <li key={user.id} className="mb-4 p-4 border border-gray-300 rounded-md">
                <p className="font-semibold">ID: {user.id}</p>
                <p className="font-semibold">Nome: {user.name}</p>
                <p className="font-semibold">Email: {user.email}</p>
            </li>
        ))}
        </ul>
        {carregando && <p>Carregando usuários...</p>}
        {erro && <p role="alert" className="mt-4 text-red-700">{erro}</p>}
        <Link to="/login" className="text-blue-500 hover:text-blue-700 block mt-4">
            Voltar para Login
        </Link>
    </div>
  )
}
