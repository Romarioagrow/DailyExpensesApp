import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BottomNavBar = ({ setShowModal }) => {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <Icon name="add" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: '#6200EE',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -30,
    zIndex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default BottomNavBar;
