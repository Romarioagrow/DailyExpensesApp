import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const CategorySummary = ({ expenses }) => {
  // Подсчитываем суммы по категориям
  const categoryTotals = expenses.reduce((acc, expense) => {
    const category = expense.category;
    if (!acc[category]) {
      acc[category] = {
        total: 0,
        icon: expense.icon || '💰'
      };
    }
    acc[category].total += Number(expense.amount);
    return acc;
  }, {});

  // Преобразуем в массив и сортируем по убыванию
  const sortedCategories = Object.entries(categoryTotals)
    .map(([name, data]) => ({
      name,
      total: data.total,
      icon: data.icon
    }))
    .sort((a, b) => b.total - a.total);

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sortedCategories.map((category) => (
          <View key={category.name} style={styles.categoryItem}>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryIcon}>
                {category.icon}
              </Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
            <Text style={styles.categoryAmount}>
              {category.total.toLocaleString('ru-RU')} ₽
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: 280, // Фиксированная высота для 4 элементов
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    height: 70, // Фиксированная высота для каждого элемента
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