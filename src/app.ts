import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { setBookRoutes } from './routes/bookRoutes';
import { errorHandler } from './middleware/errorHandler';
import { loggerMiddleware } from './utils/logger';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Load Swagger document
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

app.use(express.json());
app.use(loggerMiddleware);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Add a root path handler
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Book Management API',
    endpoints: {
      docs: '/api-docs',
      books: '/api/books',
      health: '/api/health'
    }
  });
});

setBookRoutes(app);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});

export default app;