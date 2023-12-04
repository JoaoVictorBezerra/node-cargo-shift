import { Router } from 'express';

import { clientRouter } from './client-router';
import { containerRouter } from './container-router';

export const router = Router();

router.use('/client', clientRouter);
router.use('/container', containerRouter);
