import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import StyledText from '../component/ui/Text';
import BottomButton from '../component/button/BottomButton';
import Button from '../component/button/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useCartStore} from '../zustand/CartStore';
import CardListCart from '../component/card/CardListCart';
import ModalBottom from '../component/ModalBottom/ModalBottom';
import Checkout from './Checkout';
import {CartItem} from '../type/TypeParamList';

const ListCart = () => {
  const {cartItems, updateQuantity, removeFromCart} = useCartStore();
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const insets = useSafeAreaInsets();
  const [showModalBottom, setShowModalBottom] = useState<boolean>(false);

  const toggleSelection = (item: any) => {
    setSelectedItems(prev =>
      prev.includes(item)
        ? prev.filter((items: any) => items?.id !== item?.id)
        : [...prev, item],
    );
  };

  const changeQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, item: any) => {
      const price = item?.discountPrice ?? item?.price;
      return total + price * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    setShowModalBottom(true);
  };

  useEffect(() => {
    setSelectedItems(prevSelected =>
      prevSelected.map(selectedItem => {
        const updatedItem = cartItems?.find(
          cartItem => cartItem?.id === selectedItem?.id,
        );
        return updatedItem ?? selectedItem;
      }),
    );
  }, [cartItems]);

  const renderItem = ({item}: {item: CartItem}) => {
    const isSelected = selectedItems?.some(
      (selected: any) => selected.id === item.id,
    );

    return (
      <CardListCart
        selected={isSelected}
        item={item}
        handleSelection={toggleSelection}
        changeQuantity={changeQuantity}
        removeFromCart={removeFromCart}
      />
    );
  };

  return (
    <>
      <SafeAreaView
        style={[styles.section, {marginBottom: insets.bottom || 16}]}>
        <FlashList
          data={cartItems}
          keyExtractor={(item, index) => index?.toString()}
          renderItem={renderItem}
          estimatedItemSize={130}
          extraData={{selectedItems, cartItems}}
        />
      </SafeAreaView>
      <BottomButton>
        <View style={styles.sectionButton}>
          <StyledText variant="title">Total </StyledText>
          <StyledText variant="price">
            $ {calculateTotalPrice()?.toFixed(2)}
          </StyledText>
        </View>

        <Button
          onClick={handleCheckout}
          title="Checkout"
          disabled={selectedItems.length === 0}
        />
      </BottomButton>

      <ModalBottom
        isOpen={showModalBottom}
        onClose={() => setShowModalBottom(false)}>
        <Checkout data={selectedItems} setShowModal={setShowModalBottom} />
      </ModalBottom>
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flex: 1,
  },

  sectionButton: {flexDirection: 'row', display: 'flex'},
});

export default ListCart;
