import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';
import { TopupModule } from './topup/topup.module';
import { BalanceModule } from './balance/balance.module';
import { TransferModule } from './transfer/transfer.module';
import { TopUsersModule } from './top_users/top_users.module';
import { TopTransactionsForUserModule } from './top_transactions_for_user/top_transactions_for_user.module';
import { MyTransactionsModule } from './my_transactions/my_transactions.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        PrismaModule,
        UsersModule,
        TransactionsModule,
        AuthModule,
        TopupModule,
        BalanceModule,
        TransferModule,
        TopUsersModule,
        TopTransactionsForUserModule,
        MyTransactionsModule,
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Insignia Test API Works!"', () => {
      expect(appController.getHello()).toBe('Insignia Test API Works!');
    });
  });
});
