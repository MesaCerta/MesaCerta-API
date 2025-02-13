import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RatingReviewsRestaurantDto {
  @IsString({ message: 'ID do restaurante tem que ser do tipo string' })
  @IsNotEmpty({ message: 'ID do restaurante não pode ser vazio' })
  @ApiProperty({ description: 'ID do prato' })
  restaurantId: string;

  @IsString({ message: 'ID do usuário tem que ser do tipo string' })
  @IsNotEmpty({ message: 'ID do usuário não pode ser vazio' })
  @ApiProperty({ description: 'ID do usuário' })
  userId: string;

  @IsNumber({}, { message: 'Nota tem que ser do tipo number' })
  @IsNotEmpty({ message: 'Nota não pode ser vazia' })
  @ApiProperty({ description: 'Nota do prato' })
  rating: number;
}
