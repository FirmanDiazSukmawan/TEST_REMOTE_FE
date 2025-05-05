import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Input from '../form/Input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../type/TypeParamList';

type NavigationProp = StackNavigationProp<RootStackParamList>;

interface Props {
  getData: any;
  search: string;
  setSearch: any;
}

const HeaderSearch = ({getData, search, setSearch}: Props) => {
  const navigation = useNavigation<NavigationProp>();

  const handleSearch = () => {
    getData(search);
  };
  return (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={20} color="black" />
      </TouchableOpacity>
      <Input
        name="search"
        type="text"
        placeholder={'Search Product ...'}
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
    </View>
  );
};

export default HeaderSearch;

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
