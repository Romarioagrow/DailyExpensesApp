import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TotalSpending = ({ amount, onAddPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>потрачено сегодня</Text>
        <Text style={styles.amount}>{amount.toLocaleString('ru-RU')} ₽</Text>
      </View>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={onAddPress}
      >
        <Icon name="add" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  amount: {
    fontSize: 32,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  addButton: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -24 }],
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6979F8',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});

export default TotalSpending;
