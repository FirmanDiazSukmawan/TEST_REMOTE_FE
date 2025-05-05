import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../type/TypeParamList';
import Icon from 'react-native-vector-icons/MaterialIcons';

type NavigationProp = StackNavigationProp<RootStackParamList>;

const HeaderRightCart = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('favoriteScreen');
      }}
      style={styles.modal}>
      <Icon name="favorite" size={20} color="black" />
    </TouchableOpacity>
  );
};

export default HeaderRightCart;

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
