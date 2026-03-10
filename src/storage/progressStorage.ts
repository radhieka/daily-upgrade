import AsyncStorage from '@react-native-async-storage/async-storage';
import { TopicId, TopicProgress, TopicProgressMap, ALL_TOPIC_IDS } from '../data/types';
import { STORAGE_KEYS } from './storageKeys';

const defaultProgress = (): TopicProgress => ({
  lessons_completed: 0,
  last_completed_date: null,
});

export async function loadTopicProgress(): Promise<TopicProgressMap> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.TOPIC_PROGRESS);
    if (!raw) return initProgressMap();
    const parsed = JSON.parse(raw) as Partial<TopicProgressMap>;
    const map = initProgressMap();
    for (const topicId of ALL_TOPIC_IDS) {
      if (parsed[topicId]) {
        map[topicId] = parsed[topicId]!;
      }
    }
    return map;
  } catch {
    return initProgressMap();
  }
}

export async function saveTopicProgress(map: TopicProgressMap): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.TOPIC_PROGRESS, JSON.stringify(map));
}

export function initProgressMap(): TopicProgressMap {
  return ALL_TOPIC_IDS.reduce((acc, id) => {
    acc[id] = defaultProgress();
    return acc;
  }, {} as TopicProgressMap);
}

export async function clearAllData(): Promise<void> {
  await AsyncStorage.multiRemove([
    STORAGE_KEYS.HAS_ONBOARDED,
    STORAGE_KEYS.USER_PROFILE,
    STORAGE_KEYS.TOPIC_PROGRESS,
  ]);
}
