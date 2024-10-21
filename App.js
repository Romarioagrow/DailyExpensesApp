import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PurchaseList from './components/PurchaseList';
import TotalSpending from './components/TotalSpending';
import ModalForm from './components/ModalForm';
import BottomNavBar from './components/BottomNavBar';

const App = () => {
  const [purchases, setPurchases] = useState([]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [newPurchase, setNewPurchase] = useState({
    cost: '',
    type: '',
    description: '',
    date: new Date(), // Указываем дату по умолчанию
  });
  const [showModal, setShowModal] = useState(false);

  // Подсчет общего расхода
  useEffect(() => {
    const total = purchases.reduce((sum, purchase) => sum + parseFloat(purchase.cost || 0), 0);
    setTotalSpending(total);
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
    if (!newPurchase.cost || !newPurchase.type) {
      return;
    }
    const newPurchases = [...purchases, { ...newPurchase }];
    savePurchases(newPurchases);
    setNewPurchase({ cost: '', type: '', description: '', date: new Date() }); // Сбрасываем форму
    setShowModal(false);
  };

  // Удаление покупки
  const deletePurchase = (index) => {
    const newPurchases = [...purchases];
    newPurchases.splice(index, 1);
    savePurchases(newPurchases);
  };

  return (
    <View style={styles.container}>
      <TotalSpending totalSpending={totalSpending} />
      <PurchaseList purchases={purchases} deletePurchase={deletePurchase} />

      {/* Модальное окно */}
      <ModalForm
        showModal={showModal}
        setShowModal={setShowModal}
        newPurchase={newPurchase}
        onTypeChange={(text) => setNewPurchase({ ...newPurchase, type: text })}
        onDescriptionChange={(text) => setNewPurchase({ ...newPurchase, description: text })}
        onPriceChange={(text) => setNewPurchase({ ...newPurchase, cost: text })}
        onDateChange={(date) => setNewPurchase({ ...newPurchase, date: date })} // Обрабатываем дату
        addPurchase={addPurchase}
      />

      {/* Нижний навбар */}
      <BottomNavBar setShowModal={setShowModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default App;
