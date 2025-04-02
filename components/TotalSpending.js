import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TotalSpending = ({ amount }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>потрачено сегодня</Text>
      <Text style={styles.amount}>{amount} ₽</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default TotalSpending;
