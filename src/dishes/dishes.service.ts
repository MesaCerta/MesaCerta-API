import { Injectable } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { DishesRepository } from './repositories/dishes.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { DishEntity } from './entities/dish.entity';
import { BadRequestError } from 'src/common/errors/types/BadRequestError';
import { RestaurantsRepository } from 'src/restaurants/repositories/restaurants.repository';

@Injectable()
export class DishesService {
  constructor(
    private readonly repository: DishesRepository,
    private readonly restaurantRespository: RestaurantsRepository,
  ) {}

  async create(createDishDto: CreateDishDto): Promise<DishEntity> {
    const { description, restaurantId, price } = createDishDto;
    const isRestaurantExist =
      await this.restaurantRespository.findOne(restaurantId);

    if (!isRestaurantExist) {
      throw new NotFoundError('Restaurante não encontrado.');
    } else if (price < 0) {
      throw new BadRequestError('Preço do prato não pode ser menor que 0');
    } else if (description.length > 500) {
      throw new BadRequestError(
        'Descrição do prato não pode ter mais de 500 caracteres',
      );
    }
    return this.repository.create(createDishDto);
  }

  async findAll(): Promise<DishEntity[]> {
    const dishes = await this.repository.findAll();
    if (dishes.length === 0) {
      throw new NotFoundError('Nenhum prato encontrado.');
    }
    return dishes;
  }

  async findOne(id: string): Promise<DishEntity> {
    const dish = await this.repository.findOne(id);
    if (!dish) {
      throw new NotFoundError('Prato não encontrado.');
    }
    return dish;
  }

  async update(id: string, updateDishDto: UpdateDishDto): Promise<DishEntity> {
    const isExist = await this.repository.findOne(id);
    const { description } = updateDishDto;

    if (!isExist) {
      throw new NotFoundError('Prato não encontrado.');
    } else if (description.length > 500) {
      throw new BadRequestError(
        'Descrição do prato não pode ter mais de 500 caracteres',
      );
    }
    return this.repository.update(id, updateDishDto);
  }

  async remove(id: string): Promise<DishEntity> {
    const isExist = await this.repository.findOne(id);
    if (!isExist) {
      throw new NotFoundError('Prato não encontrado.');
    }
    return this.repository.remove(id);
  }

  async deleteAll(): Promise<{ count: number }> {
    const result = await this.repository.deleteAll();
    if (result.count === 0) {
      throw new NotFoundError('Nenhum prato encontrado para deletar.');
    }
    return result;
  }
}
