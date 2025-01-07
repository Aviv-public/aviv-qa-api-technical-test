import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { setBookRoutes } from './routes/bookRoutes';
import { errorHandler } from './middleware/errorHandler';
import { loggerMiddleware } from './utils/logger';
import { authMiddleware } from './middleware/auth';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Load Swagger document
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(loggerMiddleware);
        this.app.use('/api', authMiddleware);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.use(errorHandler); // Move error handler here
    }

    private routes(): void {
        setBookRoutes(this.app); // Use the setup function instead of direct router usage

        this.app.get('/', (req, res) => {
            res.json({
                message: 'Welcome to Book Management API',
                endpoints: {
                    docs: '/api-docs',
                    books: '/api/books',
                    health: '/api/health'
                }
            });
        });
    }

    public getApp(): Express {
        return this.app;
    }
}

const app = new App().getApp();
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});

export default app;