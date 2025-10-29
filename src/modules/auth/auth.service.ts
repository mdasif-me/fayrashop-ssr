import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { IAuthResponse, ITokenPayload } from './interface';
import { IUserResponse } from '../users/interface/user.interface';
import { InvalidInputException } from '../../errors/custom';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<IAuthResponse> {
    const user = await this.usersService.create(registerDto);
    const tokens = await this.generateTokens(user);

    return {
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }

  async login(loginDto: LoginDto): Promise<IAuthResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new InvalidInputException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user);

    // update last login date
    await this.usersService.update(user.id, {
      lastLoginAt: new Date(),
    });

    return {
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<IUserResponse | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.usersService.comparePassword(
      password,
      user.password_hash,
    );

    if (!isPasswordValid) {
      return null;
    }

    // remove hash password before returning
    const { password_hash, ...userWithoutPassword } = user;
    console.info('password_hash', password_hash);

    return userWithoutPassword as IUserResponse;
  }

  async generateTokens(user: IUserResponse): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload: ITokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role?.name,
    };

    const secret =
      this.configService.get<string>('app.jwt.secret') || 'default-secret';
    const refreshSecret =
      this.configService.get<string>('app.jwt.refreshSecret') ||
      'default-refresh-secret';

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret,
        expiresIn: '7d',
      }),
      this.jwtService.signAsync(payload, {
        secret: refreshSecret,
        expiresIn: '30d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const secret =
        this.configService.get<string>('app.jwt.refreshSecret') ||
        'default-refresh-secret';
      const payload = await this.jwtService.verifyAsync<ITokenPayload>(
        refreshToken,
        { secret },
      );

      const user = await this.usersService.findById(payload.sub);
      return this.generateTokens(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new InvalidInputException('Invalid refresh token');
    }
  }
}
