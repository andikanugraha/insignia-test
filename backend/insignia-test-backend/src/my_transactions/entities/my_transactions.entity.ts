import { ApiProperty } from '@nestjs/swagger';

export class MyTransactionsEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fromId: number;

  @ApiProperty()
  fromUsername: string;

  @ApiProperty()
  toId: number;

  @ApiProperty()
  toUsername: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  createdAt: Date;
}
