import { Transaction, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionEntity implements Transaction {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fromId: number;

  @ApiProperty()
  from: User;

  @ApiProperty()
  toId: number;

  @ApiProperty()
  to: User;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  createdAt: Date;
}
