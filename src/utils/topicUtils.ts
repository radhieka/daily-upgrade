import { Interest, TopicId } from '../data/types';
import { INTERESTS } from '../data/interests';

export function mapInterestsToTopics(selectedInterestIds: string[]): TopicId[] {
  const topics = selectedInterestIds
    .map(id => INTERESTS.find(i => i.id === id)?.topic)
    .filter((t): t is TopicId => t !== undefined);
  return [...new Set(topics)];
}

export function getInterestById(id: string): Interest | undefined {
  return INTERESTS.find(i => i.id === id);
}
