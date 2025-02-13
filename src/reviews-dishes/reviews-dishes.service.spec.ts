import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsDishesService } from './reviews-dishes.service';

describe('ReviewsDishesService', () => {
  let service: ReviewsDishesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewsDishesService],
    }).compile();

    service = module.get<ReviewsDishesService>(ReviewsDishesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
