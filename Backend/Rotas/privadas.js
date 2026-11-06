import express from 'express';
import prisma from '../prisma.js';

const router = express.Router();

router.get('/listar-usuarios', async (req, res) => {
    try {
        const usuarios = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        res.json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }
});

export default router;
