import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';
import { UpdateRestaurantDto } from '../dto/update-restaurant.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RestaurantsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    const restaurant = await this.prisma.restaurant.create({
      data: {
        ...createRestaurantDto,
        schedule: JSON.stringify(createRestaurantDto.schedule),
        ownerId: createRestaurantDto.ownerId,
      },
    });

    return {
      ...restaurant,
      schedule: JSON.parse(restaurant.schedule as unknown as string),
    };
  }

  async findAll() {
    const restaurants = await this.prisma.restaurant.findMany({
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
            restaurant: {
              select: {
                id: true,
                name: true,
                address: true,
                cnpj: true,
                phone: true,
                instagram: true,
                schedule: true,
              },
            },
          },
        },
        dishes: {
          select: {
            id: true,
            description: true,
            price: true,
            reviews: {
              select: {
                id: true,
                description: true,
                rating: true,
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
        },
      },
    });
    return restaurants.map((restaurant) => ({
      ...restaurant,
      schedule: JSON.parse(restaurant.schedule as unknown as string),
    }));
  }

  async findOne(id: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
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
            restaurant: {
              select: {
                id: true,
                name: true,
                cnpj: true,
                address: true,
                phone: true,
                instagram: true,
                schedule: true,
              },
            },
          },
        },
        dishes: {
          select: {
            id: true,
            description: true,
            price: true,
            reviews: {
              select: {
                id: true,
                description: true,
                rating: true,
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
        },
      },
    });
    return {
      ...restaurant,
      schedule: JSON.parse(restaurant.schedule as unknown as string),
    };
  }

  // apenas para checagem na hora de criar um restaurante, ainda não será uma rota
  async findByPhone(phone: string) {
    return this.prisma.restaurant.findUnique({ where: { phone } });
  }

  // apenas para checagem na hora de criar um restaurante, ainda não será uma rota
  async findByCnpj(cnpj: string) {
    return this.prisma.restaurant.findUnique({ where: { cnpj } });
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    const updatedRestaurant = await this.prisma.restaurant.update({
      where: { id },
      data: {
        ...updateRestaurantDto,
        schedule: updateRestaurantDto.schedule
          ? JSON.stringify(updateRestaurantDto.schedule)
          : undefined,
      },
    });

    return {
      ...updatedRestaurant,
      schedule: JSON.parse(updatedRestaurant.schedule as unknown as string),
    };
  }

  async remove(id: string) {
    const deletedRestaurant = await this.prisma.restaurant.delete({
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
            restaurant: {
              select: {
                id: true,
                name: true,
                cnpj: true,
                address: true,
                phone: true,
                instagram: true,
                schedule: true,
              },
            },
          },
        },
        dishes: {
          select: {
            id: true,
            description: true,
            price: true,
            reviews: {
              select: {
                id: true,
                description: true,
                rating: true,
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
        },
      },
    });

    return {
      ...deletedRestaurant,
      schedule: JSON.parse(deletedRestaurant.schedule as unknown as string),
      reviews: deletedRestaurant.reviews.map((review) => ({
        ...review,
        restaurant: {
          ...review.restaurant,
          schedule: JSON.parse(review.restaurant.schedule as unknown as string),
        },
      })),
    };
  }

  async deleteAll() {
    return this.prisma.restaurant.deleteMany();
  }
}
