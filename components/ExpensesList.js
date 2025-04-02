import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { format, isToday, isYesterday } from 'date-fns';
import { ru } from 'date-fns/locale';

const EXPENSE_ICONS = {
  'Продукты': '🍔',
  'Транспорт': '🚗',
  'Жильё': '🏠',
  'Одежда': '👗',
  'Метро': '🚇',
  'Автобус': '🚌',
  'default': '💰'
};

const formatDate = (date) => {
  const expenseDate = new Date(date);
  if (isToday(expenseDate)) {
    return `Сегодня ${format(expenseDate, 'HH:mm')}`;
  }
  if (isYesterday(expenseDate)) {
    return `Вчера ${format(expenseDate, 'HH:mm')}`;
  }
  return format(expenseDate, 'd MMMM HH:mm', { locale: ru });
};

const ExpensesList = ({ expenses, onDelete, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Расходы</Text>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {expenses.map((expense) => (
          <TouchableOpacity
            key={expense.id}
            style={styles.expenseItem}
            onLongPress={() => onDelete(expense.id)}
          >
            <Text style={styles.icon}>
              {EXPENSE_ICONS[expense.category] || EXPENSE_ICONS.default}
            </Text>
            <View style={styles.expenseInfo}>
              <Text style={styles.expensePlace}>{expense.place || expense.category}</Text>
              <Text style={styles.expenseDate}>
                {formatDate(expense.date)}
              </Text>
            </View>
            <Text style={styles.expenseAmount}>
              {Number(expense.amount).toLocaleString('ru-RU')} ₽
            </Text>
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
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    padding: 16,
    paddingBottom: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  expenseInfo: {
    flex: 1,
  },
  expensePlace: {
    fontSize: 16,
    color: '#000',
  },
  expenseDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginLeft: 16,
  },
});

export default ExpensesList; 