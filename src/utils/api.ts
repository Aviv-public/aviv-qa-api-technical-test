import supertest from 'supertest';

const api = supertest('http://localhost:3000');

export const createBook = (data: any) =>
  api.post('/api/books').send(data);

export const getBooks = () => api.get('/api/books');

export const getBookById = (id: string) => api.get(`/api/books/${id}`);

export const updateBook = (id: string, data: any) =>
  api.put(`/api/books/${id}`).send(data);

export const deleteBook = (id: string) =>
  api.delete(`/api/books/${id}`);
