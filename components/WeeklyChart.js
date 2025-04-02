import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format, startOfWeek, eachDayOfInterval, addDays } from 'date-fns';
import { ru } from 'date-fns/locale';

const WeeklyChart = ({ expenses, selectedPeriod, onPeriodChange }) => {
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({
    start: startOfCurrentWeek,
    end: addDays(startOfCurrentWeek, 6),
  });

  const getDayExpenses = (date) => {
    return expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return format(expenseDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
      })
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
  };

  const maxAmount = Math.max(...weekDays.map(day => getDayExpenses(day)));

  return (
    <View style={styles.container}>
      <View style={styles.periodSelector}>
        <Text style={[
          styles.periodOption,
          selectedPeriod === 'week' && styles.periodOptionActive
        ]}>Неделя</Text>
        <Text style={[
          styles.periodOption,
          selectedPeriod === 'month' && styles.periodOptionActive
        ]}>Месяц</Text>
        <Text style={[
          styles.periodOption,
          selectedPeriod === 'year' && styles.periodOptionActive
        ]}>Год</Text>
      </View>

      <View style={styles.chart}>
        {weekDays.map((day, index) => {
          const dayExpenses = getDayExpenses(day);
          const height = maxAmount > 0 ? (dayExpenses / maxAmount) * 100 : 0;

          return (
            <View key={index} style={styles.barContainer}>
              <View style={[styles.bar, { height: `${height}%` }]} />
              <Text style={styles.dayLabel}>
                {format(day, 'EEEEEE', { locale: ru }).toUpperCase()}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  periodOption: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  periodOptionActive: {
    color: '#000',
    fontWeight: '600',
  },
  chart: {
    flexDirection: 'row',
    height: 150,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
  },
  bar: {
    width: 20,
    backgroundColor: '#E0E7FF',
    borderRadius: 10,
    marginBottom: 8,
  },
  dayLabel: {
    fontSize: 12,
    color: '#666',
  },
});

export default WeeklyChart; 