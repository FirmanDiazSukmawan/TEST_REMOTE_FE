import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import HeaderRightFavorite from '../component/header/HeaderRightFavorite';
import {useWishlistStore} from '../zustand/WishlistStore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlashList} from '@shopify/flash-list';
import CardWishList from '../component/card/CardWishList';

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const {wishlistItems} = useWishlistStore();

  const setUpHeader = () => {
    navigation.setOptions({
      headerRight: () => <HeaderRightFavorite />,
    });
  };

  useEffect(() => {
    setUpHeader();
  }, []);

  const renderItem = ({item}: {item: any}) => {
    return <CardWishList item={item} />;
  };

  return (
    <SafeAreaView
      style={[styles.container, {paddingBottom: insets.bottom || 16}]}>
      <FlashList
        data={wishlistItems}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        onEndReachedThreshold={0.3}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: '10%',
  },
  listContainer: {
    padding: 12,
    paddingBottom: 20,
  },
});
