import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schema/user.schema';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(userDto: CreateUserDTO, pass: string ): Promise<{ access_token: string }> {
    const user = await this.usersService.findUser(userDto.email);
    if (userDto?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: userDto.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}