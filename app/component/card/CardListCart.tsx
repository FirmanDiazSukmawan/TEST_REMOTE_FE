import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import StyledText from '../ui/Text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import color from '../../component/color/TextColor';
import {CartItem} from '../../type/TypeParamList';

type Props = {
  selected: boolean;
  item: CartItem;
  handleSelection: (item: CartItem) => void;
  changeQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
};

const CardListCart = ({
  selected,
  item,
  handleSelection,
  changeQuantity,
  removeFromCart,
}: Props) => {
  return (
    <View style={styles.card}>
      <CheckBox
        value={selected}
        onValueChange={() => handleSelection(item)}
        style={styles.checkbox}
        tintColors={{true: color.primary, false: 'gray'}}
        onTintColor={color.primary}
        onCheckColor={color.primary}
      />

      <Image source={{uri: item?.image}} style={styles.image} />
      <View style={styles.info}>
        <StyledText variant="title">{item?.name}</StyledText>
        <StyledText variant="description">{item?.brand}</StyledText>
        <View style={styles.stars}>
          <Icon name="star" size={20} color="#FFD700" />
          <StyledText variant="rating">{item?.rating || 0}</StyledText>
        </View>

        <View style={styles.priceRow}>
          {item?.discountPrice ? (
            <>
              <StyledText variant="price">
                $ {item?.discountPrice?.toFixed(2)}
              </StyledText>
              <StyledText variant="originalPrice">
                $ {item?.price?.toFixed(2)}
              </StyledText>
            </>
          ) : (
            <StyledText variant="price">$ {item?.price?.toFixed(2)}</StyledText>
          )}
        </View>

        <View style={styles.quantityControl}>
          {item?.quantity === 1 ? (
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => removeFromCart(item?.id)}>
              <Icon name="delete" size={16} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => changeQuantity(item?.id, -1)}>
              <StyledText variant="title">- </StyledText>
            </TouchableOpacity>
          )}
          <StyledText variant="title">{item?.quantity}</StyledText>

          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => changeQuantity(item.id, 1)}>
            <StyledText variant="title"> + </StyledText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardListCart;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  checkbox: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  info: {
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 5,
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stars: {flexDirection: 'row', alignItems: 'center'},
});
