import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calculator, GitCompare, User, ShieldAlert, Settings, Info, LogOut, LogIn, FileText, Zap, BarChart3, BookOpen, Bookmark } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export default function MorePage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: 'Signed out',
        description: 'You have been signed out successfully.',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not sign out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const toolsSection = [
    {
      icon: Calculator,
      title: 'Medical Calculator',
      description: 'BMI, BSA, Creatinine Clearance & more',
      path: '/calculator',
      color: 'bg-info/10 text-info',
    },
    {
      icon: GitCompare,
      title: 'Drug Interactions',
      description: 'Check drug compatibility',
      path: '/interactions',
      color: 'bg-warning/10 text-warning',
    },
    {
      icon: BookOpen,
      title: 'Flashcards',
      description: 'Study drugs with flashcards',
      path: '/flashcards',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Bookmark,
      title: 'Bookmarks',
      description: 'Saved drugs and quizzes',
      path: '/bookmarks',
      color: 'bg-success/10 text-success',
    },
  ];

  const learningSection = [
    {
      icon: Zap,
      title: 'Daily Challenge',
      description: '5 random questions daily',
      path: '/daily-challenge',
      color: 'bg-warning/10 text-warning',
    },
    {
      icon: BarChart3,
      title: 'Progress & Stats',
      description: 'View your learning statistics',
      path: '/progress',
      color: 'bg-info/10 text-info',
    },
  ];

  const safetySection = [
    {
      icon: ShieldAlert,
      title: 'Safety Awareness',
      description: 'High-alert drugs & dangerous practices',
      path: '/safety',
      color: 'bg-destructive/10 text-destructive',
    },
  ];

  const accountSection = [
    {
      icon: User,
      title: 'Profile & Settings',
      description: 'Manage your account and preferences',
      path: '/profile',
      color: 'bg-primary/10 text-primary',
    },
  ];

  const helpSection = [
    {
      icon: FileText,
      title: 'Privacy Policy',
      description: 'How we handle your data',
      path: '/privacy-policy',
      color: 'bg-muted text-muted-foreground',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-more text-more-foreground px-4 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6" />
            <h1 className="text-xl font-bold">More</h1>
          </div>
        </div>
        <p className="text-sm opacity-90">Tools, settings, and additional features</p>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Tools Section */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Tools</h2>
          <div className="space-y-3">
            {toolsSection.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full bg-card rounded-2xl p-4 shadow-sm border border-border/50 text-left hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className={`p-3 rounded-xl ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Learning Section */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Learning</h2>
          <div className="space-y-3">
            {learningSection.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full bg-card rounded-2xl p-4 shadow-sm border border-border/50 text-left hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className={`p-3 rounded-xl ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Safety</h2>
          <div className="space-y-3">
            {safetySection.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full bg-card rounded-2xl p-4 shadow-sm border border-border/50 text-left hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className={`p-3 rounded-xl ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Account Section */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Account</h2>
          <div className="space-y-3">
            {accountSection.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full bg-card rounded-2xl p-4 shadow-sm border border-border/50 text-left hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className={`p-3 rounded-xl ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Help & Legal Section */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Help & Legal</h2>
          <div className="space-y-3">
            {helpSection.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full bg-card rounded-2xl p-4 shadow-sm border border-border/50 text-left hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className={`p-3 rounded-xl ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">About</h2>
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">AcuPharm</h3>
                <p className="text-xs text-muted-foreground">Version 1.0.0</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your comprehensive pharmacy education platform. Learn about drugs, test your knowledge, and apply it to real clinical scenarios.
            </p>
          </div>
        </section>

        {/* Sign In/Out Section */}
        <section className="pt-2">
          {user ? (
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="w-full py-6 text-base font-medium border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </Button>
          ) : (
            <Button
              onClick={() => navigate('/auth')}
              className="w-full py-6 text-base font-medium"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </Button>
          )}
          {user && (
            <p className="text-xs text-center text-muted-foreground mt-3">
              Signed in as {user.email}
            </p>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
