import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/types';
import { ThemedView } from '../../components/common/ThemedView';
import { ThemedText } from '../../components/common/ThemedText';
import { useTheme } from '../../context/ThemeContext';
import { Spacing } from '../../theme/spacing';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'QuizComplete'>;

export function QuizCompleteScreen(_props: Props) {
  const { colors } = useTheme();

  // RootNavigator will automatically switch to Main once hasOnboarded is true.
  // No explicit navigation needed here.

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.checkCircle, { backgroundColor: colors.success }]}>
          <ThemedText style={styles.checkIcon}>✓</ThemedText>
        </View>
        <ThemedText variant="h2" style={styles.title}>
          You are all set!
        </ThemedText>
        <ThemedText variant="body" color="textSecondary" style={styles.subtitle}>
          Building your personalized curriculum...
        </ThemedText>
        <ActivityIndicator
          color={colors.primary}
          style={styles.spinner}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { alignItems: 'center', paddingHorizontal: Spacing.xl },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  checkIcon: { fontSize: 36, color: 'white' },
  title: { textAlign: 'center', marginBottom: Spacing.sm },
  subtitle: { textAlign: 'center', marginBottom: Spacing.xl },
  spinner: { marginTop: Spacing.md },
});
