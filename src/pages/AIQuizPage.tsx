import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Loader2, Play, CheckCircle, XCircle, ChevronRight, Trophy, RotateCcw } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useQuizAnalytics } from '@/hooks/useQuizAnalytics';
import { cn } from '@/lib/utils';

const TOPICS = [
  'Cardiovascular Drugs',
  'CNS Drugs',
  'Antibiotics',
  'Diabetes Medications',
  'Pain Management',
  'Respiratory Drugs',
  'GI Medications',
  'Pharmacokinetics',
  'Drug Interactions',
];

interface GeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export default function AIQuizPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { stats, recordAnswer } = useQuizAnalytics();
  
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState('intermediate');
  const [questionCount, setQuestionCount] = useState('5');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Quiz state
  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const generateQuiz = async () => {
    if (!user) {
      toast.error('Please sign in to generate a quiz');
      return;
    }

    if (selectedTopics.length === 0) {
      toast.error('Please select at least one topic');
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-study-tools', {
        body: {
          type: 'generate_quiz',
          topics: selectedTopics,
          weakAreas: stats?.weakAreas || [],
          difficulty,
          questionCount: parseInt(questionCount),
        },
      });

      if (error) throw error;
      
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setCurrentQuestion(0);
        setScore(0);
        setIsComplete(false);
        toast.success('Quiz generated!');
      } else {
        throw new Error('No questions generated');
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      toast.error('Failed to generate quiz');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectAnswer = async (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    const question = questions[currentQuestion];
    const isCorrect = index === question.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Record to analytics
    await recordAnswer(
      'ai-generated',
      currentQuestion,
      question.category,
      isCorrect
    );
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
    }
  };

  const resetQuiz = () => {
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsComplete(false);
  };

  // Render quiz results
  if (isComplete && questions.length > 0) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-background pb-24">
        <header className="px-4 pt-12 pb-6">
          <button
            onClick={resetQuiz}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </header>

        <main className="px-4 py-8 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full gradient-success flex items-center justify-center shadow-lg">
            <Trophy className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-2xl font-bold mb-2">AI Quiz Complete!</h1>
          <p className="text-muted-foreground mb-8">Great job practicing!</p>

          <Card className="mb-8">
            <CardContent className="pt-8">
              <div className="text-5xl font-bold mb-2">{percentage}%</div>
              <p className="text-muted-foreground">
                {score} out of {questions.length} correct
              </p>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button onClick={generateQuiz} className="w-full py-6 rounded-2xl">
              <Sparkles className="w-5 h-5 mr-2" />
              Generate New Quiz
            </Button>
            <Button onClick={resetQuiz} variant="outline" className="w-full py-6 rounded-2xl">
              <RotateCcw className="w-5 h-5 mr-2" />
              Change Topics
            </Button>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  // Render active quiz
  if (questions.length > 0 && !isComplete) {
    const question = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-background pb-24">
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={resetQuiz}
              className="p-2 rounded-full hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium">
              {currentQuestion + 1} / {questions.length}
            </span>
            <div className="w-9" />
          </div>

          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full gradient-primary rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
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
            <Card className="bg-info/5 border-info/20 mb-6 animate-slide-up">
              <CardContent className="pt-4">
                <h3 className="font-semibold text-info mb-2">Explanation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {question.explanation}
                </p>
              </CardContent>
            </Card>
          )}

          {showExplanation && (
            <Button
              onClick={handleNext}
              className="w-full py-6 rounded-2xl gradient-primary"
            >
              {currentQuestion < questions.length - 1 ? (
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
        <BottomNav />
      </div>
    );
  }

  // Render quiz setup
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="gradient-quizzes text-quizzes-foreground px-4 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            <h1 className="text-xl font-bold">AI Quiz Generator</h1>
          </div>
        </div>
        <p className="text-sm opacity-90">Generate custom quizzes tailored to your weak areas</p>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Topic Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Topics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {TOPICS.map(topic => (
              <label 
                key={topic} 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <Checkbox
                  checked={selectedTopics.includes(topic)}
                  onCheckedChange={() => toggleTopic(topic)}
                />
                <span>{topic}</span>
              </label>
            ))}
          </CardContent>
        </Card>

        {/* Settings */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Difficulty</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={questionCount} onValueChange={setQuestionCount}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Questions</SelectItem>
                  <SelectItem value="10">10 Questions</SelectItem>
                  <SelectItem value="15">15 Questions</SelectItem>
                  <SelectItem value="20">20 Questions</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Generate Button */}
        <Button 
          onClick={generateQuiz} 
          disabled={isGenerating || selectedTopics.length === 0}
          className="w-full py-6 text-base"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating Quiz...
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Start AI Quiz
            </>
          )}
        </Button>
      </main>

      <BottomNav />
    </div>
  );
}
