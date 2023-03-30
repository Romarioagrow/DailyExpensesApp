import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

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

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Monthly Spending: ${totalSpending.toFixed(2)}</Text>
        <View style={styles.newPurchase}>
          <TextInput
              style={styles.input}
              placeholder="Cost"
              value={newPurchase.cost}
              onChangeText={(text) => setNewPurchase({ ...newPurchase, cost: text })}
              keyboardType="numeric"
          />
          <TouchableOpacity style={styles.input} onPress={showDatepicker}>
            <Text style={styles.dateText}>{newPurchase.date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
              <DateTimePicker
                  testID="dateTimePicker"
                  value={newPurchase.date}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
              />
          )}
          <TextInput
              style={styles.input}
              placeholder="Type"
              value={newPurchase.type}
              onChangeText={(text) => setNewPurchase({ ...newPurchase, type: text })}
          />
          <TouchableOpacity style={styles.button} onPress={addPurchase}>
            <Text style={styles.buttonText}>Add Purchase</Text>
          </TouchableOpacity>
        </View>
        {/*Scroll view with purchase items*/}
        <ScrollView style={styles.purchaseList}>
          {purchases.map((purchase, index) => (
              <View key={index} style={styles.purchaseItem}>
                <View style={styles.leftSide}>
                  <Text style={styles.itemType}>{purchase.type}</Text>
                  <Text style={styles.itemDescription}>Description</Text>
                  <Text style={styles.itemDate}>{new Date(purchase.date).toLocaleDateString()}</Text>
                </View>
                <View style={styles.rightSide}>
                  <Text style={styles.itemPrice}>{'$'+`${purchase.cost}`}</Text>
                </View>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                      const filteredPurchases = purchases.filter((p) => p !== purchase);
                      savePurchases(filteredPurchases);
                    }}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
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
  // purchaseItem: {
  //   padding: 8,
  //   borderBottomColor: '#CCCCCC',
  //   borderBottomWidth: 1,
  // },
  purchaseText: {
    fontSize: 16,
  },
  purchaseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
  leftSide: {
    flex: 3,
    justifyContent: 'space-between',
  },
  rightSide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  itemType: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDate: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
