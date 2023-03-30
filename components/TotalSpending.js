import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TotalSpending = ({ totalSpending }) => {
    return <Text style={styles.header}>Total: ${totalSpending.toFixed(2)}</Text>;
};

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default TotalSpending;
