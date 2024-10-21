import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TotalSpending = ({ totalSpending }) => {
    return (
      <View style={styles.container}>
          <Text style={styles.currency}>USD</Text>
          <Text style={styles.amount}>${totalSpending.toFixed(2)}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        padding: 20,
        borderRadius: 16,
        marginVertical: 20,
        alignItems: 'center',
    },
    amount: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    currency: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 10,
    },
});

export default TotalSpending;
