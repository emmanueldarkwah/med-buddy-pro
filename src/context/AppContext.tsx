import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  completedAt: Date;
}

interface AppState {
  completedQuizzes: QuizResult[];
  achievements: Achievement[];
  studyStreak: number;
  lastStudyDate: string | null;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  favoriteDrugs: string[];
}

interface AppContextType extends AppState {
  addQuizResult: (result: QuizResult) => void;
  unlockAchievement: (achievement: Achievement) => void;
  toggleFavoriteDrug: (drugId: string) => void;
  updateStudyStreak: () => void;
  incrementCorrectAnswers: () => void;
  incrementTotalQuestions: () => void;
}

const defaultAchievements: Achievement[] = [
  { id: 'first_quiz', title: 'First Steps', description: 'Complete your first quiz', icon: '🎯' },
  { id: 'perfect_score', title: 'Perfect Score', description: 'Get 100% on any quiz', icon: '⭐' },
  { id: 'streak_3', title: 'Dedicated Learner', description: 'Study for 3 days in a row', icon: '🔥' },
  { id: 'streak_7', title: 'Week Warrior', description: 'Study for 7 days in a row', icon: '💪' },
  { id: 'quiz_master', title: 'Quiz Master', description: 'Complete 10 quizzes', icon: '🏆' },
  { id: 'drug_expert', title: 'Drug Expert', description: 'Answer 50 questions correctly', icon: '💊' },
  { id: 'interaction_aware', title: 'Interaction Aware', description: 'Check 5 drug interactions', icon: '⚠️' },
  { id: 'calculator_pro', title: 'Calculator Pro', description: 'Use the calculator 10 times', icon: '🧮' },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('pharmapro-state');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      completedQuizzes: [],
      achievements: defaultAchievements,
      studyStreak: 0,
      lastStudyDate: null,
      totalQuestionsAnswered: 0,
      correctAnswers: 0,
      favoriteDrugs: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('pharmapro-state', JSON.stringify(state));
  }, [state]);

  const addQuizResult = (result: QuizResult) => {
    setState(prev => ({
      ...prev,
      completedQuizzes: [...prev.completedQuizzes, result],
    }));
  };

  const unlockAchievement = (achievement: Achievement) => {
    setState(prev => ({
      ...prev,
      achievements: prev.achievements.map(a =>
        a.id === achievement.id ? { ...a, unlockedAt: new Date() } : a
      ),
    }));
  };

  const toggleFavoriteDrug = (drugId: string) => {
    setState(prev => ({
      ...prev,
      favoriteDrugs: prev.favoriteDrugs.includes(drugId)
        ? prev.favoriteDrugs.filter(id => id !== drugId)
        : [...prev.favoriteDrugs, drugId],
    }));
  };

  const updateStudyStreak = () => {
    const today = new Date().toDateString();
    setState(prev => {
      if (prev.lastStudyDate === today) return prev;
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const isConsecutive = prev.lastStudyDate === yesterday.toDateString();
      
      return {
        ...prev,
        studyStreak: isConsecutive ? prev.studyStreak + 1 : 1,
        lastStudyDate: today,
      };
    });
  };

  const incrementCorrectAnswers = () => {
    setState(prev => ({ ...prev, correctAnswers: prev.correctAnswers + 1 }));
  };

  const incrementTotalQuestions = () => {
    setState(prev => ({ ...prev, totalQuestionsAnswered: prev.totalQuestionsAnswered + 1 }));
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        addQuizResult,
        unlockAchievement,
        toggleFavoriteDrug,
        updateStudyStreak,
        incrementCorrectAnswers,
        incrementTotalQuestions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
