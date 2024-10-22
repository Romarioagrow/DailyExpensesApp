import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PurchaseItem = ({ purchase, onDelete }) => {
    // Компонент, который будет рендериться при свайпе влево
    const renderRightActions = () => (
      <RectButton style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteText}>Delete</Text>
      </RectButton>
    );

    return (
      <Swipeable renderRightActions={renderRightActions}>
          <View style={styles.itemWrapper}>
              <View style={styles.item}>
                  <Icon name="shopping-cart" size={24} color="#333" />
                  <View style={styles.info}>
                      <Text style={styles.type}>{purchase.type}</Text>
                      <Text style={styles.description}>{purchase.description}</Text>
                  </View>
                  <Text style={styles.price}>${purchase.cost}</Text>
              </View>
          </View>
      </Swipeable>
    );
};

const styles = StyleSheet.create({
    itemWrapper: {
        marginHorizontal: 16,  // Внешний отступ по бокам для тени
        marginBottom: 16,      // Внешний отступ снизу для тени
        //marginTop: 2,         // Добавляем отступ сверху, чтобы тень не обрезалась
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 10 },
        elevation: 3,
    },
    info: {
        flex: 1,
        marginLeft: 10,
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
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        borderRadius: 8,
        marginVertical: 4,
    },
    deleteText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default PurchaseItem;
