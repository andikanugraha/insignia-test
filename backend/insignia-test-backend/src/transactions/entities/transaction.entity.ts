import { Transaction } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionEntity implements Transaction {
  @ApiProperty()
  id: number;

  @ApiProperty()
  from: string;

  @ApiProperty()
  to: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  createdAt: Date;
}
