# Book Management API

This project is a Book Management API that allows users to manage a collection of books. It provides endpoints to create, read, update, and delete books.

## Installation

To install and run the API, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/mnabil/book-management-api.git
    cd book-management-api
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

The API will be running at `http://localhost:3000`.

## API Documentation

The API is documented using Swagger. You can access the interactive documentation at:
- Swagger UI: `http://localhost:3000/api-docs`

To explore the API:
1. Start the server using `npm start`
2. Open your browser and navigate to `http://localhost:3000/api-docs`
3. Use the Swagger UI to check the endpoints and view request/response schemas

## API Endpoints

- `GET /books` - Retrieve a list of all books
- `GET /books/:id` - Retrieve a single book by ID
- `POST /books` - Create a new book
- `PUT /books/:id` - Update a book by ID
- `DELETE /books/:id` - Delete a book by ID
- `GET /health` - Check the health of the API


## Running Tests

To run the tests, use the following command:
```bash
npm test
```

## Submitting Tests
QA Engineers, responsible for ensuring the quality and functionality of the API, can submit their test cases by following these steps:

1. **Fork the repository:**
    Go to the repository on GitHub and click the "Fork" button to create a copy of the repository in your own GitHub account.

2. **Clone your forked repository:**
    ```bash
    git clone https://github.com/your-username/book-management-api.git
    cd book-management-api
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