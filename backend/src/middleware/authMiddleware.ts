import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ENV } from '../config/env';

export interface AuthRequest extends Request {
  admin?: {
    id: string;
    email: string;
    role: string;
  };
}

export const generateToken = (payload: { id: string; email: string; role: string }): string => {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Authorization token required' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
    return;
  }

  req.admin = decoded;
  next();
};
