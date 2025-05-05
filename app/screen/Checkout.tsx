import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import StyledText from '../component/ui/Text';
import Button from '../component/button/Button';
import Toast from 'react-native-toast-message';

type Props = {
  data: any[];
  setShowModal: any;
};

const Checkout = ({data, setShowModal}: Props) => {
  const totalSavings = data.reduce((sum, item) => {
    if (item.discountPrice) {
      return sum + (item.price - item.discountPrice) * item.quantity;
    }
    return sum;
  }, 0);

  const originalSubtotal = data.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const discountedSubtotal = data.reduce(
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0,
  );

  const shippingCost = 5.0;

  const grandTotal = discountedSubtotal + shippingCost;

  return (
    <View style={styles.container}>
      <StyledText variant="bigTitle" style={styles.title}>
        Order Summary
      </StyledText>

      <ScrollView style={styles.productsContainer}>
        {data.map(item => (
          <View key={item.id} style={styles.productItem}>
            <Image source={{uri: item.image}} style={styles.productImage} />

            <View style={styles.productInfo}>
              <StyledText variant="title">{item.name}</StyledText>
              <StyledText variant="description">{item.brand}</StyledText>

              <View style={styles.priceRow}>
                {item.discountPrice ? (
                  <>
                    <StyledText variant="price">
                      ${(item.discountPrice * item.quantity).toFixed(2)}
                    </StyledText>
                    <StyledText variant="originalPrice">
                      ${(item.price * item.quantity).toFixed(2)}
                    </StyledText>
                  </>
                ) : (
                  <StyledText variant="price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </StyledText>
                )}
              </View>

              <View style={styles.quantityRow}>
                <StyledText variant="description">Quantity:</StyledText>
                <StyledText variant="title">{item.quantity}</StyledText>
              </View>

              {item.discountPrice && (
                <View style={styles.savingsRow}>
                  <StyledText variant="description">You Save : </StyledText>
                  <StyledText variant="title">
                    $
                    {(
                      (item.price - item.discountPrice) *
                      item.quantity
                    ).toFixed(2)}
                  </StyledText>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.totalContainer}>
        {totalSavings > 0 && (
          <View style={styles.totalRow}>
            <StyledText variant="description">Total Discount:</StyledText>
            <StyledText variant="bold">${totalSavings.toFixed(2)}</StyledText>
          </View>
        )}

        <View style={styles.totalRow}>
          <StyledText variant="description">Subtotal:</StyledText>
          <View style={styles.priceColumn}>
            {totalSavings > 0 && (
              <StyledText
                variant="originalPrice"
                style={styles.originalSubtotal}>
                ${originalSubtotal.toFixed(2)}
              </StyledText>
            )}
            <StyledText variant="bold">
              ${discountedSubtotal.toFixed(2)}
            </StyledText>
          </View>
        </View>

        <View style={styles.totalRow}>
          <StyledText variant="description">Shipping:</StyledText>
          <StyledText variant="bold">${shippingCost.toFixed(2)}</StyledText>
        </View>

        <View style={[styles.totalRow, styles.grandTotal]}>
          <StyledText variant="bigTitle">Total:</StyledText>
          <StyledText variant="bold">${grandTotal.toFixed(2)}</StyledText>
        </View>
      </View>
      <Button
        onClick={() => {
          setShowModal(false);
          Toast.show({
            type: 'info',
            text1: 'Sorry',
            text2: 'Not release yet ❎',
            position: 'top',
            visibilityTime: 2000,
          });
        }}
        disabled={false}
        title="CheckOut"
        //   loading={loading}
        custom
        children={
          <View style={styles.buttonCheckout}>
            <StyledText variant="title" style={styles.textCheckout}>
              Buy Now
            </StyledText>
          </View>
        }
      />
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  productsContainer: {
    maxHeight: Dimensions.get('window').height * 0.5,
    marginBottom: 20,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    gap: 10,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 5,
  },
  savingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceColumn: {
    alignItems: 'flex-end',
  },
  originalSubtotal: {
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  grandTotal: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  buttonCheckout: {alignItems: 'center'},
  textCheckout: {color: 'white'},
});
