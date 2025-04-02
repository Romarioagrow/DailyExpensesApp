import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CATEGORY_ICONS = {
  'Еда': '🍔',
  'Транспорт': '🚗',
  'Жильё': '🏠',
  'Одежда': '👗',
};

const CategorySummary = ({ expenses }) => {
  const categoryTotals = expenses.reduce((acc, expense) => {
    const category = expense.category;
    acc[category] = (acc[category] || 0) + Number(expense.amount);
    return acc;
  }, {});

  const categories = [
    { name: 'Еда', total: categoryTotals['Еда'] || 0 },
    { name: 'Транспорт', total: categoryTotals['Транспорт'] || 0 },
    { name: 'Жильё', total: categoryTotals['Жильё'] || 0 },
    { name: 'Одежда', total: categoryTotals['Одежда'] || 0 },
  ];

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <View key={category.name} style={styles.categoryItem}>
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryIcon}>
              {CATEGORY_ICONS[category.name]}
            </Text>
            <Text style={styles.categoryName}>{category.name}</Text>
          </View>
          <Text style={styles.categoryAmount}>
            {category.total.toLocaleString()} ₽
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    color: '#000',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default CategorySummary; 