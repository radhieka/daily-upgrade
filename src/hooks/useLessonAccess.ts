import { TopicId } from '../data/types';
import { useUser } from '../context/UserContext';
import { isToday } from '../utils/dateUtils';

export interface LessonAccess {
  isLocked: boolean;
  isTrackComplete: boolean;
  completedToday: boolean;
  nextDayNumber: number;
  lessonsCompleted: number;
}

export function useLessonAccess(topicId: TopicId): LessonAccess {
  const { topicProgress } = useUser();
  const progress = topicProgress[topicId];

  const isTrackComplete = progress.lessons_completed >= 10;
  const completedToday =
    progress.last_completed_date !== null && isToday(progress.last_completed_date);
  const isLocked = isTrackComplete || completedToday;
  const nextDayNumber = progress.lessons_completed + 1;

  return {
    isLocked,
    isTrackComplete,
    completedToday,
    nextDayNumber,
    lessonsCompleted: progress.lessons_completed,
  };
}
