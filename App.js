import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PurchaseList from './components/PurchaseList';
import TotalSpending from './components/TotalSpending';
import PurchaseForm from './components/PurchaseForm';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

      {/* Модальное окно для формы */}
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <PurchaseForm
              newPurchase={newPurchase}
              onTypeChange={(text) => setNewPurchase({ ...newPurchase, type: text })}
              onDescriptionChange={(text) => setNewPurchase({ ...newPurchase, description: text })}
              onPriceChange={(text) => setNewPurchase({ ...newPurchase, cost: text })}
              addPurchase={addPurchase}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
          <Icon name="add" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 16,  // Паддинг для главного экрана
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Затемнённый фон
  },
  modalView: {
    backgroundColor: '#FFFFFF',  // Непрозрачный белый фон
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: '#6200EE',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -30,  // Поднимаем кнопку над Bottom Bar
    zIndex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default App;
