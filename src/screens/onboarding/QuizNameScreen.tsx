import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/types';
import { ThemedView } from '../../components/common/ThemedView';
import { ThemedText } from '../../components/common/ThemedText';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { mapInterestsToTopics } from '../../utils/topicUtils';
import { TopicId } from '../../data/types';
import { Typography } from '../../theme/typography';
import { Spacing, Radius } from '../../theme/spacing';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'QuizName'>;

export function QuizNameScreen({ navigation, route }: Props) {
  const { colors } = useTheme();
  const { saveProfile } = useUser();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const { selectedInterestIds, learningStyle } = route.params;

  async function handleFinish() {
    setLoading(true);
    const topics = mapInterestsToTopics(selectedInterestIds) as [TopicId, TopicId, TopicId];
    await saveProfile({
      name: name.trim(),
      top_topics: topics,
      learning_style: learningStyle,
      streak: 0,
      last_completion_date: null,
    });
    navigation.replace('QuizComplete');
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <ThemedText variant="labelSmall" color="textTertiary">
              STEP 3 OF 3
            </ThemedText>
            <ThemedText variant="h3" style={styles.title}>
              What should we call you?
            </ThemedText>
            <ThemedText variant="body" color="textSecondary">
              Optional — skip if you prefer.
            </ThemedText>
          </View>

          <View style={styles.inputArea}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your first name"
              placeholderTextColor={colors.textTertiary}
              style={[
                styles.input,
                Typography.h3,
                {
                  color: colors.text,
                  borderColor: name ? colors.primary : colors.border,
                  backgroundColor: colors.surface,
                },
              ]}
              maxLength={30}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={handleFinish}
            />
          </View>

          <View style={[styles.footer, { borderTopColor: colors.border }]}>
            <PrimaryButton
              title={name.trim() ? "Let's go" : 'Skip & Continue'}
              onPress={handleFinish}
              loading={loading}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  flex: { flex: 1 },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    gap: Spacing.xs,
  },
  title: { marginTop: Spacing.xs },
  inputArea: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  input: {
    borderWidth: 2,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
  },
});
