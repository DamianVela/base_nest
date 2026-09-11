import { Request, Response } from 'express';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 300,
  handler: (_req: Request, res: Response) => {
    return res.status(429).json({
      error: 'Demasiadas peticiones. Intente más tarde.',
    });
  },
});

export const apiLoginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  handler: (req: Request, res: Response) => {
    return res.status(429).json({
      error: `Demasiados intentos. Intenta de nuevo en 5 minutos.`,
    });
  },
});

export const limiterRefresh = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    if (req.cookies?.refresh_token) {
      return `refresh:${req.cookies.refresh_token}`;
    }
    return ipKeyGenerator(req.ip || '');
  },
});
