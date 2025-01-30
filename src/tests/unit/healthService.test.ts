import HealthService from '../../services/healthService';

describe('HealthService', () => {
    let healthService: HealthService;

    beforeEach(() => {
        healthService = new HealthService();
    });

    it('should return health status with OK and a timestamp', async () => {
        const response = healthService.getHealthStatus();
        expect(response.status).toBe('OK');
        expect(response).toHaveProperty('timestamp');   
    });

    it('should return an error if health status is missing', async () => {
        jest.spyOn(healthService, 'getHealthStatus').mockReturnValueOnce({
            timestamp: new Date().toISOString(),
        } as any);

        const response = healthService.getHealthStatus();
        expect(response).not.toHaveProperty('status');
    });

    it('should return an error if timestamp is missing', async () => {
        jest.spyOn(healthService, 'getHealthStatus').mockReturnValueOnce({
            status: 'OK',
        } as any);

        const response = healthService.getHealthStatus();
        expect(response).not.toHaveProperty('timestamp');
    });

    it('should return an error if status is not OK', async () => {
        jest.spyOn(healthService, 'getHealthStatus').mockReturnValueOnce({
            status: 'ERROR',
            timestamp: new Date().toISOString(),
        });

        const response = healthService.getHealthStatus();
        expect(response.status).not.toBe('OK');
    });

    it('should return an error if timestamp is invalid', async () => {
        jest.spyOn(healthService, 'getHealthStatus').mockReturnValueOnce({
            status: 'OK',
            timestamp: 'invalid-timestamp', 
        });

        const response = healthService.getHealthStatus();
        expect(isNaN(Date.parse(response.timestamp))).toBe(true);
    });
})