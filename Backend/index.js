import 'dotenv/config';
import express from 'express';
import publicRoutes from './Rotas/publicas.js';
import privateRoutes from './Rotas/privadas.js';
import auth from './middlewares/auth.js';
const app = express();

app.use(express.json());
app.use('/api', publicRoutes);
app.use('/api', auth, privateRoutes);

const PORT = Number(process.env.PORT || 3000)
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
