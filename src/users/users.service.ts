import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from './entities/user.entity';
import { ConflictError } from 'src/common/errors/types/ConflictError';
import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const {
      email,
      password,
      image,
      name,
      sex,
      cpf,
      address,
      phone,
      birthdate,
    } = createUserDto;
    const emailExists = await this.repository.findByEmail(email);
    const cpfExists = await this.repository.findByCpf(cpf);
    if (emailExists) {
      throw new ConflictError('Email já está em uso.');
    }
    if (cpfExists) {
      throw new ConflictError('CPF já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    createUserDto.password = hashedPassword;
    const user = {
      name,
      email,
      password: hashedPassword,
      image,
      cpf,
      sex,
      address,
      phone,
      birthdate,
    };

    return this.repository.create(user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.repository.findAll();
    if (users.length === 0) {
      throw new NotFoundError('Nenhum usuário encontrado.');
    }
    return users;
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.repository.findOne(id);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    if (updateUserDto.password && updateUserDto.password !== user.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    } else {
      updateUserDto.password = user.password;
    }

    return this.repository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    return this.repository.remove(id);
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Credenciais inválidas.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Credenciais inválidas.');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    return {
      user: user,
      token,
    };
  }
}
