export type TopicId =
  | 'ai_emerging_tech'
  | 'product_management'
  | 'growth_monetization'
  | 'leadership_comms'
  | 'operations_execution'
  | 'personal_effectiveness';

export type LearningStyle = 'visual' | 'conceptual' | 'tactical';

export type DiagramType =
  | 'two_column'
  | 'funnel'
  | 'timeline'
  | 'matrix_2x2'
  | 'pyramid'
  | 'cycle';

export interface Lesson {
  id: string;
  topic: TopicId;
  day_number: number;
  title: string;
  hook: string;
  core_insights: string[];
  example: string;
  diagram_type?: DiagramType;
  diagram_data?: Record<string, string | string[]>;
  key_takeaways: string[];
}

export interface Interest {
  id: string;
  label: string;
  topic: TopicId;
}

export interface UserProfile {
  name: string;
  top_topics: [TopicId, TopicId, TopicId];
  learning_style: LearningStyle;
  streak: number;
  last_completion_date: string | null;
}

export interface TopicProgress {
  lessons_completed: number;
  last_completed_date: string | null;
}

export type TopicProgressMap = Record<TopicId, TopicProgress>;

export const TOPIC_LABELS: Record<TopicId, string> = {
  ai_emerging_tech: 'AI & Emerging Tech',
  product_management: 'Product Management',
  growth_monetization: 'Growth & Monetization',
  leadership_comms: 'Leadership & Communication',
  operations_execution: 'Operations & Execution',
  personal_effectiveness: 'Personal Effectiveness',
};

export const TOPIC_COLORS: Record<TopicId, string> = {
  ai_emerging_tech: '#7C3AED',
  product_management: '#2563EB',
  growth_monetization: '#059669',
  leadership_comms: '#DC2626',
  operations_execution: '#D97706',
  personal_effectiveness: '#0891B2',
};

export const TOPIC_ICONS: Record<TopicId, string> = {
  ai_emerging_tech: '🤖',
  product_management: '🎯',
  growth_monetization: '📈',
  leadership_comms: '🤝',
  operations_execution: '⚙️',
  personal_effectiveness: '⚡',
};

export const ALL_TOPIC_IDS: TopicId[] = [
  'ai_emerging_tech',
  'product_management',
  'growth_monetization',
  'leadership_comms',
  'operations_execution',
  'personal_effectiveness',
];
