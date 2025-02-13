import { PartialType } from '@nestjs/swagger';
import { CreateReviewRestaurantDto } from './create-reviewRestaurant.dto';

export class UpdateReviewRestaurantDto extends PartialType(
  CreateReviewRestaurantDto,
) {}
