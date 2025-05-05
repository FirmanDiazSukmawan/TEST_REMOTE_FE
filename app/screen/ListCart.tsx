import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import StyledText from '../component/ui/Text';
import BottomButton from '../component/button/BottomButton';
import Button from '../component/button/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useCartStore} from '../zustand/CartStore';
import CardListCart from '../component/card/CardListCart';

const ListCart = () => {
  const {cartItems, updateQuantity, removeFromCart} = useCartStore();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const insets = useSafeAreaInsets();

  const toggleSelection = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id],
    );
  };

  const changeQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      if (selectedItems.includes(item.id)) {
        const price = item.discountPrice ?? item.price;
        return total + price * item.quantity;
      }
      return total;
    }, 0);
  };

  const handleCheckout = () => {
    console.log('Checking out selected items:', selectedItems);
  };

  const renderItem = ({item}: {item: any}) => {
    const isSelected = selectedItems.includes(item.id);

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
