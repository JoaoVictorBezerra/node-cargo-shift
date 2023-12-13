import { AuthController } from './../controller/auth-controller';
import { Router } from 'express';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth-service';
import { AuthRepository } from '../repositories';

const authRouter = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRouter.post('/', async (req: Request, res: Response) => {
  return await authController.login(req, res);
});

export { authRouter };
