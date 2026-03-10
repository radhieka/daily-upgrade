import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/types';
import { ThemedView } from '../../components/common/ThemedView';
import { ThemedText } from '../../components/common/ThemedText';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { InterestChip } from '../../components/quiz/InterestChip';
import { useTheme } from '../../context/ThemeContext';
import { INTERESTS } from '../../data/interests';
import { mapInterestsToTopics } from '../../utils/topicUtils';
import { Spacing } from '../../theme/spacing';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'QuizInterests'>;

export function QuizInterestsScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const uniqueTopicsSelected = mapInterestsToTopics([...selected]).length;

  function toggleInterest(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= 3 && uniqueTopicsSelected >= 3) {
          // Check if adding this would exceed 3 unique topics
          const candidateTopics = mapInterestsToTopics([...next, id]);
          if (candidateTopics.length > 3) return prev;
        }
        next.add(id);
      }
      return next;
    });
  }

  const selectedTopics = mapInterestsToTopics([...selected]);
  const canProceed = selectedTopics.length === 3;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <ThemedText variant="labelSmall" color="textTertiary">
            STEP 1 OF 3
          </ThemedText>
          <ThemedText variant="h3" style={styles.title}>
            What do you want to learn?
          </ThemedText>
          <ThemedText variant="body" color="textSecondary">
            Select 3 interests to unlock your topics.{' '}
            <ThemedText variant="bodyMedium" color="primary">
              {selectedTopics.length}/3 topics selected
            </ThemedText>
          </ThemedText>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.chips}>
            {INTERESTS.map(interest => (
              <InterestChip
                key={interest.id}
                label={interest.label}
                selected={selected.has(interest.id)}
                onPress={() => toggleInterest(interest.id)}
              />
            ))}
          </View>
        </ScrollView>

        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <PrimaryButton
            title="Continue"
            disabled={!canProceed}
            onPress={() =>
              navigation.navigate('QuizStyle', {
                selectedInterestIds: [...selected],
              })
            }
          />
        </View>
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
    gap: Spacing.xs,
  },
  title: { marginTop: Spacing.xs },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.md, paddingVertical: Spacing.lg },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
  },
});
