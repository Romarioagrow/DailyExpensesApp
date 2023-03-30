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
                        onChangeText={onTypeChange}
                    />
                    <TextInput
                        style={styles.itemDescriptionInput}
                        placeholder="Description"
                        value={newPurchase.description}
                        onChangeText={onDescriptionChange}
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
                        onChangeText={onPriceChange}
                        keyboardType="numeric"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default PurchaseForm;
