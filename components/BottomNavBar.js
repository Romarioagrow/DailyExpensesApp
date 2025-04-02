import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BottomNavBar = () => {
  return (
    <View style={styles.container}>
      <Icon name="home" size={24} color="#000" />
      <Icon name="bar-chart" size={24} color="#666" />
      <View style={styles.placeholder} />
      <Icon name="folder" size={24} color="#666" />
      <Icon name="person" size={24} color="#666" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  placeholder: {
    width: 24,
  },
});

export default BottomNavBar;
