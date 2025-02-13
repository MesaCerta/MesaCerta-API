import { ReviewRestaurant } from '@prisma/client';

export class ReviewRestaurantEntity implements ReviewRestaurant {
  id: string;
  rating: number;
  description: string;
  userId: string;
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
}
