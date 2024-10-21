import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import PurchaseItem from './PurchaseItem';
import { format, isToday, isYesterday, compareDesc } from 'date-fns';

const PurchaseList = ({ purchases, deletePurchase }) => {
    // Группируем покупки по дате
    const groupedPurchases = purchases.reduce((acc, purchase) => {
        const purchaseDate = new Date(purchase.date); // Преобразуем строку ISO в объект Date
        const dateKey = format(purchaseDate, 'yyyy-MM-dd'); // Форматируем дату как ключ
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(purchase);
        return acc;
    }, {});

    // Получаем заголовок для каждой группы по дате
    const getSectionTitle = (date) => {
        const purchaseDate = new Date(date); // Преобразуем строку ISO обратно в дату
        if (isToday(purchaseDate)) {
            return 'Today';
        }
        if (isYesterday(purchaseDate)) {
            return 'Yesterday';
        }
        return format(purchaseDate, 'MMMM d, yyyy'); // Пример: "October 22, 2024"
    };

    // Сортировка дат: сначала Today, затем Yesterday, потом остальные
    const sortedDates = Object.keys(groupedPurchases).sort((a, b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);

        // Сначала Today
        if (isToday(dateA)) return -1;
        if (isToday(dateB)) return 1;

        // Затем Yesterday
        if (isYesterday(dateA)) return -1;
        if (isYesterday(dateB)) return 1;

        // Оставшиеся даты сортируются в обратном порядке
        return compareDesc(dateA, dateB);
    });

    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
          {sortedDates.map((date) => (
            <View key={date}>
                {/* Заголовок для группы по дате */}
                <Text style={styles.dateHeader}>{getSectionTitle(date)}</Text>
                {groupedPurchases[date].map((purchase, index) => (
                  <PurchaseItem
                    key={index}
                    purchase={purchase}
                    onDelete={() => deletePurchase(index)}
                  />
                ))}
            </View>
          ))}
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        paddingBottom: 80, // Отступ снизу
        paddingHorizontal: 16, // Отступы по бокам
    },
    dateHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#333',
    },
});

export default PurchaseList;
