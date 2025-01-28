import { createBook, getBooks, getBookById, updateBook, deleteBook } from '../../utils/api';
import { generateBookData, generateUpdatedBookData } from '../data/bookData';

let bookId: string;

describe('Book API Tests', () => {
  it('should create a new book', async () => {
    const bookData = generateBookData();
    console.log(bookData);
    const response = await createBook(bookData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    bookId = response.body.id;
  });

  it('should fetch all books', async () => {
    const response = await getBooks();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should fetch a book by ID', async () => {
    const response = await getBookById(bookId);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', bookId);
  });

  it('should update a book', async () => {
    const updatedBookData = generateUpdatedBookData();
    const response = await updateBook(bookId, updatedBookData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', updatedBookData.title);
  });

  it('should delete a book', async () => {
    const response = await deleteBook(bookId);
    expect(response.status).toBe(200);
  });
});
