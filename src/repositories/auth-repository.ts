import { UserLoginRequestDTO } from '../entities/user';
import { prismaClient } from '../lib/prisma';
import { UserLoginResponseDTO } from '../entities/user';

export class AuthRepository {
  async login(payload: UserLoginRequestDTO): Promise<UserLoginResponseDTO> {
    const user = await prismaClient.user.findFirst({
      where: {
        name: payload.name,
        password: payload.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: false,
      },
    });
    return user as UserLoginResponseDTO;
  }
}
