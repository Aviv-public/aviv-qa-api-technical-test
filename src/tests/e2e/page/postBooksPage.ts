import supertest from "supertest";
import { BooksPage } from "./page";
import { Book, UpdateBookDTO } from "../../../models/book";
import app from "../../../app";

export class PostBooksPage extends BooksPage {

  constructor() {
    super()
  }

 async createBook(body: UpdateBookDTO){
    const response =  await supertest(app).post('/api/books').set({'x-api-key': this.xApiKey}).send(body);
    const status = response.statusCode;
    console.log(response.body)
   
    if (!(response.ok || response.badRequest)) {
      throw new Error(`Unexpected status code: ${response.statusCode} on book create.`);
    }
  
    return response;
  }
}
