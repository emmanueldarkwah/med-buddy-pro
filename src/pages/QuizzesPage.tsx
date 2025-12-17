import { useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Target, Clock, Shuffle } from 'lucide-react';
import { useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { quizzes } from '@/data/quizzes';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function QuizzesPage() {
  const navigate = useNavigate();
  const { completedQuizzes } = useApp();
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);
  const [isTimed, setIsTimed] = useState(false);
  const [timePerQuestion, setTimePerQuestion] = useState(30);

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

  const toggleQuizSelection = (quizId: string) => {
    setSelectedQuizzes(prev => 
      prev.includes(quizId) 
        ? prev.filter(id => id !== quizId)
        : [...prev, quizId]
    );
  };

  const selectAll = () => {
    if (selectedQuizzes.length === quizzes.length) {
      setSelectedQuizzes([]);
    } else {
      setSelectedQuizzes(quizzes.map(q => q.id));
    }
  };

  const startQuiz = () => {
    if (selectedQuizzes.length === 0) return;
    const params = new URLSearchParams({
      quizzes: selectedQuizzes.join(','),
      timed: isTimed.toString(),
      timePerQuestion: timePerQuestion.toString(),
    });
    navigate(`/quiz/custom?${params.toString()}`);
  };

  const totalQuestions = selectedQuizzes.reduce((acc, qId) => {
    const quiz = quizzes.find(q => q.id === qId);
    return acc + (quiz?.questions.length || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-quizzes text-quizzes-foreground px-4 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6" />
            <h1 className="text-xl font-bold">Quizzes</h1>
          </div>
        </div>
        <p className="text-sm opacity-90">Select quizzes and customize your learning experience</p>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Quiz Settings */}
        <section className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
          <h3 className="font-semibold mb-4">Quiz Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <Label htmlFor="timed" className="text-sm">Timed Mode</Label>
              </div>
              <Switch id="timed" checked={isTimed} onCheckedChange={setIsTimed} />
            </div>
            
            {isTimed && (
              <div className="pl-6 space-y-2">
                <Label className="text-sm text-muted-foreground">Time per question (seconds)</Label>
                <div className="flex gap-2">
                  {[15, 30, 45, 60].map(time => (
                    <button
                      key={time}
                      onClick={() => setTimePerQuestion(time)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                        timePerQuestion === time 
                          ? "bg-quizzes text-quizzes-foreground" 
                          : "bg-secondary hover:bg-secondary/80"
                      )}
                    >
                      {time}s
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Selection Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shuffle className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {selectedQuizzes.length} selected • {totalQuestions} questions
            </span>
          </div>
          <button
            onClick={selectAll}
            className="text-sm font-medium text-quizzes hover:underline"
          >
            {selectedQuizzes.length === quizzes.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        {/* Quiz List */}
        <section className="space-y-3">
          {quizzes.map(quiz => {
            const progress = getQuizProgress(quiz.id);
            const isSelected = selectedQuizzes.includes(quiz.id);
            
            return (
              <button
                key={quiz.id}
                onClick={() => toggleQuizSelection(quiz.id)}
                className={cn(
                  "w-full bg-card rounded-2xl p-4 shadow-sm border-2 text-left transition-all",
                  isSelected 
                    ? "border-quizzes bg-quizzes/5" 
                    : "border-border/50 hover:border-quizzes/50"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{quiz.icon}</span>
                    <div>
                      <h3 className="font-semibold">{quiz.title}</h3>
                      <p className="text-xs text-muted-foreground">{quiz.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={cn("text-xs", getDifficultyColor(quiz.difficulty))}>
                      {quiz.difficulty}
                    </Badge>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                      isSelected ? "bg-quizzes border-quizzes" : "border-muted-foreground/30"
                    )}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
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
                          className="h-full bg-quizzes rounded-full" 
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
        </section>

        {/* Start Button */}
        {selectedQuizzes.length > 0 && (
          <button
            onClick={startQuiz}
            className="w-full bg-quizzes text-quizzes-foreground py-4 rounded-2xl font-semibold shadow-lg hover:opacity-90 transition-opacity"
          >
            Start Quiz ({totalQuestions} questions)
          </button>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
