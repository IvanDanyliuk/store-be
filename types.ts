export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  language: string;
  avatarUrl: string;
  wishList: IProduct[],
  orders: IOrder[],
  isAdmin: boolean;
  createdAt: {
    type: Date;
    default: Date;
  };
}

export interface IReview {
  productId: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userAvatarUrl: string;
  advantages: string;
  disadvantages: string;
  comment: string;
  rate: number;
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
};

export interface IShipping {
  company: string;
  country: string;
  cities: string[];
  price: number;
};

export interface IOrder {
  products: IProduct[];
  amount: number;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  recepient: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  isPaid: boolean;
  isShipped: boolean;
  shippingCity: string;
  shippingCompany: string;
  paymentMethod: string;
  creditCardNumber: string;
  createdAt: {
    type: Date;
    default: Date;
  };
};