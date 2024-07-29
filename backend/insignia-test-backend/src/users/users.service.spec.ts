import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
      imports: [PrismaModule, JwtModule],
      exports: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  const existingUser = {
    id: 13,
    username: 'user10',
    password: '$2b$10$zN9BVaLnl9z4Zqptqg8YT.YOMh7rqTcuHFhhaDyCwHU/VFBmxD4KK',
    balance: 100,
    createdAt: new Date('2024-07-29T06:26:00.978Z'),
    updatedAt: new Date('2024-07-29T06:40:29.534Z'),
  } satisfies UserEntity;

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user if exists', async () => {
    const result = await service.findOne(existingUser.id);
    expect(result).toEqual(existingUser);
  });

  it('should return user if exists', async () => {
    const result = await service.findOneByUsername(existingUser.username);
    expect(result).toEqual(existingUser);
  });
});
