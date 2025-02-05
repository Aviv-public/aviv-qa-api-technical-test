import { BookApi } from '../api/BookApi';
import { generateBookData } from '../data/bookDataProvider';
import { BOOK_NOT_FOUND, UNAUTHORIZED_INVALID_KEY } from '../messages';
import { errorSchema } from '../schemas/bookSchema';

describe('[DELETE] /api/books/:id (Delete Book)', () => {
    let createdBookId: number;

    beforeAll(async () => {
        const validData = generateBookData();
        const createResponse = await BookApi.createBook(validData);
        expect(createResponse.status).toBe(201);

        createdBookId = createResponse.body.id;
    });

    it('should delete the book and return 204', async () => {
        const response = await BookApi.deleteBook(String(createdBookId));
        expect(response.status).toBe(204);
        const getResponse = await BookApi.getBookById(String(createdBookId));
        expect(getResponse.status).toBe(404);
    });

    it('should return 404 if the book does not exist', async () => {
        const response = await BookApi.deleteBook('999999');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe(BOOK_NOT_FOUND);

        const { error } = errorSchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    it('should return 404 if the book ID format is invalid', async () => {
        const response = await BookApi.deleteBook('invalid-id');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe(BOOK_NOT_FOUND);

        const { error } = errorSchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    it('should return 401 if API key is missing', async () => {
        const response = await BookApi.deleteBook(String(createdBookId), '');
        expect(response.status).toBe(401);
        expect(response.body.error).toBe(UNAUTHORIZED_INVALID_KEY);

        const { error } = errorSchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    it('should return 401 if API key is invalid', async () => {
        const response = await BookApi.deleteBook(String(createdBookId), 'invalid-key-123');
        expect(response.status).toBe(401);
        expect(response.body.error).toBe(UNAUTHORIZED_INVALID_KEY);

        const { error } = errorSchema.validate(response.body);
        expect(error).toBeUndefined();
    });
});
