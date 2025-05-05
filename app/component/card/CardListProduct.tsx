import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SkeletonLoader from '../loading/Skeleton';
import {usePageLoading} from '../../hooks/UseLoading.ts';
import {useNavigation} from '@react-navigation/native';
import StyledText from '../ui/Text.tsx';
import {RootStackParamList} from '../../type/TypeParamList.ts';
import {StackNavigationProp} from '@react-navigation/stack';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 36) / 2;

type Product = {
  id: number;
  title: string;
  brand: string;
  price: number;
  rating: number;
  images: string[];
};

type Props = {
  data: Product[];
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'productDetail'>;

const CardListProduct = ({data}: Props) => {
  const {loading} = usePageLoading('home');
  const navigation = useNavigation<NavigationProp>();

  if (loading) {
    return (
      <View style={styles.container}>
        <FlashList
          data={Array(6).fill(null)}
          renderItem={() => (
            <TouchableOpacity style={styles.cardContainer}>
              <SkeletonLoader
                width={200}
                height={150}
                borderRadius={8}
                style={styles.productImage}
              />
              <View style={styles.textContainer}>
                <SkeletonLoader width={120} height={16} borderRadius={4} />
                <SkeletonLoader width={60} height={14} borderRadius={4} />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(_, index) => index?.toString()}
          numColumns={2}
          estimatedItemSize={CARD_WIDTH + 150}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  const renderItem = ({item}: {item: Product}) => {
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

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item?.id?.toString()}
        numColumns={2}
        estimatedItemSize={CARD_WIDTH + 150}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContainer: {
    padding: 12,
    paddingBottom: 20,
  },
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

export default CardListProduct;
