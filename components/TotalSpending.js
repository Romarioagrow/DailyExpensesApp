import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TotalSpending = ({ amount, onAddPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.currencySymbol}>₽</Text>
      <View style={styles.content}>
        <Text style={styles.title}>потрачено сегодня</Text>
        <Text style={styles.amount}>{amount.toLocaleString('ru-RU')}</Text>
      </View>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={onAddPress}
      >
        <View style={styles.addButtonInner}>
          <Icon name="add" size={28} color="#FFF" />
        </View>
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
    paddingHorizontal: 24,
    position: 'relative',
    height: 120,
  },
  currencySymbol: {
    position: 'absolute',
    left: 24,
    top: '50%',
    transform: [{ translateY: -35 }],
    fontSize: 70,
    fontWeight: '500',
    color: '#000',
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
    right: 24,
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6979F8',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#6979F8',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  addButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6979F8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});

export default TotalSpending;
