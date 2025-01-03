// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import dotenv from 'dotenv';
dotenv.config();

export interface AuthenticatedRequest extends Request {
    auth?: {
        isAuthenticated: boolean;
    }
}

const API_KEY = process.env.API_KEY || 'default-secure-api-key-2024';

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const apiKey = req.header('x-api-key');

    if (!apiKey || apiKey !== API_KEY) {
        logger.error('Invalid or missing API key');
        res.status(401).json({ error: 'Unauthorized - Invalid API key' });
        return;
    }

    (req as AuthenticatedRequest).auth = { isAuthenticated: true };
    next();
};