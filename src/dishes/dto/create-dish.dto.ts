import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum MealType {
  BREAKFAST = 'Café da manhã',
  LUNCH = 'Almoço',
  DINNER = 'Jantar',
}

export class CreateDishDto {
  @IsString({ message: 'Nome do prato tem que ser do tipo string' })
  @IsNotEmpty({ message: 'Nome do prato não pode ser vazio' })
  @ApiProperty({ description: 'Nome do prato.' })
  name: string;

  @IsString({ message: 'Descrição do prato tem que ser do tipo string' })
  @IsNotEmpty({ message: 'Descrição do prato não pode ser vazia' })
  @ApiProperty({ description: 'Descrição do prato.' })
  description: string;

  @IsString({ message: 'Imagem do prato tem que ser do tipo string' })
  @IsOptional({ message: 'Imagem do prato é opcional' })
  @ApiProperty({ description: 'Imagem do prato.' })
  image: string;

  @IsNumber({}, { message: 'Preço do prato tem que ser do tipo number' })
  @IsNotEmpty({ message: 'Preço do prato não pode ser vazio' })
  @ApiProperty({ description: 'Preço do prato.' })
  price: number;

  @IsString({ message: 'ID do restaurante tem que ser do tipo string' })
  @IsNotEmpty({ message: 'ID do restaurante não pode ser vazio' })
  @ApiProperty({ description: 'ID do restaurante ao qual o prato pertence.' })
  restaurantId: string;

  @IsEnum(MealType, {
    message:
      'Tipo de refeição deve ser um dos valores definidos ( Café da manhã, Almoço, Jantar )',
  })
  @IsNotEmpty({ message: 'Tipo de refeição não pode ser vazio' })
  @ApiProperty({ description: 'Tipo de refeição.' })
  mealType: MealType;
}
