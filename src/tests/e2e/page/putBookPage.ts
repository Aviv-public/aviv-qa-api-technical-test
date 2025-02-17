import supertest from "supertest";
import { BooksPage } from "./page";
import { Book, UpdateBookDTO } from "../../../models/book";
import app from "../../../app";

export class PutBookPage extends BooksPage {

  constructor() {
    super()
  }

 async putBook(id: number, body: UpdateBookDTO) {
    const response =  await supertest(app).put(`/api/books/${id}`).set({'x-api-key': this.xApiKey}).send(body);

    if (!(response.ok || response.notFound)) {
      throw new Error(`Unexpected status code: ${response.statusCode} on book get.`);
    }
  
    return response;
  }
}
