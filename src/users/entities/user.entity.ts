import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  name: string;
  image: string;
  email: string;
  cpf: string;
  password: string;
  sex: 'Male' | 'Female' | 'Other';
  address: string;
  phone: string;
  birthdate: Date;
  createdAt: Date;
  updatedAt: Date;
}
