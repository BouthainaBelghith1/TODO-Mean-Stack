import { User } from "./user.model";

export interface Review {
    _id: string;
    itemId: {
      _id: string;
      name: string;
      price: number;
      description: string;
    };
    userId: User;
    rating: number;
    comment: string;
    createdAt: Date;
  }
  