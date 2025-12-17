import { Search, Pill, AlertTriangle, Calculator, BookOpen, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const actions = [
  { icon: Search, label: 'Search Drugs', path: '/search', gradient: 'gradient-primary' },
  { icon: AlertTriangle, label: 'Interactions', path: '/interactions', gradient: 'gradient-danger' },
  { icon: Calculator, label: 'Calculator', path: '/calculator', gradient: 'gradient-accent' },
  { icon: BookOpen, label: 'Case Studies', path: '/case-studies', gradient: 'gradient-success' },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map(({ icon: Icon, label, path, gradient }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className={`${gradient} p-4 rounded-2xl text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]`}
        >
          <Icon className="w-6 h-6 mb-2" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}
