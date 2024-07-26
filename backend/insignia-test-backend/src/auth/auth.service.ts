import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException(`User ${username} not found`);
    }
    const match = await bcrypt.compare(pass, user?.password);
    if (!match) {
      throw new UnauthorizedException();
    }

    // const { password, ...result } = user;
    const payload = {
      sub: user.id,
      username: user.username,
    };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
