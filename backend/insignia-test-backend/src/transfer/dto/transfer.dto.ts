import { ApiProperty } from '@nestjs/swagger';

export class TransferDto {
  @ApiProperty()
  to_username: string;

  @ApiProperty()
  amount: number;
}
