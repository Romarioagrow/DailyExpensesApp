import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';

const PurchaseList = ({ purchases, deletePurchase, onAddPress }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      Food: 'silverware-fork-knife',
      Alcohol: 'glass-wine',
      Transport: 'car',
      Shopping: 'shopping',
      Other: 'dots-horizontal',
    };
    return icons[category] || 'dots-horizontal';
  };

  // Get unique categories from purchases
  const usedCategories = useMemo(() => {
    const categories = purchases.map(purchase => purchase.category);
    return [...new Set(categories)];
  }, [purchases]);

  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        style={styles.purchaseItem}
        onLongPress={() => deletePurchase(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <Icon name={getCategoryIcon(item.category)} size={24} color="#1E90FF" />
        </View>
        <View style={styles.purchaseInfo}>
          <Text style={styles.date}>
            {format(new Date(item.date), 'MMMM d, yyyy')}
          </Text>
          <View style={styles.descriptionRow}>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>
        </View>
        <Text style={styles.amount}>{item.cost}₽</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCategories = () => {
    return usedCategories.map((category) => (
      <View key={`category-${category}`} style={styles.categoryWrapper}>
        <View style={styles.categoryIcon}>
          <Icon 
            name={getCategoryIcon(category)} 
            size={24} 
            color="#1E90FF" 
          />
        </View>
        <Text style={styles.categoryText}>•</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={onAddPress}
      >
        <Text style={styles.addButtonText}>Add purchase</Text>
      </TouchableOpacity>
      <View style={styles.categoryFilter}>
        {usedCategories.map((category) => (
          <TouchableOpacity 
            key={`category-${category}`} 
            style={styles.categoryButton}
          >
            <View style={styles.categoryIconContainer}>
              <Icon 
                name={getCategoryIcon(category)} 
                size={24} 
                color="#1E90FF" 
              />
            </View>
            <Text style={styles.categoryLabel}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={purchases.sort((a, b) => new Date(b.date) - new Date(a.date))}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  addButton: {
    backgroundColor: '#1E90FF',
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 8,
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  categoryFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  categoryButton: {
    alignItems: 'center',
    minWidth: 60,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    marginHorizontal: -20,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 20,
  },
  cardWrapper: {
    marginBottom: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  purchaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  purchaseInfo: {
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  descriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
  },
});

export default PurchaseList;
