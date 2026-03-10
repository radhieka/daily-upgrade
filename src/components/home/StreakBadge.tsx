import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import { useTheme } from '../../context/ThemeContext';
import { Spacing, Radius } from '../../theme/spacing';

interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  const { colors } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing.xs,
          backgroundColor: colors.streakMuted,
          paddingHorizontal: Spacing.md,
          paddingVertical: Spacing.sm,
          borderRadius: Radius.full,
          alignSelf: 'flex-start',
        },
      }),
    [colors],
  );

  return (
    <View style={styles.container}>
      <ThemedText style={{ fontSize: 18 }}>🔥</ThemedText>
      <ThemedText variant="bodyMedium" color="streakOrange">
        {streak} {streak === 1 ? 'day' : 'days'}
      </ThemedText>
    </View>
  );
}
