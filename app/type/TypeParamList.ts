export type RootStackParamList = {
  Home: undefined;
  ListCart: undefined;
  productDetail: {id: string | number};
  searchScreen: undefined;
  favoriteScreen: undefined;
};

export type CartItem = {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  rating?: number;
};

export type WishlistItem = {
  id: string;
  name: string;
  image: string;
  brand: string;
  price: number;
  rating: number;
  discountPrice?: number;
};
