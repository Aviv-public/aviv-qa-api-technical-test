import supertest from "supertest";
import { BooksPage } from "./page";
import { Book, UpdateBookDTO } from "../../../models/book";
import app from "../../../app";

export class PatchBookPage extends BooksPage {

  constructor() {
    super()
  }

 async patchBook(id: number, body: {[index:string]: string}){
    const response =  await await supertest(app).patch(`/api/books/${id}`).set({'x-api-key': this.xApiKey}).send(body)

    if (!(response.ok || response.notFound || response.badRequest)) {
      throw new Error(`Unexpected status code: ${response.statusCode} on book patch.`);
    }
  
    return response;
  }
}
