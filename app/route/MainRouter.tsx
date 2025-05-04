import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Index from '../screen/Home/Index';
import ListCart from '../screen/ListCart';

const MainRouter = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={({navigation, route}) => ({
        // headerLeft: () => <HeaderLeft navigation={navigation} />,
        // headerTitle: () => <HeaderTittle navigation={navigation} />,
        // headerRight: () => <HeaderRight navigation={navigation} />,
        // headerStyle: {
        //   backgroundColor: '#1e293b',
        // },
      })}>
      <Stack.Screen
        name="Home"
        component={Index}
        options={({navigation, route}) => ({
          //
          title: 'home',
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="ListCart"
        component={ListCart}
        options={({navigation, route}) => ({
          //
          title: 'home',
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default MainRouter;
