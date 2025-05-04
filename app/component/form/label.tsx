import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

interface ValidationProps {
  label: string;
  error: boolean;
}
export default function LabelForm(props: ValidationProps) {
  return (
    <>
      {props.label && (
        <View style={styles.container}>
          <Text
            style={
              (styles.label,
              props.error ? styles.errorLabel : styles.normalLabel)
            }>
            {props.label}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    letterSpacing: 0.5,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  normalLabel: {
    color: 'black',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  errorLabel: {
    color: 'red',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
});
