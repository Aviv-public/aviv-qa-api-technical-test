import { Request, Response } from 'express';
import { UpdateBookDTO, Book } from '../models/book';
import BookService from '../services/bookService';

class BookController {
    private readonly bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    public createBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const { title, author, publishedDate } = req.body;
            const newBook = this.bookService.createBook(title, author, publishedDate);
            res.status(201).json(newBook);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    public getBooks = async (req: Request, res: Response): Promise<void> => {
        try {
            const books = this.bookService.getBooks();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    public getBookById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const book = this.bookService.getBookById(id);
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    public updateBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const updateData: UpdateBookDTO = req.body;
            const { title, author, publishedDate } = updateData;
            const updatedBook = this.bookService.updateBook(id, title, author, publishedDate, updateData);
            if (updatedBook) {
                res.status(200).json(updatedBook);
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    public patchBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const updates: Partial<Book> = req.body;

            // Validate that at least one field is provided
            if (Object.keys(updates).length === 0) {
                res.status(400).json({ message: 'At least one field must be provided for update' });
                return;
            }

            const updatedBook = this.bookService.patchBook(id, updates);
            if (updatedBook) {
                res.status(200).json(updatedBook);
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    };

    public deleteBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const deleted = this.bookService.deleteBook(id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    };
}

export default BookController;