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
  const [newPurchase, setNewPurchase] = useState({ cost: '', type: '', description: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const total = purchases.reduce((sum, purchase) => sum + parseFloat(purchase.cost || 0), 0);
    setTotalSpending(total);
  }, [purchases]);

  useEffect(() => {
    const loadPurchases = async () => {
      try {
        const data = await AsyncStorage.getItem('purchases');
        if (data) {
          setPurchases(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error loading purchases:', error);
      }
    };

    loadPurchases();
  }, []);

  const savePurchases = async (newPurchases) => {
    try {
      await AsyncStorage.setItem('purchases', JSON.stringify(newPurchases));
      setPurchases(newPurchases);
    } catch (error) {
      console.error('Error saving purchases:', error);
    }
  };

  const addPurchase = () => {
    if (!newPurchase.cost || !newPurchase.type) {
      return;
    }
    savePurchases([...purchases, newPurchase]);
    setNewPurchase({ cost: '', type: '', description: '' });
    setShowModal(false);
  };

  const deletePurchase = (index) => {
    const newPurchases = [...purchases];
    newPurchases.splice(index, 1);
    savePurchases(newPurchases);
  };

  return (
    <View style={styles.container}>
      <TotalSpending totalSpending={totalSpending} />
      <PurchaseList purchases={purchases} deletePurchase={deletePurchase} />

      {/* Модальное окно вынесено в отдельный компонент */}
      <ModalForm
        showModal={showModal}
        setShowModal={setShowModal}
        newPurchase={newPurchase}
        onTypeChange={(text) => setNewPurchase({ ...newPurchase, type: text })}
        onDescriptionChange={(text) => setNewPurchase({ ...newPurchase, description: text })}
        onPriceChange={(text) => setNewPurchase({ ...newPurchase, cost: text })}
        addPurchase={addPurchase}
      />

      {/* Нижний навбар вынесен в отдельный компонент */}
      <BottomNavBar setShowModal={setShowModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 16,
  },
});

export default App;
