import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import { DiagramBlock } from './DiagramBlock';
import { useTheme } from '../../context/ThemeContext';
import { Lesson } from '../../data/types';
import { Spacing, Radius } from '../../theme/spacing';

interface Props {
  lesson: Lesson;
}

export function LessonLayoutVisual({ lesson }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Hook */}
      <View style={[styles.hookBlock, { backgroundColor: colors.primaryMuted, borderLeftColor: colors.primary }]}>
        <ThemedText variant="h3" color="primary">
          {lesson.hook}
        </ThemedText>
      </View>

      {/* Diagram first, prominently */}
      {lesson.diagram_type && lesson.diagram_data && (
        <View style={styles.diagramWrapper}>
          <DiagramBlock type={lesson.diagram_type} data={lesson.diagram_data} />
        </View>
      )}

      {/* Core insights as icon rows */}
      <ThemedText variant="h4" style={styles.sectionTitle}>
        Key Insights
      </ThemedText>
      {lesson.core_insights.map((insight, i) => (
        <View
          key={i}
          style={[styles.insightRow, { borderLeftColor: colors.primary, backgroundColor: colors.surface }]}
        >
          <View style={[styles.insightNumber, { backgroundColor: colors.primary }]}>
            <ThemedText variant="labelSmall" style={{ color: colors.white }}>
              {i + 1}
            </ThemedText>
          </View>
          <ThemedText variant="body" style={styles.insightText}>{insight}</ThemedText>
        </View>
      ))}

      {/* Example */}
      <View style={[styles.exampleBlock, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
        <ThemedText variant="label" color="textSecondary" style={styles.exampleLabel}>
          REAL EXAMPLE
        </ThemedText>
        <ThemedText variant="body">{lesson.example}</ThemedText>
      </View>

      {/* Key takeaways */}
      <View style={[styles.takeawaysBlock, { backgroundColor: colors.successMuted, borderColor: colors.success }]}>
        <ThemedText variant="h4" color="success" style={styles.sectionTitle}>
          Your Takeaways
        </ThemedText>
        {lesson.key_takeaways.map((t, i) => (
          <View key={i} style={styles.takeawayRow}>
            <ThemedText style={{ color: colors.success, fontSize: 16 }}>✓</ThemedText>
            <ThemedText variant="bodyMedium">{t}</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: Spacing.md },
  hookBlock: {
    padding: Spacing.md,
    borderLeftWidth: 4,
    borderRadius: Radius.sm,
  },
  diagramWrapper: { marginVertical: Spacing.xs },
  sectionTitle: { marginTop: Spacing.xs },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderLeftWidth: 3,
    borderRadius: Radius.sm,
  },
  insightNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  insightText: { flex: 1 },
  exampleBlock: {
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  exampleLabel: { marginBottom: 2 },
  takeawaysBlock: {
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  takeawayRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
});
