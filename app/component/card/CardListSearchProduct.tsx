import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../type/TypeParamList';
import {StackNavigationProp} from '@react-navigation/stack';
import StyledText from '../ui/Text';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Product = {
  id: number;
  title: string;
  brand: string;
  price: number;
  rating: number;
  images: string[];
};

type Props = {
  item: Product;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 36) / 2;

const CardListSearchProduct = ({item}: Props) => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate('productDetail', {
          id: item?.id,
        })
      }>
      <Image
        source={{uri: item.images[0]}}
        style={styles.productImage}
        resizeMode="contain"
      />

      <View style={styles.textContainer}>
        <StyledText variant="title">{item.title}</StyledText>
        <StyledText variant="description">{item.brand}</StyledText>

        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFD700" />
          <StyledText variant="rating">{item.rating.toFixed(1)}</StyledText>
        </View>
        <StyledText variant="title">${item.price.toFixed(2)}</StyledText>
      </View>
    </TouchableOpacity>
  );
};

export default CardListSearchProduct;

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
});
