import { Flame } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function StreakBadge() {
  const { studyStreak } = useApp();

  if (studyStreak === 0) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full">
      <Flame className="w-4 h-4 text-accent" />
      <span className="text-sm font-semibold text-accent">{studyStreak} day streak</span>
    </div>
  );
}
