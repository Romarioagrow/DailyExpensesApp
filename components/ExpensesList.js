import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const EXPENSE_ICONS = {
  'Продукты': '🍔',
  'Транспорт': '🚗',
  'Метро': '🚇',
  'Автобус': '🚌',
  'Одежда': '👗',
  'Жильё': '🏠',
};

const ExpensesList = ({ expenses, onDelete }) => {
  const formatDate = (date) => {
    const expenseDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (expenseDate.toDateString() === today.toDateString()) {
      return `Сегодня ${format(expenseDate, 'HH:mm')}`;
    } else if (expenseDate.toDateString() === yesterday.toDateString()) {
      return `Вчера ${format(expenseDate, 'HH:mm')}`;
    } else {
      return format(expenseDate, 'd MMMM', { locale: ru });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Расходы</Text>
      <ScrollView style={styles.list}>
        {expenses.map((expense) => (
          <TouchableOpacity
            key={expense.id}
            style={styles.expenseItem}
            onLongPress={() => onDelete(expense.id)}
          >
            <View style={styles.expenseIcon}>
              <Text style={styles.icon}>{EXPENSE_ICONS[expense.category] || '📝'}</Text>
            </View>
            <View style={styles.expenseInfo}>
              <Text style={styles.expenseName}>{expense.category}</Text>
              <Text style={styles.expensePlace}>{expense.place || ''}</Text>
            </View>
            <View style={styles.expenseDetails}>
              <Text style={styles.expenseAmount}>{expense.amount} ₽</Text>
              <Text style={styles.expenseDate}>{formatDate(expense.date)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  expenseIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  expenseInfo: {
    flex: 1,
    marginLeft: 12,
  },
  expenseName: {
    fontSize: 16,
    fontWeight: '500',
  },
  expensePlace: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  expenseDetails: {
    alignItems: 'flex-end',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  expenseDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default ExpensesList; 