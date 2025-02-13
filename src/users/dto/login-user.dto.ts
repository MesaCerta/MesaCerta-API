import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'Email tem que ser do tipo string' })
  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @ApiProperty({ description: 'Email do usuário' })
  email: string;

  @IsString({ message: 'Senha tem que ser do tipo string' })
  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  @ApiProperty({ description: 'Senha do usuário' })
  password: string;
}
