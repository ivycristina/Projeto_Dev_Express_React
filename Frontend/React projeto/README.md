# Nome do Seu Projeto 🚀

Uma aplicação Full Stack que integra um backend robusto em **Node.js com Express** e um frontend dinâmico em **React**. O projeto utiliza autenticação via Token (JWT/localStorage) para controle de acesso.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** & **Express** (API REST)
- **Prisma ORM** (Integração e gerenciamento do Banco de Dados)

### Frontend
- **React** (Construção da Interface)
- **Vite** (Ferramenta de build rápida)
- **React Router Dom** (Gerenciamento de rotas)
- **Tailwind CSS** (Estilização da aplicação)

---

## 📁 Estrutura do Projeto

O projeto está organizado em um único repositório dividido entre servidor e cliente:

```text
├── Backend/                 # Código do servidor Express
│   ├── index.js             # Ponto de entrada da API
│   ├── password.js          # Utilitários de segurança/criptografia
│   ├── prisma.js            # Configuração do Prisma Client
│   └── package.json
│
├── Frontend\ React projeto/ # Raiz do ambiente Frontend
│   ├── dist/                # Build final de produção
│   ├── src/                 # Componentes, páginas e lógica React
│   ├── index.html           # Arquivo HTML principal do Vite
│   ├── vite.config.js       # Configurações do Vite
│   ├── eslint.config.js     # Regras de linting do código
│   └── package.json
```

---

## 🚀 Como Executar o Projeto

Certifique-se de ter o [Node.js](https://nodejs.org) instalado em sua máquina antes de começar.

### 1. Clonar o Repositório
```bash
git clone https://github.com
cd "Projeto Dev"
```
### 2. Configurar as Variáveis de Ambiente
Antes de iniciar, você precisa conectar o Prisma ao seu MongoDB. Crie um arquivo `.env` dentro da pasta `Backend/` e adicione a sua string de conexão:
```env
DATABASE_URL="mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/nome_do_banco?retryWrites=true&w=majority"
```

## 3. Instalar as Dependências
Instale as dependências da raiz (que gerenciam a execução simultânea) e certifique-se de que os pacotes do `Backend` e do `Frontend\ React projeto` também foram instalados:
```bash
npm install
```

*O servidor Express iniciará na porta `3000`*

### 4. Sincronizar o Banco de Dados (Prisma)
Para gerar o Prisma Client com base nos seus schemas e mapear o MongoDB corretamente, execute dentro da pasta do backend (ou através do script configurado):
```bash
cd Backend
npx prisma db push
cd ..
```

### 5. Iniciar o projeto (Full Stack)
Para rodar o Backend e o Frontend juntos automaticamente, execute o comando na raiz do projeto:
```bash
npm run dev
```

*O terminal subirá o servidor Express e abrirá o ambiente de desenvolvimento do Vite (geralmente em `http://localhost:5173`).*


---

## 🔐 Funcionalidades Implementadas

- **Comunicação com API:** Tratamento de erros HTTP e respostas assíncronas nativas utilizando `fetch`.
- **Interface Responsiva:** Design limpo e moderno desenvolvido com Tailwind CSS.
- **Inicialização Unificada:** Scripts configurados na raiz eliminam a necessidade de abrir múltiplos terminais para rodar o projeto.
- **Persistência de Dados:** Uso do Prisma para comunicação segura com o banco de dados.
- **Autenticação:** Envio de credenciais para a rota `/api/login` e armazenamento do token gerado via `localStorage`.
- **Banco de Dados NoSQL:** Integração flexível e escalável utilizando MongoDB através das facilidades de tipagem do Prisma.


---

## 📌 Rotas da API (Backend)

| Método | Rota | Descrição |
| :----- | :--- | :-------- |
| `POST` | `/api/login` | Realiza a autenticação e retorna o token do usuário. |
| `POST` | `/api/cadastro` | Registra um novo usuário no sistema. |
| `GET`  | `/api/lista-usuarios` | Listar todos os usuários criados. |
---

Feito por [Ivy](https://github.com/ivycristina) 😎
