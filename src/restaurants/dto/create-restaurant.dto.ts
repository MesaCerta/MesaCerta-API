import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  ArrayNotEmpty,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsCnpj } from 'src/common/validators/is-cnpj.validator';
import { IsPhone } from 'src/common/validators/is-phone.validator';

class DaySchedule {
  @IsString({ message: 'O dia deve ser uma string.' })
  @IsIn(
    [
      'segunda-feira',
      'terça-feira',
      'quarta-feira',
      'quinta-feira',
      'sexta-feira',
      'sábado',
      'domingo',
    ],
    { message: 'O dia deve ser um dia válido da semana.' },
  )
  @ApiProperty({
    description: 'Nome do dia da semana.',
    example: 'segunda-feira',
  })
  day: string;

  @IsString({ message: 'Horário de abertura deve ser uma string.' })
  @IsNotEmpty({ message: 'Horário de abertura não pode ser vazio.' })
  @ApiProperty({ description: 'Horário de abertura.', example: '08:00' })
  openingTime: string;

  @IsString({ message: 'Horário de fechamento deve ser uma string.' })
  @IsNotEmpty({ message: 'Horário de fechamento não pode ser vazio.' })
  @ApiProperty({ description: 'Horário de fechamento.', example: '22:00' })
  closingTime: string;
}

export class CreateRestaurantDto {
  @IsString({ message: 'Nome do restaurante tem que ser do tipo string' })
  @IsNotEmpty({ message: 'Nome do restaurante não pode ser vazio' })
  @ApiProperty({ description: 'Nome do restaurante.' })
  name: string;

  @IsString({ message: 'Endereço do restaurante tem que ser do tipo string' })
  @IsNotEmpty({ message: 'Endereço do restaurante não pode ser vazio' })
  @ApiProperty({ description: 'Endereço do restaurante.' })
  address: string;

  @IsString({ message: 'Telefone do restaurante tem que ser do tipo string' })
  @IsNotEmpty({ message: 'Telefone do restaurante não pode ser vazio' })
  @ApiProperty({ description: 'Telefone do restaurante.' })
  @IsPhone({ message: 'Telefone deve estar no formato (XX) XXXXX-XXXX.' })
  phone: string;

  @IsString({ message: 'CNPJ do restaurante tem que ser do tipo string' })
  @IsNotEmpty({ message: 'CNPJ do restaurante não pode ser vazio' })
  @ApiProperty({ description: 'CNPJ do restaurante.' })
  @IsCnpj({
    message: 'CNPJ inválido! Use o formato correto: 00.000.000/0000-00',
  })
  cnpj: string;

  @IsString({ message: 'Imagem do restaurante tem que ser do tipo string' })
  @IsOptional({ message: 'Imagem do restaurante é opcional' })
  @ApiProperty({ description: 'Imagem do restaurante.' })
  image: string;

  @IsArray({ message: 'O horário de funcionamento deve ser um array.' })
  @ArrayNotEmpty({ message: 'Deve haver pelo menos um dia de funcionamento.' })
  @ValidateNested({ each: true })
  @Type(() => DaySchedule)
  @ApiProperty({
    description: 'Horários de funcionamento do restaurante.',
    type: [DaySchedule],
    example: [
      { day: 'segunda-feira', openingTime: '08:00', closingTime: '22:00' },
      { day: 'terça-feira', openingTime: '09:00', closingTime: '21:00' },
    ],
  })
  schedule: DaySchedule[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID do dono do restaurante (usuário).' })
  ownerId: string;
}
