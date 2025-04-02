import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CATEGORIES = [
  { id: 'custom', name: 'Своё', icon: '💡' },
  { id: 'food', name: 'Продукты', icon: '🍔' },
  { id: 'transport', name: 'Транспорт', icon: '🚗' },
  { id: 'home', name: 'Жильё', icon: '🏠' },
  { id: 'clothes', name: 'Одежда', icon: '👗' },
  { id: 'metro', name: 'Метро', icon: '🚇' },
  { id: 'bus', name: 'Автобус', icon: '🚌' },
];

const FIXED_CATEGORIES = CATEGORIES.slice(0, 4); // Первые 4 категории будут фиксированными
const SCROLLABLE_CATEGORIES = CATEGORIES.slice(4); // Остальные категории будут в скролле

const AddExpenseModal = ({ visible, onClose, onAdd }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [place, setPlace] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const handleAdd = () => {
    if (!amount || (!category && !customCategory)) return;

    onAdd({
      amount: Number(amount),
      category: category === 'custom' ? customCategory : CATEGORIES.find(cat => cat.id === category)?.name,
      place,
      date: date.toISOString(),
    });

    // Очищаем форму
    setAmount('');
    setCategory('');
    setPlace('');
    setCustomCategory('');
    setDate(new Date());
  };

  const renderCategoryButton = (cat) => (
    <TouchableOpacity
      key={cat.id}
      style={[
        styles.categoryButton,
        category === cat.id && styles.categoryButtonActive,
      ]}
      onPress={() => setCategory(cat.id)}
    >
      <Text style={styles.categoryIcon}>{cat.icon}</Text>
      <Text
        style={[
          styles.categoryButtonText,
          category === cat.id && styles.categoryButtonTextActive,
        ]}
      >
        {cat.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Text style={styles.title}>Новый расход</Text>

          <TextInput
            style={styles.input}
            placeholder="Сумма"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            placeholderTextColor="#666"
          />

          <View style={styles.categoriesContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScrollContent}
            >
              <View style={styles.categoriesRows}>
                <View style={styles.categoryRow}>
                  {CATEGORIES.slice(0, Math.ceil(CATEGORIES.length/2)).map(renderCategoryButton)}
                </View>
                <View style={styles.categoryRow}>
                  {CATEGORIES.slice(Math.ceil(CATEGORIES.length/2)).map(renderCategoryButton)}
                </View>
              </View>
            </ScrollView>
          </View>

          {category === 'custom' && (
            <TextInput
              style={styles.input}
              placeholder="Введите свою категорию"
              value={customCategory}
              onChangeText={setCustomCategory}
              placeholderTextColor="#666"
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Описание"
            value={place}
            onChangeText={setPlace}
            placeholderTextColor="#666"
          />

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {date.toLocaleDateString('ru-RU')}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={handleAdd}
            >
              <Text style={[styles.buttonText, styles.addButtonText]}>
                Добавить
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    minHeight: '50%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  categoriesContainer: {
    height: 120,
    marginBottom: 15,
  },
  categoriesScrollContent: {
    paddingRight: 20,
  },
  categoriesRows: {
    height: 120,
    justifyContent: 'space-between',
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 12,
    height: 48,
  },
  categoryButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: 160,
    height: 48,
  },
  categoryButtonActive: {
    backgroundColor: '#000',
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryButtonText: {
    color: '#666',
    fontSize: 16,
    flex: 1,
  },
  categoryButtonTextActive: {
    color: '#FFF',
  },
  dateButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  addButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
  addButtonText: {
    color: '#FFF',
  },
});

export default AddExpenseModal; 