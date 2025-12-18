import { useState, useEffect } from 'react';
import { ArrowLeft, Calculator, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useApp } from '@/context/AppContext';

interface CalculatorType {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const calculators: CalculatorType[] = [
  { id: 'dose', name: 'Dose Calculator', icon: '💊', description: 'Calculate medication dosage' },
  { id: 'bmi', name: 'BMI Calculator', icon: '⚖️', description: 'Body Mass Index' },
  { id: 'bsa', name: 'BSA Calculator', icon: '📏', description: 'Body Surface Area' },
  { id: 'creatinine', name: 'CrCl Calculator', icon: '🧪', description: 'Creatinine Clearance' },
  { id: 'conversion', name: 'Unit Converter', icon: '🔄', description: 'Convert between units' },
  { id: 'drip', name: 'IV Drip Rate', icon: '💉', description: 'Calculate IV infusion rate' },
];

export default function CalculatorPage() {
  const navigate = useNavigate();
  const { incrementCalculatorUse, checkAndUnlockAchievements } = useApp();
  const [selectedCalc, setSelectedCalc] = useState<string | null>(null);

  // Track calculator usage for achievements
  useEffect(() => {
    if (selectedCalc) {
      incrementCalculatorUse();
      checkAndUnlockAchievements();
    }
  }, [selectedCalc]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => selectedCalc ? setSelectedCalc(null) : navigate('/')}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Drug Calculator</h1>
            <p className="text-sm text-muted-foreground">Medical calculations</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        {!selectedCalc ? (
          <div className="grid grid-cols-2 gap-3">
            {calculators.map(calc => (
              <button
                key={calc.id}
                onClick={() => setSelectedCalc(calc.id)}
                className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 text-left hover:shadow-md hover:border-primary/30 transition-all"
              >
                <span className="text-3xl mb-3 block">{calc.icon}</span>
                <h3 className="font-semibold text-sm mb-1">{calc.name}</h3>
                <p className="text-xs text-muted-foreground">{calc.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <CalculatorContent type={selectedCalc} />
        )}
      </main>

      <BottomNav />
    </div>
  );
}

function CalculatorContent({ type }: { type: string }) {
  switch (type) {
    case 'dose':
      return <DoseCalculator />;
    case 'bmi':
      return <BMICalculator />;
    case 'bsa':
      return <BSACalculator />;
    case 'creatinine':
      return <CreatinineCalculator />;
    case 'conversion':
      return <UnitConverter />;
    case 'drip':
      return <DripRateCalculator />;
    default:
      return null;
  }
}

function DoseCalculator() {
  const [weight, setWeight] = useState('');
  const [dosePerKg, setDosePerKg] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const d = parseFloat(dosePerKg);
    if (!isNaN(w) && !isNaN(d)) {
      setResult(w * d);
    }
  };

  const reset = () => {
    setWeight('');
    setDosePerKg('');
    setResult(null);
  };

  return (
    <div className="space-y-4">
      <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
        <h3 className="font-semibold mb-1">Dose Calculator</h3>
        <p className="text-sm text-muted-foreground">Calculate total dose based on patient weight</p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium mb-1 block">Patient Weight (kg)</label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
            className="rounded-xl"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Dose (mg/kg)</label>
          <Input
            type="number"
            value={dosePerKg}
            onChange={(e) => setDosePerKg(e.target.value)}
            placeholder="Enter dose per kg"
            className="rounded-xl"
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1 gradient-primary rounded-xl">
            Calculate
          </Button>
          <Button onClick={reset} variant="outline" className="rounded-xl">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-success/5 border border-success/20 rounded-2xl p-4 animate-slide-up">
          <p className="text-sm text-muted-foreground mb-1">Total Dose</p>
          <p className="text-2xl font-bold text-success">{result.toFixed(2)} mg</p>
        </div>
      )}
    </div>
  );
}

function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (!isNaN(w) && !isNaN(h) && h > 0) {
      const bmi = w / (h * h);
      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      setResult({ bmi, category });
    }
  };

  const reset = () => {
    setWeight('');
    setHeight('');
    setResult(null);
  };

  return (
    <div className="space-y-4">
      <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
        <h3 className="font-semibold mb-1">BMI Calculator</h3>
        <p className="text-sm text-muted-foreground">Body Mass Index calculation</p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium mb-1 block">Weight (kg)</label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
            className="rounded-xl"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Height (cm)</label>
          <Input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height"
            className="rounded-xl"
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1 gradient-primary rounded-xl">
            Calculate
          </Button>
          <Button onClick={reset} variant="outline" className="rounded-xl">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {result && (
        <div className="bg-success/5 border border-success/20 rounded-2xl p-4 animate-slide-up">
          <p className="text-sm text-muted-foreground mb-1">BMI</p>
          <p className="text-2xl font-bold text-success">{result.bmi.toFixed(1)}</p>
          <p className="text-sm font-medium mt-2">{result.category}</p>
        </div>
      )}
    </div>
  );
}

function BSACalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (!isNaN(w) && !isNaN(h)) {
      // Mosteller formula
      const bsa = Math.sqrt((h * w) / 3600);
      setResult(bsa);
    }
  };

  const reset = () => {
    setWeight('');
    setHeight('');
    setResult(null);
  };

  return (
    <div className="space-y-4">
      <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
        <h3 className="font-semibold mb-1">BSA Calculator</h3>
        <p className="text-sm text-muted-foreground">Body Surface Area (Mosteller formula)</p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium mb-1 block">Weight (kg)</label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
            className="rounded-xl"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Height (cm)</label>
          <Input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height"
            className="rounded-xl"
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1 gradient-primary rounded-xl">
            Calculate
          </Button>
          <Button onClick={reset} variant="outline" className="rounded-xl">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-success/5 border border-success/20 rounded-2xl p-4 animate-slide-up">
          <p className="text-sm text-muted-foreground mb-1">Body Surface Area</p>
          <p className="text-2xl font-bold text-success">{result.toFixed(2)} m²</p>
        </div>
      )}
    </div>
  );
}

function CreatinineCalculator() {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const cr = parseFloat(creatinine);
    if (!isNaN(a) && !isNaN(w) && !isNaN(cr) && cr > 0) {
      // Cockcroft-Gault formula
      let crcl = ((140 - a) * w) / (72 * cr);
      if (gender === 'female') crcl *= 0.85;
      setResult(crcl);
    }
  };

  const reset = () => {
    setAge('');
    setWeight('');
    setCreatinine('');
    setResult(null);
  };

  return (
    <div className="space-y-4">
      <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
        <h3 className="font-semibold mb-1">Creatinine Clearance</h3>
        <p className="text-sm text-muted-foreground">Cockcroft-Gault equation</p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium mb-1 block">Age (years)</label>
          <Input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
            className="rounded-xl"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Weight (kg)</label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
            className="rounded-xl"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Serum Creatinine (mg/dL)</label>
          <Input
            type="number"
            value={creatinine}
            onChange={(e) => setCreatinine(e.target.value)}
            placeholder="Enter creatinine"
            className="rounded-xl"
            step="0.1"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Gender</label>
          <div className="flex gap-3">
            <button
              onClick={() => setGender('male')}
              className={cn(
                "flex-1 py-2 rounded-xl border-2 transition-all",
                gender === 'male' ? "border-primary bg-primary/10" : "border-border"
              )}
            >
              Male
            </button>
            <button
              onClick={() => setGender('female')}
              className={cn(
                "flex-1 py-2 rounded-xl border-2 transition-all",
                gender === 'female' ? "border-primary bg-primary/10" : "border-border"
              )}
            >
              Female
            </button>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1 gradient-primary rounded-xl">
            Calculate
          </Button>
          <Button onClick={reset} variant="outline" className="rounded-xl">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-success/5 border border-success/20 rounded-2xl p-4 animate-slide-up">
          <p className="text-sm text-muted-foreground mb-1">Creatinine Clearance</p>
          <p className="text-2xl font-bold text-success">{result.toFixed(1)} mL/min</p>
        </div>
      )}
    </div>
  );
}

