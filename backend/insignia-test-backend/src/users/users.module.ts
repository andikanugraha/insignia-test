import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_EXPIRED_TIME },
    }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
