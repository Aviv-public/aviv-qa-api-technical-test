import { faker } from '@faker-js/faker';
import { UpdateBookDTO } from "../../models/book";
import { GetBookPage } from "./page/getBookPage";
import { GetBooksPage  } from "./page/getBooksPage";
import { PostBooksPage } from "./page/postBooksPage";
import { DeleteBookPage } from './page/deleteBookPage';
import { PutBookPage } from './page/putBookPage';
import { PatchBookPage } from './page/patchBookPage';
import { HealthPage } from './page/getHealth';


describe('E2E tests', ()=>{
    let getBooksPage: GetBooksPage;
    let postBookPage: PostBooksPage;
    let getBookPage: GetBookPage;
    let deleteBookPage: DeleteBookPage;
    let patchBookPage: PatchBookPage;
    let putBookPage: PutBookPage;
    let getHealthPage: HealthPage;

     

    beforeEach(async () => {
        getBooksPage = new GetBooksPage();
        postBookPage = new PostBooksPage();
        getBookPage = new GetBookPage();
        deleteBookPage = new DeleteBookPage();
        patchBookPage = new PatchBookPage();
        putBookPage = new PutBookPage();
        getHealthPage = new HealthPage();
        let healthCheck = await getHealthPage.getHealthCheck();
        expect(healthCheck.statusCode).toBe(200);
    });


    test('e2e create flow', async () => {
        const payload: UpdateBookDTO = {
            "title":  faker.book.title(),
            "author": faker.book.author(),
            "publishedDate": faker.date.past().toISOString()
          }
        let createResponse = await postBookPage.createBook(payload);
        expect(createResponse.body.title).toEqual(payload.title);
        expect(createResponse.body.author).toEqual(payload.author);
        expect(createResponse.body.publishedDate).toEqual(payload.publishedDate);
        expect(createResponse.body.id).toBeTruthy();
        
        let getBookResponse = await getBookPage.getBook(createResponse.body.id);
        expect(getBookResponse.body.title).toEqual(payload.title);
        expect(getBookResponse.body.author).toEqual(payload.author);
        expect(getBookResponse.body.publishedDate).toEqual(payload.publishedDate);
        expect(getBookResponse.body.id).toEqual(createResponse.body.id);

        let getBooksReponse = await getBooksPage.getAllBooks();
        // expect(getBooksReponse).toContain(createResponse.body.id);
        let getSingleBookFromList = getBooksPage.getSingleBookByIdFromAll(getBooksReponse.body, createResponse.body.id);
        expect(getSingleBookFromList?.title).toEqual(payload.title);
        expect(getSingleBookFromList?.author).toEqual(payload.author);
        expect(getSingleBookFromList?.publishedDate).toEqual(payload.publishedDate);
        expect(getSingleBookFromList?.id).toEqual(createResponse.body.id);

    })

    test('e2e put flow', async () => {
        const payload: UpdateBookDTO = {
            "title":  faker.book.title(),
            "author": faker.book.author(),
            "publishedDate": faker.date.past().toISOString()
          }
        let createResponse = await postBookPage.createBook(payload);
        expect(createResponse.body.id).toBeTruthy();

        const newPayload: UpdateBookDTO = {
            "title":  faker.book.title(),
            "author": faker.book.author(),
            "publishedDate": faker.date.past().toISOString()
          }

        let putResponse = await putBookPage.putBook(createResponse.body.id, newPayload);
        expect(newPayload.title).toEqual(putResponse.body.title);
        expect(newPayload.author).toEqual(putResponse.body.author);
        expect(newPayload.publishedDate).toEqual(putResponse.body.publishedDate);
        expect(createResponse.body.id).toBe(putResponse.body.id);
    })

    test('e2e patch flow', async () => {
        let patchResponse;

        const payload: UpdateBookDTO = {
            "title":  faker.book.title(),
            "author": faker.book.author(),
            "publishedDate": faker.date.past().toISOString()
          }
        let createResponse = await postBookPage.createBook(payload);
        expect(createResponse.body.id).toBeTruthy();
        const newTitle = faker.book.title();
        patchResponse = await patchBookPage.patchBook(createResponse.body.id, {title: newTitle});
        expect(patchResponse.body.title).toBe(newTitle);
        expect(patchResponse.body.author).toBe(payload.author);
        expect(patchResponse.body.publishedDate).toBe(payload.publishedDate);

        const newAuthor = faker.book.author();
        patchResponse = await patchBookPage.patchBook(createResponse.body.id, {author: newAuthor});
        expect(patchResponse.body.title).toBe(newTitle);
        expect(patchResponse.body.author).toBe(newAuthor);
        expect(patchResponse.body.publishedDate).toBe(payload.publishedDate);
        
        const newPublishedDate = faker.date.past().toISOString();
        patchResponse = await patchBookPage.patchBook(createResponse.body.id, {publishedDate: newPublishedDate});
        expect(patchResponse.body.title).toBe(newTitle);
        expect(patchResponse.body.author).toBe(newAuthor);
        expect(patchResponse.body.publishedDate).toBe(newPublishedDate);

    })

    test('e2e delete flow', async () => {
        const payload: UpdateBookDTO = {
            "title":  faker.book.title(),
            "author": faker.book.author(),
            "publishedDate": faker.date.past().toISOString()
          }
        let createResponse = await postBookPage.createBook(payload);
        expect(createResponse.body.id).toBeTruthy();
        let deleteResponse = await deleteBookPage.deleteBook(createResponse.body.id);
        expect(deleteResponse).toEqual(204);
        let getBookResponse = await getBookPage.getBook(createResponse.body.id);
        expect(getBookResponse.body.message).toBe("Book not found");
    })

    test('HEALTH CHECK', async () => {
      let response = await getHealthPage.getHealthCheck();
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('OK');
    })
})