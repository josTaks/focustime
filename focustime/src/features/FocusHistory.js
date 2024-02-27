import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { colors } from '../utils/Colors';
import { fontSizes } from '../utils/sizes';
import { spacing } from '../utils/sizes';

export const FocusHistory = ({ history }) => {
  if (!history || !history.length) return <Text style={styles.none}>We haven't focused on anything yet!</Text>;

  const renderItem = ({ item }) => <Text style={styles.item}>- {item}</Text>;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things Focused On</Text>
      <FlatList data={history} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
    paddingVertical: spacing.sm,
  },
  container: {
    paddingHorizontal: spacing.lg,
    flex: 1,
  },
  item: {
    fontSize: fontSizes.md,
    color: colors.white,
    paddingTop: spacing.sm,
  },
  none: {
    fontSize: fontSizes.lg,
    color: colors.white,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
});
