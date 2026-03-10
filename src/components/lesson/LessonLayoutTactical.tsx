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

export function LessonLayoutTactical({ lesson }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Hook minimized */}
      <ThemedText variant="label" color="textSecondary" style={styles.hookText}>
        {lesson.hook}
      </ThemedText>

      {/* Core insights as checklist */}
      <ThemedText variant="h4" style={styles.sectionTitle}>
        What You Need to Know
      </ThemedText>
      {lesson.core_insights.map((insight, i) => (
        <View
          key={i}
          style={[styles.checkItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <View style={[styles.checkbox, { borderColor: colors.primary }]}>
            <ThemedText style={{ color: colors.primary, fontSize: 10 }}>■</ThemedText>
          </View>
          <ThemedText variant="body" style={styles.checkText}>{insight}</ThemedText>
        </View>
      ))}

      {/* Example as Case Study */}
      <View style={[styles.caseStudy, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
        <View style={[styles.caseStudyTag, { backgroundColor: colors.primary }]}>
          <ThemedText variant="labelSmall" style={{ color: colors.white }}>
            CASE STUDY
          </ThemedText>
        </View>
        <ThemedText variant="body" style={{ lineHeight: 26 }}>{lesson.example}</ThemedText>
      </View>

      {/* Diagram de-emphasized at bottom */}
      {lesson.diagram_type && lesson.diagram_data && (
        <DiagramBlock type={lesson.diagram_type} data={lesson.diagram_data} />
      )}

      {/* Key takeaways as the most prominent section */}
      <View style={[styles.takeawayBlock, { backgroundColor: colors.primaryMuted, borderColor: colors.primary }]}>
        <ThemedText variant="h4" color="primary" style={styles.sectionTitle}>
          Apply This Today
        </ThemedText>
        {lesson.key_takeaways.map((t, i) => (
          <View key={i} style={[styles.takeawayRow, { borderBottomColor: colors.primary + '30' }]}>
            <View style={[styles.bulletSquare, { backgroundColor: colors.primary }]}>
              <ThemedText variant="labelSmall" style={{ color: colors.white }}>{i + 1}</ThemedText>
            </View>
            <ThemedText variant="bodyMedium" style={styles.takeawayText}>{t}</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: Spacing.md },
  hookText: { fontStyle: 'italic', lineHeight: 22 },
  sectionTitle: { marginTop: Spacing.xs },
  checkItem: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'flex-start',
    padding: Spacing.md,
    borderRadius: Radius.sm,
    borderWidth: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  checkText: { flex: 1 },
  caseStudy: {
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: Spacing.md,
    gap: Spacing.sm,
    paddingTop: Spacing.xl,
    position: 'relative',
  },
  caseStudyTag: {
    position: 'absolute',
    top: -1,
    left: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.sm,
  },
  takeawayBlock: {
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  takeawayRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'flex-start',
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
  },
  bulletSquare: {
    width: 22,
    height: 22,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  takeawayText: { flex: 1 },
});
