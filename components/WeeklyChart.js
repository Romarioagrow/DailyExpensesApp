import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format, startOfWeek, eachDayOfInterval, addDays, isToday } from 'date-fns';
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
          selectedPeriod === 'today' && styles.periodOptionActive
        ]}>Сегодня</Text>
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

      <View style={styles.chartContainer}>
        <View style={styles.barsContainer}>
          {weekDays.map((day, index) => {
            const dayExpenses = getDayExpenses(day);
            const height = maxAmount > 0 ? (dayExpenses / maxAmount) * 85 : 0;
            const isCurrentDay = isToday(day);

            return (
              <View key={index} style={styles.barWrapper}>
                <View style={[
                  styles.bar, 
                  { height: `${height}%` },
                  isCurrentDay && styles.barActive
                ]} />
              </View>
            );
          })}
        </View>
        <View style={styles.labelsContainer}>
          {weekDays.map((day, index) => {
            const isCurrentDay = isToday(day);
            return (
              <Text 
                key={index} 
                style={[
                  styles.dayLabel,
                  isCurrentDay && styles.dayLabelActive
                ]}
              >
                {format(day, 'EEEEEE', { locale: ru }).toUpperCase()}
              </Text>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  periodOption: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  periodOptionActive: {
    color: '#000',
    fontWeight: '600',
  },
  chartContainer: {
    height: 140,
    marginBottom: 8,
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 24,
  },
  barWrapper: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: 16,
    backgroundColor: '#E0E7FF',
    borderRadius: 8,
  },
  barActive: {
    backgroundColor: '#6979F8',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  dayLabel: {
    fontSize: 11,
    color: '#666',
    width: 30,
    textAlign: 'center',
  },
  dayLabelActive: {
    color: '#6979F8',
    fontWeight: '600',
  },
});

export default WeeklyChart; 