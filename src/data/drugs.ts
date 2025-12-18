export interface Drug {
  id: string;
  name: string;
  genericName: string;
  brandNames: string[];
  class: string;
  category: string;
  uses: string[];
  mechanism: string;
  dosage: string;
  administration: {
    route: string;
    timing: string;
    withFood: boolean;
    reason: string;
  };
  sideEffects: string[];
  contraindications: string[];
  interactions: {
    drug: string;
    severity: 'mild' | 'moderate' | 'severe';
    effect: string;
  }[];
  warnings: string[];
  isDangerous: boolean;
  halfLife: string;
  onsetOfAction: string;
}

export const drugs: Drug[] = [
  {
    id: "1",
    name: "Metformin",
    genericName: "Metformin Hydrochloride",
    brandNames: ["Glucophage", "Fortamet", "Riomet"],
    class: "Biguanides",
    category: "Antidiabetic",
    uses: [
      "Type 2 Diabetes Mellitus",
      "Polycystic Ovary Syndrome (off-label)",
      "Prediabetes prevention"
    ],
    mechanism: "Decreases hepatic glucose production, decreases intestinal absorption of glucose, and improves insulin sensitivity by increasing peripheral glucose uptake and utilization.",
    dosage: "500mg-2000mg daily in divided doses",
    administration: {
      route: "Oral",
      timing: "With meals, usually twice daily",
      withFood: true,
      reason: "Taking with food reduces GI side effects like nausea and diarrhea. The extended-release form should be taken with evening meal."
    },
    sideEffects: ["Nausea", "Diarrhea", "Abdominal discomfort", "Metallic taste", "Vitamin B12 deficiency"],
    contraindications: ["Severe renal impairment (eGFR <30)", "Metabolic acidosis", "Diabetic ketoacidosis"],
    interactions: [
      { drug: "Contrast dye", severity: "severe", effect: "Risk of lactic acidosis - stop 48h before procedures" },
      { drug: "Alcohol", severity: "moderate", effect: "Increased risk of lactic acidosis and hypoglycemia" },
      { drug: "Cimetidine", severity: "moderate", effect: "Increases metformin plasma concentration" }
    ],
    warnings: ["Risk of lactic acidosis", "Monitor renal function regularly"],
    isDangerous: false,
    halfLife: "4-8.7 hours",
    onsetOfAction: "2-4 weeks for full effect"
  },
  {
    id: "2",
    name: "Warfarin",
    genericName: "Warfarin Sodium",
    brandNames: ["Coumadin", "Jantoven"],
    class: "Vitamin K Antagonists",
    category: "Anticoagulant",
    uses: [
      "Prevention and treatment of venous thromboembolism",
      "Prevention of stroke in atrial fibrillation",
      "Mechanical heart valve thromboprophylaxis"
    ],
    mechanism: "Inhibits vitamin K epoxide reductase, preventing the synthesis of vitamin K-dependent clotting factors (II, VII, IX, X) and proteins C and S.",
    dosage: "Individualized based on INR, typically 2-10mg daily",
    administration: {
      route: "Oral",
      timing: "Once daily at the same time each day",
      withFood: false,
      reason: "Consistent timing ensures stable anticoagulation. Food with high vitamin K content can reduce effectiveness."
    },
    sideEffects: ["Bleeding", "Bruising", "Hair loss", "Purple toe syndrome"],
    contraindications: ["Active bleeding", "Pregnancy", "Severe liver disease", "Recent surgery"],
    interactions: [
      { drug: "Aspirin", severity: "severe", effect: "Greatly increased bleeding risk" },
      { drug: "Vitamin K foods", severity: "moderate", effect: "Reduces anticoagulant effect" },
      { drug: "NSAIDs", severity: "severe", effect: "Increased bleeding risk and GI ulceration" },
      { drug: "Antibiotics", severity: "moderate", effect: "Many antibiotics alter warfarin metabolism" }
    ],
    warnings: ["Requires regular INR monitoring", "Narrow therapeutic index", "Many drug and food interactions"],
    isDangerous: true,
    halfLife: "20-60 hours",
    onsetOfAction: "2-7 days"
  },
  {
    id: "3",
    name: "Lisinopril",
    genericName: "Lisinopril",
    brandNames: ["Prinivil", "Zestril"],
    class: "ACE Inhibitors",
    category: "Antihypertensive",
    uses: [
      "Hypertension",
      "Heart failure",
      "Post-myocardial infarction",
      "Diabetic nephropathy"
    ],
    mechanism: "Inhibits angiotensin-converting enzyme (ACE), preventing conversion of angiotensin I to angiotensin II, resulting in vasodilation and reduced aldosterone secretion.",
    dosage: "5-40mg once daily",
    administration: {
      route: "Oral",
      timing: "Once daily, any time of day",
      withFood: false,
      reason: "Can be taken with or without food. Some prefer bedtime dosing as blood pressure naturally dips at night."
    },
    sideEffects: ["Dry cough", "Dizziness", "Hyperkalemia", "Angioedema (rare but serious)"],
    contraindications: ["History of ACE inhibitor angioedema", "Bilateral renal artery stenosis", "Pregnancy"],
    interactions: [
      { drug: "Potassium supplements", severity: "moderate", effect: "Risk of hyperkalemia" },
      { drug: "NSAIDs", severity: "moderate", effect: "Reduced antihypertensive effect and renal function" },
      { drug: "Lithium", severity: "moderate", effect: "Increased lithium levels" }
    ],
    warnings: ["Monitor potassium and renal function", "Risk of angioedema"],
    isDangerous: false,
    halfLife: "12 hours",
    onsetOfAction: "1-2 hours"
  },
  {
    id: "4",
    name: "Digoxin",
    genericName: "Digoxin",
    brandNames: ["Lanoxin", "Digitek"],
    class: "Cardiac Glycosides",
    category: "Antiarrhythmic/Inotrope",
    uses: [
      "Heart failure with reduced ejection fraction",
      "Atrial fibrillation rate control"
    ],
    mechanism: "Inhibits Na+/K+-ATPase pump, increasing intracellular calcium and cardiac contractility. Also increases vagal tone, slowing AV node conduction.",
    dosage: "0.125-0.25mg once daily",
    administration: {
      route: "Oral or IV",
      timing: "Once daily, same time each day",
      withFood: false,
      reason: "High-fiber foods may reduce absorption. Consistent timing helps maintain therapeutic levels."
    },
    sideEffects: ["Nausea", "Visual disturbances (yellow-green halos)", "Arrhythmias", "Confusion"],
    contraindications: ["Ventricular fibrillation", "Hypertrophic cardiomyopathy with outflow obstruction"],
    interactions: [
      { drug: "Amiodarone", severity: "severe", effect: "Increases digoxin levels significantly" },
      { drug: "Verapamil", severity: "severe", effect: "Increases digoxin levels and AV block risk" },
      { drug: "Diuretics", severity: "moderate", effect: "Hypokalemia increases digoxin toxicity risk" }
    ],
    warnings: ["Narrow therapeutic index", "Monitor levels and electrolytes", "Signs of toxicity can be subtle"],
    isDangerous: true,
    halfLife: "36-48 hours",
    onsetOfAction: "0.5-2 hours (oral)"
  },
  {
    id: "5",
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    brandNames: ["Amoxil", "Trimox"],
    class: "Aminopenicillins",
    category: "Antibiotic",
    uses: [
      "Respiratory tract infections",
      "Urinary tract infections",
      "H. pylori eradication",
      "Dental infections"
    ],
    mechanism: "Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins, leading to cell lysis and death.",
    dosage: "250-500mg every 8 hours or 500-875mg every 12 hours",
    administration: {
      route: "Oral",
      timing: "Every 8 or 12 hours to maintain consistent blood levels",
      withFood: false,
      reason: "Can be taken with or without food. Even spacing maintains consistent antibiotic levels for effectiveness."
    },
    sideEffects: ["Diarrhea", "Nausea", "Rash", "Allergic reactions"],
    contraindications: ["Penicillin allergy", "History of amoxicillin-associated cholestatic jaundice"],
    interactions: [
      { drug: "Methotrexate", severity: "moderate", effect: "Reduced methotrexate clearance" },
      { drug: "Warfarin", severity: "moderate", effect: "May increase INR" },
      { drug: "Oral contraceptives", severity: "mild", effect: "Possible reduced contraceptive efficacy" }
    ],
    warnings: ["Complete full course", "Watch for allergic reactions"],
    isDangerous: false,
    halfLife: "1-1.5 hours",
    onsetOfAction: "1-2 hours"
  },
  {
    id: "6",
    name: "Morphine",
    genericName: "Morphine Sulfate",
    brandNames: ["MS Contin", "Roxanol", "Kadian"],
    class: "Opioid Agonists",
    category: "Analgesic",
    uses: [
      "Severe pain",
      "Acute myocardial infarction pain",
      "Dyspnea in palliative care",
      "Post-surgical pain"
    ],
    mechanism: "Binds to mu-opioid receptors in the CNS and peripheral tissues, inhibiting ascending pain pathways and altering pain perception.",
    dosage: "Highly individualized based on pain severity and tolerance",
    administration: {
      route: "Oral, IV, IM, SC, Epidural",
      timing: "Around the clock for chronic pain, as needed for breakthrough",
      withFood: true,
      reason: "Taking with food reduces nausea. Extended-release forms should not be crushed or chewed."
    },
    sideEffects: ["Respiratory depression", "Constipation", "Nausea", "Sedation", "Dependence"],
    contraindications: ["Respiratory depression", "Acute alcoholism", "Paralytic ileus", "MAO inhibitor use"],
    interactions: [
      { drug: "Benzodiazepines", severity: "severe", effect: "Profound sedation and respiratory depression" },
      { drug: "Alcohol", severity: "severe", effect: "Enhanced CNS depression, respiratory arrest risk" },
      { drug: "MAO inhibitors", severity: "severe", effect: "Serotonin syndrome, severe reactions" }
    ],
    warnings: ["High abuse potential - Schedule II", "Respiratory depression risk", "Requires naloxone availability"],
    isDangerous: true,
    halfLife: "2-4 hours",
    onsetOfAction: "15-60 minutes (oral)"
  },
  {
    id: "7",
    name: "Atorvastatin",
    genericName: "Atorvastatin Calcium",
    brandNames: ["Lipitor"],
    class: "HMG-CoA Reductase Inhibitors (Statins)",
    category: "Antihyperlipidemic",
    uses: [
      "Hypercholesterolemia",
      "Prevention of cardiovascular disease",
      "Familial hypercholesterolemia"
    ],
    mechanism: "Inhibits HMG-CoA reductase, the rate-limiting enzyme in cholesterol biosynthesis, leading to upregulation of LDL receptors and increased LDL clearance.",
    dosage: "10-80mg once daily",
    administration: {
      route: "Oral",
      timing: "Once daily, evening preferred but any time is acceptable",
      withFood: false,
      reason: "Atorvastatin can be taken any time of day unlike some statins, as it has a long half-life."
    },
    sideEffects: ["Myalgia", "Elevated liver enzymes", "GI upset", "Rhabdomyolysis (rare)"],
    contraindications: ["Active liver disease", "Pregnancy", "Breastfeeding"],
    interactions: [
      { drug: "Grapefruit juice", severity: "moderate", effect: "Increases statin levels and toxicity risk" },
      { drug: "Gemfibrozil", severity: "severe", effect: "Greatly increased myopathy risk" },
      { drug: "Cyclosporine", severity: "severe", effect: "Increased atorvastatin levels" }
    ],
    warnings: ["Monitor liver function", "Report muscle pain immediately"],
    isDangerous: false,
    halfLife: "14 hours",
    onsetOfAction: "2 weeks for lipid changes"
  },
  {
    id: "8",
    name: "Insulin Glargine",
    genericName: "Insulin Glargine",
    brandNames: ["Lantus", "Basaglar", "Toujeo"],
    class: "Long-acting Insulin Analogues",
    category: "Antidiabetic",
    uses: [
      "Type 1 Diabetes Mellitus",
      "Type 2 Diabetes Mellitus"
    ],
    mechanism: "Binds to insulin receptors, facilitating glucose uptake into cells, inhibiting hepatic glucose production, and promoting glycogen synthesis.",
    dosage: "Individualized based on blood glucose, typically starting 10 units daily",
    administration: {
      route: "Subcutaneous injection",
      timing: "Once daily at the same time each day",
      withFood: false,
      reason: "Provides 24-hour basal insulin coverage. Must be injected, not taken orally. Never mix with other insulins."
    },
    sideEffects: ["Hypoglycemia", "Injection site reactions", "Weight gain", "Lipodystrophy"],
    contraindications: ["Hypoglycemia", "Hypersensitivity to insulin glargine"],
    interactions: [
      { drug: "Beta-blockers", severity: "moderate", effect: "May mask hypoglycemia symptoms" },
      { drug: "Thiazolidinediones", severity: "moderate", effect: "Increased fluid retention and heart failure risk" },
      { drug: "Alcohol", severity: "moderate", effect: "Can cause hypoglycemia or hyperglycemia" }
    ],
    warnings: ["Never share injection pens", "Rotate injection sites", "Do not use if cloudy"],
    isDangerous: true,
    halfLife: "No pronounced peak, ~24 hour duration",
    onsetOfAction: "1-2 hours"
  },
  {
    id: "9",
    name: "Tramadol",
    genericName: "Tramadol Hydrochloride",
    brandNames: ["Ultram", "ConZip", "Tramal"],
    class: "Opioid Agonists (Atypical)",
    category: "Analgesic",
    uses: [
      "Moderate to moderately severe pain",
      "Chronic pain management",
      "Post-operative pain"
    ],
    mechanism: "Weak mu-opioid receptor agonist and inhibits reuptake of norepinephrine and serotonin, providing dual analgesic mechanism.",
    dosage: "50-100mg every 4-6 hours, max 400mg/day",
    administration: {
      route: "Oral",
      timing: "Every 4-6 hours as needed",
      withFood: false,
      reason: "Can be taken with or without food. Extended-release should be swallowed whole."
    },
    sideEffects: ["Nausea", "Dizziness", "Constipation", "Seizures", "Serotonin syndrome"],
    contraindications: ["Seizure disorders", "MAO inhibitor use", "Acute intoxication"],
    interactions: [
      { drug: "SSRIs/SNRIs", severity: "severe", effect: "Risk of serotonin syndrome and seizures" },
      { drug: "MAO inhibitors", severity: "severe", effect: "Serotonin syndrome" },
      { drug: "Carbamazepine", severity: "moderate", effect: "Reduces tramadol effectiveness" }
    ],
    warnings: ["High abuse potential - Schedule IV", "Seizure risk especially at high doses", "Commonly abused in West Africa"],
    isDangerous: true,
    halfLife: "6-7 hours",
    onsetOfAction: "1 hour"
  },
  {
    id: "10",
    name: "Omeprazole",
    genericName: "Omeprazole",
    brandNames: ["Prilosec", "Losec"],
    class: "Proton Pump Inhibitors",
    category: "Gastrointestinal",
    uses: [
      "Gastroesophageal reflux disease (GERD)",
      "Peptic ulcer disease",
      "H. pylori eradication",
      "Zollinger-Ellison syndrome"
    ],
    mechanism: "Irreversibly inhibits hydrogen-potassium ATPase (proton pump) in gastric parietal cells, blocking the final step of acid secretion.",
    dosage: "20-40mg once or twice daily",
    administration: {
      route: "Oral",
      timing: "30-60 minutes before meals, preferably morning",
      withFood: false,
      reason: "Best taken on empty stomach before eating to allow drug to reach parietal cells before they are stimulated by food."
    },
    sideEffects: ["Headache", "Diarrhea", "Vitamin B12 deficiency", "Hypomagnesemia", "Increased fracture risk"],
    contraindications: ["Hypersensitivity to PPIs", "Concurrent rilpivirine use"],
    interactions: [
      { drug: "Clopidogrel", severity: "moderate", effect: "Reduces clopidogrel activation and effectiveness" },
      { drug: "Methotrexate", severity: "moderate", effect: "Increased methotrexate levels and toxicity" },
      { drug: "Ketoconazole", severity: "moderate", effect: "Reduced ketoconazole absorption" }
    ],
    warnings: ["Long-term use associated with bone fractures", "C. difficile infection risk", "Rebound acid hypersecretion on discontinuation"],
    isDangerous: false,
    halfLife: "0.5-1 hour (but effect lasts 24+ hours)",
    onsetOfAction: "1-2 hours, max effect in 1-4 days"
  },
  {
    id: "11",
    name: "Amlodipine",
    genericName: "Amlodipine Besylate",
    brandNames: ["Norvasc", "Istin"],
    class: "Calcium Channel Blockers (Dihydropyridine)",
    category: "Antihypertensive",
    uses: [
      "Hypertension",
      "Chronic stable angina",
      "Vasospastic angina"
    ],
    mechanism: "Inhibits calcium ion influx through L-type calcium channels in vascular smooth muscle and cardiac muscle, causing vasodilation.",
    dosage: "2.5-10mg once daily",
    administration: {
      route: "Oral",
      timing: "Once daily, any time",
      withFood: false,
      reason: "Can be taken with or without food. Long half-life allows flexible timing."
    },
    sideEffects: ["Peripheral edema", "Headache", "Flushing", "Dizziness", "Palpitations"],
    contraindications: ["Severe aortic stenosis", "Cardiogenic shock", "Unstable angina"],
    interactions: [
      { drug: "Simvastatin", severity: "moderate", effect: "Increased simvastatin levels - limit dose to 20mg" },
      { drug: "CYP3A4 inhibitors", severity: "moderate", effect: "Increased amlodipine levels" },
      { drug: "Cyclosporine", severity: "moderate", effect: "Increased cyclosporine levels" }
    ],
    warnings: ["Ankle swelling common", "May worsen angina on initiation"],
    isDangerous: false,
    halfLife: "30-50 hours",
    onsetOfAction: "6-12 hours"
  },
  {
    id: "12",
    name: "Ciprofloxacin",
    genericName: "Ciprofloxacin Hydrochloride",
    brandNames: ["Cipro", "Ciproxin"],
    class: "Fluoroquinolones",
    category: "Antibiotic",
    uses: [
      "Urinary tract infections",
      "Respiratory tract infections",
      "Skin and soft tissue infections",
      "Typhoid fever"
    ],
    mechanism: "Inhibits bacterial DNA gyrase and topoisomerase IV, preventing DNA replication and transcription.",
    dosage: "250-750mg every 12 hours",
    administration: {
      route: "Oral or IV",
      timing: "Every 12 hours, 2 hours before or 6 hours after antacids",
      withFood: false,
      reason: "Avoid dairy products and antacids which chelate the drug and reduce absorption significantly."
    },
    sideEffects: ["Nausea", "Diarrhea", "Tendinitis/tendon rupture", "CNS effects", "QT prolongation"],
    contraindications: ["History of tendon disorders with fluoroquinolones", "Myasthenia gravis"],
    interactions: [
      { drug: "Antacids/Iron/Calcium", severity: "moderate", effect: "Drastically reduced absorption - separate by 2-6 hours" },
      { drug: "Theophylline", severity: "severe", effect: "Increased theophylline levels and toxicity" },
      { drug: "Warfarin", severity: "moderate", effect: "Increased INR and bleeding risk" }
    ],
    warnings: ["Black box warning for tendinitis", "Avoid in children unless necessary", "May cause peripheral neuropathy"],
    isDangerous: false,
    halfLife: "4-5 hours",
    onsetOfAction: "1-2 hours"
  },
  {
    id: "13",
    name: "Metoprolol",
    genericName: "Metoprolol Tartrate/Succinate",
    brandNames: ["Lopressor", "Toprol-XL", "Betaloc"],
    class: "Beta-1 Selective Blockers",
    category: "Antihypertensive/Antiarrhythmic",
    uses: [
      "Hypertension",
      "Angina pectoris",
      "Heart failure",
      "Post-myocardial infarction",
      "Atrial fibrillation rate control"
    ],
    mechanism: "Selectively blocks beta-1 adrenergic receptors in the heart, reducing heart rate, contractility, and blood pressure.",
    dosage: "25-200mg daily (immediate-release: 2-3 times daily; extended-release: once daily)",
    administration: {
      route: "Oral or IV",
      timing: "With or immediately after meals for immediate-release",
      withFood: true,
      reason: "Food enhances absorption of immediate-release metoprolol. Extended-release can be taken without regard to food."
    },
    sideEffects: ["Bradycardia", "Fatigue", "Cold extremities", "Depression", "Erectile dysfunction"],
    contraindications: ["Severe bradycardia", "Heart block greater than first degree", "Cardiogenic shock", "Decompensated heart failure"],
    interactions: [
      { drug: "Verapamil/Diltiazem", severity: "severe", effect: "Risk of severe bradycardia and heart block" },
      { drug: "Clonidine", severity: "moderate", effect: "Rebound hypertension if clonidine stopped" },
      { drug: "MAO inhibitors", severity: "moderate", effect: "Possible hypertensive crisis" }
    ],
    warnings: ["Do not stop abruptly - taper gradually", "May mask hypoglycemia symptoms", "Use caution in asthma/COPD"],
    isDangerous: false,
    halfLife: "3-7 hours",
    onsetOfAction: "1-2 hours (oral)"
  },
  {
    id: "14",
    name: "Prednisone",
    genericName: "Prednisone",
    brandNames: ["Deltasone", "Rayos", "Sterapred"],
    class: "Glucocorticoids",
    category: "Anti-inflammatory/Immunosuppressant",
    uses: [
      "Inflammatory conditions",
      "Autoimmune diseases",
      "Allergic reactions",
      "Asthma exacerbations",
      "Transplant rejection prevention"
    ],
    mechanism: "Binds to glucocorticoid receptors, modulating gene expression to reduce inflammation and suppress immune responses.",
    dosage: "Highly variable: 5-60mg daily depending on indication",
    administration: {
      route: "Oral",
      timing: "Usually morning to mimic natural cortisol rhythm",
      withFood: true,
      reason: "Taking with food reduces GI irritation. Morning dosing reduces insomnia and mimics natural cortisol secretion."
    },
    sideEffects: ["Weight gain", "Hyperglycemia", "Osteoporosis", "Adrenal suppression", "Mood changes", "Cushingoid features"],
    contraindications: ["Systemic fungal infections", "Live vaccines during high-dose therapy"],
    interactions: [
      { drug: "NSAIDs", severity: "moderate", effect: "Increased GI bleeding risk" },
      { drug: "Warfarin", severity: "moderate", effect: "Variable effects on INR" },
      { drug: "Diabetes medications", severity: "moderate", effect: "Increased blood glucose - may need dose adjustment" }
    ],
    warnings: ["Taper slowly after prolonged use", "Increased infection risk", "Can mask signs of infection"],
    isDangerous: false,
    halfLife: "2-3 hours (but biological effects last 18-36 hours)",
    onsetOfAction: "1-2 hours"
  },
  {
    id: "15",
    name: "Furosemide",
    genericName: "Furosemide",
    brandNames: ["Lasix", "Frusol"],
    class: "Loop Diuretics",
    category: "Diuretic",
    uses: [
      "Edema (heart failure, liver cirrhosis, renal disease)",
      "Hypertension",
      "Acute pulmonary edema",
      "Hypercalcemia"
    ],
    mechanism: "Inhibits sodium-potassium-chloride cotransporter (NKCC2) in the thick ascending loop of Henle, causing profound diuresis.",
    dosage: "20-80mg once or twice daily, up to 600mg in severe cases",
    administration: {
      route: "Oral or IV",
      timing: "Morning to avoid nocturia, or morning and early afternoon if twice daily",
      withFood: false,
      reason: "Can be taken with or without food. Food may slow absorption but total absorption unchanged."
    },
    sideEffects: ["Hypokalemia", "Hyponatremia", "Dehydration", "Ototoxicity", "Hyperuricemia"],
    contraindications: ["Anuria", "Severe hypovolemia", "Sulfonamide allergy (with caution)"],
    interactions: [
      { drug: "Aminoglycosides", severity: "severe", effect: "Increased ototoxicity risk" },
      { drug: "Lithium", severity: "moderate", effect: "Increased lithium levels" },
      { drug: "Digoxin", severity: "moderate", effect: "Hypokalemia increases digoxin toxicity" }
    ],
    warnings: ["Monitor electrolytes regularly", "Risk of severe dehydration", "Hearing loss with rapid IV injection"],
    isDangerous: false,
    halfLife: "1-2 hours",
    onsetOfAction: "30-60 minutes (oral), 5 minutes (IV)"
  },
  {
    id: "16",
    name: "Codeine",
    genericName: "Codeine Phosphate",
    brandNames: ["Tylenol with Codeine", "Various cough syrups"],
    class: "Opioid Agonists",
    category: "Analgesic/Antitussive",
    uses: [
      "Mild to moderate pain",
      "Cough suppression",
      "Diarrhea (off-label)"
    ],
    mechanism: "Prodrug converted to morphine by CYP2D6. Binds to mu-opioid receptors producing analgesia and cough suppression.",
    dosage: "15-60mg every 4-6 hours (max 360mg/day)",
    administration: {
      route: "Oral",
      timing: "Every 4-6 hours as needed",
      withFood: true,
      reason: "Taking with food reduces nausea and GI upset."
    },
    sideEffects: ["Constipation", "Nausea", "Sedation", "Respiratory depression", "Dependence"],
    contraindications: ["Children under 12", "Post-tonsillectomy in children", "Ultra-rapid CYP2D6 metabolizers", "Respiratory depression"],
    interactions: [
      { drug: "Benzodiazepines", severity: "severe", effect: "Enhanced respiratory depression" },
      { drug: "Alcohol", severity: "severe", effect: "Increased CNS depression" },
      { drug: "CYP2D6 inhibitors", severity: "moderate", effect: "Reduced codeine effectiveness" }
    ],
    warnings: ["Variable metabolism - some patients get no effect, others toxic levels", "Abuse potential - commonly abused as 'purple drank'", "Schedule II-V depending on formulation"],
    isDangerous: true,
    halfLife: "2.5-3 hours",
    onsetOfAction: "30-60 minutes"
  },
  {
    id: "17",
    name: "Paracetamol",
    genericName: "Paracetamol (Acetaminophen)",
    brandNames: ["Tylenol", "Panadol", "Efferalgan"],
    class: "Analgesics (Non-opioid)",
    category: "Analgesic/Antipyretic",
    uses: [
      "Mild to moderate pain",
      "Fever reduction",
      "Osteoarthritis",
      "Headache"
    ],
    mechanism: "Exact mechanism unclear. Inhibits COX in CNS, increases pain threshold, acts on hypothalamic heat-regulating center.",
    dosage: "500-1000mg every 4-6 hours (max 4g/day in adults)",
    administration: {
      route: "Oral, IV, Rectal",
      timing: "Every 4-6 hours as needed",
      withFood: false,
      reason: "Can be taken with or without food. Works faster on empty stomach but food prevents GI upset in some."
    },
    sideEffects: ["Hepatotoxicity (overdose)", "Rare allergic reactions", "Blood disorders (rare)"],
    contraindications: ["Severe liver disease", "Active liver failure"],
    interactions: [
      { drug: "Alcohol", severity: "severe", effect: "Increased hepatotoxicity risk" },
      { drug: "Warfarin", severity: "moderate", effect: "May increase INR with regular use" },
      { drug: "Isoniazid", severity: "moderate", effect: "Increased hepatotoxicity risk" }
    ],
    warnings: ["Leading cause of acute liver failure worldwide", "Maximum 4g/day - many products contain paracetamol", "N-acetylcysteine is antidote for overdose"],
    isDangerous: true,
    halfLife: "1-4 hours",
    onsetOfAction: "30-60 minutes"
  },
  {
    id: "18",
    name: "Diazepam",
    genericName: "Diazepam",
    brandNames: ["Valium", "Diastat"],
    class: "Benzodiazepines",
    category: "Anxiolytic/Anticonvulsant",
    uses: [
      "Anxiety disorders",
      "Seizures/Status epilepticus",
      "Muscle spasm",
      "Alcohol withdrawal",
      "Sedation for procedures"
    ],
    mechanism: "Enhances GABA-A receptor activity, increasing chloride ion conductance, leading to neuronal hyperpolarization and CNS depression.",
    dosage: "2-10mg 2-4 times daily depending on indication",
    administration: {
      route: "Oral, IV, IM, Rectal",
      timing: "As scheduled for chronic use or as needed for acute situations",
      withFood: false,
      reason: "Can be taken with or without food. Food may delay but not reduce absorption."
    },
    sideEffects: ["Sedation", "Ataxia", "Amnesia", "Dependence", "Respiratory depression"],
    contraindications: ["Severe respiratory insufficiency", "Sleep apnea", "Myasthenia gravis", "Acute narrow-angle glaucoma"],
    interactions: [
      { drug: "Opioids", severity: "severe", effect: "Profound sedation and respiratory depression - FDA black box warning" },
      { drug: "Alcohol", severity: "severe", effect: "Enhanced CNS depression" },
      { drug: "CYP3A4 inhibitors", severity: "moderate", effect: "Increased diazepam levels" }
    ],
    warnings: ["High dependence potential - Schedule IV", "Taper slowly to avoid withdrawal seizures", "Avoid in pregnancy (teratogenic)"],
    isDangerous: true,
    halfLife: "20-100 hours (active metabolite)",
    onsetOfAction: "15-60 minutes (oral)"
  },
  {
    id: "19",
    name: "Ibuprofen",
    genericName: "Ibuprofen",
    brandNames: ["Advil", "Motrin", "Brufen"],
    class: "NSAIDs (Non-steroidal Anti-inflammatory Drugs)",
    category: "Analgesic/Anti-inflammatory",
    uses: [
      "Pain relief",
      "Inflammation",
      "Fever",
      "Dysmenorrhea",
      "Arthritis"
    ],
    mechanism: "Non-selective COX inhibitor, reducing prostaglandin synthesis, leading to decreased inflammation, pain, and fever.",
    dosage: "200-400mg every 4-6 hours (max 1200mg/day OTC, 3200mg/day prescription)",
    administration: {
      route: "Oral",
      timing: "With food or milk to reduce GI irritation",
      withFood: true,
      reason: "Taking with food significantly reduces risk of gastric irritation and ulceration."
    },
    sideEffects: ["GI ulceration/bleeding", "Renal impairment", "Cardiovascular events", "Hypertension"],
    contraindications: ["Active GI bleeding", "Severe renal impairment", "Third trimester pregnancy", "CABG surgery"],
    interactions: [
      { drug: "Aspirin (cardioprotective)", severity: "moderate", effect: "Ibuprofen may block aspirin's cardioprotective effect - take aspirin 30 min before" },
      { drug: "Warfarin", severity: "severe", effect: "Increased bleeding risk" },
      { drug: "ACE inhibitors/ARBs", severity: "moderate", effect: "Reduced antihypertensive effect, increased renal risk" }
    ],
    warnings: ["Cardiovascular and GI black box warnings", "Avoid long-term use if possible", "Use lowest effective dose for shortest duration"],
    isDangerous: false,
    halfLife: "2-4 hours",
    onsetOfAction: "30-60 minutes"
  },
  {
    id: "20",
    name: "Artemether-Lumefantrine",
    genericName: "Artemether-Lumefantrine",
    brandNames: ["Coartem", "Riamet"],
    class: "Antimalarials (Artemisinin Combination)",
    category: "Antiparasitic",
    uses: [
      "Uncomplicated Plasmodium falciparum malaria",
      "Mixed plasmodium infections"
    ],
    mechanism: "Artemether rapidly reduces parasite load via free radical damage; lumefantrine has longer action preventing recrudescence.",
    dosage: "Based on weight - typically 4 tablets twice daily for 3 days (adults)",
    administration: {
      route: "Oral",
      timing: "Twice daily with meals, doses 8 hours apart on day 1, then 12 hours apart",
      withFood: true,
      reason: "MUST be taken with fatty food - increases absorption by up to 16-fold. Critical for effectiveness."
    },
    sideEffects: ["Headache", "Dizziness", "Anorexia", "QT prolongation", "Palpitations"],
    contraindications: ["Severe malaria", "First trimester pregnancy", "QT prolongation"],
    interactions: [
      { drug: "QT-prolonging drugs", severity: "severe", effect: "Additive QT prolongation - avoid combination" },
      { drug: "CYP3A4 inhibitors", severity: "moderate", effect: "Increased lumefantrine levels" },
      { drug: "Grapefruit juice", severity: "moderate", effect: "Increased drug levels" }
    ],
    warnings: ["Not for severe/complicated malaria", "Complete full course even if feeling better", "Monitor ECG in those at risk for arrhythmias"],
    isDangerous: false,
    halfLife: "Artemether: 1-2 hours; Lumefantrine: 3-6 days",
    onsetOfAction: "Rapid parasite clearance within 24-48 hours"
  },
  {
    id: "21",
    name: "Hydrochlorothiazide",
    genericName: "Hydrochlorothiazide",
    brandNames: ["Microzide", "Esidrix", "HydroDiuril"],
    class: "Thiazide Diuretics",
    category: "Diuretic/Antihypertensive",
    uses: [
      "Hypertension",
      "Edema",
      "Nephrolithiasis prevention",
      "Diabetes insipidus"
    ],
    mechanism: "Inhibits sodium-chloride cotransporter in distal convoluted tubule, increasing sodium and water excretion.",
    dosage: "12.5-50mg once daily",
    administration: {
      route: "Oral",
      timing: "Morning to avoid nocturia",
      withFood: false,
      reason: "Can be taken with or without food. Morning administration prevents nighttime urination."
    },
    sideEffects: ["Hypokalemia", "Hyponatremia", "Hyperuricemia", "Hyperglycemia", "Photosensitivity"],
    contraindications: ["Anuria", "Sulfonamide allergy", "Severe renal impairment"],
    interactions: [
      { drug: "Lithium", severity: "moderate", effect: "Increased lithium levels - monitor closely" },
      { drug: "Digoxin", severity: "moderate", effect: "Hypokalemia increases digoxin toxicity" },
      { drug: "NSAIDs", severity: "moderate", effect: "Reduced diuretic effect" }
    ],
    warnings: ["Monitor electrolytes regularly", "May worsen diabetes and gout", "Sun protection advised"],
    isDangerous: false,
    halfLife: "6-15 hours",
    onsetOfAction: "2 hours"
  },
  {
    id: "22",
    name: "Azithromycin",
    genericName: "Azithromycin",
    brandNames: ["Zithromax", "Z-Pack", "Azithrocin"],
    class: "Macrolides",
    category: "Antibiotic",
    uses: [
      "Respiratory tract infections",
      "Skin infections",
      "Sexually transmitted infections",
      "Traveler's diarrhea",
      "MAC prophylaxis in HIV"
    ],
    mechanism: "Binds to 50S ribosomal subunit, inhibiting bacterial protein synthesis. Bacteriostatic at usual doses.",
    dosage: "250-500mg once daily, often as 5-day course or single dose for STIs",
    administration: {
      route: "Oral or IV",
      timing: "Once daily, 1 hour before or 2 hours after meals (though can be taken with food)",
      withFood: false,
      reason: "Absorption is not significantly affected by food. Take consistently with or without food."
    },
    sideEffects: ["Diarrhea", "Nausea", "Abdominal pain", "QT prolongation", "Hearing loss (rare)"],
    contraindications: ["History of cholestatic jaundice with azithromycin", "Hypersensitivity to macrolides"],
    interactions: [
      { drug: "Warfarin", severity: "moderate", effect: "May increase INR - monitor closely" },
      { drug: "QT-prolonging drugs", severity: "severe", effect: "Additive QT prolongation" },
      { drug: "Antacids", severity: "mild", effect: "Reduced absorption - separate by 2 hours" }
    ],
    warnings: ["Rare but serious cardiac arrhythmias reported", "Tissue penetration means effects last beyond course duration", "Complete full course"],
    isDangerous: false,
    halfLife: "68 hours (tissue half-life much longer)",
    onsetOfAction: "2-3 hours"
  },
  {
    id: "23",
    name: "Glibenclamide",
    genericName: "Glibenclamide (Glyburide)",
    brandNames: ["Diabeta", "Glynase", "Daonil"],
    class: "Sulfonylureas",
    category: "Antidiabetic",
    uses: [
      "Type 2 Diabetes Mellitus"
    ],
    mechanism: "Stimulates insulin release from pancreatic beta cells by blocking ATP-sensitive potassium channels.",
    dosage: "2.5-20mg once daily or in divided doses",
    administration: {
      route: "Oral",
      timing: "With breakfast or first main meal",
      withFood: true,
      reason: "Taking with meals reduces hypoglycemia risk and coordinates insulin release with food intake."
    },
    sideEffects: ["Hypoglycemia", "Weight gain", "GI upset", "Skin reactions"],
    contraindications: ["Type 1 diabetes", "Diabetic ketoacidosis", "Severe renal/hepatic impairment"],
    interactions: [
      { drug: "Alcohol", severity: "moderate", effect: "Disulfiram-like reaction and hypoglycemia" },
      { drug: "Beta-blockers", severity: "moderate", effect: "May mask hypoglycemia symptoms" },
      { drug: "Fluconazole", severity: "moderate", effect: "Increased hypoglycemia risk" }
    ],
    warnings: ["High hypoglycemia risk - especially in elderly", "Requires regular meals", "Not preferred in elderly due to long duration"],
    isDangerous: true,
    halfLife: "10-16 hours",
    onsetOfAction: "1-2 hours"
  },
  {
    id: "24",
    name: "Salbutamol",
    genericName: "Salbutamol (Albuterol)",
    brandNames: ["Ventolin", "ProAir", "Proventil"],
    class: "Short-Acting Beta-2 Agonists (SABA)",
    category: "Bronchodilator",
    uses: [
      "Acute asthma attacks",
      "COPD exacerbations",
      "Exercise-induced bronchospasm",
      "Hyperkalemia (off-label)"
    ],
    mechanism: "Selectively activates beta-2 adrenergic receptors in bronchial smooth muscle, causing relaxation and bronchodilation.",
    dosage: "2-4 puffs every 4-6 hours as needed (inhaler); 2.5-5mg nebulized",
    administration: {
      route: "Inhalation (MDI, nebulizer), Oral, IV",
      timing: "As needed for acute symptoms, or 15-30 minutes before exercise",
      withFood: false,
      reason: "Inhalation route provides rapid onset. Shake inhaler well and use spacer for optimal delivery."
    },
    sideEffects: ["Tremor", "Tachycardia", "Palpitations", "Hypokalemia", "Nervousness"],
    contraindications: ["Hypersensitivity to salbutamol", "Tachyarrhythmias"],
    interactions: [
      { drug: "Beta-blockers", severity: "moderate", effect: "Mutual antagonism - beta-blockers reduce bronchodilation" },
      { drug: "MAO inhibitors", severity: "moderate", effect: "Increased cardiovascular effects" },
      { drug: "Diuretics", severity: "mild", effect: "Additive hypokalemia" }
    ],
    warnings: ["Overuse indicates poor asthma control - review treatment", "May paradoxically cause bronchospasm", "Not for maintenance - use as rescue only"],
    isDangerous: false,
    halfLife: "4-6 hours",
    onsetOfAction: "5-15 minutes (inhalation)"
  },
  {
    id: "25",
    name: "Clopidogrel",
    genericName: "Clopidogrel",
    brandNames: ["Plavix"],
    class: "P2Y12 Inhibitors",
    category: "Antiplatelet",
    uses: [
      "Acute coronary syndrome",
      "Post-PCI/stent placement",
      "Stroke prevention",
      "Peripheral arterial disease"
    ],
    mechanism: "Irreversibly inhibits P2Y12 ADP receptors on platelets, preventing platelet activation and aggregation.",
    dosage: "75mg once daily; loading dose 300-600mg for ACS",
    administration: {
      route: "Oral",
      timing: "Once daily, any time",
      withFood: false,
      reason: "Can be taken with or without food. Consistent daily timing is important."
    },
    sideEffects: ["Bleeding", "Bruising", "GI upset", "Rash", "TTP (rare)"],
    contraindications: ["Active bleeding", "Severe hepatic impairment"],
    interactions: [
      { drug: "Omeprazole/Esomeprazole", severity: "moderate", effect: "Reduced clopidogrel activation - use pantoprazole instead" },
      { drug: "Aspirin", severity: "mild", effect: "Increased bleeding but often used together for dual antiplatelet therapy" },
      { drug: "Warfarin", severity: "severe", effect: "Significantly increased bleeding risk" }
    ],
    warnings: ["Stop 5-7 days before surgery", "Genetic testing may help identify poor metabolizers", "Risk of TTP especially in first 2 weeks"],
    isDangerous: false,
    halfLife: "6 hours (parent drug); irreversible platelet inhibition",
    onsetOfAction: "2 hours (peak effect 3-7 days)"
  },
  {
    id: "26",
    name: "Levothyroxine",
    genericName: "Levothyroxine Sodium",
    brandNames: ["Synthroid", "Levoxyl", "Euthyrox"],
    class: "Thyroid Hormones",
    category: "Endocrine",
    uses: [
      "Hypothyroidism",
      "Thyroid cancer suppression",
      "Myxedema coma"
    ],
    mechanism: "Synthetic T4 (thyroxine) that converts to T3, binding to thyroid receptors and regulating metabolism, growth, and development.",
    dosage: "25-200mcg once daily, individualized based on TSH",
    administration: {
      route: "Oral",
      timing: "On empty stomach, 30-60 minutes before breakfast",
      withFood: false,
      reason: "Food, especially fiber, calcium, and iron, significantly reduces absorption. Consistent timing is essential."
    },
    sideEffects: ["Tachycardia", "Weight loss", "Tremor", "Insomnia", "Heat intolerance"],
    contraindications: ["Uncorrected adrenal insufficiency", "Recent MI", "Thyrotoxicosis"],
    interactions: [
      { drug: "Calcium supplements", severity: "moderate", effect: "Reduced levothyroxine absorption - separate by 4 hours" },
      { drug: "Iron supplements", severity: "moderate", effect: "Reduced absorption - separate by 4 hours" },
      { drug: "Warfarin", severity: "moderate", effect: "Increased warfarin effect - monitor INR" }
    ],
    warnings: ["Start low in elderly and cardiac patients", "Takes 6-8 weeks to reach steady state", "Monitor TSH regularly"],
    isDangerous: false,
    halfLife: "6-7 days",
    onsetOfAction: "3-5 days for initial effect"
  },
  {
    id: "27",
    name: "Metoclopramide",
    genericName: "Metoclopramide Hydrochloride",
    brandNames: ["Reglan", "Maxolon", "Primperan"],
    class: "Dopamine Antagonists/Prokinetics",
    category: "Gastrointestinal",
    uses: [
      "Nausea and vomiting",
      "Gastroparesis",
      "GERD",
      "Chemotherapy-induced nausea"
    ],
    mechanism: "Blocks dopamine D2 receptors in the CTZ (antiemetic) and stimulates gastric motility by enhancing acetylcholine release.",
    dosage: "10mg three times daily, 30 minutes before meals",
    administration: {
      route: "Oral, IV, IM",
      timing: "30 minutes before meals and at bedtime",
      withFood: false,
      reason: "Should be taken before meals to enhance gastric emptying when food is consumed."
    },
    sideEffects: ["Drowsiness", "Restlessness", "Tardive dyskinesia", "Extrapyramidal symptoms", "Galactorrhea"],
    contraindications: ["GI obstruction", "Pheochromocytoma", "Parkinson's disease", "Seizure disorders"],
    interactions: [
      { drug: "Antipsychotics", severity: "moderate", effect: "Increased risk of extrapyramidal symptoms" },
      { drug: "Levodopa", severity: "moderate", effect: "Reduced levodopa effectiveness" },
      { drug: "Opioids", severity: "mild", effect: "Enhanced sedation" }
    ],
    warnings: ["Black box warning for tardive dyskinesia", "Limit use to 12 weeks", "Higher risk in elderly"],
    isDangerous: true,
    halfLife: "5-6 hours",
    onsetOfAction: "1-3 minutes IV, 30-60 minutes oral"
  },
  {
    id: "28",
    name: "Carbamazepine",
    genericName: "Carbamazepine",
    brandNames: ["Tegretol", "Carbatrol", "Epitol"],
    class: "Anticonvulsants (Iminostilbene)",
    category: "Neurological",
    uses: [
      "Epilepsy (partial and tonic-clonic seizures)",
      "Trigeminal neuralgia",
      "Bipolar disorder"
    ],
    mechanism: "Blocks voltage-gated sodium channels, reducing neuronal firing and stabilizing hyperexcited neural membranes.",
    dosage: "200-1200mg daily in divided doses",
    administration: {
      route: "Oral",
      timing: "With food to reduce GI upset",
      withFood: true,
      reason: "Taking with food improves absorption and reduces stomach irritation."
    },
    sideEffects: ["Dizziness", "Drowsiness", "Diplopia", "Hyponatremia", "Rash"],
    contraindications: ["Bone marrow depression", "MAO inhibitor use", "AV block"],
    interactions: [
      { drug: "Oral contraceptives", severity: "severe", effect: "Reduces contraceptive efficacy - use alternative methods" },
      { drug: "Warfarin", severity: "moderate", effect: "Reduces warfarin levels" },
      { drug: "Phenytoin", severity: "moderate", effect: "Complex interaction - monitor levels" }
    ],
    warnings: ["Stevens-Johnson syndrome risk (HLA-B*1502)", "Monitor blood counts", "Autoinduction - levels decrease over time"],
    isDangerous: true,
    halfLife: "25-65 hours initially, 12-17 hours after autoinduction",
    onsetOfAction: "Several days to weeks"
  },
  {
    id: "29",
    name: "Phenytoin",
    genericName: "Phenytoin Sodium",
    brandNames: ["Dilantin", "Epanutin", "Phenytek"],
    class: "Hydantoins",
    category: "Neurological",
    uses: [
      "Epilepsy (tonic-clonic and partial seizures)",
      "Status epilepticus",
      "Seizure prophylaxis after neurosurgery"
    ],
    mechanism: "Stabilizes neuronal membranes by blocking voltage-gated sodium channels, preventing repetitive firing.",
    dosage: "300-400mg daily in divided doses",
    administration: {
      route: "Oral, IV",
      timing: "Consistent timing daily with or without food",
      withFood: false,
      reason: "Can be taken with food if GI upset occurs. Extended-release should be taken at same time daily."
    },
    sideEffects: ["Gingival hyperplasia", "Hirsutism", "Ataxia", "Nystagmus", "Osteomalacia"],
    contraindications: ["Bradycardia", "SA or AV block", "Adams-Stokes syndrome"],
    interactions: [
      { drug: "Enteral feeds", severity: "moderate", effect: "Reduced absorption - hold feeds 2 hours before and after" },
      { drug: "Warfarin", severity: "moderate", effect: "Variable effect on INR - monitor closely" },
      { drug: "Alcohol", severity: "moderate", effect: "Acute alcohol increases phenytoin levels, chronic decreases them" }
    ],
    warnings: ["Narrow therapeutic index - monitor levels", "Zero-order kinetics - small dose changes cause large level changes", "Folic acid depletion"],
    isDangerous: true,
    halfLife: "22 hours (range 7-42)",
    onsetOfAction: "7-10 days for steady state"
  },
  {
    id: "30",
    name: "Sodium Valproate",
    genericName: "Valproic Acid/Sodium Valproate",
    brandNames: ["Depakote", "Epilim", "Convulex"],
    class: "Valproates",
    category: "Neurological",
    uses: [
      "Epilepsy (all seizure types)",
      "Bipolar disorder",
      "Migraine prophylaxis"
    ],
    mechanism: "Enhances GABA activity, blocks voltage-gated sodium channels, and inhibits T-type calcium channels.",
    dosage: "500-2000mg daily in divided doses",
    administration: {
      route: "Oral, IV",
      timing: "With food to reduce GI side effects",
      withFood: true,
      reason: "Taking with food significantly reduces nausea and GI upset common with valproate."
    },
    sideEffects: ["Nausea", "Weight gain", "Hair loss", "Tremor", "Hepatotoxicity"],
    contraindications: ["Liver disease", "Pregnancy", "Urea cycle disorders", "Mitochondrial disorders"],
    interactions: [
      { drug: "Lamotrigine", severity: "severe", effect: "Doubles lamotrigine levels - reduce lamotrigine dose" },
      { drug: "Carbamazepine", severity: "moderate", effect: "Complex interaction - both levels affected" },
      { drug: "Aspirin", severity: "moderate", effect: "Increased valproate levels and bleeding risk" }
    ],
    warnings: ["Teratogenic - pregnancy category X", "Hepatotoxicity risk especially in children under 2", "Monitor LFTs and platelets"],
    isDangerous: true,
    halfLife: "9-16 hours",
    onsetOfAction: "1-4 days"
  },
  {
    id: "31",
    name: "Sertraline",
    genericName: "Sertraline Hydrochloride",
    brandNames: ["Zoloft", "Lustral"],
    class: "SSRIs",
    category: "Psychiatric",
    uses: [
      "Major depressive disorder",
      "Panic disorder",
      "PTSD",
      "OCD",
      "Social anxiety disorder"
    ],
    mechanism: "Selectively inhibits serotonin reuptake at the presynaptic membrane, increasing serotonin availability in the synaptic cleft.",
    dosage: "50-200mg once daily",
    administration: {
      route: "Oral",
      timing: "Once daily, morning or evening",
      withFood: false,
      reason: "Can be taken with or without food. Morning dosing may help if insomnia occurs."
    },
    sideEffects: ["Nausea", "Insomnia", "Sexual dysfunction", "Diarrhea", "Headache"],
    contraindications: ["MAO inhibitor use within 14 days", "Concurrent pimozide", "Concurrent disulfiram (liquid form)"],
    interactions: [
      { drug: "MAO inhibitors", severity: "severe", effect: "Serotonin syndrome - contraindicated" },
      { drug: "Tramadol", severity: "severe", effect: "Increased risk of serotonin syndrome and seizures" },
      { drug: "Warfarin", severity: "moderate", effect: "Increased bleeding risk" }
    ],
    warnings: ["Black box warning for suicidality in young adults", "Discontinuation syndrome with abrupt stopping", "May take 4-6 weeks for full effect"],
    isDangerous: false,
    halfLife: "26 hours",
    onsetOfAction: "1-4 weeks for therapeutic effect"
  },
  {
    id: "32",
    name: "Amitriptyline",
    genericName: "Amitriptyline Hydrochloride",
    brandNames: ["Elavil", "Endep"],
    class: "Tricyclic Antidepressants",
    category: "Psychiatric",
    uses: [
      "Depression",
      "Neuropathic pain",
      "Migraine prophylaxis",
      "Fibromyalgia",
      "Insomnia"
    ],
    mechanism: "Inhibits reuptake of norepinephrine and serotonin. Also has antihistamine, anticholinergic, and sodium channel blocking effects.",
    dosage: "25-150mg daily, usually at bedtime",
    administration: {
      route: "Oral",
      timing: "At bedtime due to sedating effects",
      withFood: false,
      reason: "Can be taken with or without food. Bedtime dosing utilizes sedation for sleep."
    },
    sideEffects: ["Sedation", "Dry mouth", "Constipation", "Blurred vision", "Weight gain", "Orthostatic hypotension"],
    contraindications: ["Recent MI", "MAO inhibitor use", "Acute angle glaucoma", "Urinary retention"],
    interactions: [
      { drug: "MAO inhibitors", severity: "severe", effect: "Serotonin syndrome and hypertensive crisis" },
      { drug: "Anticholinergics", severity: "moderate", effect: "Additive anticholinergic effects" },
      { drug: "Alcohol", severity: "moderate", effect: "Enhanced CNS depression" }
    ],
    warnings: ["Cardiotoxic in overdose", "Dangerous in elderly (falls, confusion)", "Taper gradually when stopping"],
    isDangerous: true,
    halfLife: "10-50 hours",
    onsetOfAction: "2-4 weeks for antidepressant effect"
  },
  {
    id: "33",
    name: "Olanzapine",
    genericName: "Olanzapine",
    brandNames: ["Zyprexa", "Zalasta"],
    class: "Atypical Antipsychotics",
    category: "Psychiatric",
    uses: [
      "Schizophrenia",
      "Bipolar disorder",
      "Treatment-resistant depression (with fluoxetine)",
      "Acute agitation"
    ],
    mechanism: "Antagonizes dopamine D2, serotonin 5-HT2A, histamine H1, and muscarinic receptors, with high affinity for 5-HT2A.",
    dosage: "5-20mg daily",
    administration: {
      route: "Oral, IM",
      timing: "Once daily, usually at bedtime",
      withFood: false,
      reason: "Can be taken with or without food. Bedtime dosing helps with sedation and reduces daytime drowsiness."
    },
    sideEffects: ["Significant weight gain", "Metabolic syndrome", "Sedation", "Hyperlipidemia", "Hyperglycemia"],
    contraindications: ["Hypersensitivity", "Elderly with dementia-related psychosis"],
    interactions: [
      { drug: "CNS depressants", severity: "moderate", effect: "Enhanced sedation" },
      { drug: "Carbamazepine", severity: "moderate", effect: "Reduced olanzapine levels" },
      { drug: "Fluvoxamine", severity: "moderate", effect: "Increased olanzapine levels" }
    ],
    warnings: ["Black box warning for elderly dementia mortality", "Monitor weight and metabolic parameters", "Risk of diabetes"],
    isDangerous: false,
    halfLife: "21-54 hours",
    onsetOfAction: "Days to weeks for full effect"
  },
  {
    id: "34",
    name: "Risperidone",
    genericName: "Risperidone",
    brandNames: ["Risperdal", "Rispen"],
    class: "Atypical Antipsychotics",
    category: "Psychiatric",
    uses: [
      "Schizophrenia",
      "Bipolar mania",
      "Irritability in autism",
      "Tourette syndrome"
    ],
    mechanism: "Blocks dopamine D2 and serotonin 5-HT2A receptors, with higher affinity for 5-HT2A, reducing both positive and negative symptoms.",
    dosage: "1-6mg daily",
    administration: {
      route: "Oral, IM (long-acting)",
      timing: "Once or twice daily",
      withFood: false,
      reason: "Can be taken with or without food. Oral solution can be mixed with water, coffee, or orange juice."
    },
    sideEffects: ["Hyperprolactinemia", "Weight gain", "EPS (dose-related)", "Sedation", "Orthostatic hypotension"],
    contraindications: ["Hypersensitivity", "Elderly with dementia-related psychosis"],
    interactions: [
      { drug: "CYP2D6 inhibitors", severity: "moderate", effect: "Increased risperidone levels" },
      { drug: "Carbamazepine", severity: "moderate", effect: "Reduced risperidone levels" },
      { drug: "Antihypertensives", severity: "moderate", effect: "Additive hypotension" }
    ],
    warnings: ["Hyperprolactinemia can cause amenorrhea, galactorrhea", "EPS more common at higher doses", "Black box warning in elderly dementia"],
    isDangerous: false,
    halfLife: "20 hours (including active metabolite)",
    onsetOfAction: "Days to weeks"
  },
  {
    id: "35",
    name: "Lithium",
    genericName: "Lithium Carbonate/Citrate",
    brandNames: ["Lithobid", "Eskalith", "Priadel"],
    class: "Mood Stabilizers",
    category: "Psychiatric",
    uses: [
      "Bipolar disorder (acute mania and maintenance)",
      "Depression augmentation",
      "Cluster headache prophylaxis"
    ],
    mechanism: "Exact mechanism unknown. Modulates neurotransmitter systems, inhibits inositol monophosphatase, and affects intracellular signaling cascades.",
    dosage: "600-1800mg daily in divided doses, guided by serum levels",
    administration: {
      route: "Oral",
      timing: "With food in divided doses",
      withFood: true,
      reason: "Taking with food reduces GI upset. Divided dosing maintains stable levels."
    },
    sideEffects: ["Tremor", "Polyuria", "Polydipsia", "Weight gain", "Hypothyroidism", "Renal impairment"],
    contraindications: ["Severe renal impairment", "Severe cardiovascular disease", "Dehydration"],
    interactions: [
      { drug: "NSAIDs", severity: "severe", effect: "Reduced lithium excretion - toxicity risk" },
      { drug: "ACE inhibitors", severity: "severe", effect: "Reduced lithium excretion - toxicity risk" },
      { drug: "Diuretics (thiazide)", severity: "severe", effect: "Significantly increased lithium levels" }
    ],
    warnings: ["Narrow therapeutic index (0.6-1.2 mEq/L)", "Maintain adequate hydration and sodium intake", "Monitor renal and thyroid function"],
    isDangerous: true,
    halfLife: "18-36 hours",
    onsetOfAction: "1-3 weeks for mood stabilization"
  },
  {
    id: "36",
    name: "Methotrexate",
    genericName: "Methotrexate",
    brandNames: ["Trexall", "Rheumatrex", "Otrexup"],
    class: "Antimetabolites/DMARDs",
    category: "Immunosuppressant",
    uses: [
      "Rheumatoid arthritis",
      "Psoriasis",
      "Various cancers",
      "Ectopic pregnancy"
    ],
    mechanism: "Inhibits dihydrofolate reductase, blocking folic acid metabolism and DNA synthesis, with anti-inflammatory effects at low doses.",
    dosage: "7.5-25mg weekly for RA; much higher for oncology",
    administration: {
      route: "Oral, SC, IM, IV",
      timing: "Once weekly (NOT daily for RA/psoriasis)",
      withFood: false,
      reason: "Can be taken with or without food. CRITICAL: Weekly dosing for RA/psoriasis - daily dosing causes fatal toxicity."
    },
    sideEffects: ["Nausea", "Mucositis", "Hepatotoxicity", "Bone marrow suppression", "Pneumonitis"],
    contraindications: ["Pregnancy", "Breastfeeding", "Severe liver/kidney disease", "Immunodeficiency"],
    interactions: [
      { drug: "NSAIDs", severity: "severe", effect: "Reduced methotrexate excretion - toxicity risk" },
      { drug: "Trimethoprim-sulfamethoxazole", severity: "severe", effect: "Additive folate antagonism - bone marrow suppression" },
      { drug: "Probenecid", severity: "moderate", effect: "Increased methotrexate levels" }
    ],
    warnings: ["WEEKLY dosing for RA - daily is fatal error", "Supplement with folic acid", "Monitor CBC and LFTs", "Teratogenic"],
    isDangerous: true,
    halfLife: "3-10 hours (low dose)",
    onsetOfAction: "3-6 weeks for RA"
  },
  {
    id: "37",
    name: "Allopurinol",
    genericName: "Allopurinol",
    brandNames: ["Zyloprim", "Lopurin"],
    class: "Xanthine Oxidase Inhibitors",
    category: "Antigout",
    uses: [
      "Gout (chronic)",
      "Tumor lysis syndrome prophylaxis",
      "Kidney stones (uric acid)"
    ],
    mechanism: "Inhibits xanthine oxidase, reducing the conversion of hypoxanthine to xanthine and xanthine to uric acid.",
    dosage: "100-800mg daily, start low",
    administration: {
      route: "Oral",
      timing: "After meals to reduce GI upset",
      withFood: true,
      reason: "Taking with food reduces stomach upset. Start with low doses to avoid precipitating gout flares."
    },
    sideEffects: ["Rash", "GI upset", "Elevated LFTs", "Gout flare (initial)", "Hypersensitivity syndrome"],
    contraindications: ["Acute gout attack (do not initiate)", "Previous severe reaction"],
    interactions: [
      { drug: "Azathioprine", severity: "severe", effect: "Blocks azathioprine metabolism - reduce dose by 75%" },
      { drug: "6-mercaptopurine", severity: "severe", effect: "Same as azathioprine - reduce dose significantly" },
      { drug: "ACE inhibitors", severity: "moderate", effect: "Increased hypersensitivity risk" }
    ],
    warnings: ["Start during non-acute period with colchicine/NSAID cover", "HLA-B*5801 testing in high-risk populations", "Severe hypersensitivity syndrome can be fatal"],
    isDangerous: false,
    halfLife: "1-2 hours (active metabolite oxipurinol: 18-30 hours)",
    onsetOfAction: "2-3 days for uric acid reduction"
  },
  {
    id: "38",
    name: "Colchicine",
    genericName: "Colchicine",
    brandNames: ["Colcrys", "Mitigare"],
    class: "Antigout Agents",
    category: "Antigout",
    uses: [
      "Acute gout",
      "Gout prophylaxis",
      "Familial Mediterranean fever",
      "Pericarditis"
    ],
    mechanism: "Inhibits microtubule polymerization, reducing neutrophil migration and inflammatory response to urate crystals.",
    dosage: "Acute: 1.2mg then 0.6mg 1 hour later; Prophylaxis: 0.6mg daily or twice daily",
    administration: {
      route: "Oral",
      timing: "At first sign of gout flare for acute; daily for prophylaxis",
      withFood: false,
      reason: "Can be taken with or without food. For acute gout, timing is critical - take at first sign of attack."
    },
    sideEffects: ["Diarrhea", "Nausea", "Vomiting", "Abdominal pain", "Bone marrow suppression (high dose)"],
    contraindications: ["Severe renal impairment with P-gp inhibitors", "Severe hepatic impairment"],
    interactions: [
      { drug: "Clarithromycin", severity: "severe", effect: "Increased colchicine levels - fatal toxicity reported" },
      { drug: "Cyclosporine", severity: "severe", effect: "Increased colchicine toxicity - dose reduction needed" },
      { drug: "Statins", severity: "moderate", effect: "Increased myopathy risk" }
    ],
    warnings: ["Narrow therapeutic index", "Do not exceed recommended doses", "GI symptoms are early sign of toxicity"],
    isDangerous: true,
    halfLife: "27-31 hours",
    onsetOfAction: "12-24 hours for gout relief"
  },
  {
    id: "39",
    name: "Doxycycline",
    genericName: "Doxycycline Hyclate/Monohydrate",
    brandNames: ["Vibramycin", "Doryx", "Monodox"],
    class: "Tetracyclines",
    category: "Antibiotic",
    uses: [
      "Respiratory infections",
      "Acne",
      "Chlamydia",
      "Malaria prophylaxis",
      "Lyme disease"
    ],
    mechanism: "Binds to 30S ribosomal subunit, inhibiting bacterial protein synthesis by blocking aminoacyl-tRNA binding.",
    dosage: "100mg twice daily or 200mg once daily",
    administration: {
      route: "Oral, IV",
      timing: "With food to reduce GI upset; avoid lying down for 30 minutes",
      withFood: true,
      reason: "Can be taken with food (unlike other tetracyclines). Stay upright to prevent esophageal irritation."
    },
    sideEffects: ["GI upset", "Photosensitivity", "Esophageal ulceration", "Yeast infections", "Tooth discoloration"],
    contraindications: ["Pregnancy", "Children under 8 years", "Hypersensitivity"],
    interactions: [
      { drug: "Antacids/Iron/Calcium", severity: "moderate", effect: "Reduced absorption - separate by 2-3 hours" },
      { drug: "Warfarin", severity: "moderate", effect: "Increased anticoagulant effect" },
      { drug: "Isotretinoin", severity: "moderate", effect: "Increased intracranial pressure risk" }
    ],
    warnings: ["Severe photosensitivity - use sunscreen", "Can cause permanent tooth staining in children", "Risk of esophagitis - take with water and remain upright"],
    isDangerous: false,
    halfLife: "18-22 hours",
    onsetOfAction: "1-4 hours"
  },
  {
    id: "40",
    name: "Fluconazole",
    genericName: "Fluconazole",
    brandNames: ["Diflucan"],
    class: "Triazole Antifungals",
    category: "Antifungal",
    uses: [
      "Candidiasis (oral, vaginal, systemic)",
      "Cryptococcal meningitis",
      "Prophylaxis in immunocompromised"
    ],
    mechanism: "Inhibits fungal cytochrome P450 enzyme lanosterol 14-alpha-demethylase, disrupting ergosterol synthesis and cell membrane integrity.",
    dosage: "Varies by indication: 50-400mg daily",
    administration: {
      route: "Oral, IV",
      timing: "Once daily, with or without food",
      withFood: false,
      reason: "Well absorbed regardless of food. Single dose (150mg) common for vaginal candidiasis."
    },
    sideEffects: ["Nausea", "Headache", "Abdominal pain", "Elevated LFTs", "QT prolongation"],
    contraindications: ["Concurrent terfenadine/cisapride", "Severe hypersensitivity"],
    interactions: [
      { drug: "Warfarin", severity: "severe", effect: "Significantly increased INR - monitor closely" },
      { drug: "Simvastatin", severity: "severe", effect: "Increased statin levels - rhabdomyolysis risk" },
      { drug: "Phenytoin", severity: "moderate", effect: "Increased phenytoin levels" }
    ],
    warnings: ["Hepatotoxicity risk - monitor LFTs", "QT prolongation with certain drugs", "Strong CYP inhibitor - many interactions"],
    isDangerous: false,
    halfLife: "30 hours",
    onsetOfAction: "1-2 hours"
  },
  {
    id: "41",
    name: "Cetirizine",
    genericName: "Cetirizine Hydrochloride",
    brandNames: ["Zyrtec", "Reactine"],
    class: "Second-generation Antihistamines",
    category: "Antiallergy",
    uses: [
      "Allergic rhinitis",
      "Chronic urticaria",
      "Allergic conjunctivitis"
    ],
    mechanism: "Selective H1 receptor antagonist with minimal CNS penetration, blocking histamine-mediated allergic responses.",
    dosage: "10mg once daily",
    administration: {
      route: "Oral",
      timing: "Once daily, evening if sedation occurs",
      withFood: false,
      reason: "Can be taken with or without food. Evening dosing helps if drowsiness is experienced."
    },
    sideEffects: ["Drowsiness (mild)", "Dry mouth", "Fatigue", "Headache"],
    contraindications: ["Hypersensitivity to cetirizine or hydroxyzine", "Severe renal impairment (reduce dose)"],
    interactions: [
      { drug: "CNS depressants", severity: "mild", effect: "Additive sedation" },
      { drug: "Theophylline", severity: "mild", effect: "Slight reduction in cetirizine clearance" },
      { drug: "Alcohol", severity: "mild", effect: "Enhanced sedation" }
    ],
    warnings: ["Less sedating than first-gen but may still cause drowsiness", "Dose adjust in renal impairment", "Not as effective as first-gen for acute allergic reactions"],
    isDangerous: false,
    halfLife: "8-9 hours",
    onsetOfAction: "1 hour"
  },
  {
    id: "42",
    name: "Montelukast",
    genericName: "Montelukast Sodium",
    brandNames: ["Singulair"],
    class: "Leukotriene Receptor Antagonists",
    category: "Respiratory",
    uses: [
      "Asthma prophylaxis",
      "Exercise-induced bronchoconstriction",
      "Allergic rhinitis"
    ],
    mechanism: "Blocks cysteinyl leukotriene receptor CysLT1, reducing bronchoconstriction, mucus secretion, and airway inflammation.",
    dosage: "10mg once daily in evening (adults)",
    administration: {
      route: "Oral",
      timing: "Once daily in the evening",
      withFood: false,
      reason: "Can be taken with or without food. Evening dosing is recommended for asthma."
    },
    sideEffects: ["Headache", "Abdominal pain", "Neuropsychiatric effects", "Upper respiratory infection"],
    contraindications: ["Hypersensitivity"],
    interactions: [
      { drug: "Phenobarbital", severity: "moderate", effect: "Reduced montelukast levels" },
      { drug: "CYP3A4 inducers", severity: "moderate", effect: "May reduce effectiveness" },
      { drug: "Gemfibrozil", severity: "moderate", effect: "Increased montelukast exposure" }
    ],
    warnings: ["Black box warning for neuropsychiatric events (depression, suicidal thoughts)", "Not for acute asthma attacks", "Monitor for behavior changes"],
    isDangerous: false,
    halfLife: "2.7-5.5 hours",
    onsetOfAction: "Within hours for bronchoconstriction prevention"
  },
  {
    id: "43",
    name: "Spironolactone",
    genericName: "Spironolactone",
    brandNames: ["Aldactone", "CaroSpir"],
    class: "Potassium-sparing Diuretics (Aldosterone Antagonist)",
    category: "Diuretic",
    uses: [
      "Heart failure",
      "Resistant hypertension",
      "Liver cirrhosis with ascites",
      "Hirsutism and acne (off-label)"
    ],
    mechanism: "Competitive aldosterone antagonist in the distal tubule, promoting sodium and water excretion while retaining potassium.",
    dosage: "25-200mg daily",
    administration: {
      route: "Oral",
      timing: "With food to enhance absorption",
      withFood: true,
      reason: "Food significantly increases absorption. Taking in morning may prevent nocturia."
    },
    sideEffects: ["Hyperkalemia", "Gynecomastia", "Menstrual irregularities", "GI upset", "Dizziness"],
    contraindications: ["Hyperkalemia", "Addison's disease", "Severe renal impairment", "Concurrent potassium supplements"],
    interactions: [
      { drug: "ACE inhibitors/ARBs", severity: "severe", effect: "Increased hyperkalemia risk - monitor potassium" },
      { drug: "NSAIDs", severity: "moderate", effect: "Reduced diuretic effect and increased hyperkalemia" },
      { drug: "Lithium", severity: "moderate", effect: "Possible reduced lithium clearance" }
    ],
    warnings: ["Monitor potassium closely", "Gynecomastia is dose-dependent", "Avoid potassium-rich foods and supplements"],
    isDangerous: false,
    halfLife: "1.4 hours (active metabolites: 10-35 hours)",
    onsetOfAction: "2-3 days for diuretic effect"
  },
  {
    id: "44",
    name: "Losartan",
    genericName: "Losartan Potassium",
    brandNames: ["Cozaar"],
    class: "Angiotensin II Receptor Blockers (ARBs)",
    category: "Antihypertensive",
    uses: [
      "Hypertension",
      "Diabetic nephropathy",
      "Stroke prevention in hypertensive patients with LVH",
      "Heart failure (when ACE inhibitor intolerant)"
    ],
    mechanism: "Blocks angiotensin II AT1 receptors, causing vasodilation, reduced aldosterone secretion, and decreased sympathetic activity.",
    dosage: "25-100mg daily",
    administration: {
      route: "Oral",
      timing: "Once or twice daily, any time",
      withFood: false,
      reason: "Can be taken with or without food. Consistent timing is important."
    },
    sideEffects: ["Dizziness", "Hyperkalemia", "Hypotension", "Renal impairment", "Back pain"],
    contraindications: ["Pregnancy", "Bilateral renal artery stenosis", "Concurrent aliskiren in diabetics"],
    interactions: [
      { drug: "Potassium supplements", severity: "moderate", effect: "Hyperkalemia risk" },
      { drug: "NSAIDs", severity: "moderate", effect: "Reduced antihypertensive effect and renal function decline" },
      { drug: "Lithium", severity: "moderate", effect: "Increased lithium levels" }
    ],
    warnings: ["Monitor renal function and potassium", "Black box warning for fetal toxicity", "Does not cause cough like ACE inhibitors"],
    isDangerous: false,
    halfLife: "2 hours (active metabolite 6-9 hours)",
    onsetOfAction: "6 hours, max effect 3-6 weeks"
  },
  {
    id: "45",
    name: "Ranitidine",
    genericName: "Ranitidine Hydrochloride",
    brandNames: ["Zantac"],
    class: "H2 Receptor Antagonists",
    category: "Gastrointestinal",
    uses: [
      "GERD",
      "Peptic ulcer disease",
      "Zollinger-Ellison syndrome",
      "Stress ulcer prophylaxis"
    ],
    mechanism: "Competitively blocks histamine H2 receptors on gastric parietal cells, reducing acid secretion.",
    dosage: "150mg twice daily or 300mg at bedtime",
    administration: {
      route: "Oral, IV",
      timing: "With or without food; bedtime dosing for nocturnal acid",
      withFood: false,
      reason: "Can be taken regardless of meals. Bedtime dosing is effective for nighttime acid suppression."
    },
    sideEffects: ["Headache", "Dizziness", "Constipation", "Diarrhea", "Confusion (elderly)"],
    contraindications: ["Hypersensitivity", "Acute porphyria"],
    interactions: [
      { drug: "Ketoconazole", severity: "moderate", effect: "Reduced ketoconazole absorption" },
      { drug: "Warfarin", severity: "mild", effect: "Possible slight increase in warfarin effect" },
      { drug: "Procainamide", severity: "moderate", effect: "Reduced procainamide clearance" }
    ],
    warnings: ["Note: Many products withdrawn due to NDMA contamination concerns", "Less effective than PPIs", "May cause rebound hyperacidity"],
    isDangerous: false,
    halfLife: "2-3 hours",
    onsetOfAction: "1-3 hours"
  },
  {
    id: "46",
    name: "Domperidone",
    genericName: "Domperidone",
    brandNames: ["Motilium", "Motinorm"],
    class: "Dopamine Antagonists (Peripheral)",
    category: "Gastrointestinal",
    uses: [
      "Nausea and vomiting",
      "Gastroparesis",
      "Functional dyspepsia"
    ],
    mechanism: "Blocks peripheral dopamine D2 receptors in the GI tract and CTZ, enhancing gastric motility without crossing blood-brain barrier.",
    dosage: "10mg three times daily before meals",
    administration: {
      route: "Oral",
      timing: "15-30 minutes before meals",
      withFood: false,
      reason: "Must be taken before meals to be present when food enters stomach and stimulates motility."
    },
    sideEffects: ["Headache", "Dry mouth", "Galactorrhea", "QT prolongation", "Cardiac arrhythmias"],
    contraindications: ["QT prolongation", "Concurrent QT-prolonging drugs", "GI obstruction", "Prolactinoma"],
    interactions: [
      { drug: "CYP3A4 inhibitors", severity: "severe", effect: "Increased domperidone levels and QT risk" },
      { drug: "Ketoconazole", severity: "severe", effect: "Contraindicated - increased cardiac risk" },
      { drug: "Erythromycin", severity: "severe", effect: "Additive QT prolongation" }
    ],
    warnings: ["Use lowest effective dose for shortest duration", "ECG before starting in high-risk patients", "Avoid in patients over 60 or with cardiac history"],
    isDangerous: true,
    halfLife: "7-8 hours",
    onsetOfAction: "30-60 minutes"
  },
  {
    id: "47",
    name: "Ceftriaxone",
    genericName: "Ceftriaxone Sodium",
    brandNames: ["Rocephin"],
    class: "Third-generation Cephalosporins",
    category: "Antibiotic",
    uses: [
      "Meningitis",
      "Pneumonia",
      "Gonorrhea",
      "Lyme disease",
      "Surgical prophylaxis"
    ],
    mechanism: "Binds to penicillin-binding proteins, inhibiting bacterial cell wall synthesis with broad gram-negative and some gram-positive coverage.",
    dosage: "1-2g daily; up to 4g for meningitis",
    administration: {
      route: "IV, IM",
      timing: "Once or twice daily",
      withFood: false,
      reason: "Given parenterally. Long half-life allows once-daily dosing for most infections."
    },
    sideEffects: ["Diarrhea", "Rash", "Injection site pain", "Biliary sludge", "C. difficile colitis"],
    contraindications: ["Cephalosporin allergy", "Neonates with hyperbilirubinemia receiving calcium", "Severe penicillin allergy (caution)"],
    interactions: [
      { drug: "Calcium-containing IV solutions", severity: "severe", effect: "Precipitation - fatal in neonates; separate in all ages" },
      { drug: "Warfarin", severity: "moderate", effect: "May increase INR" },
      { drug: "Aminoglycosides", severity: "moderate", effect: "Synergistic but give separately" }
    ],
    warnings: ["Do not mix with calcium-containing fluids", "Cross-reactivity with penicillin allergy (1-2%)", "Can cause biliary pseudolithiasis"],
    isDangerous: false,
    halfLife: "6-9 hours",
    onsetOfAction: "Immediate (IV)"
  },
  {
    id: "48",
    name: "Loperamide",
    genericName: "Loperamide Hydrochloride",
    brandNames: ["Imodium", "Lomotil"],
    class: "Opioid Antidiarrheals",
    category: "Gastrointestinal",
    uses: [
      "Acute diarrhea",
      "Chronic diarrhea",
      "Traveler's diarrhea",
      "Ileostomy output control"
    ],
    mechanism: "Activates opioid receptors in the gut wall, slowing intestinal motility and increasing fluid absorption without CNS effects at normal doses.",
    dosage: "Initial 4mg, then 2mg after each loose stool (max 16mg/day)",
    administration: {
      route: "Oral",
      timing: "After each loose stool",
      withFood: false,
      reason: "Can be taken regardless of food. Dose after diarrhea episodes for symptom control."
    },
    sideEffects: ["Constipation", "Abdominal cramps", "Dizziness", "Dry mouth"],
    contraindications: ["Bloody diarrhea", "Fever", "C. difficile colitis", "Acute dysentery", "Children under 2"],
    interactions: [
      { drug: "P-glycoprotein inhibitors", severity: "moderate", effect: "Increased loperamide absorption and potential CNS effects" },
      { drug: "Ritonavir", severity: "moderate", effect: "Increased loperamide levels" },
      { drug: "Quinidine", severity: "moderate", effect: "May increase loperamide CNS penetration" }
    ],
    warnings: ["Abuse potential at high doses (cardiac effects)", "Do not use in invasive diarrhea", "Can cause toxic megacolon in colitis"],
    isDangerous: false,
    halfLife: "10-14 hours",
    onsetOfAction: "1 hour"
  },
  {
    id: "49",
    name: "Clonazepam",
    genericName: "Clonazepam",
    brandNames: ["Klonopin", "Rivotril"],
    class: "Benzodiazepines",
    category: "Neurological/Psychiatric",
    uses: [
      "Epilepsy (absence, myoclonic, atonic seizures)",
      "Panic disorder",
      "Restless leg syndrome (off-label)"
    ],
    mechanism: "Enhances GABA-A receptor activity, increasing chloride conductance and neuronal inhibition.",
    dosage: "0.5-2mg two to three times daily",
    administration: {
      route: "Oral",
      timing: "Divided doses throughout the day",
      withFood: false,
      reason: "Can be taken with or without food. Divided dosing maintains stable levels."
    },
    sideEffects: ["Sedation", "Ataxia", "Dependence", "Cognitive impairment", "Respiratory depression"],
    contraindications: ["Severe respiratory insufficiency", "Sleep apnea", "Severe hepatic impairment", "Acute narrow-angle glaucoma"],
    interactions: [
      { drug: "Opioids", severity: "severe", effect: "Risk of profound sedation and respiratory depression" },
      { drug: "Alcohol", severity: "severe", effect: "Enhanced CNS depression" },
      { drug: "CYP3A4 inhibitors", severity: "moderate", effect: "Increased clonazepam levels" }
    ],
    warnings: ["Schedule IV controlled substance", "Withdrawal seizures with abrupt discontinuation", "Tolerance and dependence develop"],
    isDangerous: true,
    halfLife: "18-50 hours",
    onsetOfAction: "20-60 minutes"
  },
  {
    id: "50",
    name: "Gabapentin",
    genericName: "Gabapentin",
    brandNames: ["Neurontin", "Gralise"],
    class: "Gabapentinoids",
    category: "Neurological",
    uses: [
      "Epilepsy (partial seizures)",
      "Postherpetic neuralgia",
      "Neuropathic pain",
      "Restless leg syndrome (off-label)"
    ],
    mechanism: "Binds to alpha-2-delta subunit of voltage-gated calcium channels, reducing neurotransmitter release. Not a GABA agonist despite name.",
    dosage: "300-3600mg daily in divided doses",
    administration: {
      route: "Oral",
      timing: "Three times daily (dose-dependent absorption)",
      withFood: false,
      reason: "Can be taken with or without food. Extended-release must be taken with evening meal."
    },
    sideEffects: ["Dizziness", "Somnolence", "Peripheral edema", "Ataxia", "Weight gain"],
    contraindications: ["Hypersensitivity"],
    interactions: [
      { drug: "Antacids", severity: "mild", effect: "Reduced gabapentin absorption - separate by 2 hours" },
      { drug: "CNS depressants", severity: "moderate", effect: "Enhanced sedation" },
      { drug: "Morphine", severity: "moderate", effect: "Increased gabapentin levels and sedation" }
    ],
    warnings: ["Dose-dependent absorption (higher doses less absorbed)", "Adjust in renal impairment", "Suicidal ideation risk", "Misuse potential"],
    isDangerous: false,
    halfLife: "5-7 hours",
    onsetOfAction: "Several days to weeks for pain; hours for anticonvulsant"
  }
];

