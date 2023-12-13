import { Router } from 'express';

import { clientRouter } from './client-router';
import { containerRouter } from './container-router';
import { authRouter } from './auth-router';

export const router = Router();

router.use('/client', clientRouter);
router.use('/container', containerRouter);
router.use('/auth', authRouter);
