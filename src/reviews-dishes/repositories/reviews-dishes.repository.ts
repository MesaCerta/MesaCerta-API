import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewsDishDto } from '../dto/create-reviews-dish.dto';
import { UpdateReviewsDishDto } from '../dto/update-reviews-dish.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewsDishesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewsDishDto: CreateReviewsDishDto) {
    return this.prisma.reviewDish.create({ data: createReviewsDishDto });
  }

  async findAll() {
    return this.prisma.reviewDish.findMany();
  }

  async findOne(id: string) {
    return this.prisma.reviewDish.findUnique({ where: { id } });
  }

  async findAllByDishId(dishId: string) {
    return this.prisma.reviewDish.findMany({
      where: { dishId },
    });
  }

  async getAverageRatingByDishId(dishId: string): Promise<number> {
    const result = await this.prisma.reviewDish.aggregate({
      _avg: {
        rating: true,
      },
      where: {
        dishId,
      },
    });

    return result._avg.rating || 0;
  }

  async update(id: string, updateReviewsDishDto: UpdateReviewsDishDto) {
    return this.prisma.reviewDish.update({
      where: { id },
      data: updateReviewsDishDto,
    });
  }

  async remove(id: string) {
    return this.prisma.reviewDish.delete({ where: { id } });
  }
}
