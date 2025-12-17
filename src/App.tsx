import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Index from "./pages/Index";
import SearchPage from "./pages/SearchPage";
import DrugDetail from "./pages/DrugDetail";
import LearnPage from "./pages/LearnPage";
import QuizPage from "./pages/QuizPage";
import CaseStudyPage from "./pages/CaseStudyPage";
import CalculatorPage from "./pages/CalculatorPage";
import InteractionsPage from "./pages/InteractionsPage";
import ProgressPage from "./pages/ProgressPage";
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
            <Route path="/search" element={<SearchPage />} />
            <Route path="/drug/:id" element={<DrugDetail />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/case-study/:id" element={<CaseStudyPage />} />
            <Route path="/case-studies" element={<LearnPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/interactions" element={<InteractionsPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
