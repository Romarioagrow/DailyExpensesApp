import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import PurchaseItem from './PurchaseItem';
import { format, isToday, isYesterday, compareDesc } from 'date-fns';

const PurchaseList = ({ purchases, deletePurchase }) => {
    // Группируем покупки по дате
    const groupedPurchases = purchases.reduce((acc, purchase) => {
        const purchaseDate = new Date(purchase.date);
        const dateKey = format(purchaseDate, 'yyyy-MM-dd');
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(purchase);
        return acc;
    }, {});

    // Получаем заголовок для каждой группы по дате
    const getSectionTitle = (date) => {
        const purchaseDate = new Date(date);
        if (isToday(purchaseDate)) {
            return 'Today';
        }
        if (isYesterday(purchaseDate)) {
            return 'Yesterday';
        }
        return format(purchaseDate, 'MMMM d, yyyy');
    };

    // Сортировка дат: сначала Today, затем Yesterday, потом остальные
    const sortedDates = Object.keys(groupedPurchases).sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);

        if (isToday(dateA)) return -1;
        if (isToday(dateB)) return 1;

        if (isYesterday(dateA)) return -1;
        if (isYesterday(dateB)) return 1;

        return compareDesc(dateA, dateB);
    });

    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
          {sortedDates.map((date) => (
            <View key={date}>
                <Text style={styles.dateHeader}>{getSectionTitle(date)}</Text>
                {groupedPurchases[date].map((purchase) => (
                  <PurchaseItem
                    key={purchase.id} // Используем id для уникальности
                    purchase={purchase}
                    onDelete={() => deletePurchase(purchase.id)} // Удаляем по id
                  />
                ))}
            </View>
          ))}
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        paddingBottom: 80,
        paddingHorizontal: 16,
    },
    dateHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
    },
});

export default PurchaseList;
