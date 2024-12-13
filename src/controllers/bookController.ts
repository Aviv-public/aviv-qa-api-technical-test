import { Request, Response, NextFunction } from 'express';
import { Book, UpdateBookDTO } from '../models/book';
import BookService from '../services/bookService';

class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    public createBook = async (req: Request, res: Response): Promise<void> => {
        const { title, author, publishedDate } = req.body;
        const newBook = this.bookService.createBook(title, author, publishedDate);
        res.status(201).json(newBook);
    };

    public getBooks = async (req: Request, res: Response): Promise<void> => {
        const books = this.bookService.getBooks();
        res.status(200).json(books);
    };

    public getBookById = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const book = this.bookService.getBookById(id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    };

    public updateBook = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const updateData: UpdateBookDTO = req.body;
        const { title, author, publishedDate } = updateData;
        const updatedBook = this.bookService.updateBook(id, title, author, publishedDate, updateData);
        if (updatedBook) {
            res.status(200).json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    };

    public deleteBook = async (req: Request, res: Response): Promise<void> => {
        const id = parseInt(req.params.id);
        const deleted = this.bookService.deleteBook(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    };
}

export default BookController;