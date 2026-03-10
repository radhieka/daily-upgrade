import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Switch,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/types';
import { ThemedView } from '../components/common/ThemedView';
import { ThemedText } from '../components/common/ThemedText';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { Spacing, Radius } from '../theme/spacing';

type Props = NativeStackScreenProps<MainStackParamList, 'Settings'>;

type ConfirmAction = 'retake' | 'reset' | null;

export function SettingsScreen({ navigation }: Props) {
  const { colors, mode, toggleTheme } = useTheme();
  const { resetAll } = useUser();
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    await resetAll();
    setLoading(false);
    setConfirmAction(null);
    // RootNavigator switches to Onboarding automatically when hasOnboarded becomes false
  }

  const confirmTitle =
    confirmAction === 'retake' ? 'Retake Quiz?' : 'Reset All Data?';
  const confirmBody =
    confirmAction === 'retake'
      ? 'This will reset all your progress and start fresh.'
      : 'This will erase all progress, streak, and profile data permanently.';

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <ThemedText color="primary">← Back</ThemedText>
          </TouchableOpacity>
          <ThemedText variant="h4">Settings</ThemedText>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.content}>
          {/* Appearance */}
          <ThemedText variant="labelSmall" color="textTertiary" style={styles.groupLabel}>
            APPEARANCE
          </ThemedText>
          <View style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <ThemedText variant="bodyMedium">Dark Mode</ThemedText>
            <Switch
              value={mode === 'dark'}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>

          {/* Preferences */}
          <ThemedText variant="labelSmall" color="textTertiary" style={[styles.groupLabel, { marginTop: Spacing.lg }]}>
            PREFERENCES
          </ThemedText>
          <TouchableOpacity
            style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => setConfirmAction('retake')}
            activeOpacity={0.7}
          >
            <ThemedText variant="bodyMedium">Retake Interest Quiz</ThemedText>
            <ThemedText color="textTertiary">→</ThemedText>
          </TouchableOpacity>

          {/* Danger zone */}
          <ThemedText variant="labelSmall" color="textTertiary" style={[styles.groupLabel, { marginTop: Spacing.lg }]}>
            DANGER ZONE
          </ThemedText>
          <TouchableOpacity
            style={[styles.row, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => setConfirmAction('reset')}
            activeOpacity={0.7}
          >
            <ThemedText variant="bodyMedium" style={{ color: '#EF4444' }}>
              Reset All App Data
            </ThemedText>
            <ThemedText color="textTertiary">→</ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Inline confirmation overlay — works on web and native */}
      {confirmAction !== null && (
        <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
          <View style={[styles.confirmBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <ThemedText variant="h4" style={styles.confirmTitle}>
              {confirmTitle}
            </ThemedText>
            <ThemedText variant="body" color="textSecondary" style={styles.confirmBody}>
              {confirmBody}
            </ThemedText>
            <View style={styles.confirmButtons}>
              <PrimaryButton
                title="Cancel"
                variant="secondary"
                onPress={() => setConfirmAction(null)}
                style={styles.confirmBtn}
              />
              <TouchableOpacity
                onPress={handleConfirm}
                disabled={loading}
                style={[styles.confirmBtn, styles.destructiveBtn, { opacity: loading ? 0.6 : 1 }]}
              >
                <ThemedText variant="bodyMedium" style={{ color: '#fff' }}>
                  {loading ? 'Resetting…' : 'Confirm'}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
  content: { padding: Spacing.lg },
  groupLabel: { marginBottom: Spacing.sm, marginLeft: 4 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    marginBottom: Spacing.xs,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  confirmBox: {
    width: '100%',
    maxWidth: 360,
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  confirmTitle: { textAlign: 'center' },
  confirmBody: { textAlign: 'center' },
  confirmButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  confirmBtn: { flex: 1 },
  destructiveBtn: {
    backgroundColor: '#EF4444',
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
});
