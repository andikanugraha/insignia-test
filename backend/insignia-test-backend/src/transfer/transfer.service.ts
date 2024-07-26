import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TransactionsService } from 'src/transactions/transactions.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TransferService {
  constructor(
    private usersService: UsersService,
    private transactionsService: TransactionsService,
  ) {}

  async transfer(fromId: number, toUsername: string, amount: number) {
    const fromUser = await this.usersService.findOne(fromId);
    if (!fromUser) {
      throw new NotFoundException('Invalid user');
    }
    if (!toUsername) {
      throw new NotFoundException('Destination user not found');
    }
    const toUser = await this.usersService.findOneByUsername(toUsername);
    if (!toUser) {
      throw new NotFoundException('Destination user not found');
    }
    if (fromUser.id === toUser.id) {
      throw new BadRequestException('Invalid destination');
    }
    if (isNaN(amount) || amount < 0 || amount > 10000000) {
      throw new BadRequestException('Invalid topup amount');
    }
    fromUser.balance -= amount;
    if (fromUser.balance < 0) {
      throw new BadRequestException('Insufficient balance');
    }
    toUser.balance += amount;

    const updateFromUser = {
      username: fromUser.username,
      password: fromUser.password,
      balance: fromUser.balance,
    };
    await this.usersService.update(fromUser.id, updateFromUser);

    const updateToUser = {
      username: toUser.username,
      password: toUser.password,
      balance: toUser.balance,
    };
    await this.usersService.update(toUser.id, updateToUser);

    const createTransaction = {
      fromId: fromUser.id,
      toId: toUser.id,
      amount,
    };
    return await this.transactionsService.create(createTransaction);
  }
}
