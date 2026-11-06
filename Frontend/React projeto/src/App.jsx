import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import ListaUsuarios from './pages/Lista_usuarios'

function App() {  
  return (
    <BrowserRouter>
    <header className="bg-blue-500 text-white p-4 shadow-md mb-6">
        <h1 className="text-2xl font-bold">Sistema de Cadastro de Usuários</h1>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/cadastro" replace />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/cadastro" replace />} />
        <Route path="/lista-usuarios" element={<ListaUsuarios />} />
      </Routes>
    </BrowserRouter>
  )
}
  
  export default App
