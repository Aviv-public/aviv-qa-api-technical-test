import supertest from "supertest";

export class BooksPage {
  protected xApiKey = process.env.API_KEY;
  protected host = process.env.host || 'http://localhost:300';
  protected readonly path = '/books'
  protected readonly url = `${this.host}${this.path}`

  
}
