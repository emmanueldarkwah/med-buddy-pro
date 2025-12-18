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

type ThemeColor = 'default' | 'ocean' | 'sunset' | 'forest' | 'royal';

interface AppState {
  completedQuizzes: QuizResult[];
  achievements: Achievement[];
  studyStreak: number;
  lastStudyDate: string | null;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  favoriteDrugs: string[];
  username: string;
  avatarUrl: string;
  theme: ThemeColor;
  isDarkMode: boolean;
  interactionChecks: number;
  calculatorUses: number;
}

interface AppContextType extends AppState {
  addQuizResult: (result: QuizResult) => void;
  unlockAchievement: (achievement: Achievement) => void;
  toggleFavoriteDrug: (drugId: string) => void;
  updateStudyStreak: () => void;
  incrementCorrectAnswers: () => void;
  incrementTotalQuestions: () => void;
  setUsername: (name: string) => void;
  setAvatarUrl: (url: string) => void;
  setTheme: (theme: ThemeColor) => void;
  toggleDarkMode: () => void;
  checkAndUnlockAchievements: () => void;
  incrementInteractionChecks: () => void;
  incrementCalculatorUse: () => void;
  interactionChecks: number;
  calculatorUses: number;
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
    const saved = localStorage.getItem('acupharm-state');
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
      username: 'Student',
      avatarUrl: '',
      theme: 'default' as ThemeColor,
      isDarkMode: false,
      interactionChecks: 0,
      calculatorUses: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem('acupharm-state', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const root = document.documentElement;
    // Remove all theme classes
    root.classList.remove('theme-ocean', 'theme-sunset', 'theme-forest', 'theme-royal', 'dark');
    
    // Add current theme class
    if (state.theme !== 'default') {
      root.classList.add(`theme-${state.theme}`);
    }
    
    // Add dark mode if enabled
    if (state.isDarkMode) {
      root.classList.add('dark');
    }
  }, [state.theme, state.isDarkMode]);

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

  const setUsername = (name: string) => {
    setState(prev => ({ ...prev, username: name }));
  };

  const setAvatarUrl = (url: string) => {
    setState(prev => ({ ...prev, avatarUrl: url }));
  };

  const setTheme = (theme: ThemeColor) => {
    setState(prev => ({ ...prev, theme }));
  };

  const toggleDarkMode = () => {
    setState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  };

  const incrementInteractionChecks = () => {
    setState(prev => ({ ...prev, interactionChecks: prev.interactionChecks + 1 }));
  };

  const incrementCalculatorUse = () => {
    setState(prev => ({ ...prev, calculatorUses: prev.calculatorUses + 1 }));
  };

  const checkAndUnlockAchievements = () => {
    setState(prev => {
      const updates: Partial<Achievement>[] = [];
      
      // Check streak achievements
      if (prev.studyStreak >= 3) {
        const streak3 = prev.achievements.find(a => a.id === 'streak_3');
        if (streak3 && !streak3.unlockedAt) updates.push({ ...streak3, unlockedAt: new Date() });
      }
      if (prev.studyStreak >= 7) {
        const streak7 = prev.achievements.find(a => a.id === 'streak_7');
        if (streak7 && !streak7.unlockedAt) updates.push({ ...streak7, unlockedAt: new Date() });
      }
      
      // Check quiz master (10 quizzes)
      if (prev.completedQuizzes.length >= 10) {
        const quizMaster = prev.achievements.find(a => a.id === 'quiz_master');
        if (quizMaster && !quizMaster.unlockedAt) updates.push({ ...quizMaster, unlockedAt: new Date() });
      }
      
      // Check drug expert (50 correct answers)
      if (prev.correctAnswers >= 50) {
        const drugExpert = prev.achievements.find(a => a.id === 'drug_expert');
        if (drugExpert && !drugExpert.unlockedAt) updates.push({ ...drugExpert, unlockedAt: new Date() });
      }
      
      // Check interaction aware (5 interaction checks)
      if (prev.interactionChecks >= 5) {
        const interactionAware = prev.achievements.find(a => a.id === 'interaction_aware');
        if (interactionAware && !interactionAware.unlockedAt) updates.push({ ...interactionAware, unlockedAt: new Date() });
      }
      
      // Check calculator pro (10 calculator uses)
      if (prev.calculatorUses >= 10) {
        const calcPro = prev.achievements.find(a => a.id === 'calculator_pro');
        if (calcPro && !calcPro.unlockedAt) updates.push({ ...calcPro, unlockedAt: new Date() });
      }
      
      if (updates.length === 0) return prev;
      
      return {
        ...prev,
        achievements: prev.achievements.map(a => {
          const update = updates.find(u => u.id === a.id);
          return update ? { ...a, ...update } : a;
        }),
      };
    });
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
        setUsername,
        setAvatarUrl,
        setTheme,
        toggleDarkMode,
        checkAndUnlockAchievements,
        incrementInteractionChecks,
        incrementCalculatorUse,
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
