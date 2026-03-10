import React from 'react';
import { View, StyleSheet, DimensionValue } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import { useTheme } from '../../context/ThemeContext';
import { DiagramType } from '../../data/types';
import { Spacing, Radius } from '../../theme/spacing';

interface DiagramBlockProps {
  type: DiagramType;
  data: Record<string, string | string[]>;
  compact?: boolean;
}

function getStr(val: string | string[] | undefined): string {
  if (!val) return '';
  return Array.isArray(val) ? (val[0] ?? '') : val;
}

function getArr(val: string | string[] | undefined): string[] {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
}

export function DiagramBlock({ type, data }: DiagramBlockProps) {
  const { colors } = useTheme();

  switch (type) {
    case 'timeline':
      return (
        <View style={[styles.container, { backgroundColor: colors.surfaceSecondary, borderRadius: Radius.md }]}>
          <ThemedText variant="labelSmall" color="textSecondary" style={styles.diagramLabel}>
            HOW IT WORKS
          </ThemedText>
          <View style={styles.timelineRow}>
            {getArr(data.steps).map((step, i, arr) => (
              <React.Fragment key={step}>
                <View style={styles.timelineItem}>
                  <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                  <ThemedText variant="caption" color="textSecondary" style={styles.timelineText}>
                    {step}
                  </ThemedText>
                </View>
                {i < arr.length - 1 && (
                  <View style={[styles.arrow, { backgroundColor: colors.border }]} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      );

    case 'two_column':
      return (
        <View style={[styles.container, { backgroundColor: colors.surfaceSecondary, borderRadius: Radius.md }]}>
          <View style={styles.twoColRow}>
            <View style={styles.col}>
              <ThemedText variant="labelSmall" color="primary" style={styles.colHeader}>
                {getStr(data.left_label) || 'LEFT'}
              </ThemedText>
              {getArr(data.left).map(item => (
                <ThemedText key={item} variant="caption" color="textSecondary" style={styles.colItem}>
                  • {item}
                </ThemedText>
              ))}
            </View>
            <View style={[styles.col, { borderLeftWidth: 1, borderLeftColor: colors.border, paddingLeft: Spacing.sm }]}>
              <ThemedText variant="labelSmall" color="primary" style={styles.colHeader}>
                {getStr(data.right_label) || 'RIGHT'}
              </ThemedText>
              {getArr(data.right).map(item => (
                <ThemedText key={item} variant="caption" color="textSecondary" style={styles.colItem}>
                  • {item}
                </ThemedText>
              ))}
            </View>
          </View>
        </View>
      );

    case 'funnel':
      return (
        <View style={[styles.container, { backgroundColor: colors.surfaceSecondary, borderRadius: Radius.md }]}>
          <ThemedText variant="labelSmall" color="textSecondary" style={styles.diagramLabel}>
            THE FUNNEL
          </ThemedText>
          {getArr(data.steps).map((step, i) => {
            const widthPct: DimensionValue = `${100 - i * 14}%`;
            return (
              <View key={step} style={styles.funnelStep}>
                <View
                  style={[
                    styles.funnelBar,
                    {
                      width: widthPct,
                      backgroundColor: i === 0 ? colors.primary : colors.primaryMuted,
                    },
                  ]}
                >
                  <ThemedText
                    variant="caption"
                    style={{ color: i === 0 ? colors.white : colors.primary }}
                  >
                    {step}
                  </ThemedText>
                </View>
              </View>
            );
          })}
        </View>
      );

    case 'matrix_2x2':
      return (
        <View style={[styles.container, { backgroundColor: colors.surfaceSecondary, borderRadius: Radius.md }]}>
          <ThemedText variant="labelSmall" color="textSecondary" style={styles.diagramLabel}>
            {getStr(data.y_label) || 'MATRIX'}
          </ThemedText>
          <View style={styles.matrix}>
            {getArr(data.quadrants).map((q, i) => (
              <View
                key={q}
                style={[
                  styles.quadrant,
                  {
                    backgroundColor: i === 1 || i === 3 ? colors.primaryMuted : colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <ThemedText variant="caption" color={i === 1 || i === 3 ? 'primary' : 'textSecondary'}>
                  {q}
                </ThemedText>
              </View>
            ))}
          </View>
          <ThemedText variant="labelSmall" color="textSecondary" style={{ textAlign: 'center' }}>
            {getStr(data.x_label)}
          </ThemedText>
        </View>
      );

    case 'pyramid':
      return (
        <View style={[styles.container, { backgroundColor: colors.surfaceSecondary, borderRadius: Radius.md }]}>
          <ThemedText variant="labelSmall" color="textSecondary" style={styles.diagramLabel}>
            HIERARCHY
          </ThemedText>
          {[...getArr(data.levels)].reverse().map((level, i) => {
            const widthPct: DimensionValue = `${40 + i * 20}%`;
            return (
              <View key={level} style={styles.pyramidRow}>
                <View
                  style={[
                    styles.pyramidBar,
                    {
                      width: widthPct,
                      backgroundColor: colors.primaryMuted,
                      borderColor: colors.primary,
                    },
                  ]}
                >
                  <ThemedText variant="caption" color="primary" style={{ textAlign: 'center' }}>
                    {level}
                  </ThemedText>
                </View>
              </View>
            );
          })}
        </View>
      );

    case 'cycle':
      return (
        <View style={[styles.container, { backgroundColor: colors.surfaceSecondary, borderRadius: Radius.md }]}>
          <ThemedText variant="labelSmall" color="textSecondary" style={styles.diagramLabel}>
            THE CYCLE
          </ThemedText>
          <View style={styles.cycleContainer}>
            {getArr(data.steps).map((step, i, arr) => (
              <View key={step} style={styles.cycleStep}>
                <View style={[styles.cycleNumber, { backgroundColor: colors.primary }]}>
                  <ThemedText variant="labelSmall" style={{ color: colors.white }}>
                    {i + 1}
                  </ThemedText>
                </View>
                <ThemedText variant="caption" color="text" style={styles.cycleLabel}>
                  {step}
                </ThemedText>
                {i < arr.length - 1 && (
                  <ThemedText color="textTertiary" style={styles.cycleArrow}>→</ThemedText>
                )}
              </View>
            ))}
          </View>
        </View>
      );

    default:
      return null;
  }
}

const styles = StyleSheet.create({
  container: { padding: Spacing.md, marginVertical: Spacing.sm },
  diagramLabel: { marginBottom: Spacing.sm },

  // Timeline
  timelineRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 4 },
  timelineItem: { alignItems: 'center', gap: 4 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  timelineText: { maxWidth: 70, textAlign: 'center' },
  arrow: { width: 16, height: 2, marginBottom: 16 },

  // Two column
  twoColRow: { flexDirection: 'row', gap: Spacing.sm },
  col: { flex: 1, gap: 4 },
  colHeader: { marginBottom: 4 },
  colItem: { lineHeight: 18 },

  // Funnel
  funnelStep: { alignItems: 'center', marginBottom: 4 },
  funnelBar: {
    paddingVertical: 6,
    paddingHorizontal: Spacing.sm,
    borderRadius: 4,
    alignItems: 'center',
  },

  // Matrix
  matrix: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: 4 },
  quadrant: {
    width: '48%',
    padding: Spacing.sm,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
  },

  // Pyramid
  pyramidRow: { alignItems: 'center', marginBottom: 4 },
  pyramidBar: {
    paddingVertical: 6,
    paddingHorizontal: Spacing.sm,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
  },

  // Cycle
  cycleContainer: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 4 },
  cycleStep: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cycleNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cycleLabel: { maxWidth: 60 },
  cycleArrow: { fontSize: 14 },
});
