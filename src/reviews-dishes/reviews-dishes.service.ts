import { Injectable } from '@nestjs/common';
import { CreateReviewsDishDto } from './dto/create-reviews-dish.dto';
import { UpdateReviewsDishDto } from './dto/update-reviews-dish.dto';
import { ReviewsDishesRepository } from './repositories/reviews-dishes.repository';
import { BadRequestError } from 'src/common/errors/types/BadRequestError';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { ReviewsDishEntity } from './entities/reviews-dish.entity';
import { roundToNearestHalf } from 'src/common/functions/arredonde-number.function';
import { DishesRepository } from 'src/dishes/repositories/dishes.repository';

@Injectable()
export class ReviewsDishesService {
  constructor(
    private readonly repository: ReviewsDishesRepository,
    private readonly usersRepository: UsersRepository,
    private readonly dishesRepository: DishesRepository,
  ) {}

  async create(
    createReviewsDishDto: CreateReviewsDishDto,
  ): Promise<ReviewsDishEntity> {
    const { description, userId } = createReviewsDishDto;

    const isUserExist = await this.usersRepository.findOne(userId);

    if (!isUserExist) {
      throw new NotFoundError('Usuário não encontrado.');
    } else if (description.length > 500) {
      throw new BadRequestError('Descrição deve conter até 500 caracteres.');
    }

    return this.repository.create(createReviewsDishDto);
  }

  async findAll(): Promise<ReviewsDishEntity[]> {
    const reviews = await this.repository.findAll();
    if (reviews.length === 0) {
      throw new NotFoundError('Nenhuma avaliação encontrada.');
    }

    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<ReviewsDishEntity> {
    const review = await this.repository.findOne(id);
    if (!review) {
      throw new NotFoundError('Avaliação não encontrada.');
    }
    return review;
  }

  async getAverageRating(dishId: string) {
    const reviews = await this.repository.findAllByDishId(dishId);
    const totalReviews = reviews.length;

    const isDishExist = await this.dishesRepository.findOne(dishId);

    const averageRating =
      await this.repository.getAverageRatingByDishId(dishId);
    if (!isDishExist) {
      throw new NotFoundError('Prato não encontrado.');
    }

    return {
      dishId,
      averageRating: roundToNearestHalf(averageRating),
      totalReviews,
    };
  }

  async update(
    id: string,
    updateReviewsDishDto: UpdateReviewsDishDto,
  ): Promise<ReviewsDishEntity> {
    const isExist = await this.repository.findOne(id);

    const { description } = updateReviewsDishDto;

    if (!isExist) {
      throw new NotFoundError('Avaliação não encontrada.');
    } else if (description.length > 500) {
      throw new BadRequestError(
        'Descrição do prato não pode ter mais de 500 caracteres',
      );
    }
    return this.repository.update(id, updateReviewsDishDto);
  }

  async remove(id: string) {
    const isExist = await this.repository.findOne(id);
    if (!isExist) {
      throw new NotFoundError('Avaliação não encontrada.');
    }
    return await this.repository.remove(id);
  }
}
