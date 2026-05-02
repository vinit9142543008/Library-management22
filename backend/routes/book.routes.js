import express from 'express';
import { getBooks,addBooks,updateBooks,deleteBooks } from '../controllers/book.controllers.js';

const router = express.Router();

router.get('/', getBooks);
router.post('/', addBooks);
router.put('/:id', updateBooks);
router.delete('/:id', deleteBooks);

export default router;