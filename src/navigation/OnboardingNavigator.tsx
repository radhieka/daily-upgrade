import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from './types';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { QuizInterestsScreen } from '../screens/onboarding/QuizInterestsScreen';
import { QuizStyleScreen } from '../screens/onboarding/QuizStyleScreen';
import { QuizNameScreen } from '../screens/onboarding/QuizNameScreen';
import { QuizCompleteScreen } from '../screens/onboarding/QuizCompleteScreen';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="QuizInterests" component={QuizInterestsScreen} />
      <Stack.Screen name="QuizStyle" component={QuizStyleScreen} />
      <Stack.Screen name="QuizName" component={QuizNameScreen} />
      <Stack.Screen name="QuizComplete" component={QuizCompleteScreen} />
    </Stack.Navigator>
  );
}
