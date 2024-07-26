import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { BalanceEntity } from 'src/balance/entities/balance.entity';
import { TopUsersService } from './top_users.service';

@Controller('top_users')
export class TopUsersController {
  constructor(private topUsersService: TopUsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({ type: BalanceEntity })
  getTopTransactingUsersByValue() {
    return this.topUsersService.getTopTransactingUsersByValue();
  }
}
