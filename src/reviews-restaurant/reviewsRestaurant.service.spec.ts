import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsRestaurantService } from './reviewsRestaurant.service';

describe('ReviewsService', () => {
  let service: ReviewsRestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewsRestaurantService],
    }).compile();

    service = module.get<ReviewsRestaurantService>(ReviewsRestaurantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
