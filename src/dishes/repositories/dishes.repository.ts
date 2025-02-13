import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDishDto } from '../dto/create-dish.dto';
import { UpdateDishDto } from '../dto/update-dish.dto';
import { DishEntity } from '../entities/dish.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DishesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDishDto: CreateDishDto): Promise<DishEntity> {
    return this.prisma.dish.create({ data: createDishDto });
  }

  async findAll(): Promise<DishEntity[]> {
    return this.prisma.dish.findMany({
      include: {
        reviews: {
          select: {
            id: true,
            rating: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<DishEntity> {
    return this.prisma.dish.findUnique({
      where: { id },
      include: {
        reviews: {
          select: {
            id: true,
            rating: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: string, updateDishDto: UpdateDishDto): Promise<DishEntity> {
    return this.prisma.dish.update({
      where: { id },
      data: updateDishDto,
    });
  }

  async remove(id: string): Promise<DishEntity> {
    return this.prisma.dish.delete({
      where: { id },
      include: {
        reviews: {
          select: {
            id: true,
            rating: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }
  async deleteAll() {
    return this.prisma.dish.deleteMany();
  }
}
