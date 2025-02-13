import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { ReviewsRestaurantController } from './reviewsRestaurant.controller';
import { ReviewsRestaurantsRepository } from './repositories/reviewsRestaurant.repository';
import { RestaurantsRepository } from 'src/restaurants/repositories/restaurants.repository';
import { ReviewsRestaurantService } from './reviewsRestaurant.service';

@Module({
  controllers: [ReviewsRestaurantController],
  providers: [
    ReviewsRestaurantService,
    PrismaService,
    ReviewsRestaurantsRepository,
    UsersRepository,
    RestaurantsRepository,
  ],
})
export class ReviewsRestaurantModule {}
