import { Test, TestingModule } from '@nestjs/testing';
import { TopupService } from './topup.service';
import { TopupController } from './topup.controller';
import { UsersModule } from 'src/users/users.module';

describe('TopupService', () => {
  let service: TopupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [TopupController],
      providers: [TopupService],
    }).compile();

    service = module.get<TopupService>(TopupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
