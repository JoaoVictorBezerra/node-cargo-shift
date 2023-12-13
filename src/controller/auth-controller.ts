import { Request, Response } from 'express';
import { BusinessException } from '../exceptions';
import { HttpStatusCode } from '../constants';
import { LoginSchema } from '../helpers/validations';
import { UserLoginRequestDTO } from '../entities/user';
import { verifyExtraFields } from '../helpers';
import { AuthService } from '../services';
import { ZodError } from 'zod';

export class AuthController {
  protected authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async login(req: Request, res: Response) {
    try {
      const payload: UserLoginRequestDTO = req.body;

      const loginSchema = LoginSchema();

      const extraFields: string[] = verifyExtraFields(payload, loginSchema);

      if (extraFields.length > 0) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          error: `Extra fields: ${extraFields.join(', ')}`,
        });
      }

      await loginSchema.parseAsync(payload);

      const user = await this.authService.login(payload);

      return res.status(HttpStatusCode.OK).json(user);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          error: error.errors[0].message,
        });
      }
      if (error instanceof BusinessException) {
        return res.status(error.statusCode).json({ error: error.message });
      } else {
        return res
          .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ error: 'Internal Server Error' });
      }
    }
  }
}
