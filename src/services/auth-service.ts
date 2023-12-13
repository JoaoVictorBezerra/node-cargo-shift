import { UserLoginRequestDTO, UserLoginResponseDTO } from '../entities/user';
import { AuthRepository } from '../repositories';
import { BusinessException } from '../exceptions';
import { HttpStatusCode } from '../constants';
import { JWTService } from '.';

export class AuthService {
  protected authRepository: AuthRepository;
  protected jwtService: JWTService;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
    this.jwtService = new JWTService();
  }

  async login(payload: UserLoginRequestDTO) {
    const user: UserLoginResponseDTO = await this.authRepository.login(payload);

    if (!user) {
      throw new BusinessException(HttpStatusCode.BAD_REQUEST, 'User not found');
    }

    const userInfos: UserLoginResponseDTO = {
      ...user,
      token: this.jwtService.generateToken({ role: user.role, id: user.id }),
    };

    return userInfos;
  }
}
