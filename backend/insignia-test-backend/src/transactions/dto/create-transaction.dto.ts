import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty()
  from: number;

  @ApiProperty()
  to: number;

  @ApiProperty()
  amount: number;
}
