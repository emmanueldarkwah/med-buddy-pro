import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, GraduationCap, Target, Clock } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { quizzes, caseStudies } from '@/data/quizzes';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

export default function LearnPage() {
  const navigate = useNavigate();
  const { completedQuizzes } = useApp();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success/10 text-success border-success/20';
      case 'intermediate': return 'bg-warning/10 text-warning border-warning/20';
      case 'advanced': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getQuizProgress = (quizId: string) => {
    const results = completedQuizzes.filter(r => r.quizId === quizId);
    if (results.length === 0) return null;
    const best = Math.max(...results.map(r => (r.score / r.totalQuestions) * 100));
    return Math.round(best);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Learning Center</h1>
            <p className="text-sm text-muted-foreground">Quizzes & Case Studies</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-8">
        {/* Quizzes Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 gradient-primary rounded-xl">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-semibold">Quizzes</h2>
          </div>

          <div className="space-y-3">
            {quizzes.map(quiz => {
              const progress = getQuizProgress(quiz.id);
              return (
                <button
                  key={quiz.id}
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                  className="w-full bg-card rounded-2xl p-4 shadow-sm border border-border/50 text-left hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{quiz.icon}</span>
                      <div>
                        <h3 className="font-semibold">{quiz.title}</h3>
                        <p className="text-xs text-muted-foreground">{quiz.category}</p>
                      </div>
                    </div>
                    <Badge className={cn("text-xs", getDifficultyColor(quiz.difficulty))}>
                      {quiz.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{quiz.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Target className="w-4 h-4" />
                      <span className="text-xs">{quiz.questions.length} questions</span>
                    </div>
                    {progress !== null && (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full gradient-success rounded-full" 
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-success">{progress}%</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Case Studies Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 gradient-accent rounded-xl">
              <BookOpen className="w-5 h-5 text-accent-foreground" />
            </div>
            <h2 className="text-lg font-semibold">Case Studies</h2>
          </div>

          <div className="space-y-3">
            {caseStudies.map(study => (
              <button
                key={study.id}
                onClick={() => navigate(`/case-study/${study.id}`)}
                className="w-full bg-card rounded-2xl p-4 shadow-sm border border-border/50 text-left hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{study.title}</h3>
                  <Badge className={cn("text-xs", getDifficultyColor(study.difficulty))}>
                    {study.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{study.scenario}</p>
                <div className="flex items-center gap-4 text-muted-foreground text-xs">
                  <span>{study.questions.length} questions</span>
                  <span>{study.learningPoints.length} learning points</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
