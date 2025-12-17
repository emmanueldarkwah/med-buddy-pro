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
  }
];

export const drugClasses = [
  { name: "Biguanides", category: "Antidiabetic", count: 1 },
  { name: "Vitamin K Antagonists", category: "Anticoagulant", count: 1 },
  { name: "ACE Inhibitors", category: "Antihypertensive", count: 1 },
  { name: "Cardiac Glycosides", category: "Cardiovascular", count: 1 },
  { name: "Aminopenicillins", category: "Antibiotic", count: 1 },
  { name: "Opioid Agonists", category: "Analgesic", count: 1 },
  { name: "Statins", category: "Antihyperlipidemic", count: 1 },
  { name: "Long-acting Insulin", category: "Antidiabetic", count: 1 },
];
