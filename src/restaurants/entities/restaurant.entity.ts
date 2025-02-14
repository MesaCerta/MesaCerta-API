import { Restaurant } from '@prisma/client';

export class RestaurantEntity implements Restaurant {
  id: string;
  name: string;
  image: string;
  address: string;
  phone: string;
  ownerId: string;
  cnpj: string;
  schedule: any;
  createdAt: Date;
  updatedAt: Date;
}
