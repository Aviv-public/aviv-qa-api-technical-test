import supertest from "supertest";
import { Response } from "supertest";

const BASE_URL = process.env.BASE_URL || '';
const API_KEY = process.env.API_KEY || '';

if (!BASE_URL) {
    throw new Error('BASE_URL is not set');
}

if (!API_KEY) {
    throw new Error('API_KEY is not set');
}

const healthRoute = '/api/health';

export class HealthApi {
    static async getHealth(apiKey: string = API_KEY): Promise<Response> {
        return supertest(BASE_URL)
            .get(healthRoute)
            .set('x-api-key', apiKey).send();
    }
}