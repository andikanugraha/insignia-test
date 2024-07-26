import { ApiProperty } from '@nestjs/swagger';

export class BalanceEntity {
  @ApiProperty()
  balance: number;
}
