import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TotalSpending from './components/TotalSpending';
import PurchaseList from './components/PurchaseList';
import ModalForm from './components/ModalForm';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CATEGORIES = {
  Other: 'Other',
  Food: 'Food',
  Groceries: 'Groceries',
  Alcohol: 'Alcohol',
  Transport: 'Transport',
  Shopping: 'Shopping',
  Entertainment: 'Entertainment',
  Health: 'Health',
  House: 'House',
  Cafe: 'Cafe',
  Taxi: 'Taxi',
  Gifts: 'Gifts'
};

const App = () => {
  const [purchases, setPurchases] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalSpending, setTotalSpending] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Получаем список используемых категорий
  const usedCategories = React.useMemo(() => {
    const categories = new Set(); // Убираем Other из начального набора
    purchases.forEach(purchase => {
      if (purchase.category !== 'Other') { // Исключаем Other из списка
        categories.add(purchase.category);
      }
    });
    return Array.from(categories);
  }, [purchases]);

  useEffect(() => {
    loadPurchases();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [purchases]);

  const loadPurchases = async () => {
    try {
      const savedPurchases = await AsyncStorage.getItem('purchases');
      if (savedPurchases) {
        setPurchases(JSON.parse(savedPurchases));
      }
    } catch (error) {
      console.error('Error loading purchases:', error);
    }
  };

  const calculateTotals = () => {
    const totals = {};
    let total = 0;

    purchases.forEach(purchase => {
      total += purchase.amount;
      totals[purchase.category] = (totals[purchase.category] || 0) + purchase.amount;
    });

    setTotalSpending(total);
    setCategoryTotals(totals);
  };

  const handleAddPurchase = async (purchase) => {
    const newPurchase = {
      ...purchase,
      id: Date.now().toString(),
    };

    const updatedPurchases = [...purchases, newPurchase];
    setPurchases(updatedPurchases);

    try {
      await AsyncStorage.setItem('purchases', JSON.stringify(updatedPurchases));
    } catch (error) {
      console.error('Error saving purchase:', error);
    }

    setModalVisible(false);
  };

  const handleDeletePurchase = async (id) => {
    const updatedPurchases = purchases.filter(purchase => purchase.id !== id);
    setPurchases(updatedPurchases);

    try {
      await AsyncStorage.setItem('purchases', JSON.stringify(updatedPurchases));
    } catch (error) {
      console.error('Error deleting purchase:', error);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Food': return 'silverware-fork-knife';
      case 'Groceries': return 'cart';
      case 'Alcohol': return 'glass-wine';
      case 'Transport': return 'car';
      case 'Shopping': return 'shopping';
      case 'Entertainment': return 'gamepad-variant';
      case 'Health': return 'medical-bag';
      case 'House': return 'home';
      case 'Cafe': return 'coffee';
      case 'Taxi': return 'taxi';
      case 'Gifts': return 'gift';
      default: return 'dots-horizontal';
    }
  };

  const filteredPurchases = selectedCategory 
    ? purchases.filter(p => p.category === selectedCategory)
    : purchases;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <TotalSpending totalSpending={totalSpending} categoryTotals={categoryTotals} />
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Add purchase</Text>
        </TouchableOpacity>
        
        <View style={styles.categoriesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.categories}>
              {usedCategories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(selectedCategory === category ? null : category)}
                >
                  <View style={[
                    styles.iconContainer,
                    selectedCategory === category && styles.iconContainerActive
                  ]}>
                    <Icon
                      name={getCategoryIcon(category)}
                      size={24}
                      color={selectedCategory === category ? '#FFF' : '#666'}
                    />
                  </View>
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === category && styles.categoryTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <ScrollView style={styles.purchaseList}>
          {filteredPurchases.map((purchase) => (
            <PurchaseList
              key={purchase.id}
              purchase={purchase}
              onLongPress={() => handleDeletePurchase(purchase.id)}
            />
          ))}
        </ScrollView>
        
        <ModalForm
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleAddPurchase}
          usedCategories={usedCategories}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categoriesContainer: {
    height: 75,
    backgroundColor: '#fff',
  },
  categories: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 15,
  },
  categoryButtonActive: {
    opacity: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconContainerActive: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    fontSize: 11,
    color: '#666',
  },
  categoryTextActive: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  purchaseList: {
    flex: 1,
  },
});

export default App;
