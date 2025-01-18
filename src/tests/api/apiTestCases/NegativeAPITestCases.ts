import request from 'supertest';
import app from '../../../app';
import dotenv from 'dotenv';

dotenv.config();

/**
 * API Negative Test Cases Suite
 *
 * This suite contains test cases to validate the behavior of the API when given invalid input or when certain
 * conditions are not met. Each test case checks if the API handles edge cases and errors appropriately.
 */
describe('API Negative Test Cases', () => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    throw new Error('API_KEY is not defined in the environment variables');
  }

  let createdBookId: number;

  /**
   * Set up a temporary book for testing purposes before all tests run.
   * This book is created by sending a POST request to the API and the response body is used
   * to retrieve the created book's ID, which is later used in test cases.
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
   * Clean up after all tests by deleting the created book, ensuring no data is left in the system.
   */
  afterAll(async () => {
    if (createdBookId) {
      await request(app).delete(`/api/books/${createdBookId}`).set('x-api-key', apiKey);
    }
  });

  /**
   * Helper function to make requests to the API with different HTTP methods (GET, POST, PUT, DELETE).
   * The function sets the necessary headers, including the API key, and sends the request with optional
   * payload and headers as parameters.
   *
   * @param method The HTTP method to use for the request ('get', 'post', 'put', 'delete').
   * @param endpoint The API endpoint to send the request to.
   * @param payload The data to send in the body of the request (only used for POST and PUT requests).
   * @param headers The optional headers to include in the request (default is an empty object).
   *
   * @returns The response from the API.
   */
  const makeRequest = async (method: 'get' | 'post' | 'put' | 'delete', endpoint: string, payload: any, headers: any = {}) => {
    if (method === 'get' || method === 'delete') {
      return request(app)[method](endpoint).set('x-api-key', apiKey).set(headers);
    } else {
      return request(app)[method](endpoint).set('x-api-key', apiKey).set(headers).send(payload);
    }
  };

  /**
   * Defines a collection of negative test cases that validate error handling and incorrect inputs.
   * Each test case checks if the API responds with the correct error code and error message.
   */
  const negativeTestCases = [
    {
      description: 'should return 400 when required fields are missing',
      method: 'post',
      endpoint: '/api/books',
      payload: { title: 'Incomplete Book' },
      expectedStatus: 400,
      validate: (response: any) => {
        expect(response.body).toHaveProperty('error', 'Author is required and must be a string');
      },
    },
    {
      description: 'should return 404 for a non-existent book ID',
      method: 'get',
      endpoint: '/api/books/99999',
      payload: null,
      expectedStatus: 404,
      validate: (response: any) => {
        expect(response.body).toHaveProperty('message', 'Book not found');
      },
    },
    {
      description: 'should return 401 for missing or invalid API key',
      method: 'get',
      endpoint: '/api/books',
      payload: null,
      headers: { 'x-api-key': 'invalid-api-key' },
      expectedStatus: 401,
      validate: (response: any) => {
        expect(response.body).toHaveProperty('error', 'Unauthorized - Invalid API key');
      },
    },
    {
      description: 'should return 400 for invalid data format',
      method: 'post',
      endpoint: '/api/books',
      payload: {
        title: 12345, 
        author: true, 
        publishedDate: 'not-a-date',
      },
      expectedStatus: 400,
      validate: (response: any) => {
        expect(response.body).toHaveProperty('error');
      },
    },
  ];

  /**
   * Executes all the defined negative test cases by looping through each one and performing the specified
   * HTTP request, validating the status code and response.
   */
  negativeTestCases.forEach(({ description, method, endpoint, payload, headers, expectedStatus, validate }) => {
    it(description, async () => {
      const response = await makeRequest(method as 'get' | 'post' | 'put' | 'delete', endpoint, payload, headers);
      expect(response.statusCode).toBe(expectedStatus);
      validate(response);
    });
  });
});
