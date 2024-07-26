import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TransferService } from './transfer.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { TransferDto } from './dto/transfer.dto';

@Controller('transfer')
@ApiTags('transfer')
export class TransferController {
  constructor(private transferService: TransferService) {}

  @UseGuards(AuthGuard)
  @Post()
  @HttpCode(204)
  @ApiNoContentResponse()
  transfer(@Request() req, @Body() transferDto: TransferDto) {
    return this.transferService.transfer(
      req.user.sub,
      transferDto.to_username,
      transferDto.amount,
    );
  }
}
