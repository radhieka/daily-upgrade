import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/types';
import { ThemedView } from '../components/common/ThemedView';
import { ThemedText } from '../components/common/ThemedText';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { StreakBadge } from '../components/home/StreakBadge';
import { TopicCard } from '../components/home/TopicCard';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { ALL_TOPIC_IDS, TOPIC_LABELS, TOPIC_COLORS, TOPIC_ICONS } from '../data/types';
import { ALL_LESSONS } from '../data/index';
import { Spacing, Radius } from '../theme/spacing';

type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;

function getRandomLesson() {
  const topicId = ALL_TOPIC_IDS[Math.floor(Math.random() * ALL_TOPIC_IDS.length)];
  const lessons = ALL_LESSONS[topicId];
  const lesson = lessons[Math.floor(Math.random() * lessons.length)];
  return { topicId, dayNumber: lesson.day_number };
}

export function HomeScreen({ navigation }: Props) {
  const { profile, topicProgress } = useUser();
  const { colors } = useTheme();

  if (!profile) return null;

  const allComplete = profile.top_topics.every(
    id => topicProgress[id].lessons_completed >= 10,
  );

  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const greeting = profile.name ? `${timeGreeting}, ${profile.name} 👋` : `${timeGreeting} 👋`;

  function handleExploreTap() {
    const { topicId, dayNumber } = getRandomLesson();
    navigation.navigate('Lesson', { topicId, dayNumber, exploreMode: true });
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <View style={styles.headerRow}>
            <View>
              <ThemedText variant="h3">{greeting}</ThemedText>
              <ThemedText variant="caption" color="textSecondary">
                Your daily 2-minute upgrade
              </ThemedText>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={[styles.settingsBtn, { backgroundColor: colors.surfaceSecondary }]}
            >
              <ThemedText style={{ fontSize: 18 }}>⚙️</ThemedText>
            </TouchableOpacity>
          </View>
          <StreakBadge streak={profile.streak} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Explore banner */}
          <TouchableOpacity
            onPress={handleExploreTap}
            activeOpacity={0.88}
            style={[styles.exploreBanner, { backgroundColor: colors.primary }]}
          >
            <View style={styles.exploreBannerLeft}>
              <ThemedText style={styles.exploreEmoji}>🎲</ThemedText>
              <View>
                <ThemedText variant="h4" style={{ color: '#fff' }}>
                  I want to learn about anything
                </ThemedText>
                <ThemedText variant="caption" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Surprise me — pick a random lesson
                </ThemedText>
              </View>
            </View>
            <View style={styles.exploreBannerArrow}>
              <ThemedText style={{ color: '#fff', fontSize: 18 }}>→</ThemedText>
            </View>
          </TouchableOpacity>

          {/* Today's lessons or all-done state */}
          {allComplete ? (
            <View style={[styles.allDone, { backgroundColor: colors.primaryMuted, borderColor: colors.primary }]}>
              <ThemedText style={{ fontSize: 40, textAlign: 'center' }}>🎉</ThemedText>
              <ThemedText variant="h3" style={{ textAlign: 'center' }}>
                You crushed it!
              </ThemedText>
              <ThemedText variant="body" color="textSecondary" style={{ textAlign: 'center' }}>
                All your tracks are complete. Ready for a new challenge?
              </ThemedText>
              <PrimaryButton
                title="Retake Quiz"
                onPress={() => navigation.navigate('Settings')}
              />
            </View>
          ) : (
            <>
              <View style={styles.sectionHeader}>
                <ThemedText variant="h4">Today's Lessons</ThemedText>
                <ThemedText variant="caption" color="textSecondary">
                  {profile.top_topics.filter(id => !topicProgress[id].last_completed_date || (() => {
                    const d = new Date(); const s = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
                    return topicProgress[id].last_completed_date !== s;
                  })()).length} remaining today
                </ThemedText>
              </View>
              {profile.top_topics.map(topicId => (
                <TopicCard
                  key={topicId}
                  topicId={topicId}
                  onPress={() => navigation.navigate('Lesson', { topicId })}
                />
              ))}
            </>
          )}

          {/* All topics overview */}
          <ThemedText variant="h4" style={styles.allTopicsTitle}>
            All Topics
          </ThemedText>
          <ThemedText variant="caption" color="textSecondary" style={{ marginBottom: Spacing.sm }}>
            Tap any topic to explore a random lesson
          </ThemedText>
          <View style={styles.topicGrid}>
            {ALL_TOPIC_IDS.map(topicId => {
              const color = TOPIC_COLORS[topicId];
              return (
                <TouchableOpacity
                  key={topicId}
                  onPress={() => {
                    const lessons = ALL_LESSONS[topicId];
                    const lesson = lessons[Math.floor(Math.random() * lessons.length)];
                    navigation.navigate('Lesson', { topicId, dayNumber: lesson.day_number, exploreMode: true });
                  }}
                  activeOpacity={0.8}
                  style={[styles.topicChip, { backgroundColor: color + '15', borderColor: color + '40' }]}
                >
                  <ThemedText style={styles.topicChipIcon}>{TOPIC_ICONS[topicId]}</ThemedText>
                  <ThemedText variant="labelSmall" style={{ color, flexShrink: 1 }} numberOfLines={2}>
                    {TOPIC_LABELS[topicId]}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
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
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    gap: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  settingsBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  exploreBanner: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exploreBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  exploreEmoji: { fontSize: 32 },
  exploreBannerArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  allDone: {
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  allTopicsTitle: { marginTop: Spacing.sm },
  topicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  topicChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    maxWidth: '48%',
    minWidth: '45%',
    flex: 1,
  },
  topicChipIcon: { fontSize: 16 },
});
