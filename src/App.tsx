import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
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
            <Route path="/progress" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
