import React from 'react';
import {View, StyleSheet, Animated, Easing, Dimensions} from 'react-native';

const SkeletonLoader = ({
  width = '100%',
  height = '100%',
  borderRadius = 4,
  style = {},
  isText = false,
}: {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: any;
  isText?: boolean;
}) => {
  const shimmerAnimation = new Animated.Value(0);

  React.useEffect(() => {
    const animate = () => {
      shimmerAnimation.setValue(0);
      Animated.timing(shimmerAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => animate());
    };

    animate();

    return () => shimmerAnimation.stopAnimation();
  }, []);

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  // Jika untuk text, atur height berdasarkan fontSize
  const textHeight = isText
    ? typeof style.fontSize === 'number'
      ? style.fontSize * 1.2
      : 16
    : undefined;

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height: isText ? textHeight : height,
          borderRadius,
          overflow: 'hidden',
        },
        style,
      ]}>
      <View style={[styles.background, {height: '100%'}]} />

      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{translateX}],
            height: '100%',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e1e1',
    position: 'relative',
  },
  background: {
    backgroundColor: '#e1e1e1',
    position: 'absolute',
    width: '100%',
  },
  shimmer: {
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default SkeletonLoader;
