import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {dotColor} from '../color/TextColor';

const {width: screenWidth} = Dimensions.get('window');

const banners = [
  require('../../assets/picture/banner1.png'),
  require('../../assets/picture/banner1.png'),
  require('../../assets/picture/banner1.png'),
];

const AUTO_SCROLL_INTERVAL = 3000;

const Banner = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progressAnim.setValue(0);

    Animated.timing(progressAnim, {
      toValue: 1,
      duration: AUTO_SCROLL_INTERVAL,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [currentIndex, progressAnim]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={event => {
          const contentOffset = event?.nativeEvent?.contentOffset;
          const viewSize = event?.nativeEvent?.layoutMeasurement;
          const newIndex = Math.floor(contentOffset?.x / viewSize?.width);
          setCurrentIndex(newIndex);
        }}>
        {banners?.map((banner, index) => (
          <View key={index} style={styles.slide}>
            <Image source={banner} style={styles.image} />
          </View>
        ))}
      </ScrollView>

      <View style={styles.indicatorContainer}>
        {banners?.map((_, index) => (
          <View key={index} style={styles.indicatorWrapper}>
            {index === currentIndex ? (
              <View style={styles.activeIndicatorContainer}>
                <Animated.View
                  style={[
                    styles.progressBar,
                    {
                      width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ]}
                />
              </View>
            ) : (
              <View style={styles.inactiveIndicator} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: '100%',
  },
  slide: {
    width: screenWidth,
    height: 130,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  indicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    gap: 8,
  },
  indicatorWrapper: {
    width: 20,
    height: 4,
  },
  activeIndicatorContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: dotColor,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'white',
  },
  inactiveIndicator: {
    width: '100%',
    height: '100%',
    backgroundColor: dotColor,
    borderRadius: 2,
    opacity: 0.5,
  },
});
