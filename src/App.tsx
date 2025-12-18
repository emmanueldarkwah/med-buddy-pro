import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Loader2 } from "lucide-react";
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

// Auth page wrapper - redirects to home if already logged in
function AuthPageWrapper() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return <AuthPage />;
}

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<AuthPageWrapper />} />
      <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/drugs" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
      <Route path="/drug/:id" element={<ProtectedRoute><DrugDetail /></ProtectedRoute>} />
      <Route path="/quizzes" element={<ProtectedRoute><QuizzesPage /></ProtectedRoute>} />
      <Route path="/quiz/:id" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
      <Route path="/cases" element={<ProtectedRoute><CasesPage /></ProtectedRoute>} />
      <Route path="/case-study/:id" element={<ProtectedRoute><CaseStudyPage /></ProtectedRoute>} />
      <Route path="/calculator" element={<ProtectedRoute><CalculatorPage /></ProtectedRoute>} />
      <Route path="/interactions" element={<ProtectedRoute><InteractionsPage /></ProtectedRoute>} />
      <Route path="/more" element={<ProtectedRoute><MorePage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/safety" element={<ProtectedRoute><SafetyPage /></ProtectedRoute>} />
      <Route path="/privacy-policy" element={<ProtectedRoute><PrivacyPolicyPage /></ProtectedRoute>} />
      <Route path="/flashcards" element={<ProtectedRoute><FlashcardsPage /></ProtectedRoute>} />
      <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
      <Route path="/daily-challenge" element={<ProtectedRoute><DailyChallengePage /></ProtectedRoute>} />
      <Route path="/bookmarks" element={<ProtectedRoute><BookmarksPage /></ProtectedRoute>} />
      <Route path="/pharmabot" element={<ProtectedRoute><PharmaBotPage /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
      <Route path="/quiz-analytics" element={<ProtectedRoute><QuizAnalyticsPage /></ProtectedRoute>} />
      <Route path="/drug-comparison" element={<ProtectedRoute><DrugComparisonPage /></ProtectedRoute>} />
      <Route path="/study-plan" element={<ProtectedRoute><StudyPlanPage /></ProtectedRoute>} />
      <Route path="/ai-quiz" element={<ProtectedRoute><AIQuizPage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AppProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </AppProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
