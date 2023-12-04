import { Router } from 'express';

import { clientRouter } from './client-router';

export const router = Router();

router.use('/client', clientRouter);
