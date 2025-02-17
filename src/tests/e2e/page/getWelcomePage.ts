import supertest from "supertest";
import { BooksPage } from "./page";
import { Book, UpdateBookDTO } from "../../../models/book";
import app from "../../../app";

export class GetWelcomePage extends BooksPage {

  constructor() {
    super()
  }

 async getWelcome(){
    const response =  await supertest(app).get(`/`).set({'x-api-key': this.xApiKey});

    if (!response.ok) {
      throw new Error(`Unexpected status code: ${response.statusCode} on Welcome get.`);
    }

    return response;
  }
}
