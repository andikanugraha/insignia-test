import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BalanceEntity } from './entities/balance.entity';

@Controller('balance')
@ApiTags('balance')
export class BalanceController {
  constructor(private balanceService: BalanceService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({ type: BalanceEntity })
  getBalance(@Request() req) {
    return this.balanceService.getBalance(req.user.sub);
  }
}
