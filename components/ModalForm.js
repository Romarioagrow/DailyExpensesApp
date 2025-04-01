import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';

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

const ModalForm = ({ visible, onClose, onSubmit }) => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const getCategoryIcon = (cat) => {
    switch (cat) {
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

  const handleSubmit = () => {
    const purchase = {
      category: category === 'Other' ? customCategory : category,
      description,
      amount: parseFloat(amount),
      date: format(date, 'dd.MM.yyyy')
    };
    onSubmit(purchase);
    setCategory('');
    setDescription('');
    setAmount('');
    setCustomCategory('');
    setDate(new Date());
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesScroll}
            >
              <View style={styles.categories}>
                {Object.values(CATEGORIES).map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryButton,
                      category === cat && styles.categoryButtonActive,
                    ]}
                    onPress={() => setCategory(cat)}
                  >
                    <View style={[
                      styles.iconContainer,
                      category === cat && styles.iconContainerActive
                    ]}>
                      <Icon
                        name={getCategoryIcon(cat)}
                        size={24}
                        color={category === cat ? '#FFF' : '#666'}
                      />
                    </View>
                    <Text
                      style={[
                        styles.categoryText,
                        category === cat && styles.categoryTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {category === 'Other' && (
              <TextInput
                style={styles.input}
                placeholder="Enter custom category"
                value={customCategory}
                onChangeText={setCustomCategory}
                placeholderTextColor="#999"
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              placeholderTextColor="#999"
            />

            <View style={styles.bottomRow}>
              <TextInput
                style={styles.priceInput}
                placeholder="Price"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                placeholderTextColor="#999"
              />

              <View style={styles.currencyPicker}>
                <Text style={styles.currencyText}>₽</Text>
              </View>

              <TouchableOpacity 
                style={styles.datePicker}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {format(date, 'dd.MM.yyyy')}
                </Text>
                <Icon name="calendar" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}

            <TouchableOpacity 
              style={[
                styles.addButton,
                (!amount || !category) && styles.addButtonDisabled
              ]} 
              onPress={handleSubmit}
              disabled={!amount || !category}
            >
              <Text style={styles.addButtonText}>Add Purchase</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  categoriesScroll: {
    marginBottom: 20,
  },
  categories: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryButtonActive: {
    opacity: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconContainerActive: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
  },
  categoryTextActive: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  priceInput: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginRight: 10,
  },
  currencyPicker: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginRight: 10,
  },
  currencyText: {
    fontSize: 16,
    color: '#333',
  },
  datePicker: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default ModalForm;
