import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/types';
import { ThemedView } from '../components/common/ThemedView';
import { ThemedText } from '../components/common/ThemedText';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { LessonLayoutVisual } from '../components/lesson/LessonLayoutVisual';
import { LessonLayoutConceptual } from '../components/lesson/LessonLayoutConceptual';
import { LessonLayoutTactical } from '../components/lesson/LessonLayoutTactical';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useLessonAccess } from '../hooks/useLessonAccess';
import { getLessonForTopic } from '../data/index';
import { TOPIC_LABELS, TOPIC_COLORS, TOPIC_ICONS } from '../data/types';
import { Spacing, Radius } from '../theme/spacing';

type Props = NativeStackScreenProps<MainStackParamList, 'Lesson'>;

export function LessonScreen({ navigation, route }: Props) {
  const { topicId, dayNumber, exploreMode } = route.params;
  const { profile, completeLesson } = useUser();
  const { colors } = useTheme();
  const access = useLessonAccess(topicId);
  const [completed, setCompleted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const accentColor = TOPIC_COLORS[topicId];
  const topicIcon = TOPIC_ICONS[topicId];

  // Auto-navigate home after completion
  useEffect(() => {
    if (completed) {
      const timer = setTimeout(() => navigation.navigate('Home'), 1800);
      return () => clearTimeout(timer);
    }
  }, [completed, navigation]);

  if (!profile) return null;

  // In explore mode use the provided dayNumber; otherwise use the user's next lesson
  const lessonDayNumber = exploreMode && dayNumber != null ? dayNumber : access.nextDayNumber;
  const lesson = getLessonForTopic(topicId, lessonDayNumber);

  if (!exploreMode && (access.isLocked || !lesson)) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safe}>
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <ThemedText color="primary">← Back</ThemedText>
            </TouchableOpacity>
          </View>
          <View style={styles.lockedContent}>
            <ThemedText style={{ fontSize: 56 }}>
              {access.isTrackComplete ? '🏆' : '🔒'}
            </ThemedText>
            <ThemedText variant="h3" style={{ textAlign: 'center' }}>
              {access.isTrackComplete ? 'Track Complete!' : 'Come back tomorrow'}
            </ThemedText>
            <ThemedText variant="body" color="textSecondary" style={{ textAlign: 'center' }}>
              {access.isTrackComplete
                ? `You finished all 10 lessons in ${TOPIC_LABELS[topicId]}. Amazing work!`
                : 'You already completed a lesson in this topic today. Great work keeping the streak!'}
            </ThemedText>
            <PrimaryButton title="Back to Home" onPress={() => navigation.navigate('Home')} />
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  if (!lesson) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safe}>
          <View style={styles.lockedContent}>
            <ThemedText style={{ fontSize: 40 }}>😅</ThemedText>
            <ThemedText variant="h3">Lesson not found</ThemedText>
            <PrimaryButton title="Back to Home" onPress={() => navigation.navigate('Home')} />
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  async function handleComplete() {
    setLoading(true);
    if (!exploreMode) await completeLesson(topicId);
    setCompleted(true);
    setLoading(false);
  }

  const layout = {
    visual: <LessonLayoutVisual lesson={lesson} />,
    conceptual: <LessonLayoutConceptual lesson={lesson} />,
    tactical: <LessonLayoutTactical lesson={lesson} />,
  }[profile.learning_style];

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <ThemedText color="primary">← Back</ThemedText>
          </TouchableOpacity>
          <View style={[styles.topicPill, { backgroundColor: accentColor + '18', borderColor: accentColor + '40' }]}>
            <ThemedText style={{ fontSize: 14 }}>{topicIcon}</ThemedText>
            <ThemedText variant="labelSmall" style={{ color: accentColor }}>
              {TOPIC_LABELS[topicId]}
            </ThemedText>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Explore mode badge */}
          {exploreMode && (
            <View style={[styles.exploreBadge, { backgroundColor: colors.primaryMuted }]}>
              <ThemedText style={{ fontSize: 14 }}>🎲</ThemedText>
              <ThemedText variant="labelSmall" color="primary">Explore Mode — this won't count toward your daily progress</ThemedText>
            </View>
          )}

          {/* Lesson title with accent left border */}
          <View style={[styles.titleBlock, { borderLeftColor: accentColor }]}>
            <ThemedText variant="labelSmall" color="textTertiary" style={{ marginBottom: 2 }}>
              {exploreMode ? 'Random Lesson' : `Day ${lesson.day_number} of 10`}
            </ThemedText>
            <ThemedText variant="h2">{lesson.title}</ThemedText>
          </View>

          {layout}

          {/* Complete / completed section */}
          <View style={styles.completeSection}>
            {completed ? (
              <View style={[styles.completedBanner, { backgroundColor: colors.successMuted, borderColor: colors.success }]}>
                <ThemedText style={{ fontSize: 28 }}>✅</ThemedText>
                <View style={{ flex: 1 }}>
                  <ThemedText variant="bodyMedium" color="success">
                    {exploreMode ? 'Nice exploring!' : 'Lesson complete!'}
                  </ThemedText>
                  <ThemedText variant="caption" color="textSecondary">
                    Taking you back home…
                  </ThemedText>
                </View>
              </View>
            ) : (
              <PrimaryButton
                title={exploreMode ? '✓  Got it! Back to home' : '✓  Mark as Complete'}
                onPress={handleComplete}
                loading={loading}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: 5,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  exploreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.md,
  },
  titleBlock: {
    borderLeftWidth: 4,
    paddingLeft: Spacing.md,
    marginBottom: Spacing.xs,
  },
  lockedContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
  },
  completeSection: { marginTop: Spacing.lg },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
});
