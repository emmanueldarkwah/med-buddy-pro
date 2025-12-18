import { Home, Pill, GraduationCap, BookOpen, Bot, MoreHorizontal } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/', color: 'primary' },
  { icon: Pill, label: 'Drugs', path: '/drugs', color: 'drugs' },
  { icon: GraduationCap, label: 'Quizzes', path: '/quizzes', color: 'quizzes' },
  { icon: BookOpen, label: 'Cases', path: '/cases', color: 'cases' },
  { icon: Bot, label: 'PharmaBot', path: '/pharmabot', color: 'bot' },
  { icon: MoreHorizontal, label: 'More', path: '/more', color: 'more' },
];

const colorStyles: Record<string, { gradient: string; glow: string }> = {
  primary: { gradient: 'gradient-primary', glow: 'shadow-[0_0_24px_hsl(174_62%_35%/0.25)]' },
  drugs: { gradient: 'gradient-drugs', glow: 'shadow-[0_0_24px_hsl(262_83%_58%/0.25)]' },
  quizzes: { gradient: 'gradient-quizzes', glow: 'shadow-[0_0_24px_hsl(174_62%_35%/0.25)]' },
  cases: { gradient: 'gradient-cases', glow: 'shadow-[0_0_24px_hsl(24_95%_55%/0.25)]' },
  bot: { gradient: 'gradient-bot', glow: 'shadow-[0_0_24px_hsl(280_70%_50%/0.25)]' },
  more: { gradient: 'gradient-more', glow: 'shadow-[0_0_24px_hsl(220_70%_50%/0.25)]' },
};

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50">
      <div className="flex items-center justify-around py-2 px-4 max-w-lg mx-auto">
        {navItems.map(({ icon: Icon, label, path, color }) => {
          const isActive = location.pathname === path || 
            (path === '/drugs' && location.pathname.startsWith('/drug')) ||
            (path === '/quizzes' && location.pathname.startsWith('/quiz')) ||
            (path === '/cases' && location.pathname.startsWith('/case-study'));
          const styles = colorStyles[color];
          
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200",
                isActive
                  ? `text-${color}`
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-200",
                isActive && `${styles.gradient} ${styles.glow}`
              )}>
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive && "text-white"
                )} />
              </div>
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
