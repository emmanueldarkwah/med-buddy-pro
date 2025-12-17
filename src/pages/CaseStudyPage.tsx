import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, AlertCircle, Pill, CheckCircle, XCircle, ChevronRight, Lightbulb } from 'lucide-react';
import { caseStudies } from '@/data/quizzes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function CaseStudyPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const study = caseStudies.find(s => s.id === id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showScenario, setShowScenario] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);

  if (!study) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Case study not found</h2>
          <button onClick={() => navigate(-1)} className="text-primary">Go back</button>
        </div>
      </div>
    );
  }

  const question = study.questions[currentQuestion];

  const handleStartQuestions = () => {
    setShowScenario(false);
  };

  const handleSelectAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    if (index === question.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < study.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
    }
  };

  if (showScenario) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/learn')}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-semibold">Case Study</h1>
          </div>
        </header>

        <main className="px-4 py-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-2">{study.title}</h2>
            <Badge variant="outline">{study.difficulty}</Badge>
          </div>

          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="font-semibold mb-3">Scenario</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{study.scenario}</p>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Patient Information</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Age:</span>
                <span className="ml-2 font-medium">{study.patientInfo.age} years</span>
              </div>
              <div>
                <span className="text-muted-foreground">Gender:</span>
                <span className="ml-2 font-medium">{study.patientInfo.gender}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Weight:</span>
                <span className="ml-2 font-medium">{study.patientInfo.weight} kg</span>
              </div>
              <div>
                <span className="text-muted-foreground">Height:</span>
                <span className="ml-2 font-medium">{study.patientInfo.height} cm</span>
              </div>
            </div>
          </div>

          {study.patientInfo.allergies.length > 0 && (
            <div className="bg-destructive/5 border border-destructive/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <h3 className="font-semibold text-destructive">Allergies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {study.patientInfo.allergies.map((allergy, i) => (
                  <Badge key={i} variant="destructive">{allergy}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Pill className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Current Medications</h3>
            </div>
            <ul className="space-y-2">
              {study.patientInfo.currentMedications.map((med, i) => (
                <li key={i} className="text-sm text-muted-foreground">• {med}</li>
              ))}
            </ul>
          </div>

          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h3 className="font-semibold mb-2">Medical Conditions</h3>
            <div className="flex flex-wrap gap-2">
              {study.patientInfo.conditions.map((condition, i) => (
                <Badge key={i} variant="secondary">{condition}</Badge>
              ))}
            </div>
          </div>

          <Button
            onClick={handleStartQuestions}
            className="w-full py-6 rounded-2xl gradient-primary"
          >
            Start Questions
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </main>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background">
        <header className="px-4 pt-12 pb-6">
          <button
            onClick={() => navigate('/learn')}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </header>

        <main className="px-4 py-6 space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-success flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-success-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Case Complete!</h1>
            <p className="text-muted-foreground">
              Score: {score}/{study.questions.length}
            </p>
          </div>

          <div className="bg-success/5 border border-success/10 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-success" />
              <h3 className="font-semibold text-success">Key Learning Points</h3>
            </div>
            <ul className="space-y-3">
              {study.learningPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-success/20 text-success text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
            onClick={() => navigate('/learn')}
            className="w-full py-6 rounded-2xl gradient-primary"
          >
            Back to Learning
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/learn')}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium">
            Question {currentQuestion + 1} / {study.questions.length}
          </span>
          <div className="w-9" />
        </div>

        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full gradient-primary rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / study.questions.length) * 100}%` }}
          />
        </div>
      </header>

      <main className="px-4 py-6">
        <h2 className="text-lg font-semibold mb-6 leading-relaxed">
          {question.question}
        </h2>

        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showResult = showExplanation;

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showExplanation}
                className={cn(
                  "w-full p-4 rounded-2xl border-2 text-left transition-all duration-200",
                  !showResult && "hover:border-primary/50 hover:bg-primary/5",
                  !showResult && isSelected && "border-primary bg-primary/10",
                  !showResult && !isSelected && "border-border bg-card",
                  showResult && isCorrect && "border-success bg-success/10",
                  showResult && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                  showResult && !isCorrect && !isSelected && "border-border bg-card opacity-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-sm",
                    showResult && isCorrect && "text-success font-medium",
                    showResult && isSelected && !isCorrect && "text-destructive"
                  )}>
                    {option}
                  </span>
                  {showResult && isCorrect && (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="bg-info/5 border border-info/20 rounded-2xl p-4 mb-6 animate-slide-up">
            <h3 className="font-semibold text-info mb-2">Explanation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}

        {showExplanation && (
          <Button
            onClick={handleNext}
            className="w-full py-6 rounded-2xl gradient-primary"
          >
            {currentQuestion < study.questions.length - 1 ? (
              <>Next Question<ChevronRight className="w-5 h-5 ml-2" /></>
            ) : (
              'See Summary'
            )}
          </Button>
        )}
      </main>
    </div>
  );
}
