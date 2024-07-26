import { ApiProperty } from '@nestjs/swagger';

export class TopUsersEntity {
  @ApiProperty()
  username: string;

  @ApiProperty()
  amount: number;
}
