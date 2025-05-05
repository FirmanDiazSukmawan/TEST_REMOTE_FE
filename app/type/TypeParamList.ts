export type RootStackParamList = {
  Home: undefined;
  ListCart: undefined;
  productDetail: {id: string | number};
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
