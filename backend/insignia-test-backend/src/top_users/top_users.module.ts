import { Module } from '@nestjs/common';
import { TopUsersController } from './top_users.controller';
import { TopUsersService } from './top_users.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TopUsersController],
  providers: [TopUsersService],
})
export class TopUsersModule {}
