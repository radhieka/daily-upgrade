import { aiEmergingTechLessons } from './lessons/aiEmergingTech';
import { productManagementLessons } from './lessons/productManagement';
import { growthMonetizationLessons } from './lessons/growthMonetization';
import { leadershipCommsLessons } from './lessons/leadershipComms';
import { operationsExecutionLessons } from './lessons/operationsExecution';
import { personalEffectivenessLessons } from './lessons/personalEffectiveness';
import { TopicId, Lesson } from './types';

export const ALL_LESSONS: Record<TopicId, Lesson[]> = {
  ai_emerging_tech: aiEmergingTechLessons,
  product_management: productManagementLessons,
  growth_monetization: growthMonetizationLessons,
  leadership_comms: leadershipCommsLessons,
  operations_execution: operationsExecutionLessons,
  personal_effectiveness: personalEffectivenessLessons,
};

export function getLessonForTopic(topicId: TopicId, dayNumber: number): Lesson | undefined {
  return ALL_LESSONS[topicId]?.find(l => l.day_number === dayNumber);
}
