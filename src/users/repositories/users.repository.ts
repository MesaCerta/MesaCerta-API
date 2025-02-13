// users.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  private formatDate(date: string): Date {
    return new Date(date);
  }

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        birthdate: this.formatDate(createUserDto.birthdate),
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        birthdate: this.formatDate(updateUserDto.birthdate),
      },
    });
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        reviewsRestaurant: {
          select: {
            id: true,
            rating: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            restaurant: {
              select: {
                id: true,
                name: true,
                address: true,
                phone: true,
              },
            },
          },
        },
        reviewsDish: {
          select: {
            id: true,
            rating: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            dish: {
              select: {
                id: true,
                description: true,
                price: true,
                restaurant: {
                  select: {
                    id: true,
                    name: true,
                    address: true,
                    phone: true,
                  },
                },
              },
            },
          },
        },
        restaurants: true,
      },
    });

    return users.map((user) => ({
      ...user,
      restaurants: user.restaurants.map((restaurant) => ({
        ...restaurant,
        schedule: JSON.parse(restaurant.schedule as unknown as string),
      })),
    }));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        reviewsRestaurant: {
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
                phone: true,
              },
            },
          },
        },
        restaurants: true,
        reviewsDish: {
          select: {
            id: true,
            rating: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            dish: {
              select: {
                id: true,
                description: true,
                price: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      restaurants: user.restaurants.map((restaurant) => ({
        ...restaurant,
        schedule: JSON.parse(restaurant.schedule as unknown as string),
      })),
    };
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        reviewsRestaurant: {
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
              },
            },
          },
        },
        reviewsDish: {
          select: {
            id: true,
            rating: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            dish: {
              select: {
                id: true,
                description: true,
                price: true,
              },
            },
          },
        },
        restaurants: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      restaurants: user.restaurants.map((restaurant) => ({
        ...restaurant,
        schedule: JSON.parse(restaurant.schedule as unknown as string),
      })),
    };
  }

  async findByCpf(cpf: string) {
    const user = await this.prisma.user.findUnique({
      where: { cpf },
      include: {
        reviewsRestaurant: {
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
              },
            },
          },
        },
        reviewsDish: {
          select: {
            id: true,
            rating: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            dish: {
              select: {
                id: true,
                description: true,
                price: true,
              },
            },
          },
        },
        restaurants: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      restaurants: user.restaurants.map((restaurant) => ({
        ...restaurant,
        schedule: JSON.parse(restaurant.schedule as unknown as string),
      })),
    };
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        reviewsRestaurant: {
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
                phone: true,
                schedule: true,
              },
            },
          },
        },
        restaurants: true,
      },
    });

    if (!user) {
      return null;
    }

    const formattedUser = {
      ...user,
      restaurants: user.restaurants.map((restaurant) => ({
        ...restaurant,
        schedule: JSON.parse(restaurant.schedule as unknown as string),
      })),
    };

    await this.prisma.user.delete({ where: { id } });

    return formattedUser;
  }
}
