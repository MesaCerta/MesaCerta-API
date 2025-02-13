import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantsRepository } from './repositories/restaurants.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, PrismaService, RestaurantsRepository],
})
export class RestaurantsModule {}
