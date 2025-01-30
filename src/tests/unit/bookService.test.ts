import BookService from '../../services/bookService';
import { validateBookSchema } from '../../utils/bookSchema';
const { faker } = require('@faker-js/faker');


describe('BookService', () => {
    let bookService: BookService;
    const bookData = { title: faker.lorem.words(3), author: faker.person.fullName(), publishedDate: '2023-01-01' };

    beforeEach(() => {
        bookService = new BookService();
    });

    it('should create a book', async () => {
        const createdBook = bookService.createBook(bookData.title, bookData.author, bookData.publishedDate);
        expect(createdBook).toHaveProperty('id');
        expect(createdBook.title).toBe(bookData.title);
    });

    it('should retrieve all books', async () => {
        const books = bookService.getBooks();
        expect(Array.isArray(books)).toBe(true);
    });

    it('should retrieve a book by ID', async () => {
        const createdBook = bookService.createBook(bookData.title, bookData.author, bookData.publishedDate);
        const foundBook = await bookService.getBookById(createdBook.id);
        expect(foundBook).toEqual(createdBook);
    });

    it('should update a book', async () => {
        const createdBook = bookService.createBook(bookData.title, bookData.author, bookData.publishedDate);
        const updatedData = { title: 'Updated Book-'+bookData.title, author: 'Updated-'+bookData.author, publishedDate: bookData.publishedDate };
        const updatedBook = await bookService.updateBook(createdBook.id, updatedData.title, updatedData.author, updatedData.publishedDate, updatedData);
        expect(updatedBook).not.toBeNull();
        expect(updatedBook!.title).toBe(updatedData.title);
    });

    it('should delete a book', async () => {
        const createdBook = bookService.createBook(bookData.title, bookData.author, bookData.publishedDate);
        await bookService.deleteBook(createdBook.id);
        const foundBook = await bookService.getBookById(createdBook.id);
        expect(foundBook).toBeNull();
    });

    it('should partially update a book', () => {
        const original = bookService.createBook(bookData.title, bookData.author, bookData.publishedDate);
        const updated = bookService.patchBook(original.id, { title: 'New Title' });
        
        expect(updated).not.toBeNull();
        expect(updated!.title).toBe('New Title');
        expect(updated!.author).toBe(bookData.author);    
        expect(updated!.publishedDate).toBe(bookData.publishedDate); 
    });

    it('should create, get, update, delete a book', async () => {
        const createdBook = bookService.createBook(bookData.title, bookData.author, bookData.publishedDate);
        let foundBook = await bookService.getBookById(createdBook.id);
        expect(foundBook).toEqual(createdBook);

        const updatedData = { title: 'Updated-'+bookData.title, author: 'Updated-'+bookData.author, publishedDate: bookData.publishedDate };
        const updatedBook = await bookService.updateBook(createdBook.id, updatedData.title, updatedData.author, updatedData.publishedDate, updatedData);
        expect(updatedBook!.author).toBe('Updated-'+bookData.author);
        expect(updatedBook!.title).toBe(updatedData.title);

        await bookService.deleteBook(createdBook.id);
        foundBook = await bookService.getBookById(createdBook.id);
        expect(foundBook).toBeNull();
    });

    it('should create a book and return it in the list of all books', async () => {
        const createdBook = bookService.createBook(bookData.title, bookData.author, bookData.publishedDate);
        const books = bookService.getBooks();
        const foundBook = books.find(b => b.id === createdBook.id);
        expect(foundBook).toEqual(createdBook);
    });

    it('should retrieve a book and validate its schema', async () => {
        const createdBook = bookService.createBook(bookData.title, bookData.author, bookData.publishedDate);
        const foundBook = await bookService.getBookById(createdBook.id);
        validateBookSchema(foundBook);
    });

    // Negative tests
    it('should return null when retrieving a non-existent book', async () => {
        const foundBook = await bookService.getBookById(999999);
        expect(foundBook).toBeNull();
    });

    it('should return null when updating a non-existent book', async () => {
        const updatedData = { title: 'Updated-'+bookData.title, author: 'Updated-'+bookData.author, publishedDate: bookData.publishedDate };
        const updatedBook = await bookService.updateBook(999999, 'New Title', 'New Author', '2023-01-01', updatedData);
        expect(updatedBook).toBeNull();
    });

    it('should return null when patching a non-existent book', async () => {
        const updatedBook = bookService.patchBook(999999, { title: 'Partial Update' });
        expect(updatedBook).toBeNull();
    });
    
    it('should fail schema validation when book data is incorrect', async () => {
        const invalidBook = { title: 'Test', author: 'Author' };
        expect(() => validateBookSchema(invalidBook)).toThrow();
    });
});