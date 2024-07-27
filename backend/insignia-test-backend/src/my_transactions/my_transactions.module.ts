import { Module } from '@nestjs/common';
import { MyTransactionsController } from './my_transactions.controller';
import { MyTransactionsService } from './my_transactions.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MyTransactionsController],
  providers: [MyTransactionsService],
})
export class MyTransactionsModule {}
