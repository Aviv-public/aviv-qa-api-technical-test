import supertest from "supertest";
import { Response } from "supertest";
import { CreateBookDTO } from "../data/bookDataProvider";

const BASE_URL = process.env.BASE_URL || '';
const API_KEY = process.env.API_KEY || '';

if (!BASE_URL) {
    throw new Error('BASE_URL is not set');
}
if (!API_KEY) {
    throw new Error('API_KEY is not set');
}

const bookRoute = '/api/books';

export class BookApi {
    static async getAllBooks(apiKey: string = API_KEY): Promise<Response> {
        return supertest(BASE_URL)
            .get(bookRoute)
            .set('x-api-key', apiKey).send();
    }

    static async getBookById(bookId: string, apiKey = API_KEY): Promise<Response> {
        return supertest(BASE_URL)
            .get(`/api/books/${bookId}`)
            .set('x-api-key', apiKey).send();
    }

    static async createBook(bookData: CreateBookDTO, apiKey = API_KEY): Promise<Response> {
        return supertest(BASE_URL)
            .post(bookRoute)
            .set('x-api-key', apiKey)
            .set('Content-Type', 'application/json')
            .send(bookData);
    }

    static async updateBook(id: string, bookData: any, apiKey = API_KEY): Promise<Response> {
        return supertest(BASE_URL)
            .put(`/api/books/${id}`)
            .set('x-api-key', apiKey)
            .set('Content-Type', 'application/json')
            .send(bookData);
    }

    static async deleteBook(id: string, apiKey = API_KEY): Promise<Response> {
        return supertest(BASE_URL)
            .delete(`${bookRoute}/${id}`)
            .set('x-api-key', apiKey)
            .send();
    }
}