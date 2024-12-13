class HealthController {
    checkHealth(req: import('express').Request, res: import('express').Response) {
        res.status(200).json({ status: 'UP' });
    }
}

export default HealthController;