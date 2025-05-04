import React, {useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';

type TabItem = {
  slug: string;
  name: string;
};

type Props = {
  data: TabItem[];
  activeId: string;
  onTabPress: (item: TabItem) => void;
};

const {width} = Dimensions.get('window');

const TabList = ({data, activeId, onTabPress}: Props) => {
  const listRef = useRef<FlashList<any>>(null);

  const handlePress = (item: TabItem) => {
    onTabPress(item);
    listRef.current?.scrollToIndex({
      index: data.findIndex(i => i.slug === item.slug),
      animated: true,
      viewPosition: 0.5,
    });
  };

  const renderItem = ({item}: {item: TabItem}) => {
    const isActive = activeId === item.slug;

    return (
      <TouchableOpacity
        style={[styles.tabItem, isActive && styles.activeTab]}
        onPress={() => handlePress(item)}>
        <Text style={[styles.tabText, isActive && styles.activeText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlashList
        ref={listRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.slug}
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={width / 5}
        contentContainerStyle={styles.listContainer}
        extraData={activeId}
        estimatedListSize={{
          width: width,
          height: 60,
        }}
      />
    </View>
  );
};

export default TabList;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#f8f8f8',
    paddingVertical: 8,
  },
  listContainer: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 6,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: '#6200ee',
  },
  tabText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  activeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
