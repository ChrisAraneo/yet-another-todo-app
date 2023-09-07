import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Tokens } from '../models/tokens.type';
import { UserDetails } from '../models/user-details.type';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private accessTokenOptions: JwtSignOptions;
  private refreshTokenOptions: JwtSignOptions;

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.initializeAccessTokenOptions();
    this.initializeRefreshTokenOptions();
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findUser(username);

    if (
      !!user &&
      !!password &&
      (await bcrypt.compare(password, user.passwordHash))
    ) {
      return { id: user.id, name: user.name, username: user.username };
    }

    return null;
  }

  async login(user: UserDetails): Promise<Tokens> {
    const { accessToken, refreshToken } = this.generateTokens(
      user.id,
      user.username,
      user.name,
    );

    await this.updateRefreshToken(user.username, refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(refreshToken: string): Promise<Tokens> {
    const payload: any = this.jwtService.decode(refreshToken);
    const user:
      | (UserDetails & { passwordHash: string; refreshTokenHash: string }) // TODO Type
      | undefined = await this.userService.findUser(payload?.username);

    if (!user) {
      throw Error(
        `User with username provided in payload does not exist (${payload?.username}).`,
      );
    }

    if (!(await bcrypt.compare(refreshToken, user?.refreshTokenHash))) {
      throw Error('Invalid refresh token.');
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      this.generateTokens(user.id, user.username, user.name);

    await this.updateRefreshToken(user.username, newRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  private initializeAccessTokenOptions(): void {
    this.accessTokenOptions = {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
    };
  }

  private initializeRefreshTokenOptions(): void {
    this.refreshTokenOptions = {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
    };
  }

  private generateTokens(
    userId: string,
    username: string,
    name: string,
  ): Tokens {
    const payload = { id: userId, username: username, name: name };
    const accessToken = this.jwtService.sign(payload, this.accessTokenOptions);
    const refreshToken = this.jwtService.sign(
      payload,
      this.refreshTokenOptions,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshToken(
    username: string,
    refreshToken: string,
  ): Promise<UserDetails | null> {
    return this.userService.updateRefreshToken(username, refreshToken);
  }
}
