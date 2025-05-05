import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Index from '../screen/Home/Index';
import ListCart from '../screen/ListCart';
import DetailProduct from '../screen/DetailProduct';

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
        })}
      />
    </Stack.Navigator>
  );
};

export default MainRouter;
