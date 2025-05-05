import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

type Props = {
  title: string;
  onClick?: any;
  disabled?: boolean;
};

const Button = ({title, onClick, disabled = false}: Props) => {
  return (
    <TouchableOpacity
      style={styles.addToCartButton}
      onPress={onClick}
      disabled={disabled}>
      <Text style={styles.addToCartText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  addToCartButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
