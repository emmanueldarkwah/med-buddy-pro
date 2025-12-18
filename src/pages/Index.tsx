import { Pill, GraduationCap, BookOpen, Sparkles, Bot, Shield } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { StreakBadge } from '@/components/StreakBadge';
import { useApp } from '@/context/AppContext';
import { useAdminRole } from '@/hooks/useAdminRole';

export default function Index() {
  const navigate = useNavigate();
  const { username } = useApp();
  const { isAdmin } = useAdminRole();

  const features = [
    {
      icon: Pill,
      title: 'Drug Database',
      description: 'Explore detailed information about medications, their uses, dosages, and interactions.',
      path: '/drugs',
      gradient: 'gradient-drugs',
      color: 'drugs',
    },
    {
      icon: GraduationCap,
      title: 'Quizzes',
      description: 'Test your knowledge with customizable quizzes. Choose timed or untimed modes.',
      path: '/quizzes',
      gradient: 'gradient-quizzes',
      color: 'quizzes',
    },
    {
      icon: BookOpen,
      title: 'Case Studies',
      description: 'Apply your knowledge to real-world clinical scenarios and patient cases.',
      path: '/cases',
      gradient: 'gradient-cases',
      color: 'cases',
    },
    {
      icon: Bot,
      title: 'PharmaBot',
      description: 'Get instant answers to your pharmacy questions from our AI assistant.',
      path: '/pharmabot',
      gradient: 'gradient-bot',
      color: 'bot',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="gradient-hero text-primary-foreground px-4 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-0.5">AcuPharm</h1>
              <p className="text-primary-foreground/80 text-xs">Your comprehensive pharmacy education platform</p>
            </div>
          </div>
          <StreakBadge />
        </div>
        
        <div className="bg-primary-foreground/10 rounded-2xl p-4">
          <p className="text-sm opacity-80 mb-1">Welcome back,</p>
          <p className="text-xl font-bold">{username}</p>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Admin Section */}
        {isAdmin && (
          <section>
            <button
              onClick={() => navigate('/admin')}
              className="w-full bg-destructive/10 rounded-2xl p-5 shadow-sm border border-destructive/20 text-left hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-destructive rounded-2xl group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 text-destructive">Admin Panel</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">Manage drugs, quizzes, case studies, and safety alerts.</p>
                </div>
              </div>
            </button>
          </section>
        )}

        {/* Main Features */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Explore Features</h2>
          <div className="space-y-4">
            {features.map((feature) => (
              <button
                key={feature.path}
                onClick={() => navigate(feature.path)}
                className="w-full bg-card rounded-2xl p-5 shadow-sm border border-border/50 text-left hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${feature.gradient} rounded-2xl group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-4 pb-2">
          <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
        </footer>
      </main>

      <BottomNav />
    </div>
  );
}
