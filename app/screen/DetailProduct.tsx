import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Rating from '../component/rating/Rating';
import axiosInstance from '../function/axios';
import StyledText from '../component/ui/Text';
import BottomButton from '../component/button/BottomButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from '../component/button/Button';
import {useCartStore} from '../zustand/CartStore';
import Toast from 'react-native-toast-message';
import {usePageLoading} from '../hooks/UseLoading';
import SkeletonLoader from '../component/loading/Skeleton';

const {width} = Dimensions.get('window');

type Props = {
  route: any;
  navigation: any;
};

const DetailProduct = ({route}: Props) => {
  const {id} = route?.params;

  const [product, setProduct] = useState<any>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const insets = useSafeAreaInsets();
  const {
    loading,
    refreshing,
    startLoading,
    stopLoading,
    startRefreshing,
    stopRefreshing,
  } = usePageLoading('detailProduct');
  const addToCart = useCartStore(state => state.addToCart);

  const getProductDetail = useCallback(async () => {
    startLoading();
    startRefreshing();
    setProduct({});
    try {
      const res = await axiosInstance.get(`product/${id}`);
      setProduct(res?.data);
      stopLoading();
      stopRefreshing();
    } catch (error) {
      stopLoading();
      stopRefreshing();
    }
  }, [id, startLoading, startRefreshing, stopLoading, stopRefreshing]);

  useEffect(() => {
    if (id) {
      getProductDetail();
    }
  }, [id, getProductDetail]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x /
        event.nativeEvent.layoutMeasurement.width,
    );
    setActiveIndex(slide);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product?.id,
        name: product?.title || product?.name,
        image: product?.images?.[0] || '',
        brand: product?.brand,
        price: product?.price,
        rating: product?.rating,
        discountPrice: product?.discountPercentage
          ? product?.price -
            (product?.price * product?.discountPercentage) / 100
          : undefined,
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

  const renderReviewItem = ({item}: {item: (typeof product.reviews)[0]}) => (
    <View style={styles.reviewItem}>
      {loading ? (
        <SkeletonLoader
          width={150}
          height={16}
          borderRadius={4}
          style={styles.gapToDesc}
        />
      ) : (
        <View style={styles.reviewHeader}>
          <StyledText variant="title">{item.reviewerName}</StyledText>
          <Rating rating={item.rating} />
        </View>
      )}
      {loading ? (
        <SkeletonLoader
          width={100}
          height={16}
          borderRadius={4}
          style={styles.gapToDesc}
        />
      ) : (
        <StyledText variant="description">{item.comment}</StyledText>
      )}
      {loading ? (
        <SkeletonLoader
          width={150}
          height={16}
          borderRadius={4}
          style={styles.gapToDesc}
        />
      ) : (
        <StyledText variant="date">
          {new Date(item.date).toLocaleDateString()}
        </StyledText>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={{marginBottom: insets.bottom || 16}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => getProductDetail()}
          />
        }>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.imageGallery}>
          {loading ? (
            <SkeletonLoader
              width={200}
              height={150}
              borderRadius={8}
              style={styles.productImage}
            />
          ) : (
            product?.images?.map((image: string, index: number) => (
              <Image
                key={index}
                source={{uri: image}}
                style={styles.productImage}
                resizeMode="contain"
              />
            ))
          )}
        </ScrollView>
        <View style={styles.dotContainer}>
          {loading ? (
            <SkeletonLoader
              width={150}
              height={14}
              borderRadius={4}
              style={styles.gapToDesc}
            />
          ) : (
            product?.images?.map((_: string, index: number) => (
              <View
                key={index}
                style={[styles.dot, activeIndex === index && styles.activeDot]}
              />
            ))
          )}
        </View>

        <View style={styles.content}>
          {loading ? (
            <SkeletonLoader
              width={100}
              height={16}
              borderRadius={4}
              style={styles.gapToDesc}
            />
          ) : (
            <View style={styles.priceRow}>
              <StyledText variant="detailPrice">
                ${product?.price?.toFixed(2)}
              </StyledText>

              {product?.discountPercentage > 0 && (
                <StyledText variant="originalPrice">
                  $
                  {(
                    product?.price +
                    (product?.price * product?.discountPercentage) / 100
                  )?.toFixed(2)}
                </StyledText>
              )}
            </View>
          )}

          <View style={styles.ratingContainer}>
            {loading ? (
              <SkeletonLoader
                width={150}
                height={14}
                borderRadius={4}
                style={styles.gapToDesc}
              />
            ) : (
              <Rating rating={product?.rating} />
            )}
          </View>
          {loading ? (
            <SkeletonLoader
              width={100}
              height={14}
              borderRadius={4}
              style={styles.gapToDesc}
            />
          ) : (
            <StyledText variant="bigTitle">{product?.title}</StyledText>
          )}
          {loading ? (
            <SkeletonLoader
              width={150}
              height={14}
              borderRadius={4}
              style={styles.gapToDesc}
            />
          ) : (
            <StyledText variant="description">{product?.brand}</StyledText>
          )}
          {loading ? (
            <SkeletonLoader
              width={250}
              height={14}
              borderRadius={4}
              style={styles.gapToDesc}
            />
          ) : (
            <StyledText variant="description" style={styles.gapToDesc}>
              {product?.availabilityStatus} ({product?.stock} left)
            </StyledText>
          )}

          {loading ? (
            <SkeletonLoader
              width={200}
              height={16}
              borderRadius={4}
              style={styles.gapToDesc}
            />
          ) : (
            <View style={styles.section}>
              <StyledText variant="bigTitle">Description</StyledText>
              <StyledText variant="description">
                {product?.description}
              </StyledText>
            </View>
          )}

          <View style={styles.section}>
            {loading ? (
              <SkeletonLoader
                width={300}
                height={16}
                borderRadius={4}
                style={styles.gapToDesc}
              />
            ) : (
              <StyledText variant="bigTitle">Specifications</StyledText>
            )}

            {loading ? (
              <SkeletonLoader
                width={200}
                height={16}
                borderRadius={4}
                style={styles.gapToDesc}
              />
            ) : (
              <View style={styles.specRow}>
                <StyledText variant="specLabel">SKU:</StyledText>
                <StyledText variant="description">{product?.sku}</StyledText>
              </View>
            )}
            {loading ? (
              <SkeletonLoader
                width={180}
                height={16}
                borderRadius={4}
                style={styles.gapToDesc}
              />
            ) : (
              <View style={styles.specRow}>
                <StyledText variant="specLabel">Category:</StyledText>
                <StyledText variant="description">
                  {product?.category}
                </StyledText>
              </View>
            )}
            {loading ? (
              <SkeletonLoader
                width={190}
                height={16}
                borderRadius={4}
                style={styles.gapToDesc}
              />
            ) : (
              <View style={styles.specRow}>
                <StyledText variant="specLabel">Weight:</StyledText>
                <StyledText variant="description">
                  {product?.weight} g
                </StyledText>
              </View>
            )}
            {loading ? (
              <SkeletonLoader
                width={160}
                height={16}
                borderRadius={4}
                style={styles.gapToDesc}
              />
            ) : (
              <View style={styles.specRow}>
                <StyledText variant="specLabel">Dimensions:</StyledText>
                <StyledText variant="description">
                  {product?.dimensions?.width} x {product?.dimensions?.height} x{' '}
                  {product?.dimensions?.depth} cm
                </StyledText>
              </View>
            )}
          </View>

          <View style={styles.section}>
            {loading ? (
              <SkeletonLoader
                width={150}
                height={16}
                borderRadius={4}
                style={styles.gapToDesc}
              />
            ) : (
              <StyledText variant="bigTitle">Shipping & Policies</StyledText>
            )}
            {loading ? (
              <SkeletonLoader
                width={150}
                height={16}
                borderRadius={4}
                style={styles.gapToDesc}
              />
            ) : (
              <View style={styles.specRow}>
                <StyledText variant="specLabel">Shipping:</StyledText>
                <StyledText variant="description">
                  {product?.shippingInformation}
                </StyledText>
              </View>
            )}
            {loading ? (
              <SkeletonLoader
                width={150}
                height={16}
                borderRadius={4}
                style={styles.gapToDesc}
              />
            ) : (
              <View style={styles.specRow}>
                <StyledText variant="specLabel">Warranty:</StyledText>
                <StyledText variant="description">
                  {product?.warrantyInformation}
                </StyledText>
              </View>
            )}
            {loading ? (
              <SkeletonLoader
                width={150}
                height={16}
                borderRadius={4}
                style={styles.gapToDesc}
              />
            ) : (
              <View style={styles.specRow}>
                <StyledText variant="specLabel">Return Policy:</StyledText>
                <StyledText variant="description">
                  {product?.returnPolicy}
                </StyledText>
              </View>
            )}
          </View>

          <View>
            {loading ? (
              <SkeletonLoader
                width={150}
                height={16}
                borderRadius={4}
                style={styles.gapToDesc}
              />
            ) : (
              <StyledText variant="bigTitle">
                Reviews ({product?.reviews?.length})
              </StyledText>
            )}

            <FlatList
              data={product?.reviews}
              renderItem={renderReviewItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </View>
        </View>
      </ScrollView>

      <BottomButton>
        <TouchableOpacity style={styles.wishlistButton}>
          <Icon name="favorite-border" size={24} color="#6200ee" />
        </TouchableOpacity>
        <Button onClick={handleAddToCart} title="Add To Cart" />
      </BottomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  imageGallery: {
    height: width * 0.8,
  },
  productImage: {
    width: width,
    height: width * 0.8,
    backgroundColor: '#f5f5f5',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#888',
  },

  section: {
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  specRow: {
    flexDirection: 'row',
  },
  reviewItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewComment: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  wishlistButton: {
    padding: 10,
  },

  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#6200ee',
    width: 10,
    height: 10,
  },
  gapToDesc: {
    marginBottom: 7,
  },
});

export default DetailProduct;
