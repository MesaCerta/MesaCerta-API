import { ReviewDish } from '@prisma/client';

export class ReviewsDishEntity implements ReviewDish {
  id: string;
  rating: number;
  description: string;
  userId: string;
  dishId: string;
  createdAt: Date;
  updatedAt: Date;
}
