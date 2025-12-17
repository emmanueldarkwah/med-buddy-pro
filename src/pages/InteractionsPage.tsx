import { useState } from 'react';
import { ArrowLeft, AlertTriangle, Search, X, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { drugs } from '@/data/drugs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function InteractionsPage() {
  const navigate = useNavigate();
  const [selectedDrugs, setSelectedDrugs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDrugs = drugs.filter(drug =>
    drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    drug.genericName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleDrug = (drugId: string) => {
    setSelectedDrugs(prev =>
      prev.includes(drugId)
        ? prev.filter(id => id !== drugId)
        : [...prev, drugId]
    );
  };

  const selectedDrugObjects = drugs.filter(d => selectedDrugs.includes(d.id));

  // Find interactions between selected drugs
  const interactions: {
    drug1: string;
    drug2: string;
    severity: 'mild' | 'moderate' | 'severe';
    effect: string;
  }[] = [];

  selectedDrugObjects.forEach(drug => {
    drug.interactions.forEach(interaction => {
      const interactingDrug = selectedDrugObjects.find(
        d => d.name.toLowerCase().includes(interaction.drug.toLowerCase()) ||
             interaction.drug.toLowerCase().includes(d.name.toLowerCase())
      );
      if (interactingDrug && !interactions.some(
        i => (i.drug1 === drug.name && i.drug2 === interactingDrug.name) ||
             (i.drug1 === interactingDrug.name && i.drug2 === drug.name)
      )) {
        interactions.push({
          drug1: drug.name,
          drug2: interactingDrug.name,
          severity: interaction.severity,
          effect: interaction.effect,
        });
      }
    });
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Drug Interactions</h1>
            <p className="text-sm text-muted-foreground">Check for potential interactions</p>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-secondary rounded-2xl px-4 py-3">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search drugs to add..."
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')}>
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Selected Drugs */}
        {selectedDrugs.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-muted-foreground mb-2">
              Selected Drugs ({selectedDrugs.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {selectedDrugObjects.map(drug => (
                <button
                  key={drug.id}
                  onClick={() => toggleDrug(drug.id)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-sm"
                >
                  {drug.name}
                  <X className="w-4 h-4" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Interactions Result */}
        {selectedDrugs.length >= 2 && (
          <section className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground">
              Interaction Results
            </h2>

            {interactions.length > 0 ? (
              interactions.map((interaction, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-2xl p-4 border",
                    interaction.severity === 'severe' && "bg-destructive/5 border-destructive/20",
                    interaction.severity === 'moderate' && "bg-warning/5 border-warning/20",
                    interaction.severity === 'mild' && "bg-info/5 border-info/20"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className={cn(
                        "w-5 h-5",
                        interaction.severity === 'severe' && "text-destructive",
                        interaction.severity === 'moderate' && "text-warning",
                        interaction.severity === 'mild' && "text-info"
                      )} />
                      <span className="font-medium">
                        {interaction.drug1} + {interaction.drug2}
                      </span>
                    </div>
                    <Badge
                      className={cn(
                        interaction.severity === 'severe' && "bg-destructive text-destructive-foreground",
                        interaction.severity === 'moderate' && "bg-warning text-warning-foreground",
                        interaction.severity === 'mild' && "bg-info text-info-foreground"
                      )}
                    >
                      {interaction.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{interaction.effect}</p>
                </div>
              ))
            ) : (
              <div className="bg-success/5 border border-success/20 rounded-2xl p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="font-medium text-success">No known interactions found</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  The selected drugs don't have documented interactions in our database.
                  Always consult a healthcare professional.
                </p>
              </div>
            )}
          </section>
        )}

        {/* Drug List */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground mb-2">
            {searchQuery ? 'Search Results' : 'Available Drugs'}
          </h2>
          <div className="space-y-2">
            {filteredDrugs.map(drug => {
              const isSelected = selectedDrugs.includes(drug.id);
              return (
                <button
                  key={drug.id}
                  onClick={() => toggleDrug(drug.id)}
                  className={cn(
                    "w-full p-4 rounded-2xl border-2 text-left transition-all",
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/30"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{drug.name}</h3>
                        {drug.isDangerous && (
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{drug.class}</p>
                    </div>
                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
