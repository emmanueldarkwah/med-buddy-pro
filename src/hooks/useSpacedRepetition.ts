import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface SpacedRepetitionCard {
  id?: string;
  drug_id: string;
  card_index: number;
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  next_review_date: string;
  last_review_date?: string;
}

// SM-2 Algorithm implementation
const calculateNextReview = (
  quality: number, // 0-5 rating (0-2 = fail, 3-5 = success)
  currentEaseFactor: number,
  currentInterval: number,
  repetitions: number
): { easeFactor: number; interval: number; repetitions: number } => {
  let newEaseFactor = currentEaseFactor;
  let newInterval = currentInterval;
  let newRepetitions = repetitions;

  if (quality < 3) {
    // Failed - reset
    newRepetitions = 0;
    newInterval = 1;
  } else {
    // Success
    if (newRepetitions === 0) {
      newInterval = 1;
    } else if (newRepetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(currentInterval * currentEaseFactor);
    }
    newRepetitions += 1;
  }

  // Update ease factor
  newEaseFactor = currentEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  newEaseFactor = Math.max(1.3, newEaseFactor);

  return {
    easeFactor: newEaseFactor,
    interval: newInterval,
    repetitions: newRepetitions,
  };
};

export function useSpacedRepetition() {
  const { user } = useAuth();
  const [cards, setCards] = useState<SpacedRepetitionCard[]>([]);
  const [dueCards, setDueCards] = useState<SpacedRepetitionCard[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCards = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('spaced_repetition')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      
      setCards(data || []);
      
      // Filter due cards
      const now = new Date().toISOString();
      const due = (data || []).filter(card => card.next_review_date <= now);
      setDueCards(due);
    } catch (error) {
      console.error('Error fetching spaced repetition cards:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const reviewCard = async (drugId: string, cardIndex: number, quality: number) => {
    if (!user) return;

    const existingCard = cards.find(c => c.drug_id === drugId && c.card_index === cardIndex);
    
    const currentEaseFactor = existingCard?.ease_factor || 2.5;
    const currentInterval = existingCard?.interval_days || 1;
    const currentRepetitions = existingCard?.repetitions || 0;

    const { easeFactor, interval, repetitions } = calculateNextReview(
      quality,
      currentEaseFactor,
      currentInterval,
      currentRepetitions
    );

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);

    const cardData = {
      user_id: user.id,
      drug_id: drugId,
      card_index: cardIndex,
      ease_factor: easeFactor,
      interval_days: interval,
      repetitions: repetitions,
      next_review_date: nextReviewDate.toISOString(),
      last_review_date: new Date().toISOString(),
    };

    try {
      if (existingCard?.id) {
        await supabase
          .from('spaced_repetition')
          .update(cardData)
          .eq('id', existingCard.id);
      } else {
        await supabase
          .from('spaced_repetition')
          .insert(cardData);
      }
      
      await fetchCards();
    } catch (error) {
      console.error('Error updating spaced repetition:', error);
    }
  };

  const getDueCardsForDrug = (drugId: string) => {
    const now = new Date().toISOString();
    return cards.filter(c => c.drug_id === drugId && c.next_review_date <= now);
  };

  const getCardProgress = (drugId: string, cardIndex: number) => {
    return cards.find(c => c.drug_id === drugId && c.card_index === cardIndex);
  };

  const getTotalDueCount = () => dueCards.length;

  return {
    cards,
    dueCards,
    loading,
    reviewCard,
    getDueCardsForDrug,
    getCardProgress,
    getTotalDueCount,
    refresh: fetchCards,
  };
}
