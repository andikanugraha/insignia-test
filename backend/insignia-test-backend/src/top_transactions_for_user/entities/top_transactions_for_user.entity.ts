import { ApiProperty } from '@nestjs/swagger';

export class TopTransactionsForUserEntity {
  @ApiProperty()
  username: string;

  @ApiProperty()
  amount: number;
}
