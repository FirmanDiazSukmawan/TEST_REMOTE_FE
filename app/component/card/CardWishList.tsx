import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList, WishlistItem} from '../../type/TypeParamList';
import {StackNavigationProp} from '@react-navigation/stack';
import StyledText from '../ui/Text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../button/Button';
import {useWishlistStore} from '../../zustand/WishlistStore';
import Toast from 'react-native-toast-message';
import {useCartStore} from '../../zustand/CartStore';

type NavigationProp = StackNavigationProp<RootStackParamList>;

type CardWishListProps = {
  item: WishlistItem;
};

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 36) / 2;

const CardWishList = ({item}: CardWishListProps) => {
  const navigation = useNavigation<NavigationProp>();

  const {removeFromWishlist} = useWishlistStore();
  const addToCart = useCartStore(state => state.addToCart);

  const handleRemoveWishList = () => {
    removeFromWishlist(item?.id);
    Toast.show({
      type: 'info',
      text1: 'Removed from Wishlist',
      position: 'top',
      visibilityTime: 1500,
    });
  };

  const handleAddToCart = () => {
    if (item) {
      addToCart({
        id: item?.id,
        name: item?.name,
        image: item?.image || '',
        brand: item?.brand,
        price: item?.price,
        rating: item?.rating,
        discountPrice: item?.discountPrice,
        quantity: 1,
      });
      Toast.show({
        type: 'success',
        text1: 'Product added',
        text2: 'Product added to Cart ✅',
        position: 'top',
        visibilityTime: 2000,
      });
    }
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('productDetail', {
            id: item?.id,
          })
        }>
        <Image
          source={{uri: item.image}}
          style={styles.productImage}
          resizeMode="contain"
        />

        <View style={styles.textContainer}>
          <StyledText variant="title">{item.name}</StyledText>
          <StyledText variant="description">{item.brand}</StyledText>

          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <StyledText variant="rating">{item?.rating.toFixed(1)}</StyledText>
          </View>
          <StyledText variant="title">${item.price.toFixed(2)}</StyledText>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={handleRemoveWishList}>
          <Icon name={'favorite'} size={24} color="#6200ee" />
        </TouchableOpacity>
        <Button
          onClick={handleAddToCart}
          title="Add To Cart"
          //   disabled={loading ? true : false}
          //   loading={loading}
        />
      </View>
    </View>
  );
};

export default CardWishList;

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 6,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingBottom: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: CARD_WIDTH,
    backgroundColor: '#f5f5f5',
  },
  textContainer: {
    padding: 10,
    gap: 5,
    display: 'flex',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wishlistButton: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    display: 'flex',
    gap: 2,
    paddingHorizontal: 5,
    height: 40,
  },
});
