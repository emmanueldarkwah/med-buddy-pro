import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Pill, Skull, HeartCrack, Brain, ShieldAlert, LucideIcon, Syringe, Thermometer, Baby, Clock, Stethoscope, Cigarette, Wine, ChevronDown } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { drugs } from '@/data/drugs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SafetyAlert {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  prevention: string[];
  severity: 'critical' | 'high' | 'warning';
}

export default function SafetyPage() {
  const navigate = useNavigate();
  const dangerousDrugs = drugs.filter(d => d.isDangerous).sort((a, b) => a.name.localeCompare(b.name));

  const safetyAlerts: SafetyAlert[] = [
    {
      icon: Skull,
      title: 'Tramadol Abuse',
      description: 'Commonly abused opioid among youth in Ghana and West Africa',
      details: [
        'Tramadol abuse has reached epidemic levels in parts of West Africa, with high-strength formulations (200-250mg) sold illegally',
        'Causes severe seizures even at therapeutic doses due to lowering seizure threshold',
        'Leads to serotonin syndrome when combined with antidepressants, causing fever, agitation, and potentially death',
        'Respiratory depression can be fatal, especially when combined with alcohol or benzodiazepines',
        'Long-term abuse causes liver damage, kidney failure, and permanent brain changes',
        'Withdrawal symptoms include severe anxiety, insomnia, sweating, tremors, and suicidal thoughts',
        'In Ghana, tramadol is mixed with soft drinks or energy drinks to enhance effects',
        'Sexual performance claims are false and lead to dependency',
      ],
      prevention: [
        'Never use tramadol without a valid prescription',
        'Never exceed prescribed doses (max 400mg/day)',
        'Avoid combining with alcohol, sedatives, or antidepressants',
        'Report suspected illegal tramadol sales to authorities',
        'Seek help immediately if dependent - withdrawal requires medical supervision',
      ],
      severity: 'critical',
    },
    {
      icon: HeartCrack,
      title: 'Codeine & "Purple Drank"',
      description: 'Dangerous recreational misuse of cough syrups',
      details: [
        '"Lean", "purple drank", or "sizzurp" is codeine-promethazine cough syrup mixed with soda and candy',
        'Promethazine enhances codeine effects but also increases respiratory depression risk',
        'Multiple celebrity deaths have been attributed to this practice (DJ Screw, Pimp C, Lil Wayne hospitalized)',
        'Causes extreme drowsiness, slowed heart rate, and respiratory arrest',
        'Chronic use leads to severe dental decay ("lean mouth"), extreme weight gain, and constipation',
        'Withdrawal causes severe flu-like symptoms, insomnia, and depression lasting weeks',
        'Easy access to codeine cough syrups in some countries fuels abuse',
        'Combining with alcohol or other sedatives dramatically increases death risk',
      ],
      prevention: [
        'Cough syrups containing codeine should be sold by prescription only',
        'Pharmacists should monitor purchase patterns',
        'Never use cough medicine recreationally',
        'Educate youth about the real dangers - this is not a harmless high',
        'Seek addiction treatment if dependent',
      ],
      severity: 'critical',
    },
    {
      icon: Skull,
      title: 'Benzodiazepine + Opioid Combination',
      description: 'FDA black box warning - extremely dangerous',
      details: [
        'This combination is responsible for over 30% of opioid overdose deaths',
        'Both drug classes suppress breathing - together they can stop breathing entirely',
        'Risk is highest within first 14 days of starting combination therapy',
        'Even prescribed doses of each can be lethal when combined',
        'Common dangerous combinations: Diazepam + Tramadol, Alprazolam + Codeine',
        'Elderly patients are at highest risk due to slower drug metabolism',
        'Emergency rooms see thousands of combination overdoses yearly',
        'Naloxone (Narcan) can reverse opioid effects but not benzodiazepine effects',
      ],
      prevention: [
        'Healthcare providers should avoid prescribing both classes together',
        'If combination is necessary, use lowest doses and shortest duration',
        'Patients should have naloxone available if using opioids',
        'Never combine these drugs without medical supervision',
        'Educate family members about overdose signs: blue lips, shallow breathing, unresponsive',
      ],
      severity: 'critical',
    },
    {
      icon: Brain,
      title: 'Antibiotic Resistance Crisis',
      description: 'Self-medication creating superbugs',
      details: [
        'Antibiotic resistance is a global health emergency - WHO calls it one of biggest threats',
        'Bacteria evolve to survive antibiotics, creating untreatable "superbugs"',
        'Common in Africa: buying antibiotics without prescription for minor illnesses',
        'Using leftover antibiotics or stopping courses early promotes resistance',
        'MRSA, multi-drug resistant TB, and resistant gonorrhea are already spreading',
        'Simple infections may become fatal when antibiotics no longer work',
        'Resistance spreads between bacteria and across borders',
        'New antibiotics are not being developed fast enough to replace failing ones',
      ],
      prevention: [
        'Only use antibiotics when prescribed by a qualified healthcare provider',
        'Complete the full course even if feeling better',
        'Never share antibiotics or use leftover medications',
        'Don\'t demand antibiotics for viral infections (colds, flu)',
        'Practice good hygiene to prevent infections in the first place',
        'Support policies limiting over-the-counter antibiotic sales',
      ],
      severity: 'critical',
    },
    {
      icon: Pill,
      title: 'Paracetamol (Acetaminophen) Overdose',
      description: 'Leading cause of acute liver failure worldwide',
      details: [
        'Maximum safe dose is 4 grams (4000mg) per day - many people unknowingly exceed this',
        'Liver damage begins at doses as low as 6-7 grams in some individuals',
        'HIDDEN DANGER: Paracetamol is in 600+ products including cold medicines, sleep aids, and prescription painkillers',
        'Initial overdose symptoms are mild (nausea, fatigue) - by the time jaundice appears, liver damage is severe',
        'Liver failure from overdose develops over 3-5 days and can require transplant or cause death',
        'Chronic alcohol users are at much higher risk - even 3-4 grams can be dangerous',
        'Children are particularly vulnerable to dosing errors',
        'N-acetylcysteine (NAC) is an effective antidote but must be given within 8-10 hours',
      ],
      prevention: [
        'Always read labels - add up ALL sources of paracetamol/acetaminophen',
        'Never exceed 4 grams daily from all products combined',
        'Avoid in heavy alcohol users or use reduced doses',
        'Use weight-based dosing for children',
        'Keep medicines in original packaging to check ingredients',
        'Seek immediate help if overdose suspected - don\'t wait for symptoms',
      ],
      severity: 'critical',
    },
    {
      icon: AlertTriangle,
      title: 'NSAID Overuse Syndrome',
      description: 'Ibuprofen, Diclofenac - hidden dangers of common painkillers',
      details: [
        'NSAIDs are the most commonly used medications worldwide - often without understanding risks',
        'Stomach ulcers and GI bleeding affect 1-4% of chronic NSAID users yearly',
        'Kidney damage is common with prolonged use, especially in elderly or dehydrated patients',
        'Cardiovascular risk increases significantly - diclofenac carries highest heart attack risk',
        'NSAIDs can worsen asthma in sensitive individuals',
        'Can cause severe allergic reactions including anaphylaxis',
        'Interactions with blood thinners dramatically increase bleeding risk',
        'Topical NSAIDs are absorbed and can cause same systemic effects',
      ],
      prevention: [
        'Use lowest effective dose for shortest time possible',
        'Always take with food to protect stomach',
        'Stay well hydrated, especially in hot weather',
        'Avoid in kidney disease, heart disease, or history of ulcers',
        'Don\'t combine different NSAIDs',
        'Consider safer alternatives like paracetamol for long-term pain',
      ],
      severity: 'high',
    },
    {
      icon: Syringe,
      title: 'Injection Drug Dangers',
      description: 'Life-threatening risks from improper injections',
      details: [
        'Reusing needles spreads HIV, Hepatitis B, and Hepatitis C',
        'Abscesses and cellulitis from unsterile technique require hospitalization',
        'Injecting oral medications or crushed tablets can cause pulmonary embolism',
        'Street drugs may contain fatal contaminants or fentanyl',
        'Venous damage leads to collapsed veins and chronic wounds',
        'Endocarditis (heart valve infection) is common in injection drug users',
        'Septicemia (blood poisoning) can be rapidly fatal',
        'Nerve damage from improper technique causes permanent disability',
      ],
      prevention: [
        'Never inject medications not intended for injection',
        'Never share needles, syringes, or drug preparation equipment',
        'Access harm reduction programs for clean supplies',
        'Seek addiction treatment - multiple effective options exist',
        'Know where naloxone is available for opioid overdose',
      ],
      severity: 'critical',
    },
    {
      icon: Brain,
      title: 'Steroid Abuse',
      description: 'Dangerous misuse of corticosteroids and anabolic steroids',
      details: [
        'Anabolic steroids for muscle building cause liver tumors, heart enlargement, and hormonal chaos',
        'Men experience testicular shrinkage, infertility, and breast development',
        'Women develop masculine features, voice deepening, and menstrual problems',
        'Teenagers risk permanently stunted growth',
        '"Roid rage" - severe mood swings and aggression - damages relationships and careers',
        'Corticosteroid abuse for skin lightening causes thin skin, stretch marks, and adrenal suppression',
        'Sudden stopping after long use causes life-threatening adrenal crisis',
        'Counterfeit products may contain dangerous contaminants',
      ],
      prevention: [
        'Never use anabolic steroids without legitimate medical prescription',
        'Achieve fitness goals through proper nutrition and training',
        'Don\'t use corticosteroids for cosmetic purposes',
        'If prescribed steroids, follow tapering instructions exactly',
        'Report side effects to healthcare provider immediately',
      ],
      severity: 'high',
    },
    {
      icon: Wine,
      title: 'Alcohol-Medication Interactions',
      description: 'Dangerous combinations with common medicines',
      details: [
        'Alcohol with paracetamol dramatically increases liver damage risk',
        'Alcohol with sedatives/sleeping pills causes respiratory depression and death',
        'Alcohol with diabetes medications causes severe, prolonged hypoglycemia',
        'Alcohol with metronidazole causes severe vomiting, headache, flushing (disulfiram reaction)',
        'Alcohol with blood thinners increases bleeding risk',
        'Alcohol with antidepressants worsens depression and increases sedation',
        'Alcohol with blood pressure medications causes dangerous hypotension',
        'Even moderate alcohol can significantly alter drug metabolism',
      ],
      prevention: [
        'Always ask pharmacist about alcohol interactions',
        'Read medication labels - many warn against alcohol',
        'When in doubt, avoid alcohol while taking medications',
        'Be especially careful with new medications',
        'Remember that effects may last longer than you expect',
      ],
      severity: 'high',
    },
    {
      icon: Clock,
      title: 'Expired Medication Dangers',
      description: 'Hidden risks of using old medicines',
      details: [
        'Expired tetracyclines can cause Fanconi syndrome - severe kidney damage',
        'Insulin loses potency and may not control blood sugar adequately',
        'Nitroglycerin for heart attacks becomes ineffective - this can be fatal',
        'Liquid medications degrade faster than tablets',
        'Eye drops can become contaminated and cause serious infections',
        'Epinephrine (EpiPen) for allergic reactions loses effectiveness',
        'Some medications become more concentrated as liquid evaporates',
        'Proper storage conditions affect stability significantly',
      ],
      prevention: [
        'Check expiry dates regularly and dispose of expired medications',
        'Store medications properly - many require cool, dry conditions',
        'Don\'t stockpile medications "just in case"',
        'Return expired medications to pharmacy for proper disposal',
        'Never use expired critical medications (insulin, nitroglycerin, epinephrine)',
      ],
      severity: 'high',
    },
    {
      icon: Baby,
      title: 'Medication Safety in Pregnancy',
      description: 'Drugs that can harm unborn babies',
      details: [
        'Many common drugs cause birth defects, especially in first trimester',
        'Isotretinoin (acne medication) causes severe facial and heart defects',
        'Valproic acid (seizure medication) causes neural tube defects and developmental delays',
        'ACE inhibitors cause kidney problems and skull defects in fetuses',
        'NSAIDs in third trimester can close a vital heart vessel prematurely',
        'Warfarin causes facial abnormalities and brain hemorrhage',
        'Some herbal supplements are dangerous in pregnancy',
        'Men taking certain medications can also affect fetal development',
      ],
      prevention: [
        'Inform all healthcare providers if pregnant or planning pregnancy',
        'Don\'t stop prescription medications without medical advice',
        'Review all medications with doctor before conceiving',
        'Avoid herbal supplements unless approved by healthcare provider',
        'Take folic acid before and during pregnancy to prevent defects',
      ],
      severity: 'critical',
    },
    {
      icon: Thermometer,
      title: 'Counterfeit Medication Crisis',
      description: 'Fake drugs killing thousands annually',
      details: [
        'WHO estimates 10% of medications globally are counterfeit - up to 30% in some developing countries',
        'Fake antimalarials have contributed to hundreds of thousands of deaths',
        'Counterfeit antibiotics contain no active ingredient or wrong doses',
        'Fake cancer medications give false hope while disease progresses',
        'Counterfeit erectile dysfunction drugs have caused heart attacks and strokes',
        'Online pharmacies are major sources of counterfeit medications',
        'Sophisticated packaging makes detection difficult',
        'Substandard vaccines have caused disease outbreaks',
      ],
      prevention: [
        'Only buy medications from licensed pharmacies',
        'Be suspicious of prices that seem too good to be true',
        'Check packaging carefully for spelling errors or poor quality',
        'Verify online pharmacies through regulatory authorities',
        'Report suspected counterfeit medications to health authorities',
      ],
      severity: 'critical',
    },
    {
      icon: AlertTriangle,
      title: 'Sharing Prescription Medications',
      description: 'What helps one person may kill another',
      details: [
        'Doses are calculated based on individual factors - weight, age, kidney function',
        'Hidden allergies can cause fatal anaphylaxis with first dose',
        'Drug interactions depend on other medications the person takes',
        'Sharing controlled substances is illegal and dangerous',
        'Conditions that look similar may require completely different treatments',
        'Sharing masks symptoms and delays proper diagnosis',
        'Antibiotic sharing promotes resistance',
        'Children require special formulations and doses - adult medications can be fatal',
      ],
      prevention: [
        'Never share prescription medications - even with family members',
        'If someone needs medication, encourage them to see a healthcare provider',
        'Keep medications secured and out of reach of others',
        'Dispose of unused medications properly',
        'Educate others about the dangers of medication sharing',
      ],
      severity: 'high',
    },
    {
      icon: Cigarette,
      title: 'Smoking and Medication Interactions',
      description: 'Tobacco affects how drugs work in your body',
      details: [
        'Smoking increases metabolism of many medications, reducing their effectiveness',
        'Theophylline for asthma requires 50-100% higher doses in smokers',
        'Olanzapine and clozapine levels are much lower in smokers',
        'Insulin requirements are higher in diabetic smokers',
        'Combining smoking with birth control pills dramatically increases blood clot risk',
        'When quitting smoking, medication doses may need adjustment',
        'Passive smoking can also affect drug metabolism in non-smokers',
        'Smoking cessation aids have their own interactions to consider',
      ],
      prevention: [
        'Always tell healthcare providers about smoking status',
        'When quitting smoking, inform providers so doses can be adjusted',
        'Women who smoke should consider non-hormonal contraception',
        'Get support for smoking cessation - many effective treatments exist',
      ],
      severity: 'warning',
    },
    {
      icon: Stethoscope,
      title: 'Polypharmacy in Elderly',
      description: 'Multiple medications creating cascade of problems',
      details: [
        'Elderly patients often take 5-10+ medications daily',
        'Drug interactions multiply exponentially with each additional medication',
        'Falls and fractures are commonly caused by medication side effects',
        'Confusion attributed to "old age" is often medication-induced',
        'Kidney and liver function decline with age, affecting drug metabolism',
        'Beers Criteria lists medications to avoid in elderly',
        'Each new symptom may be treated with another drug, creating a cascade',
        'Medication non-adherence is common when regimens are complex',
      ],
      prevention: [
        'Regular medication reviews with pharmacist or doctor',
        'Use pill organizers and medication lists',
        'Report any new symptoms - they may be drug side effects',
        'Ask if each medication is still necessary',
        'Consider non-drug treatments where possible',
        'Use one pharmacy for all medications to catch interactions',
      ],
      severity: 'high',
    },
  ];

  const getSeverityStyles = (severity: SafetyAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'border-destructive/30 bg-destructive/5';
      case 'high':
        return 'border-warning/30 bg-warning/5';
      case 'warning':
        return 'border-info/30 bg-info/5';
    }
  };

  const getSeverityBadge = (severity: SafetyAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive text-destructive-foreground';
      case 'high':
        return 'bg-warning text-warning-foreground';
      case 'warning':
        return 'bg-info text-info-foreground';
    }
  };

  const getSeverityIconBg = (severity: SafetyAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive/20 text-destructive';
      case 'high':
        return 'bg-warning/20 text-warning';
      case 'warning':
        return 'bg-info/20 text-info';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-destructive text-destructive-foreground px-4 pt-12 pb-6 rounded-b-[2rem]">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6" />
            <h1 className="text-xl font-bold">Safety Awareness</h1>
          </div>
        </div>
        <p className="text-sm opacity-90">Learn about medication safety, drug abuse, and dangerous practices</p>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* High-Alert Medications */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">High-Alert Medications</h2>
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-destructive/20 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-destructive">Drugs Requiring Extra Caution</h3>
                <p className="text-xs text-muted-foreground">Tap to learn more about each medication</p>
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

        {/* Safety Alerts with Accordions */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Drug Abuse & Safety Concerns</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {safetyAlerts.map((alert, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={`rounded-2xl border ${getSeverityStyles(alert.severity)} overflow-hidden`}
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className={`p-2 rounded-xl ${getSeverityIconBg(alert.severity)}`}>
                      <alert.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-semibold text-foreground">{alert.title}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${getSeverityBadge(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-4 pt-2">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Key Facts & Dangers</h4>
                      <ul className="space-y-2">
                        {alert.details.map((detail, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex gap-2">
                            <span className="text-destructive mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-primary" />
                        Prevention & Safety Tips
                      </h4>
                      <ul className="space-y-2">
                        {alert.prevention.map((tip, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
