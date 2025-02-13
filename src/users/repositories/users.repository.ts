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
    return this.prisma.user.findMany({
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
                schedule: true,
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
                    schedule: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
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
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
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
      },
    });
  }
  async findByCpf(cpf: string) {
    return this.prisma.user.findUnique({
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
      },
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
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
      },
    });
  }
}
