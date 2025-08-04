import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/home', authenticate, (req, res) => {
  res.status(200).json({ message: `Welcome, user ${req.userId}` });
});

export default router;
