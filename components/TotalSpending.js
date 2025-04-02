import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TotalSpending = ({ amount }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>потрачено сегодня</Text>
      <Text style={styles.amount}>{amount.toLocaleString('ru-RU')} ₽</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingVertical: 16,
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
});

export default TotalSpending;
