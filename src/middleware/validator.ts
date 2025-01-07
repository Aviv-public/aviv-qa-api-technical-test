import { Request, Response, NextFunction } from 'express';
import { Book } from '../models/book';

export const validateBook = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { title, author, publishedDate } = req.body;

    if (!title || typeof title !== 'string') {
        res.status(400).json({ error: 'Title is required and must be a string' });
        return;
    }

    if (!author || typeof author !== 'string') {
        res.status(400).json({ error: 'Author is required and must be a string' });
        return;
    }

    if (!publishedDate || isNaN(Date.parse(publishedDate))) {
        res.status(400).json({ error: 'Published date is required and must be a valid date' });
        return;
    }

    next();
};

export const validatePatchBook = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const updates = req.body as Partial<Book>;
    
    if (Object.keys(updates).length === 0) {
        res.status(400).json({ error: 'At least one field must be provided for update' });
        return;
    }

    if (updates.title !== undefined && typeof updates.title !== 'string') {
        res.status(400).json({ error: 'Title must be a string' });
        return;
    }

    if (updates.author !== undefined && typeof updates.author !== 'string') {
        res.status(400).json({ error: 'Author must be a string' });
        return;
    }

    if (updates.publishedDate !== undefined && isNaN(Date.parse(updates.publishedDate))) {
        res.status(400).json({ error: 'Published date must be a valid date' });
        return;
    }

    next();
};

export const validatePutBook = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { title, author, publishedDate } = req.body;

    // Check if all required fields are present
    if (!title || !author || !publishedDate) {
        res.status(400).json({ 
            error: 'PUT request requires all fields: title, author, publishedDate' 
        });
        return;
    }

    // Validate field types
    if (typeof title !== 'string') {
        res.status(400).json({ error: 'Title must be a string' });
        return;
    }

    if (typeof author !== 'string') {
        res.status(400).json({ error: 'Author must be a string' });
        return;
    }

    if (isNaN(Date.parse(publishedDate))) {
        res.status(400).json({ error: 'Published date must be a valid date' });
        return;
    }

    next();
};