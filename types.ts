export interface IUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  imageUrl: string;
  orderList: [];
  createdAt: {
    type: Date;
    default: Date;
  };
}

export interface IReview {
  author: IUser;
  text: string;
  likes: number;
  dislikes: number;
}

export interface IProduct {
  productId: string;
  title: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  reviews: IReview[];
  mainImageUrl: string;
  imageUrls: string[];
  createdAt: {
    type: Date;
    default: Date;
  };
};

export interface ICategory {
  id: string;
  title: string;
  createdAt: {
    type: Date;
    default: Date;
  };
};