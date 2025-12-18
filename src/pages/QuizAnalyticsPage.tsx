import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Target, Award, Brain, BarChart3, PieChart } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useQuizAnalytics } from '@/hooks/useQuizAnalytics';
import { cn } from '@/lib/utils';

export default function QuizAnalyticsPage() {
  const navigate = useNavigate();
  const { stats, loading } = useQuizAnalytics();

  const getTrendIcon = () => {
    if (!stats) return <Minus className="w-5 h-5" />;
    switch (stats.recentTrend) {
      case 'improving':
        return <TrendingUp className="w-5 h-5 text-success" />;
      case 'declining':
        return <TrendingDown className="w-5 h-5 text-destructive" />;
      default:
        return <Minus className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getTrendText = () => {
    if (!stats) return 'No data yet';
    switch (stats.recentTrend) {
      case 'improving':
        return 'Your performance is improving!';
      case 'declining':
        return 'Consider reviewing weak areas';
      default:
        return 'Performance is stable';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-info text-info-foreground px-4 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            <h1 className="text-xl font-bold">Quiz Analytics</h1>
          </div>
        </div>
        <p className="text-sm opacity-90">Track your performance and identify areas to improve</p>
      </header>

      <main className="px-4 py-6 space-y-6">
        {!stats ? (
          <Card className="text-center py-12">
            <CardContent>
              <Brain className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-lg font-semibold mb-2">No quiz data yet</h2>
              <p className="text-muted-foreground mb-4">Complete some quizzes to see your analytics</p>
              <Button onClick={() => navigate('/quizzes')}>Start a Quiz</Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Overview Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold text-primary">{stats.accuracy}%</div>
                  <p className="text-sm text-muted-foreground">Overall Accuracy</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="text-3xl font-bold">{stats.totalQuestions}</div>
                  <p className="text-sm text-muted-foreground">Questions Answered</p>
                </CardContent>
              </Card>
            </div>

            {/* Trend Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getTrendIcon()}
                    <div>
                      <p className="font-medium">Performance Trend</p>
                      <p className="text-sm text-muted-foreground">{getTrendText()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Performance by Category
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.categoryStats.map((cat) => (
                  <div key={cat.category}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{cat.category}</span>
                      <span className="text-sm text-muted-foreground">
                        {cat.correct}/{cat.total} ({cat.percentage}%)
                      </span>
                    </div>
                    <Progress 
                      value={cat.percentage} 
                      className={cn(
                        "h-2",
                        cat.percentage >= 80 && "[&>div]:bg-success",
                        cat.percentage >= 60 && cat.percentage < 80 && "[&>div]:bg-warning",
                        cat.percentage < 60 && "[&>div]:bg-destructive"
                      )}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Weak Areas */}
            {stats.weakAreas.length > 0 && (
              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <Target className="w-5 h-5" />
                    Areas to Improve
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {stats.weakAreas.map((area) => (
                      <span key={area} className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-destructive/30 text-destructive"
                    onClick={() => navigate('/study-plan')}
                  >
                    Generate Study Plan
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Strong Areas */}
            {stats.strongAreas.length > 0 && (
              <Card className="border-success/20 bg-success/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-success">
                    <Award className="w-5 h-5" />
                    Strong Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {stats.strongAreas.map((area) => (
                      <span key={area} className="px-3 py-1 bg-success/10 text-success rounded-full text-sm">
                        {area}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
