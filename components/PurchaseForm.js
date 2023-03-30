import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const PurchaseForm = ({
                          newPurchase,
                          onTypeChange,
                          onDescriptionChange,
                          onDateChange,
                          onPriceChange,
                          showDatePicker,
                          setShowDatePicker,
                          addPurchase,
                      }) => {
    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    return (
        <View>
            <View style={styles.tableRow}>
                <View style={styles.tableCell}>
                    <TextInput
                        style={styles.purchaseTypeInput}
                        placeholder="Type"
                        value={newPurchase.type}
                        onChangeText={onTypeChange}
                    />
                </View>
                <View style={styles.tableCell}>
                    <TextInput
                        style={styles.purchaseTypeInput}
                        placeholder="Description"
                        value={newPurchase.description}
                        onChangeText={onDescriptionChange}
                        multiline
                        numberOfLines={2}
                    />
                </View>
                <View style={styles.tableCell}>
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
                <View style={styles.tableCell}>
                    <TextInput
                        style={styles.priceInput}
                        placeholder="Price"
                        value={newPurchase.cost}
                        onChangeText={onPriceChange}
                        keyboardType="numeric"
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={addPurchase}>
                <Text style={styles.buttonText}>Add Purchase</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    tableCell: {
        flex: 1,
        width: '50%',
        marginRight: 8,
    },
    purchaseTypeInput: {
        backgroundColor: '#F0F0F0',
        padding: 8,
        marginBottom: 4,
        borderRadius: 4,
        height: 72,
    },
    datePickerButton: {
        backgroundColor: '#F0F0F0',
        padding: 8,
        marginBottom: 4,
        borderRadius: 4,
    },
    dateText: {
        fontSize: 16,
    },
    priceInput: {
        backgroundColor: '#F0F0F0',
        padding: 8,
        borderRadius: 4,
        height: 72,
        textAlign: 'right',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 4,
        margin: 16,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default PurchaseForm;
