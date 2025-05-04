import {RefreshControl, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {JSX, useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import HeaderHome from '../../component/HeaderHome';
import {homeSections} from './homeContent/HomeSection';
import axiosInstance from '../../function/axios';
import {usePageLoading} from '../../hooks/UseLoading.ts';
import LoadingFooter from '../../component/loading/LoadingFooter.tsx';

const Index = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<any>([]);
  const [category, setCategory] = useState<string>('');
  const [moreData, setMoreData] = useState<boolean>(false);
  const [skip, setSkip] = useState<number>(0);
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
  } = usePageLoading('home');

  const getProduct = async (selectedCategory?: string) => {
    setMoreData(false);
    stopScrollLoading();
    startRefreshing();
    startLoading();
    setData([]);
    setMoreData(false);
    setSkip(0);

    try {
      const endpoint = selectedCategory
        ? `products/category/${selectedCategory}`
        : 'products';
      const res = await axiosInstance.get(`${endpoint}`, {
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
      const endpoint = category ? `products/category/${category}` : 'products';
      const res = await axiosInstance.get(`${endpoint}`, {
        params: {
          limit: 10,
          skip: nextData,
        },
      });

      setData((prevData: any) => [...prevData, ...res?.data?.products]);
      setSkip(nextData);
      setMoreData(skip === res?.data?.total ? false : true);
      stopScrollLoading();
      stopRefreshing();
    } catch (error: any) {
      stopScrollLoading();
      stopRefreshing();
    }
  }, [skip, moreData, scrollLoading]);

  const handleCategorySelect = (selectedCategory: string) => {
    const newCategory = selectedCategory === category ? '' : selectedCategory;
    setCategory(newCategory);
    getProduct(newCategory);
  };

  useEffect(() => {
    getProduct(category);
  }, []);

  const renderItem = ({item}: {item: {id: string; component: JSX.Element}}) => {
    return <View>{item.component}</View>;
  };

  const renderListFooter = useCallback(() => {
    return scrollLoading && !loading ? (
      <LoadingFooter backgroundColor="#f8f8f8" />
    ) : null;
  }, [scrollLoading, loading]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderHome />
      <FlashList
        data={homeSections(data, category, handleCategorySelect)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => getProduct(category)}
          />
        }
        ListFooterComponent={renderListFooter}
      />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: '7%',
    paddingBottom: '10%',
  },
  contentContainer: {
    paddingTop: 5,
  },
  section: {
    flexDirection: 'column',
  },
});
