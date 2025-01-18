import request from 'supertest';
import app from '../../../app';
import dotenv from 'dotenv';

dotenv.config();

/**
 * API Positive Test Cases Suite
 *
 * This suite contains test cases that validate the successful behavior of the API.
 * It verifies the correct handling of typical use cases, ensuring the API behaves as expected
 * when valid input is provided for the various book-related endpoints.
 */
describe('API Positive Test Cases', () => {
  // API Key setup from environment variables
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error('API_KEY is not defined in the environment variables');
  }

  let createdBookId: number | null = null;

  /**
   * Set up a temporary book entry before the tests begin.
   * This book's ID will be used in certain tests to check fetching, updating, and deleting a specific book.
   */
  beforeAll(async () => {
    const response = await request(app)
      .post('/api/books')
      .set('x-api-key', apiKey)
      .send({
        title: 'Temporary Book',
        author: 'Temporary Author',
        publishedDate: '2025-01-01',
      });
    createdBookId = response.body.id;
  });

  /**
   * Clean up by deleting the temporary book after tests are completed.
   */
  afterAll(async () => {
    if (createdBookId) {
      await request(app).delete(`/api/books/${createdBookId}`).set('x-api-key', apiKey);
      createdBookId = null;
    }
  });

  /**
   * Helper function to make HTTP requests with different methods (GET, POST, PUT, DELETE).
   * It automatically includes the necessary API key in the request headers.
   */
  const makeRequest = async (method: 'get' | 'post' | 'put' | 'delete', endpoint: string, payload: any) => {
    if (method === 'get' || method === 'delete') {
      return request(app)[method](endpoint).set('x-api-key', apiKey);
    } else {
      return request(app)[method](endpoint).set('x-api-key', apiKey).send(payload);
    }
  };

  /**
   * Test cases that validate the expected positive responses from the API.
   */
  const positiveTestCases = [
    {
      description: 'should create a new book successfully',
      method: 'post',
      endpoint: '/api/books',
      payload: {
        title: 'New Book',
        author: 'Author Name',
        publishedDate: '2025-01-17',
      },
      expectedStatus: 201,
      validate: (response: any) => {
        expect(response.body).toHaveProperty('id');
      },
    },
    {
      description: 'should fetch all books successfully',
      method: 'get',
      endpoint: '/api/books',
      payload: null,
      expectedStatus: 200,
      validate: (response: any) => {
        expect(Array.isArray(response.body)).toBe(true);
      },
    },
    {
      description: 'should fetch a specific book by ID',
      method: 'get',
      endpoint: () => createdBookId ? `/api/books/${createdBookId}` : '',
      payload: null,
      expectedStatus: 200,
      validate: (response: any) => {
        expect(response.body).toHaveProperty('id', createdBookId);
        expect(response.body).toHaveProperty('title', 'Temporary Book');
      },
    },
    {
      description: 'should update a book by ID successfully',
      method: 'put',
      endpoint: () => createdBookId ? `/api/books/${createdBookId}` : '',
      payload: {
        title: 'Updated Title',
        author: 'Updated Author',
        publishedDate: '2025-02-01',
      },
      expectedStatus: 200,
      validate: (response: any) => {
        expect(response.body).toHaveProperty('title', 'Updated Title');
      },
    },
    {
      description: 'should delete a book by ID successfully',
      method: 'delete',
      endpoint: () => createdBookId ? `/api/books/${createdBookId}` : '',
      payload: null,
      expectedStatus: 204,
      validate: (response: any) => {
        expect(response.body).toEqual({});
      },
    },
  ];

  /**
   * Executes each positive test case to ensure that the expected status code and response properties
   * match the intended behavior of the API.
   */
  positiveTestCases.forEach(({ description, method, endpoint, payload, expectedStatus, validate }) => {
    it(description, async () => {
      const endpointUrl = typeof endpoint === 'function' ? endpoint() : endpoint;
      if (!endpointUrl) {
        throw new Error('Endpoint URL is not defined. Ensure createdBookId is set before running this test.');
      }
      const response = await makeRequest(method as 'get' | 'post' | 'put' | 'delete', endpointUrl, payload);
      expect(response.statusCode).toBe(expectedStatus);
      validate(response);
    });
  });
});
