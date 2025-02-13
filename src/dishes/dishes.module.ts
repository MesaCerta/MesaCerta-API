import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { DishesRepository } from './repositories/dishes.repository';
import { RestaurantsRepository } from 'src/restaurants/repositories/restaurants.repository';

@Module({
  controllers: [DishesController],
  providers: [
    DishesService,
    PrismaService,
    DishesRepository,
    RestaurantsRepository,
  ],
})
export class DishesModule {}
