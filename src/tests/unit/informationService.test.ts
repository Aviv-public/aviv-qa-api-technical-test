import InformationService from '../../services/informationService';
import { validateInformationSchema } from '../../utils/informationSchema';

describe('InformationService', () => {
    let informationService: InformationService;

    beforeEach(() => {
        informationService = new InformationService();
    });

    it('should return message and endpoints', async () => {
        const response = informationService.getApiInformation();
        expect(response.message).toBe('Welcome to Book Management API');
        expect(response.endpoints.books).toBe('/api/books');
        expect(response.endpoints.health).toBe('/api/health');
    });

    it('should return information matching the schema', () => {
        const response = informationService.getApiInformation();
        validateInformationSchema(response);
    });

    it('should fail validation when message is missing', () => {
        const invalidResponse = {
            endpoints: { books: '/api/books', health: '/api/health' }
        };

        expect(() => validateInformationSchema(invalidResponse)).toThrow();
    });

    it('should fail validation when endpoints are missing', () => {
        const invalidResponse = { message: 'Welcome to Book Management API' };

        expect(() => validateInformationSchema(invalidResponse)).toThrow();
    });

    it('should fail validation when books and health are invalid', () => {
        const invalidResponse = {
            message: 'Welcome to Book Management API',
            endpoints: { books: 'invalid_path', health: 'invalid_path' }
        };

        expect(() => validateInformationSchema(invalidResponse)).toThrow();
    });

    it('should fail validation when response is null', () => {
        expect(() => validateInformationSchema(null)).toThrow();
    });

    it('should fail validation when response is an empty object', () => {
        expect(() => validateInformationSchema({})).toThrow();
    });
})