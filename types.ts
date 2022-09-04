export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  language: string;
  avatarUrl: string;
  orders: [],
  isAdmin: boolean;
  createdAt: {
    type: Date;
    default: Date;
  };
}

export interface IReview {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    avatarUrl: string;
  };
  comment: string;
  likes: number;
  dislikes: number;
  date: Date;
}

export interface IProduct {
  title: string;
  category: {
    main: {
      title: string;
      url: string;
    };
    subCategory: {
      title: string;
      url: string;
    };
  };
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
  main: {
    title: string;
    url: string;
  };
  subCategories: [{
    title: string;
    url: string;
  }]
};

export interface ISubCategory {
  title: string;
  imageUrl: string;
}