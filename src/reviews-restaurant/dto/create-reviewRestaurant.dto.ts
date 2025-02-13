import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';
import { IsInteger } from 'src/common/validators/is-intereger.validator';

export class CreateReviewRestaurantDto {
  @IsNumber({}, { message: 'Nota tem que ser do tipo number' })
  @IsNotEmpty({ message: 'Nota não pode ser vazia' })
  @Min(1, { message: 'Nota tem que ser maior ou igual a 1' })
  @Max(5, { message: 'Nota tem que ser menor ou igual a 5' })
  @IsInteger({ message: 'Nota tem que ser um número inteiro' })
  @ApiProperty({ description: 'Nota da avaliação.' })
  rating: number;

  @IsString({ message: 'Descrição tem que ser do tipo string' })
  @IsNotEmpty({ message: 'Descrição não pode ser vazia' })
  @ApiProperty({ description: 'Descrição da avaliação.' })
  description: string;

  @IsString({ message: 'ID do usuário tem que ser do tipo string' })
  @IsNotEmpty({ message: 'ID do usuário não pode ser vazio' })
  @ApiProperty({ description: 'ID do usuário que fez a avaliação.' })
  userId: string;

  @IsNotEmpty({ message: 'ID do restaurante avaliado não pode ser vazio' })
  @ApiProperty({ description: 'ID do restaurante avaliado.' })
  restaurantId: string;
}
