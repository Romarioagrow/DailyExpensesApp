import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WeeklyChart from './WeeklyChart';
import CategorySummary from './CategorySummary';

const ExpandableStats = ({ expenses, selectedPeriod, onPeriodChange }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.expandButton}
        onPress={() => setExpanded(!expanded)}
      >
        <Icon 
          name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
          size={24} 
          color="#666"
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          <WeeklyChart 
            expenses={expenses}
            selectedPeriod={selectedPeriod}
            onPeriodChange={onPeriodChange}
          />
          <CategorySummary expenses={expenses} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  expandButton: {
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
});

export default ExpandableStats; 