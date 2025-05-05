import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Index from '../screen/Home/Index';
import ListCart from '../screen/ListCart';
import DetailProduct from '../screen/DetailProduct';
import SearchScreen from '../screen/SearchScreen';
import FavoriteScreen from '../screen/FavoriteScreen';
import HeaderRightCart from '../component/header/HeaderRightCart';

const MainRouter = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Index}
        options={() => ({
          title: 'home',
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="productDetail"
        component={DetailProduct}
        options={() => ({
          title: '',
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="ListCart"
        component={ListCart}
        options={() => ({
          title: 'Cart',
          headerShown: true,
          headerRight: () => <HeaderRightCart />,
        })}
      />
      <Stack.Screen
        name="searchScreen"
        component={SearchScreen}
        options={() => ({
          title: 'Search',
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="favoriteScreen"
        component={FavoriteScreen}
        options={() => ({
          title: 'Wishlist',
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default MainRouter;
