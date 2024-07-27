import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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

@Module({
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
})
export class AppModule {
  static port: string;

  constructor(private configService: ConfigService) {
    AppModule.port = configService.get('PORT');
  }
}
