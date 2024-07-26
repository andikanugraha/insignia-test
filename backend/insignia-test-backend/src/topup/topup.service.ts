import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TopupService {
  constructor(private usersService: UsersService) {}

  async balanceTopup(id: number, amount: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('Invalid user');
    }
    if (isNaN(amount) || amount < 0 || amount > 10000000) {
      throw new BadRequestException('Invalid topup amount');
    }
    user.balance += amount;
    const updateUser = {
      username: user.username,
      password: user.password,
      balance: user.balance,
    };
    return await this.usersService.update(id, updateUser);
  }
}
