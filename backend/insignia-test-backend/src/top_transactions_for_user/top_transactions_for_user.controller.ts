import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { TopTransactionsForUserService } from './top_transactions_for_user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { TopTransactionsForUserEntity } from './entities/top_transactions_for_user.entity';

@Controller('top_transactions_per_user')
export class TopTransactionsForUserController {
  constructor(
    private topTransactionsForUserService: TopTransactionsForUserService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({ type: TopTransactionsForUserEntity, isArray: true })
  getTopTransactingUsersByValue(@Request() req) {
    return this.topTransactionsForUserService.getTopTransactionsForUser(
      req.user.sub,
    );
  }
}
