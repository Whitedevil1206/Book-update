import express from 'express';
import {
  getSub,
  addSub,
  subBook,
  unsubBook,
  getBooks,
} from '../controllers/subController.js';
import verify from './verifyToken.js';

const router = express.Router();

router.get('/', getSub);
router.post('/add', addSub);
router.post('/addbook/:id', verify, subBook);
router.post('/removebook/:id', verify, unsubBook);
router.get('/allbooks', verify, getBooks);

export default router;
