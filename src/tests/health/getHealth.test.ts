import { HealthApi } from '../api/HealthApi';
import { UNAUTHORIZED_INVALID_KEY } from '../messages';
import { healthSchema } from '../schemas/healthSchema';

describe('[GET] /api/health', () => {
    it('should return 200 and a valid health response with a valid API key', async () => {
        const response = await HealthApi.getHealth();
        expect(response.status).toBe(200);

        const { error } = healthSchema.validate(response.body);
        expect(error).toBeUndefined();
    });

    it('should return 401 if API key is missing', async () => {
        const response = await HealthApi.getHealth('');
        expect(response.status).toBe(401);
        expect(response.body.error).toBe(UNAUTHORIZED_INVALID_KEY);
    });

    it('should return 401 if the API key is invalid', async () => {
        const response = await HealthApi.getHealth('invalid-key-123');
        expect(response.status).toBe(401);
        expect(response.body.error).toBe(UNAUTHORIZED_INVALID_KEY);
    });
});
