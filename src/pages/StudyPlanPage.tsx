import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Sparkles, Loader2, Target, Calendar, CheckCircle2 } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useQuizAnalytics } from '@/hooks/useQuizAnalytics';

const TOPICS = [
  'Pharmacology Basics',
  'Cardiovascular Drugs',
  'CNS Drugs',
  'Antibiotics',
  'Diabetes Medications',
  'Pain Management',
  'Respiratory Drugs',
  'GI Medications',
  'Immunology',
  'Oncology',
];

interface StudyPlan {
  title: string;
  description: string;
  focusAreas: string[];
  dailyGoals: Record<string, { tasks: string[]; drugs?: string[]; quizTopics?: string[] }>;
  tips: string[];
}

export default function StudyPlanPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { stats } = useQuizAnalytics();
  
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [duration, setDuration] = useState('7');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<StudyPlan | null>(null);

  const toggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const generatePlan = async () => {
    if (!user) {
      toast.error('Please sign in to generate a study plan');
      return;
    }

    if (selectedTopics.length === 0) {
      toast.error('Please select at least one topic');
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-study-tools', {
        body: {
          type: 'generate_study_plan',
          topics: {
            topics: selectedTopics,
            duration: parseInt(duration),
          },
          weakAreas: stats?.weakAreas || [],
        },
      });

      if (error) throw error;
      
      setGeneratedPlan(data);
      toast.success('Study plan generated!');
      
      // Save to database
      await supabase.from('study_plans').insert({
        user_id: user.id,
        title: data.title,
        description: data.description,
        focus_areas: data.focusAreas,
        daily_goals: data.dailyGoals,
        duration_days: parseInt(duration),
      });
    } catch (error) {
      console.error('Error generating plan:', error);
      toast.error('Failed to generate study plan');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="gradient-primary text-primary-foreground px-4 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            <h1 className="text-xl font-bold">AI Study Plan</h1>
          </div>
        </div>
        <p className="text-sm opacity-90">Generate a personalized study plan based on your goals</p>
      </header>

      <main className="px-4 py-6 space-y-6">
        {!generatedPlan ? (
          <>
            {/* Weak Areas Alert */}
            {stats?.weakAreas && stats.weakAreas.length > 0 && (
              <Card className="border-warning/20 bg-warning/5">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium text-warning">Based on your quiz performance</p>
                      <p className="text-sm text-muted-foreground">
                        We'll focus on: {stats.weakAreas.join(', ')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Topic Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Topics to Study</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {TOPICS.map(topic => (
                  <label 
                    key={topic} 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <Checkbox
                      checked={selectedTopics.includes(topic)}
                      onCheckedChange={() => toggleTopic(topic)}
                    />
                    <span>{topic}</span>
                  </label>
                ))}
              </CardContent>
            </Card>

            {/* Duration Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Plan Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Days - Quick Review</SelectItem>
                    <SelectItem value="7">7 Days - Standard</SelectItem>
                    <SelectItem value="14">14 Days - Comprehensive</SelectItem>
                    <SelectItem value="30">30 Days - Deep Dive</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <Button 
              onClick={generatePlan} 
              disabled={isGenerating || selectedTopics.length === 0}
              className="w-full py-6 text-base"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Study Plan
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            {/* Generated Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  {generatedPlan.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{generatedPlan.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {generatedPlan.focusAreas.map((area, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Goals */}
            <div className="space-y-3">
              <h3 className="font-semibold">Daily Schedule</h3>
              {Object.entries(generatedPlan.dailyGoals).map(([day, goals]) => (
                <Card key={day}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base capitalize">{day.replace('day', 'Day ')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {goals.tasks.map((task, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span>{task}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tips */}
            {generatedPlan.tips && generatedPlan.tips.length > 0 && (
              <Card className="bg-info/5 border-info/20">
                <CardHeader>
                  <CardTitle className="text-info text-base">Study Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {generatedPlan.tips.map((tip, i) => (
                    <p key={i} className="text-sm text-muted-foreground">• {tip}</p>
                  ))}
                </CardContent>
              </Card>
            )}

            <Button variant="outline" onClick={() => setGeneratedPlan(null)} className="w-full">
              Create New Plan
            </Button>
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
