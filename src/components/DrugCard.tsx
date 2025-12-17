import { Drug } from '@/data/drugs';
import { Badge } from '@/components/ui/badge';
import { Heart, AlertTriangle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

interface DrugCardProps {
  drug: Drug;
}

export function DrugCard({ drug }: DrugCardProps) {
  const navigate = useNavigate();
  const { favoriteDrugs, toggleFavoriteDrug } = useApp();
  const isFavorite = favoriteDrugs.includes(drug.id);

  return (
    <div
      className="bg-card rounded-2xl p-4 shadow-md border border-border/50 animate-fade-in cursor-pointer hover:shadow-lg transition-all duration-200"
      onClick={() => navigate(`/drug/${drug.id}`)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{drug.name}</h3>
            {drug.isDangerous && (
              <AlertTriangle className="w-4 h-4 text-destructive" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">{drug.genericName}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavoriteDrug(drug.id);
          }}
          className={cn(
            "p-2 rounded-full transition-all",
            isFavorite ? "text-destructive" : "text-muted-foreground hover:text-destructive"
          )}
        >
          <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <Badge variant="secondary" className="text-xs">
          {drug.class}
        </Badge>
        <Badge variant="outline" className="text-xs">
          {drug.category}
        </Badge>
      </div>
      
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {drug.uses[0]}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {drug.interactions.length > 0 && (
            <Badge variant="destructive" className="text-xs">
              {drug.interactions.length} interactions
            </Badge>
          )}
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </div>
    </div>
  );
}
