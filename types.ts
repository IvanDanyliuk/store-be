export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  language: string;
  avatarUrl: string;
  orders: [{
    product: IProduct,
    date: string,
  }];
  createdAt: {
    type: Date;
    default: Date;
  };
}

export interface IReview {
  user: IUser;
  comment: string;
  likes: number;
  dislikes: number;
  date: Date;
}

export interface IProduct {
  productId: string;
  title: string;
  category: ICategory;
  description: string;
  price: number;
  color: string;
  rating: number;
  promotion: [string],
  reviews: IReview[];
  mainImageUrl: string;
  imageUrls: string[];
  createdAt: {
    type: Date;
    default: Date;
  };
};

export interface ICategory {
  _id: string;
  main: {
    title: string;
    url: string;
  };
  subCategories: [{
    title: string;
    url: string;
  }]
  createdAt: {
    type: Date;
    default: Date;
  };
};

export interface ISubCategory {
  title: string;
  imageUrl: string;
}