import supertest from "supertest";
import { BooksPage } from "./page";
import { Book, UpdateBookDTO } from "../../../models/book";
import app from "../../../app";

export class GetBookPage extends BooksPage {

  constructor() {
    super()
  }

 async getBook(id: number){
    const response =  await supertest(app).get(`/api/books/${id}`).set({'x-api-key': this.xApiKey});

    if (!(response.ok || response.notFound)) {
      throw new Error(`Unexpected status code: ${response.statusCode} on book get.`);
    }
  
    return response;
  }
}
