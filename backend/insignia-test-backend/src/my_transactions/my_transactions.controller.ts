import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { MyTransactionsService } from './my_transactions.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { MyTransactionsEntity } from './entities/my_transactions.entity';

@Controller('my_transactions')
export class MyTransactionsController {
  constructor(private myTransactionsService: MyTransactionsService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({ type: MyTransactionsEntity, isArray: true })
  getTransactions(@Request() req, @Query() query) {
    return this.myTransactionsService.getTransactions(
      req.user.sub,
      query.type,
      query.from,
      query.to,
      Number(query.skip ?? 0),
      Number(query.take ?? 10),
    );
  }
}
