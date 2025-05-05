import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../type/TypeParamList';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const HeaderRightFavorite = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ListCart');
      }}
      style={styles.modal}>
      <FontAwesome5 name="shopping-cart" size={20} color="black" />
    </TouchableOpacity>
  );
};

export default HeaderRightFavorite;

const styles = StyleSheet.create({
  modal: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
    borderRadius: 999,
    marginHorizontal: 5,
  },
});
