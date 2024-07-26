import { Module } from '@nestjs/common';
import { TopTransactionsForUserController } from './top_transactions_for_user.controller';
import { TopTransactionsForUserService } from './top_transactions_for_user.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TopTransactionsForUserController],
  providers: [TopTransactionsForUserService],
})
export class TopTransactionsForUserModule {}
