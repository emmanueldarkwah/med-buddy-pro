import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Target, Calendar, Award, BarChart3 } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function ProgressPage() {
  const navigate = useNavigate();
  const { 
    completedQuizzes, 
    totalQuestionsAnswered, 
    correctAnswers, 
    studyStreak,
    dailyChallenges,
    achievements 
  } = useApp();

  const accuracy = totalQuestionsAnswered > 0 
    ? Math.round((correctAnswers / totalQuestionsAnswered) * 100) 
    : 0;

  const unlockedCount = achievements.filter(a => a.unlockedAt).length;

  // Get quiz performance by category
  const quizPerformance = completedQuizzes.reduce((acc, quiz) => {
    const percentage = Math.round((quiz.score / quiz.totalQuestions) * 100);
    acc.push({ name: quiz.quizId.slice(0, 8), score: percentage });
    return acc;
  }, [] as { name: string; score: number }[]).slice(-7);

  // Weekly activity data
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toDateString();
    const challenge = dailyChallenges.find(dc => dc.date === dateStr);
    return {
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
      questions: challenge?.questionsAnswered || 0,
    };
  });

  // Accuracy pie data
  const pieData = [
    { name: 'Correct', value: correctAnswers, color: 'hsl(var(--success))' },
    { name: 'Incorrect', value: totalQuestionsAnswered - correctAnswers, color: 'hsl(var(--destructive))' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="gradient-hero text-primary-foreground px-4 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate('/more')}
            className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            <h1 className="text-xl font-bold">Progress & Statistics</h1>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Overview Stats */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium">Accuracy</span>
            </div>
            <p className="text-3xl font-bold">{accuracy}%</p>
            <p className="text-xs text-muted-foreground">{correctAnswers}/{totalQuestionsAnswered} correct</p>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <div className="flex items-center gap-2 mb-2 text-warning">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">Streak</span>
            </div>
            <p className="text-3xl font-bold">{studyStreak}</p>
            <p className="text-xs text-muted-foreground">days in a row</p>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <div className="flex items-center gap-2 mb-2 text-info">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">Quizzes</span>
            </div>
            <p className="text-3xl font-bold">{completedQuizzes.length}</p>
            <p className="text-xs text-muted-foreground">completed</p>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <div className="flex items-center gap-2 mb-2 text-success">
              <Award className="w-5 h-5" />
              <span className="text-sm font-medium">Achievements</span>
            </div>
            <p className="text-3xl font-bold">{unlockedCount}/{achievements.length}</p>
            <p className="text-xs text-muted-foreground">unlocked</p>
          </div>
        </section>

        {/* Accuracy Breakdown */}
        {totalQuestionsAnswered > 0 && (
          <section className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h2 className="font-semibold mb-4">Accuracy Breakdown</h2>
            <div className="h-[200px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-sm">Correct ({correctAnswers})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-sm">Incorrect ({totalQuestionsAnswered - correctAnswers})</span>
              </div>
            </div>
          </section>
        )}

        {/* Weekly Activity */}
        <section className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
          <h2 className="font-semibold mb-4">Weekly Activity</h2>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={last7Days}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                />
                <YAxis hide />
                <Bar 
                  dataKey="questions" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">Questions answered per day</p>
        </section>

        {/* Recent Quiz Performance */}
        {quizPerformance.length > 0 && (
          <section className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <h2 className="font-semibold mb-4">Recent Quiz Scores</h2>
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quizPerformance}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                  />
                  <YAxis hide domain={[0, 100]} />
                  <Bar 
                    dataKey="score" 
                    fill="hsl(var(--success))" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">Score % for last {quizPerformance.length} quizzes</p>
          </section>
        )}

        {/* Daily Challenges History */}
        <section className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
          <h2 className="font-semibold mb-4">Daily Challenge History</h2>
          {dailyChallenges.length > 0 ? (
            <div className="space-y-2">
              {dailyChallenges.slice(-5).reverse().map((challenge, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                  <span className="text-sm">{new Date(challenge.date).toLocaleDateString()}</span>
                  <span className="text-sm font-medium text-success">
                    {challenge.score}/{challenge.questionsAnswered} correct
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No daily challenges completed yet
            </p>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}