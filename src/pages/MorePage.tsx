import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, GitCompare, User, AlertTriangle, Settings, Info } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { drugs } from '@/data/drugs';

export default function MorePage() {
  const navigate = useNavigate();
  const dangerousDrugs = drugs.filter(d => d.isDangerous);

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

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-more text-more-foreground px-4 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate('/')}
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

        {/* High-Alert Medications */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Safety</h2>
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-destructive/20 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-destructive">High-Alert Medications</h3>
                <p className="text-xs text-muted-foreground">Requires extra caution</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {dangerousDrugs.map(drug => (
                <button
                  key={drug.id}
                  onClick={() => navigate(`/drug/${drug.id}`)}
                  className="px-3 py-1.5 bg-destructive/10 hover:bg-destructive/20 text-destructive text-sm rounded-full transition-colors"
                >
                  {drug.name}
                </button>
              ))}
            </div>
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
      </main>

      <BottomNav />
    </div>
  );
}
