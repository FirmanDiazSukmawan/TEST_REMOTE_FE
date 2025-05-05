import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
}

const BottomButton = ({children}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {bottom: insets.bottom || 16}]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    elevation: 5,
    width: '100%',
    alignItems: 'center',
  },
});

export default BottomButton;
