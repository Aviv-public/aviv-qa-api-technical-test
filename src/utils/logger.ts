import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[INFO] ${new Date().toISOString()}: ${req.method} ${req.url}`);
    next();
};

export const logger = {
    info: (message: string) => {
        console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
    },
    error: (message: string) => {
        console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
    },
    warn: (message: string) => {
        console.warn(`[WARN] ${new Date().toISOString()}: ${message}`);
    }
};