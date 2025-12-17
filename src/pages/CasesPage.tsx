import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Users } from 'lucide-react';
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success/10 text-success border-success/20';
      case 'intermediate': return 'bg-warning/10 text-warning border-warning/20';
      case 'advanced': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const startCase = (caseId: string) => {
    const params = new URLSearchParams({
      timed: isTimed.toString(),
      timeLimit: timeLimit.toString(),
    });
    navigate(`/case-study/${caseId}?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-cases text-cases-foreground px-4 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate('/')}
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
          </div>
        </section>

        {/* Case Studies List */}
        <section className="space-y-4">
          <h2 className="font-semibold text-lg">Available Cases</h2>
          
          {caseStudies.map(study => (
            <button
              key={study.id}
              onClick={() => startCase(study.id)}
              className="w-full bg-card rounded-2xl p-5 shadow-sm border border-border/50 text-left hover:shadow-md hover:border-cases/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg">{study.title}</h3>
                <Badge className={cn("text-xs", getDifficultyColor(study.difficulty))}>
                  {study.difficulty}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{study.scenario}</p>
              
              <div className="flex items-center gap-4">
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
          ))}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
