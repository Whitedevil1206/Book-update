import express from 'express';
import {
  getUsers,
  createUser,
  deleteUser,
  registerUser,
  loginUser,
} from '../controllers/userControllers.js';
const router = express.Router();

router.get('/', getUsers);
router.post('/create', createUser);
router.post('/deleteUser/:id', deleteUser);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
