import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty()
  fromId: number;

  @ApiProperty()
  toId: number;

  @ApiProperty()
  amount: number;
}
