import { Router } from 'express';
import BookController from '../controllers/bookController';
import HealthController from '../controllers/healthController';
import { validateBook } from '../middleware/validator';

const router = Router();
const bookController = new BookController();
const healthController = new HealthController();

// Health route
router.get('/health', healthController.checkHealth);

// Book routes
router.post('/books', bookController.createBook);
router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.getBookById);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

export const setBookRoutes = (app: any) => {
    app.use('/api', router);
};