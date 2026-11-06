import express from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';
import { hashPassword, verifyPassword } from '../password.js';

const router = express.Router();

router.post(['/cadastro', '/usuarios'], async (req, res) => {
  const { name, email, password } = req.body ?? {};

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !name.trim() ||
    !email.trim() ||
    !password
  ) {
    return res.status(400).json({
      erro: 'Informe name, email e password como textos não vazios.',
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: await hashPassword(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      user,
    });
  } catch (error) {
    if (error?.code === 'P2002') {
      return res.status(409).json({ erro: 'Este e-mail já está cadastrado.' });
    }

    console.error('Erro ao cadastrar usuário:', error);
    return res.status(500).json({ erro: 'Não foi possível cadastrar o usuário.' });
  }
});

export default router;


router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
    return res.status(400).json({
      erro: 'Informe email e password como textos não vazios.',
    });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('JWT_SECRET não está definida no ambiente.');
    return res.status(500).json({ erro: 'Autenticação não está configurada.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user || !(await verifyPassword(password, user.password))) {
      return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
    }

    const token = jwt.sign({ sub: user.id }, jwtSecret, { expiresIn: '1h' });

    return res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ erro: 'Não foi possível fazer login.' });
  }
});


