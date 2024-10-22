import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const currencyOptions = [
  { label: 'USD', symbol: '$', flag: '🇺🇸' },
  { label: 'EUR', symbol: '€', flag: '🇪🇺' },
  { label: 'RUB', symbol: '₽', flag: '🇷🇺' },
  { label: 'GBP', symbol: '£', flag: '🇬🇧' },
  { label: 'JPY', symbol: '¥', flag: '🇯🇵' },
];

const PurchaseForm = ({
                        newPurchase,
                        onTypeChange,
                        onDescriptionChange,
                        onPriceChange,
                        onDateChange,
                        addPurchase,
                      }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]); // Валюта по умолчанию
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
    <View style={styles.formContainer}>
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
      <View style={styles.row}>
        <TextInput
          style={styles.inputPrice}
          placeholder="Price"
          value={newPurchase.cost}
          onChangeText={onPriceChange}
          keyboardType="numeric"
        />
        <View style={styles.pickerWrapper}>
          <Text style={styles.selectedCurrency}>{selectedCurrency.symbol}</Text>
          <Picker
            selectedValue={selectedCurrency.label}
            style={styles.currencyPicker}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedCurrency(currencyOptions[itemIndex]); // Обновляем выбранную валюту
            }}
          >
            {currencyOptions.map((option, index) => (
              <Picker.Item
                key={index}
                label={`${option.flag} ${option.label} — ${option.symbol}`}
                value={option.label}
              />
            ))}
          </Picker>
        </View>
      </View>

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
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    marginHorizontal: 10,
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputPrice: {
    backgroundColor: '#F0F0F0',
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    flex: 0.7,
    marginRight: 10,
  },
  pickerWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#dcdcdc',
  },
  currencyPicker: {
    flex: 1,
    height: 50,
  },
  selectedCurrency: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  datePickerButton: {
    backgroundColor: '#F0F0F0',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#6200EE',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PurchaseForm;
