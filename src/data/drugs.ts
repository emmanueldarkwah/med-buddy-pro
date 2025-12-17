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
  { name: "Benzodiazepines", category: "Anxiolytic", count: 1 },
  { name: "NSAIDs", category: "Analgesic", count: 1 },
  { name: "Antimalarials", category: "Antiparasitic", count: 1 },
  { name: "Thiazide Diuretics", category: "Diuretic", count: 1 },
  { name: "Macrolides", category: "Antibiotic", count: 1 },
  { name: "Sulfonylureas", category: "Antidiabetic", count: 1 },
  { name: "SABAs", category: "Bronchodilator", count: 1 },
  { name: "Antiplatelets", category: "Cardiovascular", count: 1 },
];
