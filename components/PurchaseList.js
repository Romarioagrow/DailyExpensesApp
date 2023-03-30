import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PurchaseItem from './PurchaseItem';

const PurchaseList = ({ purchases, deletePurchase }) => {
    return (
        <ScrollView style={styles.purchaseList}>
            {purchases.map((purchase, index) => (
                <PurchaseItem
                    key={index}
                    purchase={purchase}
                    onDelete={() => deletePurchase(index)}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    purchaseList: {
        flex: 1,
    },
});

export default PurchaseList;
