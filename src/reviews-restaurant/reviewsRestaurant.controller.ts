import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateReviewRestaurantDto } from './dto/create-reviewRestaurant.dto';
import { UpdateReviewRestaurantDto } from './dto/update-reviewRestaurant.dto';
import { ReviewsRestaurantService } from './reviewsRestaurant.service';

@ApiTags('reviews-restaurants')
@Controller('reviews-restaurants')
export class ReviewsRestaurantController {
  constructor(
    private readonly reviewsRestaurantService: ReviewsRestaurantService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createReviewRestaurantDto: CreateReviewRestaurantDto) {
    return this.reviewsRestaurantService.create(createReviewRestaurantDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.reviewsRestaurantService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.reviewsRestaurantService.findOne(id);
  }

  @Get(':id/average-rating')
  getAverageRating(@Param('id') dishId: string) {
    return this.reviewsRestaurantService.getAverageRating(dishId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateReviewRestaurantDto: UpdateReviewRestaurantDto,
  ) {
    return this.reviewsRestaurantService.update(id, updateReviewRestaurantDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.reviewsRestaurantService.remove(id);
  }
}
