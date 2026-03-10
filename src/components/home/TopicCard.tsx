import React from 'react';
import { View, StyleSheet, TouchableOpacity, DimensionValue } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import { useTheme } from '../../context/ThemeContext';
import { TopicId, TOPIC_LABELS, TOPIC_COLORS, TOPIC_ICONS } from '../../data/types';
import { useLessonAccess } from '../../hooks/useLessonAccess';
import { Spacing, Radius } from '../../theme/spacing';

interface TopicCardProps {
  topicId: TopicId;
  onPress: () => void;
}

export function TopicCard({ topicId, onPress }: TopicCardProps) {
  const { colors } = useTheme();
  const access = useLessonAccess(topicId);
  const accentColor = TOPIC_COLORS[topicId];
  const progressRatio = access.lessonsCompleted / 10;
  const progressWidth: DimensionValue = `${progressRatio * 100}%`;

  let statusEmoji = '✨';
  let statusLabel = 'New lesson ready';
  if (access.isTrackComplete) {
    statusEmoji = '🏆';
    statusLabel = 'Track complete!';
  } else if (access.completedToday) {
    statusEmoji = '✅';
    statusLabel = 'Done for today';
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={access.isLocked}
      activeOpacity={0.85}
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: access.isLocked ? colors.border : accentColor + '40',
          borderLeftColor: accentColor,
          shadowColor: accentColor,
          opacity: access.completedToday && !access.isTrackComplete ? 0.7 : 1,
        },
      ]}
    >
      {/* Top row */}
      <View style={styles.topRow}>
        <View style={[styles.iconWrap, { backgroundColor: accentColor + '18' }]}>
          <ThemedText style={styles.icon}>{TOPIC_ICONS[topicId]}</ThemedText>
        </View>
        <View style={styles.titleBlock}>
          <ThemedText variant="h4" numberOfLines={1}>
            {TOPIC_LABELS[topicId]}
          </ThemedText>
          <View style={styles.statusRow}>
            <ThemedText style={styles.statusEmoji}>{statusEmoji}</ThemedText>
            <ThemedText variant="caption" color="textSecondary">{statusLabel}</ThemedText>
          </View>
        </View>
        {!access.isLocked && (
          <View style={[styles.arrowWrap, { backgroundColor: accentColor }]}>
            <ThemedText style={styles.arrow}>→</ThemedText>
          </View>
        )}
        {access.isTrackComplete && (
          <ThemedText style={{ fontSize: 22 }}>🏆</ThemedText>
        )}
      </View>

      {/* Progress bar */}
      <View style={styles.progressRow}>
        <View style={[styles.progressBg, { backgroundColor: colors.surfaceSecondary }]}>
          <View style={[styles.progressFill, { width: progressWidth, backgroundColor: accentColor }]} />
        </View>
        <ThemedText variant="labelSmall" color="textSecondary" style={styles.progressLabel}>
          {access.lessonsCompleted}/10
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderLeftWidth: 4,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
    gap: Spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: { fontSize: 26 },
  titleBlock: { flex: 1, gap: 2 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statusEmoji: { fontSize: 13 },
  arrowWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  arrow: { color: '#fff', fontSize: 14, fontWeight: '700' },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  progressBg: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  progressLabel: { minWidth: 28, textAlign: 'right' },
});
