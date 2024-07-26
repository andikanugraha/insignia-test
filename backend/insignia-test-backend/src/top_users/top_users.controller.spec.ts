import { Test, TestingModule } from '@nestjs/testing';
import { TopUsersController } from './top_users.controller';

describe('TopUsersController', () => {
  let controller: TopUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopUsersController],
    }).compile();

    controller = module.get<TopUsersController>(TopUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
