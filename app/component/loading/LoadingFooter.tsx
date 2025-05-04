import {ActivityIndicator, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';

type LoadingFooterProps = {
  backgroundColor?: string;
};

const LoadingFooter = ({backgroundColor}: LoadingFooterProps) => {
  const containerStyle: ViewStyle = {
    ...styles.container,
    ...(backgroundColor ? {backgroundColor} : {}),
  };

  return (
    <View style={containerStyle}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

export default LoadingFooter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
});
