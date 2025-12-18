import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Check, X, Shuffle, BookOpen } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { drugs } from '@/data/drugs';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Flashcard {
  front: string;
  back: string;
  category: string;
}

export default function FlashcardsPage() {
  const navigate = useNavigate();
  const { flashcardProgress, markFlashcardKnown, resetFlashcardProgress, updateStudyStreak } = useApp();
  
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledCards, setShuffledCards] = useState<Flashcard[]>([]);

  const generateFlashcards = (drugId: string): Flashcard[] => {
    const drug = drugs.find(d => d.id === drugId);
    if (!drug) return [];
    
    const cards: Flashcard[] = [
      { front: `What is the mechanism of action of ${drug.name}?`, back: drug.mechanism, category: 'Mechanism' },
      { front: `What are the main uses of ${drug.name}?`, back: drug.uses.join(', '), category: 'Uses' },
      { front: `What is the half-life of ${drug.name}?`, back: drug.halfLife, category: 'Pharmacokinetics' },
      { front: `What are the common side effects of ${drug.name}?`, back: drug.sideEffects.join(', '), category: 'Side Effects' },
      { front: `What are the contraindications for ${drug.name}?`, back: drug.contraindications.join(', '), category: 'Contraindications' },
      { front: `How should ${drug.name} be administered?`, back: `${drug.administration.route}, ${drug.administration.timing}`, category: 'Administration' },
    ];
    
    if (drug.warnings.length > 0) {
      cards.push({ front: `What are important warnings for ${drug.name}?`, back: drug.warnings.join(', '), category: 'Warnings' });
    }
    
    return cards;
  };

  const startStudy = (drugId: string) => {
    const cards = generateFlashcards(drugId);
    setSelectedDrug(drugId);
    setShuffledCards(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
    updateStudyStreak();
  };

  const shuffleCards = () => {
    setShuffledCards(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleKnow = () => {
    if (selectedDrug) {
      markFlashcardKnown(selectedDrug, currentIndex);
    }
    nextCard();
  };

  const nextCard = () => {
    setIsFlipped(false);
    if (currentIndex < shuffledCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const progress = selectedDrug 
    ? ((flashcardProgress[selectedDrug]?.length || 0) / shuffledCards.length) * 100 
    : 0;

  if (!selectedDrug) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <header className="bg-primary text-primary-foreground px-4 pt-12 pb-6 rounded-b-[2rem]">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate('/more')}
              className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              <h1 className="text-xl font-bold">Flashcards</h1>
            </div>
          </div>
          <p className="text-sm opacity-90">Select a drug to study with flashcards</p>
        </header>

        <main className="px-4 py-6">
          <div className="grid gap-3">
            {drugs.slice(0, 30).map((drug) => {
              const knownCount = flashcardProgress[drug.id]?.length || 0;
              const totalCards = 6;
              return (
                <button
                  key={drug.id}
                  onClick={() => startStudy(drug.id)}
                  className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 text-left hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{drug.name}</h3>
                      <p className="text-sm text-muted-foreground">{drug.class}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">{knownCount}/{totalCards}</p>
                      <p className="text-xs text-muted-foreground">mastered</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </main>

        <BottomNav />
      </div>
    );
  }

  const currentCard = shuffledCards[currentIndex];
  const drug = drugs.find(d => d.id === selectedDrug);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-primary text-primary-foreground px-4 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setSelectedDrug(null)}
            className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">{drug?.name}</h1>
            <p className="text-sm opacity-90">Card {currentIndex + 1} of {shuffledCards.length}</p>
          </div>
        </div>
        <Progress value={progress} className="h-2 bg-primary-foreground/20" />
        <p className="text-xs mt-2 opacity-70">{Math.round(progress)}% mastered</p>
      </header>

      <main className="px-4 py-6">
        {/* Flashcard */}
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className={cn(
            "min-h-[300px] rounded-3xl p-6 shadow-lg cursor-pointer transition-all duration-500 flex flex-col justify-center",
            "transform-gpu perspective-1000",
            isFlipped 
              ? "bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/20" 
              : "bg-card border-2 border-border/50"
          )}
        >
          <div className="text-center">
            <span className={cn(
              "text-xs font-medium px-3 py-1 rounded-full mb-4 inline-block",
              isFlipped ? "bg-success/20 text-success" : "bg-primary/10 text-primary"
            )}>
              {currentCard?.category} {isFlipped ? '• Answer' : '• Question'}
            </span>
            <p className={cn(
              "text-lg leading-relaxed",
              isFlipped ? "text-foreground" : "font-medium"
            )}>
              {isFlipped ? currentCard?.back : currentCard?.front}
            </p>
            {!isFlipped && (
              <p className="text-sm text-muted-foreground mt-4">Tap to reveal answer</p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={nextCard}
            className="flex-1 py-6"
          >
            <X className="w-5 h-5 mr-2" />
            Still Learning
          </Button>
          <Button
            onClick={handleKnow}
            className="flex-1 py-6 bg-success hover:bg-success/90"
          >
            <Check className="w-5 h-5 mr-2" />
            Know It
          </Button>
        </div>

        <div className="flex gap-3 mt-3">
          <Button
            variant="ghost"
            onClick={shuffleCards}
            className="flex-1"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Shuffle
          </Button>
          <Button
            variant="ghost"
            onClick={() => selectedDrug && resetFlashcardProgress(selectedDrug)}
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}