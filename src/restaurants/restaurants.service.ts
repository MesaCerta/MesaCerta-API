import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantsRepository } from './repositories/restaurants.repository';
import { ConflictError } from 'src/common/errors/types/ConflictError';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { RestaurantEntity } from './entities/restaurant.entity';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly repository: RestaurantsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async create(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<RestaurantEntity> {
    const { phone, cnpj, ownerId } = createRestaurantDto;

    const existingPhone = await this.repository.findByPhone(phone);
    const existingCnpj = await this.repository.findByCnpj(cnpj);
    if (existingPhone) {
      throw new ConflictError(
        'Este número de telefone já está em uso por outro restaurante.',
      );
    }
    if (existingCnpj) {
      throw new ConflictError(
        'Este CNPJ já está em uso por outro restaurante.',
      );
    }

    const userExists = await this.usersRepository.findOne(ownerId);
    if (!userExists) {
      throw new NotFoundError('Usuário dono do restaurante não encontrado.');
    }

    return this.repository.create(createRestaurantDto);
  }

  async findAll(): Promise<RestaurantEntity[]> {
    const restaurants = await this.repository.findAll();
    if (restaurants.length === 0) {
      throw new NotFoundError('Nenhum restaurante encontrado.');
    }
    return restaurants;
  }

  async findOne(id: string): Promise<RestaurantEntity> {
    const restaurant = await this.repository.findOne(id);
    if (!restaurant) {
      throw new NotFoundError('Restaurante não encontrado.');
    }
    return restaurant;
  }

  async update(
    id: string,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<RestaurantEntity> {
    const isExist = await this.repository.findOne(id);
    if (!isExist) {
      throw new NotFoundError('Restaurante não encontrado.');
    }
    return this.repository.update(id, updateRestaurantDto);
  }

  async remove(id: string): Promise<RestaurantEntity> {
    const isExist = await this.repository.findOne(id);
    if (!isExist) {
      throw new NotFoundError('Restaurante não encontrado.');
    }
    return this.repository.remove(id);
  }

  async deleteAll(): Promise<{ count: number }> {
    const result = await this.repository.deleteAll();
    if (result.count === 0) {
      throw new NotFoundError('Nenhum restaurante encontrado para deletar.');
    }
    return result;
  }
}
