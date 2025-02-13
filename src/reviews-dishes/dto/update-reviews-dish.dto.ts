import { PartialType } from '@nestjs/swagger';
import { CreateReviewsDishDto } from './create-reviews-dish.dto';

export class UpdateReviewsDishDto extends PartialType(CreateReviewsDishDto) {}
