import express, { Router } from 'express';
import { register, login, logout, getCurrentUser } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';

const router: Router = Router();

router.post('/register', register as express.RequestHandler);
router.post('/login', login as express.RequestHandler);
router.post('/logout', logout as express.RequestHandler);
router.get('/me', protect as express.RequestHandler, getCurrentUser as express.RequestHandler);

export default router;
