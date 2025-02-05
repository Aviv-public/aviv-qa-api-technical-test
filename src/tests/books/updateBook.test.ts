import { BookApi } from '../api/BookApi';
import { generateBookData } from '../data/bookDataProvider';
import { singleBookSchema, errorSchema } from '../schemas/bookSchema';
import { AUTHOR_STRING, BAD_REQUEST_MISSING_FIELDS, BOOK_NOT_FOUND, PUBLISHED_DATE_VALID, TITLE_STRING, UNAUTHORIZED_INVALID_KEY } from '../messages';

describe('[PUT] /api/books/:id (Update Book)', () => {
    let createdBookId: number;

    beforeAll(async () => {
        const validCreateData = generateBookData();
        const createResponse = await BookApi.createBook(validCreateData);
        expect(createResponse.status).toBe(201);

        createdBookId = createResponse.body.id;
    });

    afterAll(async () => {
        const deleteResponse = await BookApi.deleteBook(String(createdBookId));
        expect(deleteResponse.status).toBe(204);
    });

    it('should update the book with valid data and return 200', async () => {
        const validUpdateData = generateBookData();
        const updateResponse = await BookApi.updateBook(
            String(createdBookId),
            validUpdateData
        );
        expect(updateResponse.status).toBe(200);

        const { error, value } = singleBookSchema.validate(updateResponse.body);
        expect(error).toBeUndefined();
        expect(value.id).toBe(createdBookId);
        expect(value.title).toBe(validUpdateData.title);
        expect(value.author).toBe(validUpdateData.author);
        expect(new Date(value.publishedDate).toISOString().split('T')[0]).toBe(validUpdateData.publishedDate);
    });

    it('should return 401 if API key is missing', async () => {
        const validUpdateData = generateBookData();
        const response = await BookApi.updateBook(
            String(createdBookId),
            validUpdateData,
            ''
        );
        expect(response.status).toBe(401);
        expect(response.body.error).toBe(UNAUTHORIZED_INVALID_KEY);

        const { error } = errorSchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    it('should return 401 if API key is invalid', async () => {
        const validUpdateData = generateBookData();
        const response = await BookApi.updateBook(
            String(createdBookId),
            validUpdateData,
            'invalid-key-123'
        );
        expect(response.status).toBe(401);
        expect(response.body.error).toBe(UNAUTHORIZED_INVALID_KEY);

        const { error } = errorSchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    it('should return 404 if the book does not exist', async () => {
        const validUpdateData = generateBookData();
        const response = await BookApi.updateBook('999999', validUpdateData);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe(BOOK_NOT_FOUND);

        const { error } = errorSchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    it('should return 404 if the book ID format is invalid', async () => {
        const validUpdateData = generateBookData();
        const response = await BookApi.updateBook('invalid-id', validUpdateData);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe(BOOK_NOT_FOUND);

        const { error } = errorSchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    const invalidUpdateScenarios = [
        {
            scenario: 'title',
            payload: { ...generateBookData(), title: undefined },
            expectedMessage: BAD_REQUEST_MISSING_FIELDS,
            type: 'missing'
        },
        {
            scenario: 'title',
            payload: { ...generateBookData(), title: 123 },
            expectedMessage: TITLE_STRING,
            type: 'invalid'
        },
        {
            scenario: 'author',
            payload: { ...generateBookData(), author: undefined },
            expectedMessage: BAD_REQUEST_MISSING_FIELDS,
            type: 'missing'
        },
        {
            scenario: 'author',
            payload: { ...generateBookData(), author: 123 },
            expectedMessage: AUTHOR_STRING,
            type: 'invalid'
        },
        {
            scenario: 'publishedDate',
            payload: { ...generateBookData(), publishedDate: undefined },
            expectedMessage: BAD_REQUEST_MISSING_FIELDS,
            type: 'missing'
        },
        {
            scenario: 'publishedDate',
            payload: { ...generateBookData(), publishedDate: 'not-a-date' },
            expectedMessage: PUBLISHED_DATE_VALID,
            type: 'invalid'
        },
    ];

    it.each(invalidUpdateScenarios)(
        'should return 400 when $scenario is $type',
        async ({ payload, expectedMessage }) => {
            const validPayload = Object.fromEntries(
                Object.entries(payload).filter(([_, value]) => value !== undefined)
            );

            const response = await BookApi.updateBook(
                String(createdBookId),
                validPayload
            );
            expect(response.status).toBe(400);

            const { error } = errorSchema.validate(response.body);
            expect(error).toBeUndefined();

            expect(typeof response.body.error).toBe('string');
            expect(response.body.error).toMatch(expectedMessage);
        }
    );
});
