import React from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { UserProvider, useUser } from './src/context/UserContext';
import { RootNavigator } from './src/navigation/RootNavigator';

function AppInner() {
  const { isLoaded } = useUser();
  const { colors, mode } = useTheme();

  if (!isLoaded) {
    return (
      <View style={[styles.splash, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  if (Platform.OS !== 'web') {
    // GestureHandlerRootView is only needed on native
    const { GestureHandlerRootView } = require('react-native-gesture-handler');
    return (
      <GestureHandlerRootView style={styles.root}>
        <ThemeProvider>
          <UserProvider>
            <AppInner />
          </UserProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    );
  }

  return (
    <View style={styles.root}>
      <ThemeProvider>
        <UserProvider>
          <AppInner />
        </UserProvider>
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  splash: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
