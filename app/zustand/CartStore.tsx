import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist, createJSONStorage} from 'zustand/middleware';
import {CartItem} from '../type/TypeParamList';

type CartStore = {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: product => {
        const existingItem = get().cartItems.find(
          item => item.id === product.id,
        );
        if (existingItem) {
          set({
            cartItems: get().cartItems.map(item =>
              item.id === product.id
                ? {...item, quantity: item.quantity + 1}
                : item,
            ),
          });
        } else {
          set({
            cartItems: [...get().cartItems, {...product, quantity: 1}],
          });
        }
      },
      updateQuantity: (id, quantity) => {
        set({
          cartItems: get()
            .cartItems.map(item =>
              item.id === id
                ? {...item, quantity: Math.max(1, item.quantity + quantity)}
                : item,
            )
            .filter(item => item.quantity > 0),
        });
      },
      removeFromCart: id => {
        set({
          cartItems: get().cartItems.filter(item => item.id !== id),
        });
      },
      clearCart: () => {
        set({cartItems: []});
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
