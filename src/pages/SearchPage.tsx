import { useState } from 'react';
import { Search, X, Filter, Pill } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { DrugCard } from '@/components/DrugCard';
import { drugs, drugClasses } from '@/data/drugs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(drugs.map(d => d.category))];

  const filteredDrugs = drugs.filter(drug => {
    const matchesQuery = query === '' || 
      drug.name.toLowerCase().includes(query.toLowerCase()) ||
      drug.genericName.toLowerCase().includes(query.toLowerCase()) ||
      drug.brandNames.some(b => b.toLowerCase().includes(query.toLowerCase())) ||
      drug.uses.some(u => u.toLowerCase().includes(query.toLowerCase()));
    
    const matchesClass = !selectedClass || drug.class === selectedClass;
    const matchesCategory = !selectedCategory || drug.category === selectedCategory;
    
    return matchesQuery && matchesClass && matchesCategory;
  });

  const clearFilters = () => {
    setSelectedClass(null);
    setSelectedCategory(null);
    setQuery('');
  };

  const hasFilters = query || selectedClass || selectedCategory;

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-4">
        <div className="flex items-center gap-3 bg-secondary rounded-2xl px-4 py-3">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search drugs, uses, classes..."
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')}>
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              !selectedCategory
                ? "gradient-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                selectedCategory === cat
                  ? "gradient-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Class Filter */}
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1 scrollbar-hide">
          {drugClasses.map(({ name }) => (
            <button
              key={name}
              onClick={() => setSelectedClass(selectedClass === name ? null : name)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border",
                selectedClass === name
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50"
              )}
            >
              {name}
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 py-4">
        {hasFilters && (
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredDrugs.length} result{filteredDrugs.length !== 1 ? 's' : ''}
            </p>
            <button
              onClick={clearFilters}
              className="text-sm text-primary font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {filteredDrugs.length > 0 ? (
          <div className="space-y-3">
            {filteredDrugs.map(drug => (
              <DrugCard key={drug.id} drug={drug} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Pill className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">No drugs found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
