import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, AlertTriangle, Clock, Pill, Activity, Share2, StickyNote, Save, X } from 'lucide-react';
import { drugs } from '@/data/drugs';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export default function DrugDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { favoriteDrugs, toggleFavoriteDrug, drugNotes, setDrugNote } = useApp();
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState('');

  const drug = drugs.find(d => d.id === id);

  if (!drug) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Drug not found</h2>
          <button onClick={() => navigate(-1)} className="text-primary">Go back</button>
        </div>
      </div>
    );
  }

  const isFavorite = favoriteDrugs.includes(drug.id);
  const existingNote = drugNotes[drug.id] || '';

  const handleOpenNotes = () => {
    setNoteText(existingNote);
    setShowNotes(true);
  };

  const handleSaveNote = () => {
    setDrugNote(drug.id, noteText);
    setShowNotes(false);
    toast({
      title: 'Note saved',
      description: `Your note for ${drug.name} has been saved.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className={cn(
        "px-4 pt-12 pb-6 rounded-b-[2rem]",
        drug.isDangerous ? "gradient-danger" : "gradient-hero"
      )}>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavoriteDrug(drug.id)}
              className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
            >
              <Heart className={cn(
                "w-5 h-5 text-primary-foreground",
                isFavorite && "fill-current"
              )} />
            </button>
            <button className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
              <Share2 className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </div>

        <div className="text-primary-foreground">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold">{drug.name}</h1>
            {drug.isDangerous && (
              <AlertTriangle className="w-6 h-6" />
            )}
          </div>
          <p className="text-primary-foreground/80 mb-3">{drug.genericName}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-0">
              {drug.class}
            </Badge>
            <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
              {drug.category}
            </Badge>
          </div>
        </div>
      </header>

      {/* Quick Info */}
      <div className="px-4 -mt-4">
        <div className="bg-card rounded-2xl p-4 shadow-lg border border-border/50 grid grid-cols-3 gap-4">
          <div className="text-center">
            <Clock className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-xs text-muted-foreground">Half-life</p>
            <p className="text-sm font-medium">{drug.halfLife}</p>
          </div>
          <div className="text-center border-x border-border">
            <Activity className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-xs text-muted-foreground">Onset</p>
            <p className="text-sm font-medium">{drug.onsetOfAction}</p>
          </div>
          <div className="text-center">
            <Pill className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-xs text-muted-foreground">Route</p>
            <p className="text-sm font-medium">{drug.administration.route}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-6">
        <Tabs defaultValue="uses" className="w-full">
          <TabsList className="w-full bg-secondary rounded-2xl p-1 grid grid-cols-4">
            <TabsTrigger value="uses" className="rounded-xl text-xs">Uses</TabsTrigger>
            <TabsTrigger value="admin" className="rounded-xl text-xs">Admin</TabsTrigger>
            <TabsTrigger value="effects" className="rounded-xl text-xs">Effects</TabsTrigger>
            <TabsTrigger value="interact" className="rounded-xl text-xs">Interact</TabsTrigger>
          </TabsList>

          <TabsContent value="uses" className="mt-4 space-y-4">
            <section>
              <h3 className="font-semibold mb-2">Indications</h3>
              <ul className="space-y-2">
                {drug.uses.map((use, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <span className="text-sm text-muted-foreground">{use}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Mechanism of Action</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{drug.mechanism}</p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Brand Names</h3>
              <div className="flex flex-wrap gap-2">
                {drug.brandNames.map((brand, i) => (
                  <Badge key={i} variant="outline">{brand}</Badge>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="admin" className="mt-4 space-y-4">
            <section className="bg-primary/5 border border-primary/10 rounded-2xl p-4">
              <h3 className="font-semibold mb-3 text-primary">Administration Guidelines</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Route</p>
                  <p className="font-medium">{drug.administration.route}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Timing</p>
                  <p className="font-medium">{drug.administration.timing}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">With Food</p>
                  <p className="font-medium">{drug.administration.withFood ? 'Yes, recommended' : 'Not required'}</p>
                </div>
              </div>
            </section>

            <section className="bg-info/5 border border-info/10 rounded-2xl p-4">
              <h3 className="font-semibold mb-2 text-info">Why This Way?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{drug.administration.reason}</p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Dosage</h3>
              <p className="text-sm text-muted-foreground">{drug.dosage}</p>
            </section>
          </TabsContent>

          <TabsContent value="effects" className="mt-4 space-y-4">
            <section>
              <h3 className="font-semibold mb-2">Side Effects</h3>
              <div className="flex flex-wrap gap-2">
                {drug.sideEffects.map((effect, i) => (
                  <Badge key={i} variant="secondary">{effect}</Badge>
                ))}
              </div>
            </section>

            <section className="bg-destructive/5 border border-destructive/10 rounded-2xl p-4">
              <h3 className="font-semibold mb-2 text-destructive">Contraindications</h3>
              <ul className="space-y-2">
                {drug.contraindications.map((contra, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{contra}</span>
                  </li>
                ))}
              </ul>
            </section>

            {drug.warnings.length > 0 && (
              <section className="bg-warning/5 border border-warning/10 rounded-2xl p-4">
                <h3 className="font-semibold mb-2 text-warning">Warnings</h3>
                <ul className="space-y-2">
                  {drug.warnings.map((warning, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {warning}</li>
                  ))}
                </ul>
              </section>
            )}
          </TabsContent>

          <TabsContent value="interact" className="mt-4 space-y-3">
            <h3 className="font-semibold">Drug Interactions</h3>
            {drug.interactions.map((interaction, i) => (
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
                  <span className="font-medium">{interaction.drug}</span>
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
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
