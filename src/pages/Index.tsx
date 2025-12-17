import { Bell, Pill, AlertTriangle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { QuickActions } from '@/components/QuickActions';
import { StreakBadge } from '@/components/StreakBadge';
import { DrugCard } from '@/components/DrugCard';
import { drugs } from '@/data/drugs';
import { useApp } from '@/context/AppContext';

export default function Index() {
  const navigate = useNavigate();
  const { completedQuizzes, correctAnswers, totalQuestionsAnswered } = useApp();
  const featuredDrugs = drugs.slice(0, 3);
  const dangerousDrugs = drugs.filter(d => d.isDangerous);

  const accuracy = totalQuestionsAnswered > 0 
    ? Math.round((correctAnswers / totalQuestionsAnswered) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="gradient-hero text-primary-foreground px-4 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">PharmaPro</h1>
            <p className="text-primary-foreground/80 text-sm">Your Drug Reference Guide</p>
          </div>
        <div className="flex items-center gap-3">
            <StreakBadge />
            <button className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-2xl p-3 shadow-sm border border-border/50 text-center">
            <div className="text-2xl font-bold text-primary">{completedQuizzes.length}</div>
            <div className="text-xs text-muted-foreground">Quizzes</div>
          </div>
          <div className="bg-card rounded-2xl p-3 shadow-sm border border-border/50 text-center">
            <div className="text-2xl font-bold text-success">{accuracy}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
          <div className="bg-card rounded-2xl p-3 shadow-sm border border-border/50 text-center">
            <div className="text-2xl font-bold text-accent">{drugs.length}</div>
            <div className="text-xs text-muted-foreground">Drugs</div>
          </div>
        </div>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
          <QuickActions />
        </section>

        {/* Dangerous Drugs Alert */}
        <section className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-destructive/20 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-destructive">High-Alert Medications</h3>
              <p className="text-xs text-muted-foreground">Requires extra caution</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {dangerousDrugs.map(drug => (
              <button
                key={drug.id}
                onClick={() => navigate(`/drug/${drug.id}`)}
                className="px-3 py-1.5 bg-destructive/10 hover:bg-destructive/20 text-destructive text-sm rounded-full transition-colors"
              >
                {drug.name}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Drugs */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Featured Drugs</h2>
            <button 
              onClick={() => navigate('/search')}
              className="text-sm text-primary font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {featuredDrugs.map(drug => (
              <DrugCard key={drug.id} drug={drug} />
            ))}
          </div>
        </section>

        {/* Continue Learning */}
        <section className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-4 border border-primary/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 gradient-primary rounded-xl">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">Continue Learning</h3>
              <p className="text-xs text-muted-foreground">Pick up where you left off</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/learn')}
            className="w-full gradient-primary text-primary-foreground py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
          >
            Start a Quiz
          </button>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
