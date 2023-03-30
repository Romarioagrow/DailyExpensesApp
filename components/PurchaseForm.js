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
                <View style={[styles.purchaseTypeCol, {width: Dimensions.get('window').width/2}]}>
                    <TextInput
                        style={[styles.purchaseTypeInput, {height: 50}]}
                        placeholder="Type"
                        value={newPurchase.type}
                        onChangeText={onTypeChange}
                    />
                    <TextInput
                        style={[styles.itemDescriptionInput, {height: 50}]}
                        placeholder="Description"
                        value={newPurchase.description}
                        onChangeText={onDescriptionChange}
                        multiline
                        numberOfLines={2}
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
                <View style={[styles.priceCol, {height: 50, width: Dimensions.get('window').width/4}]}>
                    <TextInput
                        style={[styles.priceInput, {width: '100%'}]}
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
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    purchaseTypeCol: {
        flex: 1,
        width: '50%',
        marginRight: 8,
    },
    datePickerCol: {
        flex: 1,
        alignItems: 'center',
    },
    priceCol: {
        flex: 1,
        alignItems: 'flex-end',
        width: '50%',
    },
    purchaseTypeInput: {
        backgroundColor: '#F0F0F0',
        padding: 8,
        marginBottom: 4,
        borderRadius: 4,
        height: 72,
    },
    itemDescriptionInput: {
        backgroundColor: '#F0F0F0',
        padding: 8,
        flexGrow: 1,
        textAlignVertical: 'top',
        borderRadius: 4,
        height: 72,
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
        width: Dimensions.get('window').width / 2,
    },
});

export default PurchaseForm;
