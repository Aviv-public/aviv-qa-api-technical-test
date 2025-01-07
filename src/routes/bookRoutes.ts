import { Router, Application } from 'express';
import BookController from '../controllers/bookController';
import HealthController from '../controllers/healthController';
import { validateBook, validatePatchBook, validatePutBook } from '../middleware/validator';

const router = Router();
const bookController = new BookController();
const healthController = new HealthController();

// Health route
router.get('/health', healthController.checkHealth);

// Book routes
router.post('/books', validateBook, bookController.createBook);
router.get('/books', bookController.getBooks);
router.get('/books/:id', bookController.getBookById);
router.put('/books/:id', validatePutBook, bookController.updateBook);
router.patch('/books/:id', validatePatchBook, bookController.patchBook);
router.delete('/books/:id', bookController.deleteBook);

export const setBookRoutes = (app: Application): void => {
    app.use('/api', router);
};

export default router;