import { DeleteBookPage } from "./page/deleteBookPage";
import { GetBookPage } from "./page/getBookPage";
import { GetBooksPage } from "./page/getBooksPage";
import { PatchBookPage } from "./page/patchBookPage";
import { PostBooksPage } from "./page/postBooksPage";
import { PutBookPage } from "./page/putBookPage";
import VALIDATE_BOOK_DATA_FILE from "./fixtures/validateBookData.json"
import { HealthPage } from "./page/getHealth";


describe('Data driven test - negative scenarios', () => {
    let getBooksPage: GetBooksPage;
    let postBookPage: PostBooksPage;
    let getBookPage: GetBookPage;
    let deleteBookPage: DeleteBookPage;
    let patchBookPage: PatchBookPage;
    let putBookPage: PutBookPage;
    let getHealthPage: HealthPage;
   
    beforeAll(async () => {
        getBooksPage = new GetBooksPage();
        postBookPage = new PostBooksPage();
        getBookPage = new GetBookPage();
        deleteBookPage = new DeleteBookPage();
        patchBookPage = new PatchBookPage();
        putBookPage = new PutBookPage();
        getHealthPage = new HealthPage();
        let healthCheck = await getHealthPage.getHealthCheck();
        expect(healthCheck.statusCode).toBe(200);
    })

    test.each(VALIDATE_BOOK_DATA_FILE)('Validate book tests', async(testData) => {
        const response = await postBookPage.createBook(testData.body);
        expect(response.statusCode).toBe(testData.status)
        expect(response.body.error).toBe(testData.message);
    })
})