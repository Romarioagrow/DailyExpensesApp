import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PurchaseList from './components/PurchaseList';
import TotalSpending from './components/TotalSpending';
import ModalForm from './components/ModalForm';
import uuid from 'react-native-uuid'; // Импортируем библиотеку для генерации уникальных id

const CATEGORIES = {
  FOOD: 'Food',
  ALCOHOL: 'Alcohol',
  TRANSPORT: 'Transport',
  OTHER: 'Other'
};

const DAILY_LIMIT = 1500; // Daily spending limit in rubles

const App = () => {
  const [purchases, setPurchases] = useState([]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [todaySpending, setTodaySpending] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [newPurchase, setNewPurchase] = useState({
    id: '', // Добавляем id для каждой покупки
    cost: '',
    category: '',
    description: '',
    date: new Date(), // Указываем дату по умолчанию
  });
  const [showModal, setShowModal] = useState(false);

  // Подсчет общего расхода
  useEffect(() => {
    const total = purchases.reduce((sum, purchase) => sum + parseFloat(purchase.cost || 0), 0);
    setTotalSpending(total);

    // Calculate today's spending
    const today = new Date();
    const todayPurchases = purchases.filter(purchase => 
      purchase.date.getDate() === today.getDate() &&
      purchase.date.getMonth() === today.getMonth() &&
      purchase.date.getFullYear() === today.getFullYear()
    );
    const todayTotal = todayPurchases.reduce((sum, purchase) => sum + parseFloat(purchase.cost || 0), 0);
    setTodaySpending(todayTotal);

    // Calculate category totals
    const catTotals = purchases.reduce((acc, purchase) => {
      const category = purchase.category || 'Other';
      acc[category] = (acc[category] || 0) + parseFloat(purchase.cost || 0);
      return acc;
    }, {});
    setCategoryTotals(catTotals);
  }, [purchases]);

  // Загрузка покупок из AsyncStorage
  useEffect(() => {
    const loadPurchases = async () => {
      try {
        const data = await AsyncStorage.getItem('purchases');
        if (data) {
          const parsedPurchases = JSON.parse(data).map((purchase) => ({
            ...purchase,
            date: new Date(purchase.date), // Преобразуем строку в объект Date
          }));
          setPurchases(parsedPurchases);
        }
      } catch (error) {
        console.error('Error loading purchases:', error);
      }
    };
    loadPurchases();
  }, []);

  // Сохранение покупок в AsyncStorage
  const savePurchases = async (newPurchases) => {
    try {
      const purchasesToSave = newPurchases.map((purchase) => ({
        ...purchase,
        date: purchase.date.toISOString(), // Преобразуем дату в строку ISO перед сохранением
      }));
      await AsyncStorage.setItem('purchases', JSON.stringify(purchasesToSave));
      setPurchases(newPurchases);
    } catch (error) {
      console.error('Error saving purchases:', error);
    }
  };

  // Добавление новой покупки
  const addPurchase = () => {
    if (!newPurchase.cost || !newPurchase.category) {
      return;
    }
    const purchaseWithId = { ...newPurchase, id: uuid.v4() }; // Добавляем уникальный id
    const newPurchases = [...purchases, purchaseWithId];
    savePurchases(newPurchases);
    setNewPurchase({ id: '', cost: '', category: '', description: '', date: new Date() }); // Сбрасываем форму
    setShowModal(false);
  };

  // Удаление покупки
  const deletePurchase = (id) => {
    const newPurchases = purchases.filter((purchase) => purchase.id !== id); // Удаляем по id
    savePurchases(newPurchases);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5FCFF" />
      <View style={styles.content}>
        <TotalSpending 
          totalSpending={totalSpending}
          todaySpending={todaySpending}
          dailyLimit={DAILY_LIMIT}
          categoryTotals={categoryTotals}
        />
        <PurchaseList 
          purchases={purchases} 
          deletePurchase={deletePurchase} 
          onAddPress={() => setShowModal(true)}
        />
      </View>
      
      <ModalForm
        showModal={showModal}
        setShowModal={setShowModal}
        newPurchase={newPurchase}
        categories={CATEGORIES}
        onCategoryChange={(category) => setNewPurchase({ ...newPurchase, category })}
        onDescriptionChange={(text) => setNewPurchase({ ...newPurchase, description: text })}
        onPriceChange={(text) => setNewPurchase({ ...newPurchase, cost: text })}
        onDateChange={(date) => setNewPurchase({ ...newPurchase, date })}
        addPurchase={addPurchase}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  content: {
    flex: 1,
  },
});

export default App;
