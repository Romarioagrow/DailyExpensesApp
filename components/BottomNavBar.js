import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BottomNavBar = ({ onAddPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navButton}>
        <Icon name="home" size={24} color="#666" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Icon name="add" size={30} color="#FFF" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton}>
        <Icon name="bar-chart" size={24} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton}>
        <Icon name="folder" size={24} color="#666" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.navButton}>
        <Icon name="person" size={24} color="#666" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  navButton: {
    padding: 8,
  },
  addButton: {
    backgroundColor: '#6200EE',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    marginTop: -28,
  },
});

export default BottomNavBar;
