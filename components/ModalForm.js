import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';

const ModalForm = ({
  showModal,
  setShowModal,
  newPurchase,
  categories,
  onCategoryChange,
  onDescriptionChange,
  onPriceChange,
  onDateChange,
  addPurchase,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const getCategoryIcon = (category) => {
    const icons = {
      Food: 'silverware-fork-knife',
      Groceries: 'cart',
      Alcohol: 'glass-wine',
      Transport: 'train-car',
      Shopping: 'shopping',
      Entertainment: 'gamepad-variant',
      Health: 'medical-bag',
      House: 'home',
      Cafe: 'coffee',
      Taxi: 'car',
      Gifts: 'gift',
      Other: 'dots-horizontal',
    };
    return icons[category] || 'dots-horizontal';
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  const handleCategorySelect = (category) => {
    if (category === 'Other') {
      setCustomCategory('');
    }
    onCategoryChange(category);
  };

  const handleCustomCategoryChange = (text) => {
    setCustomCategory(text);
    onCategoryChange(text);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
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
                {Object.values(categories).map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      newPurchase.category === category && styles.categoryButtonActive,
                    ]}
                    onPress={() => handleCategorySelect(category)}
                  >
                    <View style={[
                      styles.iconContainer,
                      newPurchase.category === category && styles.iconContainerActive
                    ]}>
                      <Icon
                        name={getCategoryIcon(category)}
                        size={24}
                        color={newPurchase.category === category ? '#FFF' : '#666'}
                      />
                    </View>
                    <Text
                      style={[
                        styles.categoryText,
                        newPurchase.category === category && styles.categoryTextActive,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {newPurchase.category === 'Other' && (
              <TextInput
                style={styles.input}
                placeholder="Enter custom category"
                value={customCategory}
                onChangeText={handleCustomCategoryChange}
                placeholderTextColor="#999"
              />
            )}

            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newPurchase.description}
              onChangeText={onDescriptionChange}
              placeholderTextColor="#999"
            />

            <View style={styles.bottomRow}>
              <TextInput
                style={styles.priceInput}
                placeholder="Price"
                keyboardType="numeric"
                value={newPurchase.cost}
                onChangeText={onPriceChange}
                placeholderTextColor="#999"
              />

              <TouchableOpacity 
                style={styles.currencyPicker}
                onPress={() => {}}
              >
                <Text style={styles.currencyText}>₽</Text>
                <Icon name="chevron-down" size={20} color="#666" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.datePicker}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {format(newPurchase.date, 'dd.MM.yyyy')}
                </Text>
                <Icon name="calendar" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                value={newPurchase.date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <TouchableOpacity 
              style={styles.addButton} 
              onPress={addPurchase}
              disabled={!newPurchase.cost || (!newPurchase.category && !customCategory)}
            >
              <Text style={styles.addButtonText}>Add Purchase</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
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
    marginHorizontal: 8,
    minWidth: 70,
  },
  categoryButtonActive: {
    transform: [{scale: 1.05}],
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconContainerActive: {
    backgroundColor: '#1E90FF',
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  categoryTextActive: {
    color: '#1E90FF',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    height: 50,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    height: 50,
  },
  priceInput: {
    flex: 1,
    marginRight: 10,
    height: 50,
    paddingHorizontal: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  currencyPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    minWidth: 70,
    height: 50,
  },
  currencyText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    minWidth: 120,
    height: 50,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  closeButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default ModalForm;
