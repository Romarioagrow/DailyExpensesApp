/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [purchases, setPurchases] = useState([]);
  const [totalSpending, setTotalSpending] = useState(0);
  const [newPurchase, setNewPurchase] = useState({cost: '', date: '', type: ''});

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

  useEffect(() => {
    loadPurchases();
  }, []);

  useEffect(() => {
    const total = purchases.reduce((sum, purchase) => sum + parseFloat(purchase.cost), 0);
    setTotalSpending(total);
  }, [purchases]);

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
    setNewPurchase({cost: '', date: '', type: ''});
  };

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Monthly Spending: ${totalSpending.toFixed(2)}</Text>
        <View style={styles.newPurchase}>
          <TextInput
              style={styles.input}
              placeholder="Cost"
              value={newPurchase.cost}
              onChangeText={(text) => setNewPurchase({...newPurchase, cost: text})}
              keyboardType="numeric"
          />
          <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              value={newPurchase.date}
              onChangeText={(text) => setNewPurchase({...newPurchase, date: text})}
          />
          <TextInput
              style={styles.input}
              placeholder="Type"
              value={newPurchase.type}
              onChangeText={(text) => setNewPurchase({...newPurchase, type: text})}
          />
          <TouchableOpacity style={styles.button} onPress={addPurchase}>
            <Text style={styles.buttonText}>Add Purchase</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.purchaseList}>
          {purchases.map((purchase, index) => (
              <View key={index} style={styles.purchaseItem}>
                <Text style={styles.purchaseText}>${purchase.cost} - {purchase.date} - {purchase.type}</Text>
              </View>
          ))}
        </ScrollView>
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
  newPurchase: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    padding: 8,
    marginRight: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  purchaseList: {
    flex: 1,
  },
  purchaseItem: {
    padding: 8,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
  purchaseText: {
    fontSize: 16,
  },
});

export default App;
