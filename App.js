import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpensesList from './components/ExpensesList';
import TotalSpending from './components/TotalSpending';
import AddExpenseModal from './components/AddExpenseModal';
import ExpandableStats from './components/ExpandableStats';
import uuid from 'react-native-uuid';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await AsyncStorage.getItem('expenses');
      if (data) {
        setExpenses(JSON.parse(data));
      }
    } catch (error) {
      console.error('Ошибка при загрузке расходов:', error);
    }
  };

  const saveExpenses = async (newExpenses) => {
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(newExpenses));
      setExpenses(newExpenses);
    } catch (error) {
      console.error('Ошибка при сохранении расходов:', error);
    }
  };

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: uuid.v4(),
      date: new Date().toISOString(),
    };
    const newExpenses = [newExpense, ...expenses];
    saveExpenses(newExpenses);
    setShowModal(false);
  };

  const deleteExpense = (id) => {
    const newExpenses = expenses.filter(expense => expense.id !== id);
    saveExpenses(newExpenses);
  };

  const getTodayTotal = () => {
    const today = new Date().toDateString();
    return expenses
      .filter(expense => new Date(expense.date).toDateString() === today)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.statsContainer}>
          <TotalSpending 
            amount={getTodayTotal()} 
            onAddPress={() => setShowModal(true)}
          />
          <ExpandableStats
            expenses={expenses}
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
        </View>

        <ExpensesList 
          expenses={expenses}
          onDelete={deleteExpense}
          style={styles.expensesList}
        />

        <AddExpenseModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onAdd={addExpense}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  statsContainer: {
    marginTop: 16,
  },
  expensesList: {
    marginTop: 16,
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default App;
