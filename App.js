import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PurchaseList from './components/PurchaseList';
import PurchaseForm from './components/PurchaseForm';
import TotalSpending from './components/TotalSpending';

const App = () => {
  const [purchases, setPurchases] = useState([]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [newPurchase, setNewPurchase] = useState({
    cost: '',
    date: new Date(),
    type: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const total = purchases.reduce(
        (sum, purchase) => sum + parseFloat(purchase.cost),
        0
    );
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
    if (!newPurchase.cost || !newPurchase.date || !newPurchase.type) {
      return;
    }
    savePurchases([...purchases, newPurchase]);
    setNewPurchase({ cost: '', date: new Date(), type: '' });
  };

  const deletePurchase = (index) => {
    const newPurchases = [...purchases];
    newPurchases.splice(index, 1);
    savePurchases(newPurchases);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || newPurchase.date;
    setShowDatePicker(false);
    setNewPurchase({ ...newPurchase, date: currentDate });
  };

  return (
      <View style={styles.container}>
        <TotalSpending totalSpending={totalSpending} />
        <PurchaseList purchases={purchases} deletePurchase={deletePurchase} />
        <PurchaseForm
            newPurchase={newPurchase}
            onTypeChange={(text) => setNewPurchase({ ...newPurchase, type: text })}
            onDescriptionChange={(text) => setNewPurchase({ ...newPurchase, description: text })}
            onDateChange={onDateChange}
            onPriceChange={(text) => setNewPurchase({ ...newPurchase, cost: text })}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
            addPurchase={addPurchase}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  purchaseList: {
    flex: 1,
  },
});

export default App;
