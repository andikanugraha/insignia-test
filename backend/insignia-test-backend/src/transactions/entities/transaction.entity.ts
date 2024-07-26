import { Transaction } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionEntity implements Transaction {
  @ApiProperty()
  id: number;

  @ApiProperty()
  from: number;

  @ApiProperty()
  to: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  createdAt: Date;
}
