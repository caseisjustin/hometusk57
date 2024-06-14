import express from 'express';
import { signup, signin, getCurrentUser, refreshToken } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me', authenticate, getCurrentUser);
router.post('/refresh-token', refreshToken);

export default router;
