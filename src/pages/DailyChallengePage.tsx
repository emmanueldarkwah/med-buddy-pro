import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Trophy, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';
import { quizzes } from '@/data/quizzes';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function DailyChallengePage() {
  const navigate = useNavigate();
  const { 
    getTodayChallenge, 
    completeDailyChallenge, 
    updateStudyStreak,
    incrementCorrectAnswers,
    incrementTotalQuestions,
    checkAndUnlockAchievements 
  } = useApp();

  const [challengeQuestions, setChallengeQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const todayChallenge = getTodayChallenge();
  const CHALLENGE_SIZE = 5;

  useEffect(() => {
    if (!todayChallenge) {
      // Generate random questions for today's challenge
      const allQuestions = quizzes.flatMap(q => q.questions);
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
      setChallengeQuestions(shuffled.slice(0, CHALLENGE_SIZE));
    }
  }, [todayChallenge]);

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    incrementTotalQuestions();

    if (answerIndex === challengeQuestions[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
      incrementCorrectAnswers();
    }
  };

  const nextQuestion = () => {
    if (currentIndex < CHALLENGE_SIZE - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Challenge complete
      setIsComplete(true);
      completeDailyChallenge(score + (selectedAnswer === challengeQuestions[currentIndex].correctAnswer ? 1 : 0), CHALLENGE_SIZE);
      updateStudyStreak();
      checkAndUnlockAchievements();
    }
  };

  // Already completed today
  if (todayChallenge?.completed) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <header className="bg-gradient-to-br from-warning to-warning/80 text-warning-foreground px-4 pt-12 pb-6 rounded-b-[2rem]">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6" />
              <h1 className="text-xl font-bold">Daily Challenge</h1>
            </div>
          </div>
        </header>

        <main className="px-4 py-6">
          <div className="bg-card rounded-3xl p-8 shadow-lg border border-border/50 text-center">
            <div className="w-20 h-20 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-4">
              <Trophy className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Challenge Completed!</h2>
            <p className="text-muted-foreground mb-4">
              You scored {todayChallenge.score}/{todayChallenge.questionsAnswered} today
            </p>
            <p className="text-sm text-muted-foreground">
              Come back tomorrow for a new challenge!
            </p>
            <Button onClick={() => navigate('/more')} className="mt-6">
              Back to More
            </Button>
          </div>
        </main>

        <BottomNav />
      </div>
    );
  }

  // Challenge complete screen
  if (isComplete) {
    const finalScore = score + (selectedAnswer === challengeQuestions[currentIndex]?.correctAnswer ? 1 : 0);
    const percentage = Math.round((finalScore / CHALLENGE_SIZE) * 100);
    
    return (
      <div className="min-h-screen bg-background pb-24">
        <header className="bg-gradient-to-br from-success to-success/80 text-success-foreground px-4 pt-12 pb-6 rounded-b-[2rem]">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              <h1 className="text-xl font-bold">Challenge Complete!</h1>
            </div>
          </div>
        </header>

        <main className="px-4 py-6">
          <div className="bg-card rounded-3xl p-8 shadow-lg border border-border/50 text-center">
            <div className="text-6xl mb-4">
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '💪'}
            </div>
            <h2 className="text-3xl font-bold mb-2">{finalScore}/{CHALLENGE_SIZE}</h2>
            <p className="text-xl text-muted-foreground mb-4">{percentage}% Correct</p>
            <p className={cn(
              "font-medium",
              percentage >= 80 ? "text-success" : percentage >= 60 ? "text-warning" : "text-muted-foreground"
            )}>
              {percentage >= 80 ? 'Excellent work!' : percentage >= 60 ? 'Good job!' : 'Keep practicing!'}
            </p>
            <Button onClick={() => navigate('/more')} className="mt-6 w-full">
              Back to More
            </Button>
          </div>
        </main>

        <BottomNav />
      </div>
    );
  }

  const currentQuestion = challengeQuestions[currentIndex];
  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-gradient-to-br from-warning to-warning/80 text-warning-foreground px-4 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6" />
            <h1 className="text-xl font-bold">Daily Challenge</h1>
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Question {currentIndex + 1} of {CHALLENGE_SIZE}</span>
          <span className="text-sm font-medium">Score: {score}</span>
        </div>
        <Progress value={((currentIndex + 1) / CHALLENGE_SIZE) * 100} className="h-2 bg-white/20" />
      </header>

      <main className="px-4 py-6">
        <div className="bg-card rounded-2xl p-5 shadow-sm border border-border/50 mb-4">
          <p className="text-lg font-medium leading-relaxed">{currentQuestion.question}</p>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option: string, index: number) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            
            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={cn(
                  "w-full p-4 rounded-2xl text-left transition-all border-2",
                  !showResult && "hover:border-primary/50 border-border/50 bg-card",
                  showResult && isCorrect && "border-success bg-success/10",
                  showResult && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                  showResult && !isSelected && !isCorrect && "opacity-50 border-border/50 bg-card"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    !showResult && "bg-secondary",
                    showResult && isCorrect && "bg-success text-success-foreground",
                    showResult && isSelected && !isCorrect && "bg-destructive text-destructive-foreground"
                  )}>
                    {showResult && isCorrect ? <CheckCircle className="w-5 h-5" /> : 
                     showResult && isSelected && !isCorrect ? <XCircle className="w-5 h-5" /> :
                     String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="mt-4 bg-info/10 border border-info/20 rounded-2xl p-4">
            <p className="text-sm font-medium text-info mb-1">Explanation</p>
            <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
          </div>
        )}

        {showResult && (
          <Button onClick={nextQuestion} className="w-full mt-4 py-6">
            {currentIndex < CHALLENGE_SIZE - 1 ? 'Next Question' : 'See Results'}
          </Button>
        )}
      </main>

      <BottomNav />
    </div>
  );
}