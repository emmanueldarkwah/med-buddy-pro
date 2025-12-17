import { Home, Search, BookOpen, Calculator, Trophy, AlertTriangle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: BookOpen, label: 'Learn', path: '/learn' },
  { icon: Calculator, label: 'Calc', path: '/calculator' },
  { icon: Trophy, label: 'Progress', path: '/progress' },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50">
      <div className="flex items-center justify-around py-2 px-4 max-w-lg mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-200",
                isActive && "gradient-primary shadow-glow"
              )}>
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive && "text-primary-foreground"
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
