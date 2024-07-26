import { Test, TestingModule } from '@nestjs/testing';
import { TopUsersService } from './top_users.service';

describe('TopUsersService', () => {
  let service: TopUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopUsersService],
    }).compile();

    service = module.get<TopUsersService>(TopUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
