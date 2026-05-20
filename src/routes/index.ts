import { Router } from 'express';
import healthRouter from '@/routes/health.routes.js';
import usersRouter from '@/routes/users.routes.js';

const router = Router();

router.use('/health', healthRouter);
router.use('/users', usersRouter);

export default router;
