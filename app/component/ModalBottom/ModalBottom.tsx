import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  Animated,
  Modal,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import Icon from '../icon/Icon';

interface PropsModalBottom {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
  children: React.ReactNode;
  backdrop?: boolean;
  closable?: boolean;
  onRequestClose?: (e: any) => void;
  buttonClose?: boolean;
  height?: string | number;
}

export default function ModalBottom({
  isOpen,
  onClose,
  children,
  backdrop = true,
  closable = true,
  onRequestClose,
  buttonClose = false,
  height,
}: PropsModalBottom) {
  const [isVisible, setIsVisible] = useState(false);
  const translateY = useRef(new Animated.Value(600)).current;
  const [maxHeight, setMaxHeight] = useState('95%');

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (event, gestureState) => {
        if (closable && gestureState.dy > 50) {
          handleRequstClose();
        } else {
          resetModalPosition();
        }
      },
      // onPanResponderTerminate:(event, gestureState) => {
      //   console.log(gestureState)
      // }
    }),
  ).current;

  const hideModal = () => {
    if (closable) {
      Animated.timing(translateY, {
        toValue: 500,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setIsVisible(false);
      });
      onClose && onClose(true);
    }
  };

  const handleRequstClose = (e: any) => {
    hideModal();
    onRequestClose && onRequestClose(e);
  };

  const resetModalPosition = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const showModal = () => {
    setIsVisible(true);
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (isOpen) {
      showModal();
    } else {
      hideModal();
    }
    setIsVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setMaxHeight('90%');
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setMaxHeight('95%');
      },
    );

    // Cleanup function
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <Modal
      style={styles.sectionModal}
      transparent
      visible={isVisible}
      onRequestClose={handleRequstClose}>
      <View
        style={[
          styles.modalContainer,
          backdrop ? styles.backgroundContainer : '',
        ]}>
        <TouchableOpacity
          onPress={() => handleRequstClose()}
          style={styles.buttonClose}>
          <View></View>
        </TouchableOpacity>

        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={styles.sectionKeyboard}>
          <Animated.View
            style={[
              styles.bottomSheet,
              {transform: [{translateY}]},
              {height: !height ? 'auto' : height},
            ]}>
            {buttonClose && (
              <TouchableOpacity
                onPress={handleRequstClose}
                style={styles.buttonClose1}>
                <Icon name="times" />
              </TouchableOpacity>
            )}
            <>
              {closable && (
                <View {...panResponder.panHandlers} style={styles.panResStyle}>
                  <Icon name="window-minimize" size={22} />
                </View>
              )}
              <SafeAreaView
                style={{
                  maxHeight: maxHeight,
                  flexGrow: 1,
                  backgroundColor: 'white',
                }}>
                {children}
              </SafeAreaView>
            </>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 4,
    height: 40,
    backgroundColor: 'white',
    color: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  selectContainer: {
    borderBottomWidth: 0.5,
    borderColor: '#dddd',
  },
  bottomSheet: {
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: Platform.OS == 'ios' ? 15 : 5,
    top: 0,
    maxHeight: Dimensions.get('window').height - 50,
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  sectionModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  backgroundContainer: {backgroundColor: 'rgba(0, 0, 0, 0.5)'},
  buttonClose: {width: '100%', height: '100%'},
  sectionKeyboard: {justifyContent: 'flex-end', bottom: 0},
  buttonClose1: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 50,
    top: -50,
    right: 24,
  },
  panResStyle: {alignItems: 'center', paddingBottom: 20},
});
