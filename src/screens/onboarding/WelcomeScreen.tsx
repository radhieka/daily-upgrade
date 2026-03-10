import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/types';
import { ThemedView } from '../../components/common/ThemedView';
import { ThemedText } from '../../components/common/ThemedText';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { useTheme } from '../../context/ThemeContext';
import { Spacing } from '../../theme/spacing';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  const { colors } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <View style={styles.hero}>
            <View style={[styles.logoMark, { backgroundColor: colors.primary }]}>
              <ThemedText variant="h1" style={{ color: colors.white, lineHeight: 40 }}>
                D
              </ThemedText>
            </View>
            <ThemedText variant="h1" style={styles.title}>
              Daily Upgrade
            </ThemedText>
            <ThemedText variant="body" color="textSecondary" style={styles.subtitle}>
              Your daily 2-minute upgrade{'\n'}for modern builders.
            </ThemedText>
          </View>

          <View style={styles.features}>
            {[
              { icon: '⚡', text: 'One lesson per topic, every day' },
              { icon: '🎯', text: 'Personalized to your interests' },
              { icon: '📈', text: 'Track streaks and progress' },
            ].map(item => (
              <View key={item.text} style={[styles.featureRow, { borderColor: colors.border }]}>
                <ThemedText style={styles.featureIcon}>{item.icon}</ThemedText>
                <ThemedText variant="body" color="textSecondary">
                  {item.text}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <PrimaryButton
            title="Get Started"
            onPress={() => navigation.navigate('QuizInterests')}
          />
          <ThemedText
            variant="caption"
            color="textTertiary"
            style={styles.note}
          >
            No account needed. Fully offline.
          </ThemedText>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, paddingHorizontal: Spacing.lg },
  content: { flex: 1, justifyContent: 'center' },
  hero: { alignItems: 'center', marginBottom: Spacing.xxl },
  logoMark: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: { textAlign: 'center', marginBottom: Spacing.sm },
  subtitle: { textAlign: 'center', lineHeight: 26 },
  features: { gap: Spacing.sm },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderRadius: 12,
  },
  featureIcon: { fontSize: 20 },
  footer: { paddingBottom: Spacing.xl, gap: Spacing.sm },
  note: { textAlign: 'center' },
});
