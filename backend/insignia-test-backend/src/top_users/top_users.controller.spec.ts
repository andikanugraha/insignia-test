import { Test, TestingModule } from '@nestjs/testing';
import { TopUsersController } from './top_users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TopUsersService } from './top_users.service';

describe('TopUsersController', () => {
  let controller: TopUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [TopUsersController],
      providers: [TopUsersService],
    }).compile();

    controller = module.get<TopUsersController>(TopUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
