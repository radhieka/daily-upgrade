import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TopicId, TopicProgressMap, UserProfile } from '../data/types';
import {
  loadUserProfile,
  saveUserProfile,
  loadHasOnboarded,
  saveHasOnboarded,
} from '../storage/userStorage';
import {
  loadTopicProgress,
  saveTopicProgress,
  initProgressMap,
  clearAllData,
} from '../storage/progressStorage';
import { todayString, computeNewStreak } from '../utils/dateUtils';

interface UserContextType {
  isLoaded: boolean;
  hasOnboarded: boolean;
  profile: UserProfile | null;
  topicProgress: TopicProgressMap;
  saveProfile: (profile: UserProfile) => Promise<void>;
  completeLesson: (topicId: TopicId) => Promise<void>;
  resetAll: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  isLoaded: false,
  hasOnboarded: false,
  profile: null,
  topicProgress: initProgressMap(),
  saveProfile: async () => {},
  completeLesson: async () => {},
  resetAll: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [topicProgress, setTopicProgress] = useState<TopicProgressMap>(initProgressMap());

  useEffect(() => {
    async function bootstrap() {
      const [onboarded, savedProfile, savedProgress] = await Promise.all([
        loadHasOnboarded(),
        loadUserProfile(),
        loadTopicProgress(),
      ]);
      setHasOnboarded(onboarded);
      setProfile(savedProfile);
      setTopicProgress(savedProgress);
      setIsLoaded(true);
    }
    bootstrap();
  }, []);

  const saveProfileFn = useCallback(async (newProfile: UserProfile) => {
    await saveUserProfile(newProfile);
    await saveHasOnboarded();
    setProfile(newProfile);
    setHasOnboarded(true);
    // Reset progress for new profile
    const freshProgress = initProgressMap();
    await saveTopicProgress(freshProgress);
    setTopicProgress(freshProgress);
  }, []);

  const completeLesson = useCallback(async (topicId: TopicId) => {
    const today = todayString();

    setTopicProgress(prev => {
      const current = prev[topicId];
      const updated = {
        ...prev,
        [topicId]: {
          lessons_completed: current.lessons_completed + 1,
          last_completed_date: today,
        },
      };
      saveTopicProgress(updated);
      return updated;
    });

    setProfile(prev => {
      if (!prev) return prev;
      const newStreak = computeNewStreak(prev.streak, prev.last_completion_date);
      const updated = {
        ...prev,
        streak: newStreak,
        last_completion_date: today,
      };
      saveUserProfile(updated);
      return updated;
    });
  }, []);

  const resetAll = useCallback(async () => {
    await clearAllData();
    setHasOnboarded(false);
    setProfile(null);
    setTopicProgress(initProgressMap());
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoaded,
        hasOnboarded,
        profile,
        topicProgress,
        saveProfile: saveProfileFn,
        completeLesson,
        resetAll,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
