
import { Router } from 'express';
import { usersRoutes } from './userRoutes.js';
import { thoughtsRouter } from './thoughtRoutes.js';

const router = Router();

router.use('/users', usersRoutes);
router.use('/thoughts', thoughtsRouter);

export default router;
