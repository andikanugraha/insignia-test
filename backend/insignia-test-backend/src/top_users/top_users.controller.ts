import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { TopUsersService } from './top_users.service';
import { TopUsersEntity } from './entities/top_users.entity';

@Controller('top_users')
@ApiTags('top_users')
export class TopUsersController {
  constructor(private topUsersService: TopUsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({ type: TopUsersEntity, isArray: true })
  getTopTransactingUsersByValue() {
    return this.topUsersService.getTopTransactingUsersByValue();
  }
}
