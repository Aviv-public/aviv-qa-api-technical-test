import { BookApi } from '../api/BookApi';
import { generateBookData } from '../data/bookDataProvider';
import { singleBookSchema } from '../schemas/bookSchema';

describe('[CRUD] End-to-End Book Flow', () => {
    it('should create, retrieve, update, and delete a book successfully', async () => {
        // POST
        const createData = generateBookData();
        const createResponse = await BookApi.createBook(createData);
        expect(createResponse.status).toBe(201);

        const createdBook = createResponse.body;
        let { error } = singleBookSchema.validate(createdBook);
        expect(error).toBeUndefined();

        const createdBookId = createdBook.id;

        // GET
        const getResponse = await BookApi.getBookById(String(createdBookId));
        expect(getResponse.status).toBe(200);
        const retrievedBook = getResponse.body;
        expect(retrievedBook.id).toBe(createdBookId);
        expect(retrievedBook.title).toBe(createData.title);
        expect(retrievedBook.author).toBe(createData.author);
        expect(retrievedBook.publishedDate).toBe(createData.publishedDate);

        ({ error } = singleBookSchema.validate(retrievedBook));
        expect(error).toBeUndefined();

        // PUT
        const updateData = generateBookData();
        const updateResponse = await BookApi.updateBook(
            String(createdBookId),
            updateData
        );
        expect(updateResponse.status).toBe(200);

        const updatedBook = updateResponse.body;
        expect(updatedBook.title).toBe(updateData.title);
        expect(updatedBook.author).toBe(updateData.author);
        expect(updatedBook.publishedDate).toBe(updateData.publishedDate);

        ({ error } = singleBookSchema.validate(updatedBook));
        expect(error).toBeUndefined();

        // DELETE
        const deleteResponse = await BookApi.deleteBook(String(createdBookId));
        expect(deleteResponse.status).toBe(204);

        const finalGetResponse = await BookApi.getBookById(String(createdBookId));
        expect(finalGetResponse.status).toBe(404);
    });
});
