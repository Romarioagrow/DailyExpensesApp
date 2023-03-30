import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Dimensions} from 'react-native';
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

  let currencySymbol = '$';
  return (
      <View style={styles.container}>
        <Text style={styles.header}>Monthly Spending: ${totalSpending.toFixed(2)}</Text>
        <ScrollView style={styles.purchaseList}>
          {purchases.map((purchase, index) => (
              <View key={index} style={styles.purchaseItem}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemType}>{purchase.type}</Text>
                  <Text style={styles.itemDescription}>{purchase.description}</Text>
                  <Text style={styles.itemDate}>{new Date(purchase.date).toLocaleDateString()}</Text>
                </View>
                <Text style={styles.itemPrice}>{currencySymbol}{purchase.cost}</Text>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                      const filteredPurchases = purchases.filter(p => p !== purchase);
                      savePurchases(filteredPurchases);
                    }}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
          ))}
        </ScrollView>
        <View style={styles.addButtonRow}>
          <Text style={styles.addNewLabel}>Add new</Text>
          <TouchableOpacity style={styles.addButton} onPress={addPurchase}>
            <Text style={styles.buttonText}>Add Purchase</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.newPurchase}>
          <View style={styles.purchaseTypeCol}>
            <TextInput
                style={styles.purchaseTypeInput}
                placeholder="Type"
                value={newPurchase.type}
                onChangeText={(text) => setNewPurchase({ ...newPurchase, type: text })}
            />
            <TextInput
                style={styles.itemDescriptionInput}
                placeholder="Description"
                value={newPurchase.description}
                onChangeText={(text) => setNewPurchase({ ...newPurchase, description: text })}
                multiline
                numberOfLines={4}
            />
          </View>
          <View style={styles.datePickerCol}>
            <TouchableOpacity style={styles.datePickerButton} onPress={showDatepicker}>
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
          </View>
          <View style={styles.priceCol}>
            <TextInput
                style={styles.priceInput}
                placeholder="Price"
                value={newPurchase.cost}
                onChangeText={(text) => setNewPurchase({ ...newPurchase, cost: text })}
                keyboardType="numeric"
            />
          </View>
        </View>
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
  purchaseList: {
    flex: 1,
  },
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
  newPurchase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderTopColor: '#CCCCCC',
    borderTopWidth: 1,
  },
  purchaseTypeCol: {
    flex: 1,
  },
  datePickerCol: {
    flex: 1,
    alignItems: 'center',
  },
  priceCol: {
    flex: 1,
    alignItems: 'flex-end',
  },
  purchaseTypeInput: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
  },
  itemDescriptionInput: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    padding: 8,
    flexGrow: 1,
    textAlignVertical: 'top',
    height: Dimensions.get('window').height * 0.1,
  },
  dateText: {
    fontSize: 16,
  },
  priceInput: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
  },
  addButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  addNewLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default App;
