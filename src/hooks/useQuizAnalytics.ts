import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface QuestionAnalytics {
  quiz_id: string;
  question_index: number;
  category: string;
  is_correct: boolean;
  time_spent_seconds?: number;
}

interface CategoryStats {
  category: string;
  total: number;
  correct: number;
  percentage: number;
}

interface OverallStats {
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  categoryStats: CategoryStats[];
  weakAreas: string[];
  strongAreas: string[];
  recentTrend: 'improving' | 'declining' | 'stable';
}

export function useQuizAnalytics() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<QuestionAnalytics[]>([]);
  const [stats, setStats] = useState<OverallStats | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('quiz_question_analytics')
        .select('*')
        .eq('user_id', user.id)
        .order('answered_at', { ascending: false });

      if (error) throw error;
      
      setAnalytics(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error fetching quiz analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const calculateStats = (data: QuestionAnalytics[]) => {
    if (data.length === 0) {
      setStats(null);
      return;
    }

    const totalQuestions = data.length;
    const correctAnswers = data.filter(q => q.is_correct).length;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

    // Calculate category stats
    const categoryMap = new Map<string, { total: number; correct: number }>();
    data.forEach(q => {
      const cat = q.category || 'General';
      if (!categoryMap.has(cat)) {
        categoryMap.set(cat, { total: 0, correct: 0 });
      }
      const current = categoryMap.get(cat)!;
      current.total += 1;
      if (q.is_correct) current.correct += 1;
    });

    const categoryStats: CategoryStats[] = Array.from(categoryMap.entries()).map(([category, stats]) => ({
      category,
      total: stats.total,
      correct: stats.correct,
      percentage: Math.round((stats.correct / stats.total) * 100),
    })).sort((a, b) => b.total - a.total);

    // Identify weak and strong areas (need at least 3 questions)
    const significantCategories = categoryStats.filter(c => c.total >= 3);
    const weakAreas = significantCategories.filter(c => c.percentage < 60).map(c => c.category);
    const strongAreas = significantCategories.filter(c => c.percentage >= 80).map(c => c.category);

    // Calculate recent trend (last 20 vs previous 20)
    const recent20 = data.slice(0, 20);
    const previous20 = data.slice(20, 40);
    
    let recentTrend: 'improving' | 'declining' | 'stable' = 'stable';
    if (recent20.length >= 10 && previous20.length >= 10) {
      const recentAccuracy = recent20.filter(q => q.is_correct).length / recent20.length;
      const previousAccuracy = previous20.filter(q => q.is_correct).length / previous20.length;
      
      if (recentAccuracy - previousAccuracy > 0.1) recentTrend = 'improving';
      else if (previousAccuracy - recentAccuracy > 0.1) recentTrend = 'declining';
    }

    setStats({
      totalQuestions,
      correctAnswers,
      accuracy,
      categoryStats,
      weakAreas,
      strongAreas,
      recentTrend,
    });
  };

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const recordAnswer = async (
    quizId: string,
    questionIndex: number,
    category: string,
    isCorrect: boolean,
    timeSpentSeconds?: number
  ) => {
    if (!user) return;

    try {
      await supabase.from('quiz_question_analytics').insert({
        user_id: user.id,
        quiz_id: quizId,
        question_index: questionIndex,
        category,
        is_correct: isCorrect,
        time_spent_seconds: timeSpentSeconds,
      });
      
      // Refresh analytics
      await fetchAnalytics();
    } catch (error) {
      console.error('Error recording answer:', error);
    }
  };

  return {
    analytics,
    stats,
    loading,
    recordAnswer,
    refresh: fetchAnalytics,
  };
}
