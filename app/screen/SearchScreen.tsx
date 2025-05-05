import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import HeaderSearch from '../component/header/HeaderSearch';
import {usePageLoading} from '../hooks/UseLoading';
import axiosInstance from '../function/axios';
import {FlashList} from '@shopify/flash-list';
import {RefreshControl} from 'react-native-gesture-handler';
import LoadingFooter from '../component/loading/LoadingFooter';
import CardListSearchProduct from '../component/card/CardListSearchProduct';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SearchScreen = () => {
  const [data, setData] = useState<any>([]);
  const [moreData, setMoreData] = useState<boolean>(false);
  const [skip, setSkip] = useState<number>(0);
  const [search, setSearch] = useState('');
  const insets = useSafeAreaInsets();
  const {
    loading,
    refreshing,
    scrollLoading,
    startLoading,
    stopLoading,
    startRefreshing,
    stopRefreshing,
    startScrollLoading,
    stopScrollLoading,
  } = usePageLoading('searchScreen');

  const getProduct = async (searching?: string) => {
    setMoreData(false);
    stopScrollLoading();
    startRefreshing();
    startLoading();
    setData([]);
    setMoreData(false);
    setSkip(0);

    try {
      const endpoint =
        searching !== '' ? `products/search?q=${searching}` : 'products';
      const res = await axiosInstance.get(endpoint, {
        params: {
          limit: 10,
        },
      });

      if (res?.data?.total < 10) {
        setMoreData(false);
      } else {
        setMoreData(true);
      }
      setData(res?.data?.products);
      stopScrollLoading();
      stopRefreshing();
      stopLoading();
    } catch (error) {
      console.log(error);
      stopScrollLoading();
      stopRefreshing();
      stopLoading();
    }
  };

  const onEndReached = useCallback(async () => {
    if (!moreData || scrollLoading) {
      return;
    }
    try {
      startScrollLoading();
      stopRefreshing();

      const nextData = skip + 10;
      const endpoint =
        search !== '' ? `products/search?q=${search}` : 'products';
      const res = await axiosInstance.get(`${endpoint}`, {
        params: {
          limit: 10,
          skip: nextData,
        },
      });

      setData((prevData: any) => [...prevData, ...res?.data?.products]);
      setSkip(nextData);
      setMoreData(nextData >= res?.data?.total ? false : true);
      stopScrollLoading();
      stopRefreshing();
    } catch (error: any) {
      stopScrollLoading();
      stopRefreshing();
    }
  }, [skip, moreData, scrollLoading]);

  useEffect(() => {
    getProduct(search);
  }, []);

  const renderListFooter = useCallback(() => {
    return scrollLoading && !loading ? (
      <LoadingFooter backgroundColor="#f8f8f8" />
    ) : null;
  }, [scrollLoading, loading]);

  const renderItem = ({item}: {item: any}) => {
    return <CardListSearchProduct item={item} />;
  };

  return (
    <SafeAreaView
      style={[styles.container, {paddingBottom: insets.bottom || 16}]}>
      <HeaderSearch
        getData={getProduct}
        search={search}
        setSearch={setSearch}
      />
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item?.id}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        numColumns={2}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => getProduct('')}
          />
        }
        ListFooterComponent={renderListFooter}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: '7%',
    paddingBottom: '10%',
  },
  listContainer: {
    padding: 12,
    paddingBottom: 20,
  },
});
