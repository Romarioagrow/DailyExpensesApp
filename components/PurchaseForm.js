import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const PurchaseForm = ({
                        newPurchase,
                        onTypeChange,
                        onDescriptionChange,
                        onPriceChange,
                        onDateChange,
                        addPurchase,
                      }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);  // Контролируем показ пикера даты

  // Функция открытия пикера
  const showPicker = () => {
    setShowDatePicker(true);
  };

  // Обработка выбора даты
  const onDateSelected = (event, selectedDate) => {
    setShowDatePicker(false);  // Закрываем пикер после выбора
    const currentDate = selectedDate || newPurchase.date;
    onDateChange(currentDate);  // Передаем выбранную дату
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="$0.00"
        keyboardType="numeric"
        value={newPurchase.cost}
        onChangeText={onPriceChange}
      />

      <Text style={styles.label}>Expense made for</Text>
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={newPurchase.type}
        onChangeText={onTypeChange}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={newPurchase.description}
        onChangeText={onDescriptionChange}
      />

      {/* Кнопка для выбора даты */}
      <TouchableOpacity style={styles.datePickerButton} onPress={showPicker}>
        <Text style={styles.dateText}>
          {newPurchase.date ? newPurchase.date.toLocaleDateString() : 'Select Date'}
        </Text>
      </TouchableOpacity>

      {/* Пикер даты */}
      {showDatePicker && (
        <DateTimePicker
          value={newPurchase.date || new Date()}  // Если даты нет, используем текущую
          mode="date"
          display="default"
          onChange={onDateSelected}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={addPurchase}>
        <Text style={styles.addButtonText}>Add Purchase</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 18,
  },
  datePickerButton: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#6200EE',
    padding: 16,
    borderRadius: 50,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PurchaseForm;
