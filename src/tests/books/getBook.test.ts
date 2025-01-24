import { Book } from '../../models/book';
import { BookApi } from '../api/BookApi';
import { generateBookData } from '../data/bookDataProvider';
import { BOOK_NOT_FOUND, UNAUTHORIZED_INVALID_KEY } from '../messages';
import { singleBookSchema, bookArraySchema, errorSchema } from '../schemas/bookSchema';

describe('[GET] /api/books (Get All Books)', () => {
    let createdBooks: Book[] = [];

    beforeAll(async () => {
        const numberOfBooksToCreate = 5;

        for (let i = 0; i < numberOfBooksToCreate; i++) {
            const validBookData = generateBookData();
            const createResponse = await BookApi.createBook(validBookData);
            expect(createResponse.status).toBe(201);
            createdBooks.push(createResponse.body);
        }
    });

    afterAll(async () => {
        for (const book of createdBooks) {
            const deleteResponse = await BookApi.deleteBook(book.id.toString());
            expect(deleteResponse.status).toBe(204);
        }
    });

    it('should return 200 and a list of books', async () => {
        const response = await BookApi.getAllBooks();
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThanOrEqual(5);

        const createdIds = createdBooks.map((b) => b.id);
        const returnedIds = response.body.map((b: Book) => b.id);

        expect(new Set(returnedIds)).toEqual(new Set(createdIds));

        const { error } = bookArraySchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    it('should return 401 if API key is missing', async () => {
        const response = await BookApi.getAllBooks('');
        expect(response.status).toBe(401);
        expect(response.body.error).toBe(UNAUTHORIZED_INVALID_KEY);

        const { error } = errorSchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    it('should return 401 if API key is invalid', async () => {
        const response = await BookApi.getAllBooks('invalid-key-123');
        expect(response.status).toBe(401);
        expect(response.body.error).toBe(UNAUTHORIZED_INVALID_KEY);

        const { error } = errorSchema.validate(response.body);
        expect(error).toBeUndefined();
    });
});

describe('[GET] /api/books when database is empty', () => {
    beforeAll(async () => {
        const allBooks = await BookApi.getAllBooks();
        if (allBooks.status === 200) {
            for (const book of allBooks.body) {
                const deleteResponse = await BookApi.deleteBook(book.id.toString());
                expect(deleteResponse.status).toBe(204);
            }
        }
    });

    it('should return 200 and an empty array if there are no books', async () => {
        const response = await BookApi.getAllBooks();
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(0);

        const { error } = bookArraySchema.validate(response.body);
        expect(error).toBeUndefined();
    });
});

describe('[GET] /api/books/:id (Get Book By ID)', () => {
    let createdBookId: number;
    let bookData: Book;

    beforeAll(async () => {
        const validBookData = generateBookData();
        const createResponse = await BookApi.createBook(validBookData);
        expect(createResponse.status).toBe(201);
        createdBookId = createResponse.body.id;
        bookData = createResponse.body;
    });

    afterAll(async () => {
        const deleteResponse = await BookApi.deleteBook(String(createdBookId));
        expect(deleteResponse.status).toBe(204);
    });

    it('should get the book by ID', async () => {
        const response = await BookApi.getBookById(String(createdBookId));
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(createdBookId);
        expect(response.body.title).toBe(bookData.title);
        expect(response.body.author).toBe(bookData.author);
        expect(response.body.publishedDate).toBe(bookData.publishedDate);

        const { error } = singleBookSchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    it('should return 404 if the book does not exist', async () => {
        const response = await BookApi.getBookById('999999');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe(BOOK_NOT_FOUND);

        const { error } = errorSchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    it('should return 404 if the book ID format is invalid', async () => {
        const response = await BookApi.getBookById('invalid-id-format');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe(BOOK_NOT_FOUND);

        const { error } = errorSchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    it('should return 401 if no API key is provided', async () => {
        const response = await BookApi.getBookById(String(createdBookId), '');
        expect(response.status).toBe(401);
        expect(response.body.error).toBe(UNAUTHORIZED_INVALID_KEY);

        const { error } = errorSchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    it('should return 401 if the API key is invalid', async () => {
        const response = await BookApi.getBookById(String(createdBookId), 'invalid-key-123');
        expect(response.status).toBe(401);
        expect(response.body.error).toBe(UNAUTHORIZED_INVALID_KEY);

        const { error } = errorSchema.validate(response.body);
        expect(error).toBeUndefined();
    });
});
