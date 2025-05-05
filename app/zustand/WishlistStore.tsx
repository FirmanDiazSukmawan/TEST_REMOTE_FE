import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist, createJSONStorage} from 'zustand/middleware';
import {WishlistItem} from '../type/TypeParamList';

type WishlistStore = {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  inWislisht: (id: string) => boolean;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlistItems: [],
      addToWishlist: product => {
        const exists = get().wishlistItems.some(item => item.id === product.id);
        if (!exists) {
          set({wishlistItems: [...get().wishlistItems, product]});
        }
      },
      removeFromWishlist: id => {
        set({
          wishlistItems: get().wishlistItems.filter(item => item.id !== id),
        });
      },
      clearWishlist: () => {
        set({wishlistItems: []});
      },
      inWislisht: id => {
        return get().wishlistItems.some(item => item.id === id);
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
