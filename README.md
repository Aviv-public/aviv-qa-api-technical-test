# Book Management API

A simple REST API for managing books.

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Aviv-public/aviv-qa-api-technical-test.git

    cd aviv-qa-api-technical-test
    ```

2. **Setup environment:**
    ```bash
    cp .env.example .env
    ```
    Configure your .env file with appropriate values:
    ```
    API_KEY=your-secure-api-key-here
    ```

3. **Install dependencies and start:**
    ```bash
    npm install
    npm run start
    ```

The API will be running at `http://localhost:3000`

The API documentation will be available at `http://localhost:3000/api-docs`

## Authentication

All API endpoints (except documentation) require authentication using an API key header:

```bash
x-api-key: default-secure-api-key-2024
```

## API Documentation

The API is documented using Swagger. You can access the interactive documentation at:
- Swagger UI: `http://localhost:3000/api-docs`

![Alt text](/images/swagger.png?raw=true "Swagger UI")

To explore the API:
1. Start the server using `npm start`
2. Open your browser and navigate to `http://localhost:3000/api-docs`
3. Use the Swagger UI to check the endpoints and view request/response schemas

## Available API Endpoints

The API provides the following endpoints:

- GET / - Welcome page
- GET /api/books - List all books
- POST /api/books - Create a new book
- GET /api/books/:id - Get a book by ID
- PUT /api/books/:id - Update a book
- FETCH /api/books/:id - Fetch a book
- DELETE /api/books/:id - Delete a book

Note: All /api/* endpoints require authentication via x-api-key header.

## Running Tests

To run the tests, use the following command:
```bash
npm test
```

## Submitting Tests
QA Engineers, responsible for ensuring the quality and functionality of the API, should follow test automation best practices including:

1. **Page Object Pattern**
   - Create separate classes for each API endpoint
   - Encapsulate API calls and assertions
   - Maintain clean separation of concerns

2. **Data-Driven Testing**
   - Use test data providers
   - Cover multiple scenarios and edge cases
   - Include both valid and invalid test cases

3. **Test Flow Requirements**
   - Implement end-to-end flows (e.g., CRUD operations)
   - Chain API calls using previous responses:
     ```typescript
     // Example flow
     const book = await createBook(testData);
     const retrieved = await getBook(book.id);
     const updated = await updateBook(book.id, newData);
     await deleteBook(book.id);
     ```
   - Validate response schemas and status codes

4. **Coverage Requirements**
   - Cover all endpoints in the API
   - Include positive and negative scenarios

5. **Technical Stack** (Optional)
   - Language: TypeScript
   - Test Framework: Jest
   - API Testing Libraries:
     - `supertest` - HTTP assertions
     - `@faker-js/faker` - Test data generation
     - `joi` - Schema validation

## Contributing

1. **Fork the repository:**
    Go to the repository on GitHub and click the "Fork" button to create a copy of the repository in your own GitHub account.

2. **Clone your forked repository:**
    ```bash
    git clone https://github.com/username/aviv-qa-api-technical-test.git
    cd aviv-qa-api-technical-test
    ```

3. **Create a new branch:**
    ```bash
    git checkout -b test-branch-name
    ```

4. **Add your test cases:**
    Add your test cases in the `tests` directory.

5. **Commit your changes:**
    ```bash
    git add .
    git commit -m "Add test cases"
    ```

6. **Create a GitHub Actions workflow:**
    In the root of your repository, create a directory named `.github/workflows` if it doesn't already exist. Inside this directory, create a file named `ci.yml`.
7. **Push your branch:**
    ```bash
    git push origin test-branch-name
    ```

8. **Create a pull request:**
    Go to the repository on GitHub and create a pull request to merge your test branch into the main branch.

## License

This project is licensed under the MIT License.
