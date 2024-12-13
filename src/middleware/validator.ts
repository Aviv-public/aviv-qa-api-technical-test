import { Request, Response, NextFunction } from 'express';

export const validateBook = (req: Request, res: Response, next: NextFunction) => {
    const { title, author, publishedDate } = req.body;

    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Title is required and must be a string.' });
    }

    if (!author || typeof author !== 'string') {
        return res.status(400).json({ error: 'Author is required and must be a string.' });
    }

    if (!publishedDate || isNaN(Date.parse(publishedDate))) {
        return res.status(400).json({ error: 'Published date is required and must be a valid date.' });
    }

    next();
};