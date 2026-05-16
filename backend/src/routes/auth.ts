import { Router, Request, Response } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const router = Router();

// Endpoint para iniciar login con Google
router.get('/google', (req: Request, res: Response) => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || '',
    redirect_uri: process.env.GOOGLE_REDIRECT_URI || '',
    response_type: 'code',
    scope: 'openid email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/tasks',
  });
  
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

// Callback de Google
router.get('/google/callback', async (req: Request, res: Response) => {
  const { code } = req.query;
  
  if (!code) {
    res.status(400).json({ error: 'No authorization code' });
    return;
  }

  try {
    // Cambiar code por tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Obtener info del usuario
    const userInfo = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { email, name, picture } = userInfo.data;

    // Crear JWT
    const jwtToken = jwt.sign(
      { email, googleId: email, accessToken: access_token },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    // Guardar usuario en BD (implementar después con Prisma)
    
    // Redirigir al frontend con token
    res.redirect(`${process.env.CORS_ORIGIN?.split(',')[0] || 'http://localhost:3000'}?token=${jwtToken}`);
  } catch (error) {
    console.error('Error en callback:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Endpoint para logout
router.post('/logout', (req: Request, res: Response) => {
  // El cliente debe eliminar el token localmente
  res.json({ message: 'Logged out' });
});

export default router;
