import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpensesList from './components/ExpensesList';
import TotalSpending from './components/TotalSpending';
import AddExpenseModal from './components/AddExpenseModal';
import BottomNavBar from './components/BottomNavBar';
import WeeklyChart from './components/WeeklyChart';
import CategorySummary from './components/CategorySummary';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
      <View style={styles.content}>
        <TotalSpending amount={getTodayTotal()} />
        
        <View style={styles.card}>
          <WeeklyChart 
            expenses={expenses}
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
        </View>

        <View style={styles.card}>
          <CategorySummary expenses={expenses} />
        </View>

        <View style={styles.card}>
          <ExpensesList 
            expenses={expenses}
            onDelete={deleteExpense}
          />
        </View>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowModal(true)}
        >
          <Icon name="add" size={24} color="#FFF" />
        </TouchableOpacity>

        <AddExpenseModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onAdd={addExpense}
        />

        <BottomNavBar />
      </View>
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
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginTop: 16,
    overflow: 'hidden',
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: '50%',
    transform: [{ translateX: 28 }],
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6979F8',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});

export default App;
