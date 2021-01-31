import express from 'express';
import {
  getBooks,
  addBook,
  writeReview,
} from '../controllers/bookController.js';
import verify from './verifyToken.js';

const router = express.Router();

router.get('/', getBooks);
router.post('/add', verify, addBook);
router.post('/review/:id', verify, writeReview);

export default router;
