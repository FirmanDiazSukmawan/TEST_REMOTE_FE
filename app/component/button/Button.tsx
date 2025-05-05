import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

type Props = {
  title: string;
  onClick?: any;
  disabled?: boolean;
  loading?: boolean;
  custom?: boolean;
  children?: any;
};

const Button = ({
  title,
  onClick,
  disabled = false,
  loading = false,
  custom = false,
  children,
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.addToCartButton, disabled && {opacity: 0.5}]}
      onPress={onClick}
      disabled={disabled}>
      {custom ? (
        <>{children}</>
      ) : (
        <>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.addToCartText}>{title}</Text>
          )}
        </>
      )}
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
