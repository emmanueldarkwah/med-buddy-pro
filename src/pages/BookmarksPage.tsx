import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, Heart, BookOpen, Pill } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';
import { drugs } from '@/data/drugs';
import { quizzes } from '@/data/quizzes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DrugCard } from '@/components/DrugCard';
import { cn } from '@/lib/utils';

export default function BookmarksPage() {
  const navigate = useNavigate();
  const { favoriteDrugs, favoriteQuizzes, toggleFavoriteQuiz } = useApp();

  const bookmarkedDrugs = drugs.filter(d => favoriteDrugs.includes(d.id));
  const bookmarkedQuizzes = quizzes.filter(q => favoriteQuizzes.includes(q.id));

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
            <Bookmark className="w-6 h-6" />
            <h1 className="text-xl font-bold">Bookmarks</h1>
          </div>
        </div>
        <p className="text-sm opacity-90">Your saved drugs and quizzes</p>
      </header>

      <main className="px-4 py-6">
        <Tabs defaultValue="drugs" className="w-full">
          <TabsList className="w-full bg-secondary rounded-2xl p-1 grid grid-cols-2 mb-4">
            <TabsTrigger value="drugs" className="rounded-xl">
              <Pill className="w-4 h-4 mr-2" />
              Drugs ({bookmarkedDrugs.length})
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="rounded-xl">
              <BookOpen className="w-4 h-4 mr-2" />
              Quizzes ({bookmarkedQuizzes.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drugs" className="space-y-3">
            {bookmarkedDrugs.length > 0 ? (
              bookmarkedDrugs.map(drug => (
                <DrugCard key={drug.id} drug={drug} />
              ))
            ) : (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="font-semibold text-lg mb-2">No Bookmarked Drugs</h3>
                <p className="text-sm text-muted-foreground">
                  Tap the heart icon on any drug to bookmark it
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-3">
            {bookmarkedQuizzes.length > 0 ? (
              bookmarkedQuizzes.map(quiz => (
                <div 
                  key={quiz.id}
                  className="bg-card rounded-2xl p-4 shadow-sm border border-border/50"
                >
                  <div className="flex items-start justify-between">
                    <button
                      onClick={() => navigate(`/quiz/${quiz.id}`)}
                      className="flex-1 text-left"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{quiz.icon}</span>
                        <div>
                          <h3 className="font-semibold">{quiz.title}</h3>
                          <p className="text-sm text-muted-foreground">{quiz.category}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{quiz.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          quiz.difficulty === 'beginner' && "bg-success/10 text-success",
                          quiz.difficulty === 'intermediate' && "bg-warning/10 text-warning",
                          quiz.difficulty === 'advanced' && "bg-destructive/10 text-destructive"
                        )}>
                          {quiz.difficulty}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {quiz.questions.length} questions
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => toggleFavoriteQuiz(quiz.id)}
                      className="p-2 rounded-full hover:bg-secondary transition-colors"
                    >
                      <Bookmark className="w-5 h-5 text-primary fill-primary" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Bookmark className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="font-semibold text-lg mb-2">No Bookmarked Quizzes</h3>
                <p className="text-sm text-muted-foreground">
                  Tap the bookmark icon on any quiz to save it
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNav />
    </div>
  );
}