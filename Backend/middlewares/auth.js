import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  const authorization = req.get('authorization') ?? '';
  const match = authorization.match(/^Bearer\s+(\S+)$/i);
  const token = match?.[1];

  if (!token) {
    return res.status(401).json({ erro: 'Token de autenticação ausente.' });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error('JWT_SECRET não está definida no ambiente.');
    return res.status(500).json({ erro: 'Autenticação não está configurada.' });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    if (typeof payload === 'string' || typeof payload.sub !== 'string') {
      return res.status(401).json({ erro: 'Token de autenticação inválido.' });
    }

    req.userId = payload.sub;
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ erro: 'Token expirado. Faça login novamente.' });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ erro: 'Token de autenticação inválido.' });
    }

    console.error('Erro ao validar token:', error);
    return res.status(500).json({ erro: 'Não foi possível validar a autenticação.' });
  }
}
