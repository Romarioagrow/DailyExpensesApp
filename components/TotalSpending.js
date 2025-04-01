import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TotalSpending = ({ totalSpending, categoryTotals }) => {
  const total = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0);
  
  const segments = Object.entries(categoryTotals)
    .filter(([_, value]) => value > 0)
    .map(([category, value]) => ({
      category,
      value,
      percentage: total > 0 ? (value / total) * 100 : 0
    }))
    .sort((a, b) => b.value - a.value);

  const CATEGORY_COLORS = {
    Food: '#1E90FF',
    Groceries: '#32CD32',
    Alcohol: '#FF69B4',
    Transport: '#FFA500',
    Shopping: '#9370DB',
    Entertainment: '#20B2AA',
    Health: '#FF6347',
    House: '#4682B4',
    Cafe: '#FFD700',
    Taxi: '#FF8C00',
    Gifts: '#BA55D3',
    Other: '#A9A9A9'
  };

  const renderPieChart = () => {
    let cumulativeAngle = 0;
    return segments.map((segment, index) => {
      const startAngle = cumulativeAngle;
      const angle = (segment.percentage / 100) * 360;
      cumulativeAngle += angle;

      return (
        <View
          key={segment.category}
          style={[
            styles.pieSegment,
            {
              backgroundColor: CATEGORY_COLORS[segment.category],
              transform: [
                { translateX: -40 },
                { rotate: `${startAngle}deg` },
                { translateX: 40 }
              ],
              zIndex: segments.length - index,
              width: 80,
              height: 80,
              position: 'absolute',
              borderTopRightRadius: 40,
              borderBottomRightRadius: 40,
            }
          ]}
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.chartSection}>
        <View style={styles.chartContainer}>
          <View style={styles.pieContainer}>
            {renderPieChart()}
          </View>
          <View style={styles.centerText}>
            <Text style={styles.totalAmount}>{totalSpending}₽</Text>
          </View>
        </View>
        <ScrollView style={styles.categoriesList}>
          {segments.map(segment => (
            <View key={segment.category} style={styles.categoryItem}>
              <View 
                style={[
                  styles.categoryDot,
                  { backgroundColor: CATEGORY_COLORS[segment.category] }
                ]} 
              />
              <Text style={styles.categoryText}>
                {segment.category} ({Math.round(segment.percentage)}%)
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  chartContainer: {
    position: 'relative',
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pieContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F0F0F0',
    position: 'relative',
    overflow: 'hidden',
  },
  centerText: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  categoriesList: {
    flex: 1,
    marginLeft: 15,
    maxHeight: 140,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 13,
    color: '#666',
  },
});

export default TotalSpending;
