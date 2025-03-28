import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CATEGORY_COLORS = {
  Food: '#1E90FF',
  Alcohol: '#4169E1',
  Transport: '#6495ED',
  Other: '#B0E0E6'
};

const TotalSpending = ({ totalSpending, categoryTotals }) => {
  const total = Object.values(categoryTotals).reduce((sum, value) => sum + value, 0);
  
  // Calculate segments for the pie chart
  const segments = Object.entries(categoryTotals).map(([category, value]) => ({
    category,
    value,
    percentage: total > 0 ? (value / total) * 100 : 0,
    color: CATEGORY_COLORS[category]
  }));

  // Sort segments by value in descending order
  segments.sort((a, b) => b.value - a.value);

  // Calculate cumulative rotation for each segment
  let currentRotation = 0;
  const segmentsWithRotation = segments.map(segment => {
    const rotation = currentRotation;
    const degrees = (segment.percentage / 100) * 360;
    currentRotation += degrees;
    return {
      ...segment,
      rotation,
      degrees
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.chartContainer}>
          <View style={styles.circleOuter}>
            {segmentsWithRotation.map((segment, index) => (
              <View
                key={segment.category}
                style={[
                  styles.pieSegment,
                  {
                    backgroundColor: segment.color,
                    transform: [
                      { rotate: `${segment.rotation}deg` }
                    ],
                    zIndex: segments.length - index,
                    display: segment.percentage > 0 ? 'flex' : 'none'
                  }
                ]}
              >
                <View
                  style={[
                    styles.pieSegmentMask,
                    {
                      transform: [
                        { rotate: `${segment.degrees}deg` }
                      ]
                    }
                  ]}
                />
              </View>
            ))}
          </View>
          <View style={styles.centerText}>
            <Text style={styles.totalAmount}>{totalSpending.toFixed(0)}₽</Text>
          </View>
        </View>

        <View style={styles.categories}>
          {segments.map(segment => (
            <View key={segment.category} style={styles.categoryRow}>
              <View style={[styles.categoryDot, { backgroundColor: segment.color }]} />
              <Text style={styles.categoryText}>
                {segment.category} ({segment.percentage.toFixed(0)}%)
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
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  chartContainer: {
    width: 160,
    height: 160,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleOuter: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
    position: 'relative',
  },
  pieSegment: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transform: [{ rotate: '0deg' }],
    overflow: 'hidden',
  },
  pieSegmentMask: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transform: [{ rotate: '0deg' }],
    backgroundColor: '#E0E0E0',
    left: '50%',
  },
  centerText: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  categories: {
    width: 160,
    paddingLeft: 30,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
});

export default TotalSpending;
