import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindByEmailDto {
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @ApiProperty({ description: 'Email do usuário que deseja encontrar.' })
  email: string;
}
