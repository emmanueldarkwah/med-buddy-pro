import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Users, Target } from 'lucide-react';
import { useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { caseStudies } from '@/data/quizzes';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function CasesPage() {
  const navigate = useNavigate();
  const [isTimed, setIsTimed] = useState(false);
  const [timeLimit, setTimeLimit] = useState(10);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [questionCount, setQuestionCount] = useState<number | 'all'>('all');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success/10 text-success border-success/20';
      case 'intermediate': return 'bg-warning/10 text-warning border-warning/20';
      case 'advanced': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const selectedCaseData = selectedCase ? caseStudies.find(c => c.id === selectedCase) : null;
  const totalCaseQuestions = selectedCaseData?.questions.length || 0;
  const actualQuestionCount = questionCount === 'all' ? totalCaseQuestions : Math.min(questionCount as number, totalCaseQuestions);

  const startCase = () => {
    if (!selectedCase) return;
    const params = new URLSearchParams({
      timed: isTimed.toString(),
      timeLimit: timeLimit.toString(),
      questionCount: actualQuestionCount.toString(),
    });
    navigate(`/case-study/${selectedCase}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-cases text-cases-foreground px-4 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            <h1 className="text-xl font-bold">Case Studies</h1>
          </div>
        </div>
        <p className="text-sm opacity-90">Apply your knowledge to real clinical scenarios</p>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Case Settings */}
        <section className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
          <h3 className="font-semibold mb-4">Case Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <Label htmlFor="timed-case" className="text-sm">Timed Mode</Label>
              </div>
              <Switch id="timed-case" checked={isTimed} onCheckedChange={setIsTimed} />
            </div>
            
            {isTimed && (
              <div className="pl-6 space-y-2">
                <Label className="text-sm text-muted-foreground">Time limit (minutes)</Label>
                <div className="flex gap-2">
                  {[5, 10, 15, 20].map(time => (
                    <button
                      key={time}
                      onClick={() => setTimeLimit(time)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                        timeLimit === time 
                          ? "bg-cases text-cases-foreground" 
                          : "bg-secondary hover:bg-secondary/80"
                      )}
                    >
                      {time}m
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question Count Selection */}
            {selectedCase && (
              <div className="pt-2 border-t border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <Label className="text-sm">Number of questions</Label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 'all'].map(count => (
                    <button
                      key={count}
                      onClick={() => setQuestionCount(count as number | 'all')}
                      disabled={typeof count === 'number' && count > totalCaseQuestions}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                        questionCount === count 
                          ? "bg-cases text-cases-foreground" 
                          : "bg-secondary hover:bg-secondary/80",
                        typeof count === 'number' && count > totalCaseQuestions && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {count === 'all' ? 'All' : count}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {totalCaseQuestions} questions in this case study
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Case Studies List */}
        <section className="space-y-4">
          <h2 className="font-semibold text-lg">Select a Case Study</h2>
          
          {caseStudies.map(study => {
            const isSelected = selectedCase === study.id;
            return (
              <button
                key={study.id}
                onClick={() => setSelectedCase(study.id)}
                className={cn(
                  "w-full bg-card rounded-2xl p-5 shadow-sm border-2 text-left transition-all",
                  isSelected 
                    ? "border-cases bg-cases/5" 
                    : "border-border/50 hover:border-cases/50"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
                      isSelected ? "bg-cases border-cases" : "border-muted-foreground/30"
                    )}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <h3 className="font-semibold text-lg">{study.title}</h3>
                  </div>
                  <Badge className={cn("text-xs", getDifficultyColor(study.difficulty))}>
                    {study.difficulty}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 pl-8">{study.scenario}</p>
                
                <div className="flex items-center gap-4 pl-8">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-cases/10 text-cases rounded-lg">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-medium">
                      {study.patientInfo.age}yo {study.patientInfo.gender}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {study.questions.length} questions • {study.learningPoints.length} learning points
                  </div>
                </div>
              </button>
            );
          })}
        </section>

        {/* Start Button */}
        {selectedCase && (
          <button
            onClick={startCase}
            className="w-full bg-cases text-cases-foreground py-4 rounded-2xl font-semibold shadow-lg hover:opacity-90 transition-opacity"
          >
            Start Case Study ({actualQuestionCount} questions)
          </button>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
