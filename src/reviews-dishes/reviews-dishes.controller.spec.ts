import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsDishesController } from './reviews-dishes.controller';
import { ReviewsDishesService } from './reviews-dishes.service';

describe('ReviewsDishesController', () => {
  let controller: ReviewsDishesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsDishesController],
      providers: [ReviewsDishesService],
    }).compile();

    controller = module.get<ReviewsDishesController>(ReviewsDishesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
