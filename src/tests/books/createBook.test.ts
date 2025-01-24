import { BookApi } from '../api/BookApi';
import { generateBookData, CreateBookDTO } from '../data/bookDataProvider';
import { AUTHOR_REQUIRED_STRING, PUBLISHED_DATE_REQUIRED_VALID, TITLE_REQUIRED_STRING, UNAUTHORIZED_INVALID_KEY } from '../messages';
import { singleBookSchema, errorSchema } from '../schemas/bookSchema';

describe('[POST] /api/books (Create Book)', () => {
    it('should create a book with valid data and return 201', async () => {
        const validData = generateBookData();
        const response = await BookApi.createBook(validData);

        expect(response.status).toBe(201);
        const { error, value } = singleBookSchema.validate(response.body);
        expect(error).toBeUndefined();

        expect(value.title).toBe(validData.title);
        expect(value.author).toBe(validData.author);
        expect(new Date(value.publishedDate).toISOString().split('T')[0]).toBe(validData.publishedDate);
        expect(typeof value.id).toBe('number');
    });

    it('should return 401 if API key is missing', async () => {
        const validData = generateBookData();
        const response = await BookApi.createBook(validData, '');
        expect(response.status).toBe(401);
        expect(response.body.error).toBe(UNAUTHORIZED_INVALID_KEY);

        const { error } = errorSchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    it('should return 401 if API key is invalid', async () => {
        const validData = generateBookData();
        const response = await BookApi.createBook(validData, 'invalid-key-123');
        expect(response.status).toBe(401);
        expect(response.body.error).toBe(UNAUTHORIZED_INVALID_KEY);

        const { error } = errorSchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    const invalidScenarios = [
        {
            scenario: 'title',
            payload: { ...generateBookData(), title: undefined },
            expectedMessage: TITLE_REQUIRED_STRING,
            type: 'missing'
        },
        {
            scenario: 'title',
            payload: { ...generateBookData(), title: 123 },
            expectedMessage: TITLE_REQUIRED_STRING,
            type: 'invalid'
        },
        {
            scenario: 'author',
            payload: { ...generateBookData(), author: undefined },
            expectedMessage: AUTHOR_REQUIRED_STRING,
            type: 'missing'
        },
        {
            scenario: 'author',
            payload: { ...generateBookData(), author: 123 },
            expectedMessage: AUTHOR_REQUIRED_STRING,
            type: 'invalid'
        },
        {
            scenario: 'publishedDate',
            payload: { ...generateBookData(), publishedDate: undefined },
            expectedMessage: PUBLISHED_DATE_REQUIRED_VALID,
            type: 'missing'
        },
        {
            scenario: 'publishedDate',
            payload: { ...generateBookData(), publishedDate: 'not-a-valid-date' },
            expectedMessage: PUBLISHED_DATE_REQUIRED_VALID,
            type: 'invalid'
        },
    ];

    it.each(invalidScenarios)(
        'should return 400 when $scenario field is $type',
        async ({ payload, expectedMessage }) => {
            const validPayload = Object.fromEntries(Object.entries(payload).filter(([_, value]) => value !== undefined));
            const response = await BookApi.createBook(validPayload as CreateBookDTO);
            expect(response.status).toBe(400);

            const { error } = errorSchema.validate(response.body);
            expect(error).toBeUndefined();
            expect(typeof response.body.error).toBe('string');
            expect(response.body.error).toMatch(expectedMessage);
        }
    );
});
