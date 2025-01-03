import BookService from '../../services/bookService';

describe('BookService', () => {
    let bookService: BookService;

    beforeEach(() => {
        bookService = new BookService();
    });

    it('should create a book', async () => {
        const bookData = { title: 'Test Book', author: 'Author Name', publishedDate: '2023-01-01' };
        const createdBook = bookService.createBook(bookData.title, bookData.author, bookData.publishedDate);
        expect(createdBook).toHaveProperty('id');
        expect(createdBook.title).toBe(bookData.title);
    });

    it('should retrieve all books', async () => {
        const books = bookService.getBooks();
        expect(Array.isArray(books)).toBe(true);
    });

    it('should retrieve a book by ID', async () => {
        const bookData = { title: 'Test Book', author: 'Author Name', publishedDate: '2023-01-01' };
        const createdBook = bookService.createBook(bookData.title, bookData.author, bookData.publishedDate);
        const foundBook = await bookService.getBookById(createdBook.id);
        expect(foundBook).toEqual(createdBook);
    });

    it('should update a book', async () => {
        const bookData = { title: 'Test Book', author: 'Author Name', publishedDate: '2023-01-01' };
        const createdBook = bookService.createBook(bookData.title, bookData.author, bookData.publishedDate);
        const updatedData = { title: 'Updated Book', author: bookData.author, publishedDate: bookData.publishedDate };
        const updatedBook = await bookService.updateBook(createdBook.id, updatedData.title, updatedData.author, updatedData.publishedDate, updatedData);
        expect(updatedBook).not.toBeNull();
        expect(updatedBook!.title).toBe(updatedData.title);
    });

    it('should delete a book', async () => {
        const bookData = { title: 'Test Book', author: 'Author Name', publishedDate: '2023-01-01' };
        const createdBook = bookService.createBook(bookData.title, bookData.author, bookData.publishedDate);
        await bookService.deleteBook(createdBook.id);
        const foundBook = await bookService.getBookById(createdBook.id);
        expect(foundBook).toBeNull();
    });

    it('should partially update a book', () => {
        const original = bookService.createBook('Original Title', 'Original Author', '2023-01-01');
        const updated = bookService.patchBook(original.id, { title: 'New Title' });
        
        expect(updated).not.toBeNull();
        expect(updated!.title).toBe('New Title');
        expect(updated!.author).toBe('Original Author');    // unchanged
        expect(updated!.publishedDate).toBe('2023-01-01'); // unchanged
    });
});