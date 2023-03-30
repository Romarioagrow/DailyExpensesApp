import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

const PurchaseItem = ({ purchase, onDelete }) => {
    return (
        <Swipeable
            renderRightActions={(progress, dragX) => (
                <RectButton style={styles.deleteButton} onPress={onDelete}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </RectButton>
            )}
        >
            <View style={styles.purchaseItem}>
                <View style={styles.itemInfo}>
                    <Text style={styles.itemType}>{purchase.type}</Text>
                    <Text style={styles.itemDescription}>{purchase.description}</Text>
                    <Text style={styles.itemDate}>{new Date(purchase.date).toLocaleDateString()}</Text>
                </View>
                <View style={styles.priceCol}>
                    <Text style={styles.itemPrice}>${purchase.cost}</Text>
                </View>
            </View>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    purchaseItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
    },
    itemInfo: {
        flexShrink: 1,
        marginRight: 8,
    },
    itemType: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDate: {
        fontSize: 14,
    },
    priceCol: {
        width: 80,
        alignItems: 'flex-start',
    },
    itemPrice: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PurchaseItem;
