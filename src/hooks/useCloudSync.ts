import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface SyncState {
  studyStreak: number;
  lastStudyDate: string | null;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  interactionChecks: number;
  calculatorUses: number;
  username: string;
  avatarUrl: string;
  theme: string;
  isDarkMode: boolean;
}

export function useCloudSync(
  state: SyncState,
  favoriteDrugs: string[],
  favoriteQuizzes: string[],
  drugNotes: Record<string, string>,
  achievements: { id: string; unlockedAt?: Date }[],
  dailyChallenges: { date: string; score: number; questionsAnswered: number }[],
  flashcardProgress: Record<string, number[]>,
  completedQuizzes: { quizId: string; score: number; totalQuestions: number; completedAt: Date }[],
  onDataLoaded: (data: any) => void
) {
  const { user } = useAuth();

  // Load data from cloud when user signs in
  useEffect(() => {
    if (!user) return;

    const loadFromCloud = async () => {
      try {
        // Load user progress
        const { data: progress } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        // Load bookmarks
        const { data: bookmarks } = await supabase
          .from('user_bookmarks')
          .select('*')
          .eq('user_id', user.id);

        // Load achievements
        const { data: cloudAchievements } = await supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', user.id);

        // Load drug notes
        const { data: notes } = await supabase
          .from('user_drug_notes')
          .select('*')
          .eq('user_id', user.id);

        // Load daily challenges
        const { data: challenges } = await supabase
          .from('user_daily_challenges')
          .select('*')
          .eq('user_id', user.id);

        // Load quiz results
        const { data: quizResults } = await supabase
          .from('user_quiz_results')
          .select('*')
          .eq('user_id', user.id);

        // Load flashcard progress
        const { data: flashcards } = await supabase
          .from('user_flashcard_progress')
          .select('*')
          .eq('user_id', user.id);

        if (progress || bookmarks?.length || cloudAchievements?.length) {
          const loadedData = {
            ...(progress && {
              studyStreak: progress.study_streak,
              lastStudyDate: progress.last_study_date,
              totalQuestionsAnswered: progress.total_questions_answered,
              correctAnswers: progress.correct_answers,
              interactionChecks: progress.interaction_checks,
              calculatorUses: progress.calculator_uses,
              username: progress.username,
              avatarUrl: progress.avatar_url || '',
              theme: progress.theme,
              isDarkMode: progress.is_dark_mode,
            }),
            favoriteDrugs: bookmarks?.filter(b => b.item_type === 'drug').map(b => b.item_id) || [],
            favoriteQuizzes: bookmarks?.filter(b => b.item_type === 'quiz').map(b => b.item_id) || [],
            unlockedAchievementIds: cloudAchievements?.map(a => a.achievement_id) || [],
            drugNotes: notes?.reduce((acc, n) => ({ ...acc, [n.drug_id]: n.note }), {}) || {},
            dailyChallenges: challenges?.map(c => ({
              date: c.challenge_date,
              completed: c.completed,
              score: c.score,
              questionsAnswered: c.questions_answered,
            })) || [],
            completedQuizzes: quizResults?.map(q => ({
              quizId: q.quiz_id,
              score: q.score,
              totalQuestions: q.total_questions,
              completedAt: new Date(q.completed_at),
            })) || [],
            flashcardProgress: flashcards?.reduce((acc, f) => ({
              ...acc,
              [f.drug_id]: f.known_card_indices || [],
            }), {}) || {},
          };
          onDataLoaded(loadedData);
        }
      } catch (error) {
        console.error('Error loading from cloud:', error);
      }
    };

    loadFromCloud();
  }, [user]);

  // Sync progress to cloud
  const syncProgress = useCallback(async () => {
    if (!user) return;

    try {
      await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          study_streak: state.studyStreak,
          last_study_date: state.lastStudyDate,
          total_questions_answered: state.totalQuestionsAnswered,
          correct_answers: state.correctAnswers,
          interaction_checks: state.interactionChecks,
          calculator_uses: state.calculatorUses,
          username: state.username,
          avatar_url: state.avatarUrl,
          theme: state.theme,
          is_dark_mode: state.isDarkMode,
        }, { onConflict: 'user_id' });
    } catch (error) {
      console.error('Error syncing progress:', error);
    }
  }, [user, state]);

  // Sync bookmarks
  const syncBookmarks = useCallback(async () => {
    if (!user) return;

    try {
      // Get existing bookmarks
      const { data: existing } = await supabase
        .from('user_bookmarks')
        .select('item_type, item_id')
        .eq('user_id', user.id);

      const existingDrugs = new Set(existing?.filter(b => b.item_type === 'drug').map(b => b.item_id) || []);
      const existingQuizzes = new Set(existing?.filter(b => b.item_type === 'quiz').map(b => b.item_id) || []);

      // Add new drug bookmarks
      const newDrugs = favoriteDrugs.filter(id => !existingDrugs.has(id));
      if (newDrugs.length) {
        await supabase.from('user_bookmarks').insert(
          newDrugs.map(id => ({ user_id: user.id, item_type: 'drug', item_id: id }))
        );
      }

      // Add new quiz bookmarks
      const newQuizzes = favoriteQuizzes.filter(id => !existingQuizzes.has(id));
      if (newQuizzes.length) {
        await supabase.from('user_bookmarks').insert(
          newQuizzes.map(id => ({ user_id: user.id, item_type: 'quiz', item_id: id }))
        );
      }

      // Remove deleted bookmarks
      const removedDrugs = [...existingDrugs].filter(id => !favoriteDrugs.includes(id));
      const removedQuizzes = [...existingQuizzes].filter(id => !favoriteQuizzes.includes(id));

      for (const id of removedDrugs) {
        await supabase.from('user_bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('item_type', 'drug')
          .eq('item_id', id);
      }

      for (const id of removedQuizzes) {
        await supabase.from('user_bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('item_type', 'quiz')
          .eq('item_id', id);
      }
    } catch (error) {
      console.error('Error syncing bookmarks:', error);
    }
  }, [user, favoriteDrugs, favoriteQuizzes]);

  // Sync achievements
  const syncAchievements = useCallback(async () => {
    if (!user) return;

    try {
      const unlockedAchievements = achievements.filter(a => a.unlockedAt);
      for (const achievement of unlockedAchievements) {
        await supabase
          .from('user_achievements')
          .upsert(
            {
              user_id: user.id,
              achievement_id: achievement.id,
              unlocked_at: achievement.unlockedAt?.toISOString(),
            } as any,
            { onConflict: 'user_id,achievement_id' }
          );
      }
    } catch (error) {
      console.error('Error syncing achievements:', error);
    }
  }, [user, achievements]);

  // Sync drug notes
  const syncDrugNotes = useCallback(async () => {
    if (!user) return;

    try {
      for (const [drugId, note] of Object.entries(drugNotes)) {
        if (note) {
          await supabase
            .from('user_drug_notes')
            .upsert({
              user_id: user.id,
              drug_id: drugId,
              note,
            }, { onConflict: 'user_id,drug_id' });
        }
      }
    } catch (error) {
      console.error('Error syncing notes:', error);
    }
  }, [user, drugNotes]);

  // Sync daily challenges
  const syncDailyChallenges = useCallback(async () => {
    if (!user) return;

    try {
      for (const challenge of dailyChallenges) {
        await supabase
          .from('user_daily_challenges')
          .upsert({
            user_id: user.id,
            challenge_date: challenge.date,
            score: challenge.score,
            questions_answered: challenge.questionsAnswered,
            completed: true,
          }, { onConflict: 'user_id,challenge_date' });
      }
    } catch (error) {
      console.error('Error syncing challenges:', error);
    }
  }, [user, dailyChallenges]);

  // Auto-sync when state changes (debounced)
  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(() => {
      syncProgress();
      syncBookmarks();
      syncAchievements();
      syncDrugNotes();
      syncDailyChallenges();
    }, 2000);
    return () => clearTimeout(timer);
  }, [user, state, favoriteDrugs, favoriteQuizzes, achievements, drugNotes, dailyChallenges]);

  return { syncProgress, syncBookmarks, syncAchievements, syncDrugNotes, syncDailyChallenges };
}