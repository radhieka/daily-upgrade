export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function todayString(): string {
  return toDateString(new Date());
}

export function isToday(dateString: string): boolean {
  return dateString === todayString();
}

export function isYesterday(dateString: string): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateString === toDateString(yesterday);
}

export function computeNewStreak(
  currentStreak: number,
  lastCompletionDate: string | null,
): number {
  if (lastCompletionDate === null) return 1;
  if (isToday(lastCompletionDate)) return currentStreak;
  if (isYesterday(lastCompletionDate)) return currentStreak + 1;
  return 1;
}
