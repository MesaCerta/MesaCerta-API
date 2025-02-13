import { Injectable } from '@nestjs/common';
import { BadRequestError } from 'src/common/errors/types/BadRequestError';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { RestaurantsRepository } from 'src/restaurants/repositories/restaurants.repository';
import { ReviewsRestaurantsRepository } from './repositories/reviewsRestaurant.repository';
import { CreateReviewRestaurantDto } from './dto/create-reviewRestaurant.dto';
import { ReviewRestaurantEntity } from './entities/reviewRestaurant.entity';
import { UpdateReviewRestaurantDto } from './dto/update-reviewRestaurant.dto';
import { roundToNearestHalf } from 'src/common/functions/arredonde-number.function';

@Injectable()
export class ReviewsRestaurantService {
  constructor(
    private readonly repository: ReviewsRestaurantsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly restRepository: RestaurantsRepository,
  ) {}

  async create(
    createReviewRestaurantDto: CreateReviewRestaurantDto,
  ): Promise<ReviewRestaurantEntity> {
    const { description, restaurantId, userId } = createReviewRestaurantDto;

    const isUserExist = await this.usersRepository.findOne(userId);
    const isRestExist = await this.restRepository.findOne(restaurantId);

    if (!isUserExist) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    if (!isRestExist) {
      throw new NotFoundError('Restaurante não encontrado.');
    }

    if (description.length > 500) {
      throw new BadRequestError('Descrição deve conter até 500 caracteres.');
    }

    return this.repository.create(createReviewRestaurantDto);
  }

  async findAll(): Promise<ReviewRestaurantEntity[]> {
    const reviews = await this.repository.findAll();
    if (reviews.length === 0) {
      throw new NotFoundError('Nenhuma avaliação encontrada.');
    }
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<ReviewRestaurantEntity> {
    const review = await this.repository.findOne(id);
    if (!review) {
      throw new NotFoundError('Avaliação não encontrada.');
    }
    return review;
  }

  async getAverageRating(restaurantId: string) {
    const reviews = await this.repository.findAllByRestaurantId(restaurantId);
    const totalReviews = reviews.length;

    const isRestaurantExist = await this.restRepository.findOne(restaurantId);

    const averageRating =
      await this.repository.getAverageRatingByRestaurantId(restaurantId);
    if (!isRestaurantExist) {
      throw new NotFoundError('Restaurante não encontrado.');
    }

    return {
      restaurantId,
      averageRating: roundToNearestHalf(averageRating),
      totalReviews,
    };
  }

  async update(
    id: string,
    updateReviewRestaurantDto: UpdateReviewRestaurantDto,
  ): Promise<ReviewRestaurantEntity> {
    const isExist = await this.repository.findOne(id);
    const { description } = updateReviewRestaurantDto;
    if (!isExist) {
      throw new NotFoundError('Avaliação não encontrada.');
    } else if (description.length > 500) {
      throw new BadRequestError(
        'Descrição do prato não pode ter mais de 500 caracteres',
      );
    }
    return this.repository.update(id, updateReviewRestaurantDto);
  }

  async remove(id: string): Promise<ReviewRestaurantEntity> {
    const isExist = await this.repository.findOne(id);
    if (!isExist) {
      throw new NotFoundError('Avaliação não encontrada.');
    }
    return await this.repository.remove(id);
  }
}
