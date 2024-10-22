import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
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
    onDateChange(currentDate);  // Передаем выбранную дату в родительский компонент
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Type"
        value={newPurchase.type}
        onChangeText={onTypeChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={newPurchase.description}
        onChangeText={onDescriptionChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={newPurchase.cost}
        onChangeText={onPriceChange}
        keyboardType="numeric"
      />

      {/* Кнопка для открытия DateTimePicker */}
      <TouchableOpacity style={styles.datePickerButton} onPress={showPicker}>
        <Text style={styles.dateText}>
          {newPurchase.date ? newPurchase.date.toLocaleDateString() : 'Select Date'}
        </Text>
      </TouchableOpacity>

      {/* Пикер даты с ограничением будущих дат */}
      {showDatePicker && (
        <DateTimePicker
          value={newPurchase.date || new Date()}  // Если даты нет, используем текущую
          mode="date"
          display="default"
          onChange={onDateSelected}
          maximumDate={new Date()}  // Ограничиваем выбор будущих дат
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={addPurchase}>
        <Text style={styles.addButtonText}>Add Purchase</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
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
