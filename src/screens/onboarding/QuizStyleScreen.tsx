import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/types';
import { ThemedView } from '../../components/common/ThemedView';
import { ThemedText } from '../../components/common/ThemedText';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { useTheme } from '../../context/ThemeContext';
import { LearningStyle } from '../../data/types';
import { Spacing, Radius } from '../../theme/spacing';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'QuizStyle'>;

const STYLES: { id: LearningStyle; label: string; description: string; icon: string }[] = [
  {
    id: 'visual',
    label: 'Visual',
    description: 'Diagrams, highlights, and visual blocks help me understand concepts.',
    icon: '🎨',
  },
  {
    id: 'conceptual',
    label: 'Conceptual',
    description: 'I love structured explanations, models, and the "why" behind things.',
    icon: '🧠',
  },
  {
    id: 'tactical',
    label: 'Tactical',
    description: 'Give me steps, checklists, and frameworks I can apply right away.',
    icon: '⚡',
  },
];

export function QuizStyleScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<LearningStyle | null>(null);
  const { selectedInterestIds } = route.params;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <ThemedText variant="labelSmall" color="textTertiary">
            STEP 2 OF 3
          </ThemedText>
          <ThemedText variant="h3" style={styles.title}>
            How do you learn best?
          </ThemedText>
          <ThemedText variant="body" color="textSecondary">
            We will tailor each lesson to your preferred style.
          </ThemedText>
        </View>

        <View style={styles.options}>
          {STYLES.map(style => {
            const isSelected = selected === style.id;
            return (
              <TouchableOpacity
                key={style.id}
                onPress={() => setSelected(style.id)}
                activeOpacity={0.8}
                style={[
                  styles.card,
                  {
                    backgroundColor: isSelected ? colors.primaryMuted : colors.surface,
                    borderColor: isSelected ? colors.primary : colors.border,
                  },
                ]}
              >
                <ThemedText style={styles.icon}>{style.icon}</ThemedText>
                <View style={styles.cardText}>
                  <ThemedText
                    variant="h4"
                    color={isSelected ? 'primary' : 'text'}
                  >
                    {style.label}
                  </ThemedText>
                  <ThemedText variant="caption" color="textSecondary">
                    {style.description}
                  </ThemedText>
                </View>
                {isSelected && (
                  <View style={[styles.check, { backgroundColor: colors.primary }]}>
                    <ThemedText style={{ color: colors.white, fontSize: 12 }}>✓</ThemedText>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <PrimaryButton
            title="Continue"
            disabled={!selected}
            onPress={() =>
              navigation.navigate('QuizName', {
                selectedInterestIds,
                learningStyle: selected!,
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
  options: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    gap: Spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    gap: Spacing.md,
  },
  icon: { fontSize: 28 },
  cardText: { flex: 1, gap: 2 },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
  },
});
