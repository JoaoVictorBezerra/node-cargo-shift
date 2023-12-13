import jwt from 'jsonwebtoken';
import { UserLoginRequestDTO } from '../entities/user';

export class JWTService {
  generateToken(payload: { role: string; id: string }): string {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });
  }

  validateToken(token: string): UserLoginRequestDTO | null {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET,
      ) as UserLoginRequestDTO;
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
