import { Test, TestingModule } from '@nestjs/testing';
import { TopUsersService } from './top_users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TopUsersController } from './top_users.controller';
import { JwtModule } from '@nestjs/jwt';

describe('TopUsersService', () => {
  let service: TopUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, JwtModule],
      controllers: [TopUsersController],
      providers: [TopUsersService],
    }).compile();

    service = module.get<TopUsersService>(TopUsersService);
  });

  const expectedResult = [
    {
      username: 'user1',
      transacted_value: 18600,
    },
    {
      username: 'user3',
      transacted_value: 8000,
    },
    {
      username: 'user5',
      transacted_value: 1500,
    },
  ];

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of user', async () => {
    const result = await service.getTopTransactingUsersByValue();
    expect(result[0]).toEqual(expectedResult[0]);
  });
});
