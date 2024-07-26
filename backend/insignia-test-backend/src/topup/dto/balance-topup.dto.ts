import { ApiProperty } from '@nestjs/swagger';

export class BalanceTopupDto {
  @ApiProperty()
  amount: number;
}
