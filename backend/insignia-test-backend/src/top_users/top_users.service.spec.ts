import { Test, TestingModule } from '@nestjs/testing';
import { TopUsersService } from './top_users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TopUsersController } from './top_users.controller';

describe('TopUsersService', () => {
  let service: TopUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [TopUsersController],
      providers: [TopUsersService],
    }).compile();

    service = module.get<TopUsersService>(TopUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
