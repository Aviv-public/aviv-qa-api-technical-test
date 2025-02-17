import supertest from "supertest";
import { BooksPage } from "./page";
import { Book, UpdateBookDTO } from "../../../models/book";
import app from "../../../app";

export class HealthPage extends BooksPage {

  constructor() {
    super()
  }

 async getHealthCheck(){
    const response =  await supertest(app).get(`/api/health`).set({'x-api-key': this.xApiKey});

    if (!response.ok) {
      throw new Error(`Unexpected status code: ${response.statusCode} on book get.`);
    }
  
    return response;
  }
}
