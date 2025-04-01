import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PurchaseList = ({ purchase }) => {
  const { description, category, date, amount } = purchase;

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Food': return 'silverware-fork-knife';
      case 'Groceries': return 'cart';
      case 'Alcohol': return 'glass-wine';
      case 'Transport': return 'car';
      case 'Shopping': return 'shopping';
      case 'Entertainment': return 'gamepad-variant';
      case 'Health': return 'medical-bag';
      case 'House': return 'home';
      case 'Cafe': return 'coffee';
      case 'Taxi': return 'taxi';
      case 'Gifts': return 'gift';
      default: return 'dots-horizontal';
    }
  };

  return (
    <View style={styles.purchaseItem}>
      <View style={styles.iconContainer}>
        <Icon name={getCategoryIcon(category)} size={24} color="#666" />
      </View>
      <View style={styles.purchaseInfo}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.amount}>{amount}₽</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  purchaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  purchaseInfo: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default PurchaseList;

