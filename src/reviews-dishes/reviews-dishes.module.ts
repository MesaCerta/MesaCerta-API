import { Module } from '@nestjs/common';
import { ReviewsDishesService } from './reviews-dishes.service';
import { ReviewsDishesController } from './reviews-dishes.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { ReviewsDishesRepository } from './repositories/reviews-dishes.repository';
import { DishesRepository } from 'src/dishes/repositories/dishes.repository';

@Module({
  controllers: [ReviewsDishesController],
  providers: [
    ReviewsDishesService,
    PrismaService,
    ReviewsDishesRepository,
    UsersRepository,
    DishesRepository,
  ],
})
export class ReviewsDishesModule {}
