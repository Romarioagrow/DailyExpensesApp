import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const PurchaseItem = ({ purchase, onDelete }) => {
    return (
      <View style={styles.item}>
          <Icon name="coffee" size={24} color="#333" />
          <View style={styles.info}>
              <Text style={styles.type}>{purchase.type}</Text>
              <Text style={styles.description}>{purchase.description}</Text>
          </View>
          <Text style={styles.price}>${purchase.cost}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    info: {
        flex: 1,
    },
    type: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    description: {
        fontSize: 14,
        color: '#777',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 12,
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
        borderRadius: 8,
        padding: 8,
    },
    deleteText: {
        color: '#FFF',
    },
});

export default PurchaseItem;
