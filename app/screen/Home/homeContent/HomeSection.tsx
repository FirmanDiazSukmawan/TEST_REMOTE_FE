import React from 'react';
import {View, StyleSheet} from 'react-native';
import Banner from '../../../component/banner/Banner';
import TabProduct from '../../../component/tab/TabProduct.tsx';
import CardListProduct from '../../../component/card/CardListProduct';

const styles = StyleSheet.create({
  section: {
    flexDirection: 'column',
  },
});

export const homeSections = (
  data: any,
  category: string,
  handleSelectCategory: (selectedCategory: string) => void,
) => [
  {id: 'banner', component: <Banner />},
  {
    id: 'products',
    component: (
      <View style={styles.section}>
        <TabProduct
          activeCategory={category}
          handleSelectCategory={handleSelectCategory}
        />
        <CardListProduct data={data} />
      </View>
    ),
  },
];
