import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainRouter from './app/route/MainRouter';
import {View, StyleSheet} from 'react-native';
import {enableScreens} from 'react-native-screens';
import Toast from 'react-native-toast-message';

enableScreens();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <MainRouter />
      </View>
      <Toast position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingTop: '7%',
  },
});

export default App;
