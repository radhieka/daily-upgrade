import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '../data/types';
import { STORAGE_KEYS } from './storageKeys';

export async function loadUserProfile(): Promise<UserProfile | null> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
}

export async function loadHasOnboarded(): Promise<boolean> {
  try {
    const val = await AsyncStorage.getItem(STORAGE_KEYS.HAS_ONBOARDED);
    return val === 'true';
  } catch {
    return false;
  }
}

export async function saveHasOnboarded(): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.HAS_ONBOARDED, 'true');
}

export async function loadThemeMode(): Promise<'light' | 'dark' | null> {
  try {
    const val = await AsyncStorage.getItem(STORAGE_KEYS.THEME_MODE);
    if (val === 'light' || val === 'dark') return val;
    return null;
  } catch {
    return null;
  }
}

export async function saveThemeMode(mode: 'light' | 'dark'): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.THEME_MODE, mode);
}
