import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Input from './form/Input';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../type/TypeParamList';

type Props = {};

type NavigationProp = StackNavigationProp<RootStackParamList, 'ListCart'>;

const HeaderHome = (props: Props) => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const handleSearch = () => {
    console.log('Searching');
  };
  return (
    <View style={styles.section}>
      <Input
        name="search"
        type="text"
        placeholder={'Search  Product ..'}
        placeholderTextColor="black"
        value={search || ''}
        onChange={(text: any) => setSearch(text)}
        style={styles.input}
        sectionStyle={styles.sectionSearch}
        error_messages={[]}
        addOn={{
          iconName: 'search',
          iconSize: 20,
          iconColor: 'blue',
          style: styles.iconInput,
          onClick: () => handleSearch(),
        }}
        onSubmitEditing={() => handleSearch()}
      />
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('ListCart')}>
        <FontAwesome5 name="shopping-cart" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  section: {
    // width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    gap: 15,
  },
  sectionSearch: {
    flex: 1,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    position: 'relative',
    color: 'black',
  },
  iconInput: {
    position: 'absolute',
    right: 15,
    top: '26%',
  },
  cartButton: {
    justifyContent: 'center',
  },
});