export const drugClasses = [
  { name: "Biguanides", category: "Antidiabetic", count: 1 },
  { name: "Vitamin K Antagonists", category: "Anticoagulant", count: 1 },
  { name: "ACE Inhibitors", category: "Antihypertensive", count: 1 },
  { name: "Cardiac Glycosides", category: "Cardiovascular", count: 1 },
  { name: "Aminopenicillins", category: "Antibiotic", count: 1 },
  { name: "Opioid Agonists", category: "Analgesic", count: 3 },
  { name: "Statins", category: "Antihyperlipidemic", count: 1 },
  { name: "Long-acting Insulin", category: "Antidiabetic", count: 1 },
  { name: "Proton Pump Inhibitors", category: "Gastrointestinal", count: 1 },
  { name: "Calcium Channel Blockers", category: "Antihypertensive", count: 1 },
  { name: "Fluoroquinolones", category: "Antibiotic", count: 1 },
  { name: "Beta Blockers", category: "Cardiovascular", count: 1 },
  { name: "Glucocorticoids", category: "Anti-inflammatory", count: 1 },
  { name: "Loop Diuretics", category: "Diuretic", count: 1 },
  { name: "Benzodiazepines", category: "Anxiolytic", count: 2 },
  { name: "NSAIDs", category: "Analgesic", count: 1 },
  { name: "Antimalarials", category: "Antiparasitic", count: 1 },
  { name: "Thiazide Diuretics", category: "Diuretic", count: 1 },
  { name: "Macrolides", category: "Antibiotic", count: 1 },
  { name: "Sulfonylureas", category: "Antidiabetic", count: 1 },
  { name: "SABAs", category: "Bronchodilator", count: 1 },
  { name: "Antiplatelets", category: "Cardiovascular", count: 1 },
  { name: "Thyroid Hormones", category: "Endocrine", count: 1 },
  { name: "Prokinetics", category: "Gastrointestinal", count: 2 },
  { name: "Anticonvulsants", category: "Neurological", count: 4 },
  { name: "SSRIs", category: "Psychiatric", count: 1 },
  { name: "Tricyclic Antidepressants", category: "Psychiatric", count: 1 },
  { name: "Atypical Antipsychotics", category: "Psychiatric", count: 2 },
  { name: "Mood Stabilizers", category: "Psychiatric", count: 1 },
  { name: "DMARDs", category: "Immunosuppressant", count: 1 },
  { name: "Xanthine Oxidase Inhibitors", category: "Antigout", count: 1 },
  { name: "Antigout Agents", category: "Antigout", count: 1 },
  { name: "Tetracyclines", category: "Antibiotic", count: 1 },
  { name: "Triazole Antifungals", category: "Antifungal", count: 1 },
  { name: "Second-gen Antihistamines", category: "Antiallergy", count: 1 },
  { name: "Leukotriene Antagonists", category: "Respiratory", count: 1 },
  { name: "Potassium-sparing Diuretics", category: "Diuretic", count: 1 },
  { name: "ARBs", category: "Antihypertensive", count: 1 },
  { name: "H2 Antagonists", category: "Gastrointestinal", count: 1 },
  { name: "Third-gen Cephalosporins", category: "Antibiotic", count: 1 },
  { name: "Opioid Antidiarrheals", category: "Gastrointestinal", count: 1 },
  { name: "Gabapentinoids", category: "Neurological", count: 1 },
];
