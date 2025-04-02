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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 8,
  },
  content: {
    flex: 1,
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
  },
  addButton: {
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
