import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiNoContentResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { BalanceTopupDto } from './dto/balance-topup.dto';
import { TopupService } from './topup.service';

@Controller('topup')
export class TopupController {
  constructor(private topupService: TopupService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(204)
  @ApiNoContentResponse()
  balanceTopup(@Request() req, @Body() balanceTopupDto: BalanceTopupDto) {
    return this.topupService.balanceTopup(req.user.sub, balanceTopupDto.amount);
  }
}
