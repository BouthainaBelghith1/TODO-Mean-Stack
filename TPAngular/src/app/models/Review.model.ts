export interface Review {
    _id: string;
    itemId: {
      _id: string;
      name: string;
      price: number;
      description: string;
    };
    userId: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }
  