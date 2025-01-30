import { Health } from '../models/health';

class HealthService {
    private health: Health[] = [];

    public getHealthStatus(): Health {
        return {
            status: 'OK',
            timestamp: new Date().toISOString(),
        };
    }

}

export default HealthService;