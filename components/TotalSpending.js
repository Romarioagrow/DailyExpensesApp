import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TotalSpending = ({ totalSpending, categoryTotals }) => {
  const total = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0);
  
  const segments = Object.entries(categoryTotals)
    .filter(([_, value]) => value > 0)
    .map(([category, value]) => ({
      category,
      value,
      percentage: total > 0 ? Math.round((value / total) * 100) : 0
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

  let startAngle = -90;

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.chartContainer}>
          <View style={styles.circleOuter}>
            {segments.map((segment, index) => {
              const angle = (segment.percentage / 100) * 360;
              const rotation = startAngle;
              startAngle += angle;

              return (
                <View
                  key={segment.category}
                  style={[
                    styles.pieSegment,
                    {
                      backgroundColor: CATEGORY_COLORS[segment.category],
                      transform: [
                        { rotate: `${rotation}deg` }
                      ],
                      zIndex: segments.length - index
                    }
                  ]}
                />
              );
            })}
          </View>
          <View style={styles.centerText}>
            <Text style={styles.totalAmount}>{totalSpending}₽</Text>
          </View>
        </View>
        <View style={styles.categories}>
          {segments.map(segment => (
            <View key={segment.category} style={styles.categoryItem}>
              <View 
                style={[
                  styles.categoryDot,
                  { backgroundColor: CATEGORY_COLORS[segment.category] }
                ]} 
              />
              <Text style={styles.categoryText}>
                {segment.category} ({segment.percentage}%)
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 15,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  chartContainer: {
    position: 'relative',
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleOuter: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#F0F0F0',
    position: 'relative',
    overflow: 'hidden',
  },
  pieSegment: {
    position: 'absolute',
    width: 80,
    height: 160,
    left: 80,
    top: 0,
    transformOrigin: 'left center',
    borderTopRightRadius: 80,
    borderBottomRightRadius: 80,
  },
  centerText: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  categories: {
    flex: 1,
    marginLeft: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
  },
});

export default TotalSpending;
