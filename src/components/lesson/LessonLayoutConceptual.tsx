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

export function LessonLayoutConceptual({ lesson }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Hook as pull-quote */}
      <View style={[styles.pullQuote, { borderColor: colors.border }]}>
        <ThemedText variant="labelSmall" color="textTertiary" style={styles.quoteLabel}>
          TODAY'S INSIGHT
        </ThemedText>
        <ThemedText variant="h3" style={styles.quoteText}>
          "{lesson.hook}"
        </ThemedText>
      </View>

      {/* Core insights as numbered paragraphs */}
      <ThemedText variant="h4" style={styles.sectionTitle}>
        The Concepts
      </ThemedText>
      {lesson.core_insights.map((insight, i) => (
        <View key={i} style={styles.conceptRow}>
          <View style={[styles.conceptNumber, { borderColor: colors.border }]}>
            <ThemedText variant="label" color="textSecondary">{i + 1}</ThemedText>
          </View>
          <ThemedText variant="body" style={styles.conceptText}>{insight}</ThemedText>
        </View>
      ))}

      {/* Diagram inline, not prominent */}
      {lesson.diagram_type && lesson.diagram_data && (
        <DiagramBlock type={lesson.diagram_type} data={lesson.diagram_data} />
      )}

      {/* Example with full formatting */}
      <View style={[styles.exampleBlock, { borderTopColor: colors.primary }]}>
        <ThemedText variant="label" color="primary" style={styles.exampleLabel}>
          Real World Application
        </ThemedText>
        <ThemedText variant="body" style={{ lineHeight: 28 }}>
          {lesson.example}
        </ThemedText>
      </View>

      {/* Key takeaways as prose list */}
      <ThemedText variant="h4" style={styles.sectionTitle}>
        Core Principles
      </ThemedText>
      {lesson.key_takeaways.map((t, i) => (
        <View key={i} style={[styles.takeawayItem, { borderBottomColor: colors.border }]}>
          <ThemedText variant="bodyMedium">{t}</ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: Spacing.md },
  pullQuote: {
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    gap: Spacing.xs,
  },
  quoteLabel: { marginBottom: 4 },
  quoteText: { lineHeight: 32, fontStyle: 'italic' },
  sectionTitle: { marginTop: Spacing.xs },
  conceptRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'flex-start',
  },
  conceptNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  conceptText: { flex: 1 },
  exampleBlock: {
    borderTopWidth: 3,
    paddingTop: Spacing.md,
    gap: Spacing.sm,
  },
  exampleLabel: { marginBottom: 4 },
  takeawayItem: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
  },
});
