import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, GitCompare, Plus, X, ArrowLeftRight } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { drugs, type Drug } from '@/data/drugs';
import { cn } from '@/lib/utils';

export default function DrugComparisonPage() {
  const navigate = useNavigate();
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const filteredDrugs = drugs.filter(drug =>
    drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    drug.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    drug.class.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 10);

  const addDrug = (drug: Drug) => {
    if (selectedDrugs.length < 3 && !selectedDrugs.find(d => d.id === drug.id)) {
      setSelectedDrugs([...selectedDrugs, drug]);
      setSearchQuery('');
      setShowSearch(false);
    }
  };

  const removeDrug = (drugId: string) => {
    setSelectedDrugs(selectedDrugs.filter(d => d.id !== drugId));
  };

  const ComparisonRow = ({ label, values, highlight = false }: { label: string; values: (string | React.ReactNode)[]; highlight?: boolean }) => (
    <div className={cn("grid gap-4 py-3 border-b border-border/50", highlight && "bg-primary/5 -mx-4 px-4")}>
      <div className="font-medium text-sm text-muted-foreground col-span-full">{label}</div>
      <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${selectedDrugs.length}, 1fr)` }}>
        {values.map((value, i) => (
          <div key={i} className="text-sm">{value}</div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-warning text-warning-foreground px-4 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <GitCompare className="w-6 h-6" />
            <h1 className="text-xl font-bold">Drug Comparison</h1>
          </div>
        </div>
        <p className="text-sm opacity-90">Compare up to 3 drugs side by side</p>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Selected Drugs */}
        <div className="flex gap-2 flex-wrap">
          {selectedDrugs.map(drug => (
            <Badge 
              key={drug.id} 
              variant="secondary" 
              className="py-2 px-3 text-sm flex items-center gap-2"
            >
              {drug.name}
              <button onClick={() => removeDrug(drug.id)}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {selectedDrugs.length < 3 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSearch(true)}
              className="gap-1"
            >
              <Plus className="w-4 h-4" />
              Add Drug
            </Button>
          )}
        </div>

        {/* Search Modal */}
        {showSearch && (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Select a Drug</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowSearch(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search drugs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-3"
                autoFocus
              />
              <ScrollArea className="h-64">
                <div className="space-y-1">
                  {filteredDrugs.map(drug => (
                    <button
                      key={drug.id}
                      onClick={() => addDrug(drug)}
                      disabled={selectedDrugs.some(d => d.id === drug.id)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg hover:bg-muted transition-colors",
                        selectedDrugs.some(d => d.id === drug.id) && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="font-medium">{drug.name}</div>
                      <div className="text-xs text-muted-foreground">{drug.class}</div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {/* Comparison Table */}
        {selectedDrugs.length >= 2 ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5" />
                Comparison
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ComparisonRow 
                label="Drug Name" 
                values={selectedDrugs.map(d => <span className="font-semibold">{d.name}</span>)} 
                highlight 
              />
              <ComparisonRow 
                label="Generic Name" 
                values={selectedDrugs.map(d => d.genericName)} 
              />
              <ComparisonRow 
                label="Class" 
                values={selectedDrugs.map(d => <Badge variant="outline">{d.class}</Badge>)} 
              />
              <ComparisonRow 
                label="Category" 
                values={selectedDrugs.map(d => d.category)} 
              />
              <ComparisonRow 
                label="Mechanism" 
                values={selectedDrugs.map(d => <span className="text-xs">{d.mechanism.slice(0, 100)}...</span>)} 
              />
              <ComparisonRow 
                label="Half-Life" 
                values={selectedDrugs.map(d => d.halfLife)} 
                highlight 
              />
              <ComparisonRow 
                label="Onset of Action" 
                values={selectedDrugs.map(d => d.onsetOfAction)} 
              />
              <ComparisonRow 
                label="Route" 
                values={selectedDrugs.map(d => d.administration.route)} 
              />
              <ComparisonRow 
                label="With Food" 
                values={selectedDrugs.map(d => d.administration.withFood ? '✓ Yes' : '✗ No')} 
              />
              <ComparisonRow 
                label="Common Side Effects" 
                values={selectedDrugs.map(d => (
                  <div className="flex flex-wrap gap-1">
                    {d.sideEffects.slice(0, 3).map((se, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">{se}</Badge>
                    ))}
                  </div>
                ))} 
              />
              <ComparisonRow 
                label="Dangerous" 
                values={selectedDrugs.map(d => (
                  d.isDangerous 
                    ? <Badge variant="destructive">High Alert</Badge> 
                    : <Badge variant="outline">Standard</Badge>
                ))} 
                highlight 
              />
            </CardContent>
          </Card>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <GitCompare className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-lg font-semibold mb-2">Select at least 2 drugs</h2>
              <p className="text-muted-foreground">Add drugs to compare their properties side by side</p>
            </CardContent>
          </Card>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
