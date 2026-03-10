import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { OnboardingNavigator } from './OnboardingNavigator';
import { MainNavigator } from './MainNavigator';
import { useUser } from '../context/UserContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { hasOnboarded } = useUser();

  return (
    <Stack.Navigator
      key={hasOnboarded ? 'main' : 'onboarding'}
      screenOptions={{ headerShown: false, animation: 'fade' }}
    >
      {hasOnboarded ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      )}
    </Stack.Navigator>
  );
}
