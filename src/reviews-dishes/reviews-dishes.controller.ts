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
import { ReviewsDishesService } from './reviews-dishes.service';
import { CreateReviewsDishDto } from './dto/create-reviews-dish.dto';
import { UpdateReviewsDishDto } from './dto/update-reviews-dish.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiTags('reviews-dishes')
@Controller('reviews-dishes')
export class ReviewsDishesController {
  constructor(private readonly reviewsDishesService: ReviewsDishesService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createReviewsDishDto: CreateReviewsDishDto) {
    return this.reviewsDishesService.create(createReviewsDishDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.reviewsDishesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.reviewsDishesService.findOne(id);
  }

  @Get(':id/average-dishes')
  getAverageRating(@Param('id') dishId: string) {
    return this.reviewsDishesService.getAverageRating(dishId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateReviewsDishDto: UpdateReviewsDishDto,
  ) {
    return this.reviewsDishesService.update(id, updateReviewsDishDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.reviewsDishesService.remove(id);
  }
}
