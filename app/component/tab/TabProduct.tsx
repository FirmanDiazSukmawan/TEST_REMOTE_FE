import React, {useEffect, useState} from 'react';
import TabList from './common/TabList';
import axiosInstance from '../../function/axios';

type Props = {
  activeCategory: string;
  handleSelectCategory: (selectedCategory: string) => void;
};

const TabProduct = ({activeCategory, handleSelectCategory}: Props) => {
  const [dataCategory, setDataCategory] = useState([]);

  const getCategory = async () => {
    try {
      const res = await axiosInstance.get('products/categories');
      setDataCategory(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <TabList
      data={dataCategory}
      activeId={activeCategory}
      onTabPress={item => handleSelectCategory(item.slug)}
    />
  );
};

export default TabProduct;
