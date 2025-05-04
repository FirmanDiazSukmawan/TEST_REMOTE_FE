import {
  StyleSheet,
  Text,
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

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 36) / 2;

type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  images: string[];
};

type Props = {
  data: Product[];
};

const CardListProduct = ({data}: Props) => {
  const {loading} = usePageLoading('home');

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
                <SkeletonLoader
                  width={120}
                  height={16}
                  borderRadius={4}
                  style={{marginBottom: 6}}
                />
                <SkeletonLoader width={60} height={14} borderRadius={4} />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(_, index) => index.toString()}
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
      <TouchableOpacity style={styles.cardContainer}>
        <Image
          source={{uri: item.images[0]}}
          style={styles.productImage}
          resizeMode="contain"
        />

        <View style={styles.textContainer}>
          <Text style={styles.productTitle} numberOfLines={2}>
            {item.title}
          </Text>

          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>

          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
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
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
    height: 30,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
});

export default CardListProduct;
