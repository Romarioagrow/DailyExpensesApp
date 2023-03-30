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
        <View style={styles.container}>
            <View style={styles.topRow}>
                <Text style={styles.addNewLabel}>New Purchase</Text>
                <TouchableOpacity style={styles.addButton} onPress={addPurchase}>
                    <Text style={styles.buttonText}>Add Purchase</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomRow}>
                <View style={[styles.inputCol, {width: '50%'}]}>
                    <TextInput
                        style={styles.inputField}
                        placeholder="Type"
                        value={newPurchase.type}
                        onChangeText={onTypeChange}
                    />
                    <TextInput
                        style={styles.inputField}
                        placeholder="Description"
                        value={newPurchase.description}
                        onChangeText={onDescriptionChange}
                        multiline
                        numberOfLines={2}
                    />
                </View>
                <View style={[styles.inputCol, {width: '25%'}]}>
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
                <View style={[styles.inputCol, {width: '25%'}]}>
                    <TextInput
                        style={styles.inputField}
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
    container: {
        margin: 16,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addNewLabel: {
        fontSize: 24,
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
    inputCol: {
        paddingHorizontal: 8,
    },
    inputField: {
        backgroundColor: '#F0F0F0',
        padding: 8,
        marginBottom: 8,
        borderRadius: 4,
        height: 50,
    },
    datePickerButton: {
        backgroundColor: '#F0F0F0',
        padding: 8,
        borderRadius: 4,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateText: {
        fontSize: 16,
    },
});

export default PurchaseForm;
