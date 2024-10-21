import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PurchaseForm = ({
                          newPurchase,
                          onTypeChange,
                          onDescriptionChange,
                          onPriceChange,
                          addPurchase,
                      }) => {
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
