import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BalanceService {
  constructor(private usersService: UsersService) {}

  async getBalance(id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('Invalid user');
    }
    return {
      balance: user.balance,
    };
  }
}
