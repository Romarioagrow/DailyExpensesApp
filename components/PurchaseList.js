import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PurchaseItem from './PurchaseItem';

const PurchaseList = ({ purchases, deletePurchase }) => {
    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
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
    scrollView: {
        paddingBottom: 80,  // Добавляем отступ снизу, чтобы избежать наложения на Bottom Bar
    },
});

export default PurchaseList;
