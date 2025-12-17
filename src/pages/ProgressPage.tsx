import { ArrowLeft, Trophy, Target, Flame, Star, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';

export default function ProgressPage() {
  const navigate = useNavigate();
  const { 
    achievements, 
    studyStreak, 
    totalQuestionsAnswered, 
    correctAnswers 
  } = useApp();

  const accuracy = totalQuestionsAnswered > 0 
    ? Math.round((correctAnswers / totalQuestionsAnswered) * 100) 
    : 0;

  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  const lockedAchievements = achievements.filter(a => !a.unlockedAt);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="gradient-hero text-primary-foreground px-4 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Your Profile</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-primary-foreground/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5" />
              <span className="text-sm opacity-80">Study Streak</span>
            </div>
            <p className="text-3xl font-bold">{studyStreak} days</p>
          </div>
          <div className="bg-primary-foreground/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5" />
              <span className="text-sm opacity-80">Accuracy</span>
            </div>
            <p className="text-3xl font-bold">{accuracy}%</p>
          </div>
          <div className="bg-primary-foreground/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5" />
              <span className="text-sm opacity-80">Questions</span>
            </div>
            <p className="text-3xl font-bold">{totalQuestionsAnswered}</p>
          </div>
          <div className="bg-primary-foreground/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5" />
              <span className="text-sm opacity-80">Achievements</span>
            </div>
            <p className="text-3xl font-bold">{unlockedAchievements.length}/{achievements.length}</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-8">

        {/* Achievements */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Achievements</h2>
          
          {/* Unlocked */}
          {unlockedAchievements.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Unlocked</p>
              <div className="grid grid-cols-2 gap-3">
                {unlockedAchievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className="bg-gradient-to-br from-success/10 to-success/5 border border-success/20 rounded-2xl p-4"
                  >
                    <span className="text-3xl mb-2 block">{achievement.icon}</span>
                    <h4 className="font-semibold text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Locked */}
          {lockedAchievements.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Locked</p>
              <div className="grid grid-cols-2 gap-3">
                {lockedAchievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className="bg-muted/50 border border-border rounded-2xl p-4 opacity-60"
                  >
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mb-2">
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h4 className="font-semibold text-sm">{achievement.title}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
