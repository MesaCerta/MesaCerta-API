import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsRestaurantService } from './reviewsRestaurant.service';
import { ReviewsRestaurantController } from './reviewsRestaurant.controller';

describe('ReviewsRestaurantController', () => {
  let controller: ReviewsRestaurantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsRestaurantController],
      providers: [ReviewsRestaurantService],
    }).compile();

    controller = module.get<ReviewsRestaurantController>(
      ReviewsRestaurantController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
