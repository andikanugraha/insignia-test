import { Test, TestingModule } from '@nestjs/testing';
import { TopupController } from './topup.controller';
import { UsersModule } from 'src/users/users.module';
import { TopupService } from './topup.service';

describe('TopupController', () => {
  let controller: TopupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [TopupController],
      providers: [TopupService],
    }).compile();

    controller = module.get<TopupController>(TopupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
