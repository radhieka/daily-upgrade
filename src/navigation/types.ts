import { TopicId } from '../data/types';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  QuizInterests: undefined;
  QuizStyle: { selectedInterestIds: string[] };
  QuizName: { selectedInterestIds: string[]; learningStyle: import('../data/types').LearningStyle };
  QuizComplete: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Lesson: { topicId: TopicId; dayNumber?: number; exploreMode?: boolean };
  Settings: undefined;
};
