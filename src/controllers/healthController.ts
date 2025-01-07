import { Request, Response } from 'express';

interface HealthResponse {
  status: string;
  timestamp: string;
}

class HealthController {
    checkHealth(req: Request, res: Response) {
        res.status(200).json({
            status: 'OK',
            timestamp: new Date().toISOString()
        });
    }
}

export const getHealth = async (req: Request, res: Response): Promise<void> => {
  const healthResponse: HealthResponse = {
    status: 'OK',
    timestamp: new Date().toISOString()
  };

  res.status(200).json(healthResponse);
};

export default HealthController;