function UnitConverter() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('mg');
  const [toUnit, setToUnit] = useState('g');
  const [result, setResult] = useState<number | null>(null);

  const conversions: Record<string, number> = {
    'mg': 1,
    'g': 1000,
    'kg': 1000000,
    'mcg': 0.001,
    'mL': 1,
    'L': 1000,
  };

  const calculate = () => {
    const v = parseFloat(value);
    if (!isNaN(v)) {
      const inMg = v * conversions[fromUnit];
      const converted = inMg / conversions[toUnit];
      setResult(converted);
    }
  };

  const reset = () => {
    setValue('');
    setResult(null);
  };

  return (
    <div className="space-y-4">
      <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
        <h3 className="font-semibold mb-1">Unit Converter</h3>
        <p className="text-sm text-muted-foreground">Convert between common units</p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium mb-1 block">Value</label>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium mb-1 block">From</label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mcg">mcg</SelectItem>
                <SelectItem value="mg">mg</SelectItem>
                <SelectItem value="g">g</SelectItem>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="mL">mL</SelectItem>
                <SelectItem value="L">L</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">To</label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mcg">mcg</SelectItem>
                <SelectItem value="mg">mg</SelectItem>
                <SelectItem value="g">g</SelectItem>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="mL">mL</SelectItem>
                <SelectItem value="L">L</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1 gradient-primary rounded-xl">
            Convert
          </Button>
          <Button onClick={reset} variant="outline" className="rounded-xl">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {result !== null && (
        <div className="bg-success/5 border border-success/20 rounded-2xl p-4 animate-slide-up">
          <p className="text-sm text-muted-foreground mb-1">Result</p>
          <p className="text-2xl font-bold text-success">{result.toFixed(4)} {toUnit}</p>
        </div>
      )}
    </div>
  );
}

function DripRateCalculator() {
  const [volume, setVolume] = useState('');
  const [time, setTime] = useState('');
  const [dropFactor, setDropFactor] = useState('20');
  const [result, setResult] = useState<{ drops: number; mlPerHr: number } | null>(null);

  const calculate = () => {
    const v = parseFloat(volume);
    const t = parseFloat(time);
    const df = parseFloat(dropFactor);
    if (!isNaN(v) && !isNaN(t) && !isNaN(df) && t > 0) {
      const mlPerHr = v / t;
      const drops = (v * df) / (t * 60);
      setResult({ drops, mlPerHr });
    }
  };

  const reset = () => {
    setVolume('');
    setTime('');
    setResult(null);
  };

  return (
    <div className="space-y-4">
      <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
        <h3 className="font-semibold mb-1">IV Drip Rate</h3>
        <p className="text-sm text-muted-foreground">Calculate infusion rates</p>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium mb-1 block">Total Volume (mL)</label>
          <Input
            type="number"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            placeholder="Enter volume"
            className="rounded-xl"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Infusion Time (hours)</label>
          <Input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter time"
            className="rounded-xl"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Drop Factor (gtt/mL)</label>
          <Select value={dropFactor} onValueChange={setDropFactor}>
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 gtt/mL (Macro)</SelectItem>
              <SelectItem value="15">15 gtt/mL (Macro)</SelectItem>
              <SelectItem value="20">20 gtt/mL (Macro)</SelectItem>
              <SelectItem value="60">60 gtt/mL (Micro)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3">
          <Button onClick={calculate} className="flex-1 gradient-primary rounded-xl">
            Calculate
          </Button>
          <Button onClick={reset} variant="outline" className="rounded-xl">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {result && (
        <div className="bg-success/5 border border-success/20 rounded-2xl p-4 animate-slide-up space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Drip Rate</p>
            <p className="text-2xl font-bold text-success">{result.drops.toFixed(1)} gtt/min</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Flow Rate</p>
            <p className="text-xl font-bold text-success">{result.mlPerHr.toFixed(1)} mL/hr</p>
          </div>
        </div>
      )}
    </div>
  );
}
