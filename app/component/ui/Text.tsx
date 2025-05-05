import React, {ReactNode} from 'react';
import {Text, TextStyle, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  brand: {
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  bigTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  rating: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  tabText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  detailPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: 14,
    color: '#ff4444',
    lineHeight: 20,
  },
  specLabel: {
    fontSize: 14,
    color: '#666',
    width: 120,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  bold: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});

type Variant = keyof typeof styles;

interface StyledTextProps {
  variant?: Variant;
  style?: TextStyle | TextStyle[];
  children: ReactNode;
}

const StyledText: React.FC<StyledTextProps> = ({
  variant = 'brand',
  style,
  children,
}) => {
  return <Text style={[styles[variant], style]}>{children}</Text>;
};

export default StyledText;
