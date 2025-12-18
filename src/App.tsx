import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import SearchPage from "./pages/SearchPage";
import DrugDetail from "./pages/DrugDetail";
import QuizzesPage from "./pages/QuizzesPage";
import QuizPage from "./pages/QuizPage";
import CasesPage from "./pages/CasesPage";
import CaseStudyPage from "./pages/CaseStudyPage";
import CalculatorPage from "./pages/CalculatorPage";
import InteractionsPage from "./pages/InteractionsPage";
import MorePage from "./pages/MorePage";
import ProfilePage from "./pages/ProfilePage";
import SafetyPage from "./pages/SafetyPage";
import AuthPage from "./pages/AuthPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import ProgressPage from "./pages/ProgressPage";
import DailyChallengePage from "./pages/DailyChallengePage";
import BookmarksPage from "./pages/BookmarksPage";
import PharmaBotPage from "./pages/PharmaBotPage";
import AdminPage from "./pages/AdminPage";
import QuizAnalyticsPage from "./pages/QuizAnalyticsPage";
import DrugComparisonPage from "./pages/DrugComparisonPage";
import StudyPlanPage from "./pages/StudyPlanPage";
import AIQuizPage from "./pages/AIQuizPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AppProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/drugs" element={<SearchPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/drug/:id" element={<DrugDetail />} />
              <Route path="/quizzes" element={<QuizzesPage />} />
              <Route path="/quiz/:id" element={<QuizPage />} />
              <Route path="/cases" element={<CasesPage />} />
              <Route path="/case-study/:id" element={<CaseStudyPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/interactions" element={<InteractionsPage />} />
              <Route path="/more" element={<MorePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/safety" element={<SafetyPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/flashcards" element={<FlashcardsPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/daily-challenge" element={<DailyChallengePage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/pharmabot" element={<PharmaBotPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/quiz-analytics" element={<QuizAnalyticsPage />} />
              <Route path="/drug-comparison" element={<DrugComparisonPage />} />
              <Route path="/study-plan" element={<StudyPlanPage />} />
              <Route path="/ai-quiz" element={<AIQuizPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
