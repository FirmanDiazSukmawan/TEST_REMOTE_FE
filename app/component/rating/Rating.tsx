import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Rating = ({rating}: {rating: number}) => {
  const validRating = typeof rating === 'number' ? rating : 0;

  const renderStars = (newRating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < newRating) {
        stars.push(<Icon key={i} name="star" size={20} color="#FFD700" />);
      } else {
        stars.push(
          <Icon key={i} name="star-border" size={20} color="#FFD700" />,
        );
      }
    }
    return stars;
  };

  return (
    <View style={styles.ratingContainer}>
      {renderStars(validRating)}
      <Text style={styles.ratingText}>({validRating.toFixed(1)})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#888',
  },
});

export default Rating;
