import supertest from "supertest";
import { BooksPage } from "./page";
import { Book } from "../../../models/book";
import app from "../../../app";

export class GetBooksPage extends BooksPage {

  constructor() {
    super()
  }

 async getAllBooks() {
    const response =  await supertest(app).get('/api/books').set({'x-api-key': this.xApiKey});

    if (!response.ok) {
      throw new Error(`Unexpected status code: ${response.statusCode} on book get.`);
    }
  
    return response;
  }

   getSingleBookByIdFromAll(books: Book[], id: number): Book | undefined {
    let book = books.find((b) => b.id = id);
    return book;

  }
}
