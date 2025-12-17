import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, ChevronRight, Trophy, RotateCcw } from 'lucide-react';
import { quizzes } from '@/data/quizzes';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addQuizResult, incrementCorrectAnswers, incrementTotalQuestions, updateStudyStreak, unlockAchievement, achievements } = useApp();

  const quiz = quizzes.find(q => q.id === id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  if (!quiz) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Quiz not found</h2>
          <button onClick={() => navigate(-1)} className="text-primary">Go back</button>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleSelectAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    incrementTotalQuestions();
    
    if (index === question.correctAnswer) {
      setScore(prev => prev + 1);
      incrementCorrectAnswers();
    }
    
    updateStudyStreak();
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz complete
      const result = {
        quizId: quiz.id,
        score: selectedAnswer === question.correctAnswer ? score + 1 : score,
        totalQuestions: quiz.questions.length,
        completedAt: new Date(),
      };
      
      // Check for final answer
      const finalScore = selectedAnswer === question.correctAnswer ? score + 1 : score;
      addQuizResult({ ...result, score: finalScore });

      // Check achievements
      const firstQuizAchievement = achievements.find(a => a.id === 'first_quiz');
      if (firstQuizAchievement && !firstQuizAchievement.unlockedAt) {
        unlockAchievement(firstQuizAchievement);
      }

      if (finalScore === quiz.questions.length) {
        const perfectAchievement = achievements.find(a => a.id === 'perfect_score');
        if (perfectAchievement && !perfectAchievement.unlockedAt) {
          unlockAchievement(perfectAchievement);
        }
      }

      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsComplete(false);
  };

  if (isComplete) {
    const finalScore = score;
    const percentage = Math.round((finalScore / quiz.questions.length) * 100);

    return (
      <div className="min-h-screen bg-background">
        <header className="px-4 pt-12 pb-6">
          <button
            onClick={() => navigate('/quizzes')}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </header>

        <main className="px-4 py-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full gradient-success flex items-center justify-center shadow-lg">
            <Trophy className="w-12 h-12 text-success-foreground" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Quiz Complete!</h1>
          <p className="text-muted-foreground mb-8">{quiz.title}</p>

          <div className="bg-card rounded-3xl p-8 shadow-lg border border-border/50 mb-8">
            <div className="text-5xl font-bold mb-2">{percentage}%</div>
            <p className="text-muted-foreground">
              {finalScore} out of {quiz.questions.length} correct
            </p>

            <div className="w-full h-3 bg-secondary rounded-full mt-6 overflow-hidden">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  percentage >= 80 ? "gradient-success" : percentage >= 60 ? "gradient-accent" : "gradient-danger"
                )}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleRestart}
              variant="outline"
              className="w-full py-6 rounded-2xl"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Again
            </Button>
            <Button
              onClick={() => navigate('/quizzes')}
              className="w-full py-6 rounded-2xl gradient-primary"
            >
              Back to Quizzes
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/quizzes')}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium">
            {currentQuestion + 1} / {quiz.questions.length}
          </span>
          <div className="w-9" />
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full gradient-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      <main className="px-4 py-6">
        <div className="mb-2">
          <span className="text-xs text-primary font-medium uppercase tracking-wide">
            {question.category}
          </span>
        </div>

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
            className="w-full py-6 rounded-2xl gradient-primary text-primary-foreground"
          >
            {currentQuestion < quiz.questions.length - 1 ? (
              <>
                Next Question
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              'See Results'
            )}
          </Button>
        )}
      </main>
    </div>
  );
}
