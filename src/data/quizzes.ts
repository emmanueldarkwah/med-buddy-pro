export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  drugId?: string;
  category: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: QuizQuestion[];
  icon: string;
}

export const quizzes: Quiz[] = [
  {
    id: "antidiabetics",
    title: "Antidiabetic Medications",
    description: "Test your knowledge on diabetes medications including metformin, insulin, and sulfonylureas",
    category: "Endocrine",
    difficulty: "intermediate",
    icon: "💊",
    questions: [
      {
        id: "ad1",
        question: "What is the primary mechanism of action of Metformin?",
        options: [
          "Stimulates insulin release from pancreatic beta cells",
          "Decreases hepatic glucose production",
          "Blocks glucose absorption in the intestine completely",
          "Increases insulin receptor sensitivity only"
        ],
        correctAnswer: 1,
        explanation: "Metformin primarily works by decreasing hepatic (liver) glucose production. It also improves insulin sensitivity and reduces intestinal glucose absorption.",
        drugId: "1",
        category: "Mechanism of Action"
      },
      {
        id: "ad2",
        question: "Why should Metformin be taken with meals?",
        options: [
          "To increase absorption",
          "To reduce gastrointestinal side effects",
          "Because it only works when food is present",
          "To prevent hypoglycemia"
        ],
        correctAnswer: 1,
        explanation: "Taking Metformin with food helps reduce common GI side effects like nausea, diarrhea, and abdominal discomfort.",
        drugId: "1",
        category: "Administration"
      },
      {
        id: "ad3",
        question: "What is a serious but rare side effect of Metformin that requires immediate attention?",
        options: [
          "Headache",
          "Lactic acidosis",
          "Weight gain",
          "Dry mouth"
        ],
        correctAnswer: 1,
        explanation: "Lactic acidosis is a rare but serious metabolic complication of Metformin. Risk factors include renal impairment, dehydration, and excessive alcohol use.",
        drugId: "1",
        category: "Side Effects"
      },
      {
        id: "ad4",
        question: "Insulin Glargine provides coverage for approximately how long?",
        options: [
          "4-6 hours",
          "8-12 hours",
          "24 hours",
          "48 hours"
        ],
        correctAnswer: 2,
        explanation: "Insulin Glargine is a long-acting insulin that provides approximately 24-hour basal insulin coverage with no pronounced peak.",
        drugId: "8",
        category: "Pharmacokinetics"
      },
      {
        id: "ad5",
        question: "Which class of antidiabetics has the highest risk of causing hypoglycemia?",
        options: [
          "Biguanides (Metformin)",
          "Sulfonylureas (Glibenclamide)",
          "DPP-4 inhibitors",
          "SGLT-2 inhibitors"
        ],
        correctAnswer: 1,
        explanation: "Sulfonylureas like Glibenclamide stimulate insulin release regardless of blood glucose levels, leading to higher hypoglycemia risk compared to other oral agents.",
        drugId: "23",
        category: "Safety"
      },
      {
        id: "ad6",
        question: "Why is Glibenclamide not preferred in elderly patients?",
        options: [
          "It causes weight loss",
          "Long duration increases hypoglycemia risk",
          "It is not effective in older adults",
          "It causes kidney damage"
        ],
        correctAnswer: 1,
        explanation: "Glibenclamide has a long half-life (10-16 hours) which increases the risk of prolonged hypoglycemia, especially dangerous in elderly patients.",
        drugId: "23",
        category: "Special Populations"
      }
    ]
  },
  {
    id: "anticoagulants",
    title: "Anticoagulant Therapy",
    description: "Learn about blood thinners including warfarin and antiplatelet agents",
    category: "Hematology",
    difficulty: "advanced",
    icon: "🩸",
    questions: [
      {
        id: "ac1",
        question: "Which monitoring parameter is essential for Warfarin therapy?",
        options: [
          "Complete Blood Count (CBC)",
          "International Normalized Ratio (INR)",
          "Liver Function Tests (LFTs)",
          "Blood glucose levels"
        ],
        correctAnswer: 1,
        explanation: "INR is the standard test for monitoring warfarin therapy. Target INR is typically 2-3 for most indications.",
        drugId: "2",
        category: "Monitoring"
      },
      {
        id: "ac2",
        question: "What dietary component significantly interacts with Warfarin?",
        options: [
          "Vitamin C",
          "Vitamin K",
          "Calcium",
          "Iron"
        ],
        correctAnswer: 1,
        explanation: "Vitamin K is essential for the synthesis of clotting factors that Warfarin inhibits. High vitamin K intake (leafy greens) can reduce Warfarin's effectiveness.",
        drugId: "2",
        category: "Interactions"
      },
      {
        id: "ac3",
        question: "Warfarin inhibits which clotting factors?",
        options: [
          "Factors I, V, VIII, XIII",
          "Factors II, VII, IX, X",
          "Factors III, IV, XI, XII",
          "Only Factor X"
        ],
        correctAnswer: 1,
        explanation: "Warfarin inhibits vitamin K-dependent clotting factors: II (prothrombin), VII, IX, and X, as well as proteins C and S.",
        drugId: "2",
        category: "Mechanism of Action"
      },
      {
        id: "ac4",
        question: "Which PPI should be used with Clopidogrel to avoid drug interaction?",
        options: [
          "Omeprazole",
          "Esomeprazole",
          "Pantoprazole",
          "Lansoprazole"
        ],
        correctAnswer: 2,
        explanation: "Pantoprazole is preferred because Omeprazole and Esomeprazole inhibit CYP2C19, reducing Clopidogrel's conversion to its active metabolite.",
        drugId: "25",
        category: "Drug Interactions"
      },
      {
        id: "ac5",
        question: "How long before surgery should Clopidogrel be stopped?",
        options: [
          "24 hours",
          "3 days",
          "5-7 days",
          "14 days"
        ],
        correctAnswer: 2,
        explanation: "Clopidogrel irreversibly inhibits platelets, so it should be stopped 5-7 days before surgery to allow new platelets to form.",
        drugId: "25",
        category: "Clinical Practice"
      }
    ]
  },
  {
    id: "cardiovascular",
    title: "Cardiovascular Medications",
    description: "Test your knowledge on heart and blood pressure medications",
    category: "Cardiology",
    difficulty: "intermediate",
    icon: "❤️",
    questions: [
      {
        id: "cv1",
        question: "What is the characteristic side effect of ACE inhibitors like Lisinopril?",
        options: [
          "Constipation",
          "Dry cough",
          "Weight gain",
          "Hair loss"
        ],
        correctAnswer: 1,
        explanation: "A dry, persistent cough occurs in 5-20% of patients taking ACE inhibitors due to accumulation of bradykinin in the lungs.",
        drugId: "3",
        category: "Side Effects"
      },
      {
        id: "cv2",
        question: "Which electrolyte abnormality is a concern with Digoxin toxicity?",
        options: [
          "Hypernatremia",
          "Hypokalemia",
          "Hypercalcemia",
          "Hypermagnesemia"
        ],
        correctAnswer: 1,
        explanation: "Hypokalemia (low potassium) increases the risk of digoxin toxicity because potassium and digoxin compete for the same binding site on the Na+/K+-ATPase pump.",
        drugId: "4",
        category: "Toxicity"
      },
      {
        id: "cv3",
        question: "Visual disturbances with Digoxin toxicity classically include:",
        options: [
          "Tunnel vision",
          "Yellow-green halos around lights",
          "Double vision only",
          "Complete color blindness"
        ],
        correctAnswer: 1,
        explanation: "Yellow-green halos (xanthopsia) around lights are a classic sign of digoxin toxicity, though this symptom may be less common with modern dosing.",
        drugId: "4",
        category: "Toxicity"
      },
      {
        id: "cv4",
        question: "What is the most common side effect of Amlodipine?",
        options: [
          "Dry cough",
          "Peripheral edema",
          "Bradycardia",
          "Hyperkalemia"
        ],
        correctAnswer: 1,
        explanation: "Peripheral edema (ankle swelling) is the most common side effect of dihydropyridine calcium channel blockers like Amlodipine, occurring in up to 10% of patients.",
        drugId: "11",
        category: "Side Effects"
      },
      {
        id: "cv5",
        question: "Why should Metoprolol not be stopped abruptly?",
        options: [
          "It causes withdrawal seizures",
          "Rebound hypertension and tachycardia",
          "It has no withdrawal effects",
          "It causes kidney failure"
        ],
        correctAnswer: 1,
        explanation: "Abrupt discontinuation of beta-blockers can cause rebound hypertension, tachycardia, and in patients with coronary disease, angina or myocardial infarction.",
        drugId: "13",
        category: "Safety"
      },
      {
        id: "cv6",
        question: "Which statin has the longest half-life allowing flexible dosing time?",
        options: [
          "Simvastatin",
          "Lovastatin",
          "Atorvastatin",
          "Pravastatin"
        ],
        correctAnswer: 2,
        explanation: "Atorvastatin has a half-life of about 14 hours, allowing it to be taken at any time of day, unlike shorter-acting statins that should be taken at bedtime.",
        drugId: "7",
        category: "Pharmacokinetics"
      }
    ]
  },
  {
    id: "antibiotics",
    title: "Antibiotic Essentials",
    description: "Review common antibiotics and their proper use",
    category: "Infectious Disease",
    difficulty: "beginner",
    icon: "🦠",
    questions: [
      {
        id: "ab1",
        question: "Why is it important to complete the full course of antibiotics?",
        options: [
          "To ensure the medication is not wasted",
          "To prevent antibiotic resistance",
          "Antibiotics work better over time",
          "Doctors prescribe exact amounts needed"
        ],
        correctAnswer: 1,
        explanation: "Completing the full course helps ensure all bacteria are killed, preventing surviving bacteria from developing resistance.",
        drugId: "5",
        category: "Best Practices"
      },
      {
        id: "ab2",
        question: "What is Amoxicillin's mechanism of action?",
        options: [
          "Inhibits protein synthesis",
          "Inhibits bacterial cell wall synthesis",
          "Destroys bacterial DNA",
          "Blocks folic acid synthesis"
        ],
        correctAnswer: 1,
        explanation: "Amoxicillin, like other penicillins, inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins (PBPs).",
        drugId: "5",
        category: "Mechanism of Action"
      },
      {
        id: "ab3",
        question: "Why should Ciprofloxacin not be taken with antacids or dairy?",
        options: [
          "It causes more nausea",
          "Metal ions chelate and reduce absorption",
          "It becomes toxic",
          "It tastes bad"
        ],
        correctAnswer: 1,
        explanation: "Ciprofloxacin binds to metal ions (calcium, magnesium, aluminum, iron) forming insoluble complexes that drastically reduce absorption.",
        drugId: "12",
        category: "Administration"
      },
      {
        id: "ab4",
        question: "What serious warning is associated with Fluoroquinolones like Ciprofloxacin?",
        options: [
          "Hair loss",
          "Tendinitis and tendon rupture",
          "Weight gain",
          "Insomnia only"
        ],
        correctAnswer: 1,
        explanation: "Fluoroquinolones have a FDA black box warning for tendinitis and tendon rupture, especially in patients over 60, those on corticosteroids, or with kidney/heart/lung transplants.",
        drugId: "12",
        category: "Safety"
      },
      {
        id: "ab5",
        question: "What is unique about Azithromycin's dosing compared to other antibiotics?",
        options: [
          "Must be taken 4 times daily",
          "Short course (3-5 days) due to long tissue half-life",
          "Must be taken for at least 14 days",
          "Only works when given IV"
        ],
        correctAnswer: 1,
        explanation: "Azithromycin has an extremely long tissue half-life (68+ hours), allowing short courses like the Z-Pack (5 days) while maintaining antibacterial activity for days after the last dose.",
        drugId: "22",
        category: "Pharmacokinetics"
      }
    ]
  },
  {
    id: "controlled-substances",
    title: "Controlled Substances",
    description: "Understanding opioids and other controlled medications",
    category: "Pain Management",
    difficulty: "advanced",
    icon: "⚠️",
    questions: [
      {
        id: "cs1",
        question: "What combination with opioids poses the highest risk of respiratory depression?",
        options: [
          "NSAIDs",
          "Benzodiazepines",
          "Antacids",
          "Vitamins"
        ],
        correctAnswer: 1,
        explanation: "The combination of opioids with benzodiazepines significantly increases the risk of profound sedation, respiratory depression, coma, and death. The FDA has issued a black box warning about this combination.",
        drugId: "6",
        category: "Drug Interactions"
      },
      {
        id: "cs2",
        question: "What is the reversal agent for opioid overdose?",
        options: [
          "Flumazenil",
          "Naloxone",
          "Atropine",
          "Epinephrine"
        ],
        correctAnswer: 1,
        explanation: "Naloxone (Narcan) is an opioid antagonist that rapidly reverses opioid effects. It should be available whenever opioids are prescribed.",
        drugId: "6",
        category: "Emergency Management"
      },
      {
        id: "cs3",
        question: "Why is Tramadol particularly dangerous in combination with SSRIs?",
        options: [
          "It causes weight gain",
          "Risk of serotonin syndrome and seizures",
          "It reduces SSRI effectiveness",
          "No interaction exists"
        ],
        correctAnswer: 1,
        explanation: "Tramadol inhibits serotonin reuptake and combined with SSRIs/SNRIs significantly increases the risk of serotonin syndrome and lowers seizure threshold.",
        drugId: "9",
        category: "Drug Interactions"
      },
      {
        id: "cs4",
        question: "What is 'purple drank' and why is it dangerous?",
        options: [
          "A herbal supplement",
          "Codeine cough syrup mixed with soft drinks - causes respiratory depression and addiction",
          "A type of energy drink",
          "A prescription medication"
        ],
        correctAnswer: 1,
        explanation: "Purple drank is codeine-promethazine cough syrup mixed with soft drinks, popularized in music culture. It causes severe respiratory depression, addiction, and has caused numerous deaths.",
        drugId: "16",
        category: "Drug Abuse"
      },
      {
        id: "cs5",
        question: "What makes Diazepam withdrawal dangerous?",
        options: [
          "It causes depression",
          "Withdrawal can cause life-threatening seizures",
          "It has no withdrawal effects",
          "It only causes headaches"
        ],
        correctAnswer: 1,
        explanation: "Benzodiazepine withdrawal can cause life-threatening seizures and should always be done through gradual tapering, not abrupt discontinuation.",
        drugId: "18",
        category: "Safety"
      }
    ]
  },
  {
    id: "gi-drugs",
    title: "Gastrointestinal Medications",
    description: "Learn about drugs for digestive system disorders",
    category: "Gastroenterology",
    difficulty: "beginner",
    icon: "🫁",
    questions: [
      {
        id: "gi1",
        question: "When should Omeprazole be taken for optimal effect?",
        options: [
          "After meals",
          "30-60 minutes before meals",
          "At bedtime only",
          "With antacids"
        ],
        correctAnswer: 1,
        explanation: "PPIs like Omeprazole should be taken 30-60 minutes before eating because they work on actively secreting proton pumps, which are stimulated by food.",
        drugId: "10",
        category: "Administration"
      },
      {
        id: "gi2",
        question: "What long-term risk is associated with PPI use?",
        options: [
          "Weight loss",
          "Increased fracture risk and B12 deficiency",
          "Hair growth",
          "Improved kidney function"
        ],
        correctAnswer: 1,
        explanation: "Long-term PPI use is associated with increased fracture risk (reduced calcium absorption), vitamin B12 deficiency, hypomagnesemia, and C. difficile infection.",
        drugId: "10",
        category: "Long-term Effects"
      },
      {
        id: "gi3",
        question: "Why is the Omeprazole-Clopidogrel interaction clinically significant?",
        options: [
          "It causes stomach upset",
          "Omeprazole reduces Clopidogrel's antiplatelet effect",
          "It improves both drugs' effectiveness",
          "No significant interaction"
        ],
        correctAnswer: 1,
        explanation: "Omeprazole inhibits CYP2C19, the enzyme that converts Clopidogrel to its active metabolite, potentially reducing its cardioprotective effect.",
        drugId: "10",
        category: "Drug Interactions"
      }
    ]
  },
  {
    id: "respiratory",
    title: "Respiratory Medications",
    description: "Test your knowledge on asthma and COPD drugs",
    category: "Pulmonology",
    difficulty: "intermediate",
    icon: "🌬️",
    questions: [
      {
        id: "resp1",
        question: "What is the role of Salbutamol in asthma management?",
        options: [
          "Long-term control medication",
          "Quick-relief rescue medication",
          "Anti-inflammatory agent",
          "Steroid replacement"
        ],
        correctAnswer: 1,
        explanation: "Salbutamol is a short-acting beta-2 agonist (SABA) used as a rescue medication for acute bronchospasm. It provides rapid relief but does not address underlying inflammation.",
        drugId: "24",
        category: "Clinical Use"
      },
      {
        id: "resp2",
        question: "What does frequent use of Salbutamol (more than 2-3 times per week) indicate?",
        options: [
          "The medication is working well",
          "Poor asthma control requiring treatment review",
          "The patient should use it more often",
          "No clinical significance"
        ],
        correctAnswer: 1,
        explanation: "Frequent rescue inhaler use indicates inadequate asthma control. Patients should be assessed for controller medication adjustment or compliance issues.",
        drugId: "24",
        category: "Clinical Assessment"
      },
      {
        id: "resp3",
        question: "What common side effect is associated with beta-2 agonists like Salbutamol?",
        options: [
          "Constipation",
          "Tremor and palpitations",
          "Weight gain",
          "Hair loss"
        ],
        correctAnswer: 1,
        explanation: "Beta-2 agonists commonly cause tremor, tachycardia, and palpitations due to stimulation of beta-2 receptors in skeletal muscle and heart.",
        drugId: "24",
        category: "Side Effects"
      }
    ]
  },
  {
    id: "analgesics",
    title: "Pain Management",
    description: "Understanding analgesics from paracetamol to opioids",
    category: "Pain Medicine",
    difficulty: "intermediate",
    icon: "💉",
    questions: [
      {
        id: "an1",
        question: "What is the maximum daily dose of Paracetamol in adults?",
        options: [
          "2 grams",
          "4 grams",
          "6 grams",
          "8 grams"
        ],
        correctAnswer: 1,
        explanation: "The maximum daily dose of Paracetamol is 4 grams (4000mg) in healthy adults. Lower limits apply to those with liver disease or chronic alcohol use.",
        drugId: "17",
        category: "Dosing"
      },
      {
        id: "an2",
        question: "What is the antidote for Paracetamol overdose?",
        options: [
          "Naloxone",
          "N-acetylcysteine (NAC)",
          "Flumazenil",
          "Vitamin K"
        ],
        correctAnswer: 1,
        explanation: "N-acetylcysteine (NAC) is the antidote for Paracetamol overdose. It replenishes glutathione stores and must be given within 8-10 hours for maximum effectiveness.",
        drugId: "17",
        category: "Toxicology"
      },
      {
        id: "an3",
        question: "Why is Ibuprofen contraindicated in the third trimester of pregnancy?",
        options: [
          "It causes birth defects",
          "It can cause premature closure of ductus arteriosus",
          "It reduces milk production",
          "It has no effect on pregnancy"
        ],
        correctAnswer: 1,
        explanation: "NSAIDs can cause premature closure of the ductus arteriosus in the fetus, leading to pulmonary hypertension. They should be avoided after 30 weeks gestation.",
        drugId: "19",
        category: "Contraindications"
      },
      {
        id: "an4",
        question: "If a patient is on low-dose aspirin for cardiac protection and needs Ibuprofen, what timing advice should be given?",
        options: [
          "Take them together",
          "Take aspirin at least 30 minutes before ibuprofen",
          "Never take them on the same day",
          "Take ibuprofen first"
        ],
        correctAnswer: 1,
        explanation: "Ibuprofen can block aspirin's access to COX-1, reducing its cardioprotective effect. Taking aspirin 30 minutes before ibuprofen allows aspirin to bind first.",
        drugId: "19",
        category: "Drug Interactions"
      }
    ]
  },
  {
    id: "antimalarials",
    title: "Antimalarial Drugs",
    description: "Essential knowledge for malaria treatment and prevention",
    category: "Infectious Disease",
    difficulty: "intermediate",
    icon: "🦟",
    questions: [
      {
        id: "mal1",
        question: "Why must Artemether-Lumefantrine be taken with fatty food?",
        options: [
          "To reduce nausea",
          "Absorption increases up to 16-fold with fat",
          "It tastes better",
          "To prevent stomach ulcers"
        ],
        correctAnswer: 1,
        explanation: "Lumefantrine is highly lipophilic and its absorption increases up to 16-fold when taken with fatty food. This is critical for achieving therapeutic drug levels.",
        drugId: "20",
        category: "Administration"
      },
      {
        id: "mal2",
        question: "Why are artemisinin combinations (ACTs) preferred for malaria treatment?",
        options: [
          "They are cheaper",
          "Rapid action plus longer-acting partner prevents resistance",
          "They have no side effects",
          "They can cure all diseases"
        ],
        correctAnswer: 1,
        explanation: "Artemisinin rapidly kills parasites while the longer-acting partner drug eliminates remaining parasites, reducing the chance of resistance development.",
        drugId: "20",
        category: "Pharmacology"
      },
      {
        id: "mal3",
        question: "What cardiac monitoring may be needed with Artemether-Lumefantrine?",
        options: [
          "Blood pressure",
          "ECG for QT prolongation",
          "Heart rate only",
          "No monitoring needed"
        ],
        correctAnswer: 1,
        explanation: "Artemether-Lumefantrine can prolong the QT interval, especially when combined with other QT-prolonging drugs. ECG monitoring may be needed in at-risk patients.",
        drugId: "20",
        category: "Safety Monitoring"
      }
    ]
  },
  {
    id: "diuretics",
    title: "Diuretic Therapy",
    description: "Understanding water pills and their clinical use",
    category: "Nephrology",
    difficulty: "intermediate",
    icon: "💧",
    questions: [
      {
        id: "di1",
        question: "Why should Furosemide be taken in the morning?",
        options: [
          "It works better in daylight",
          "To avoid nocturia (nighttime urination)",
          "It causes drowsiness",
          "It must be taken with breakfast"
        ],
        correctAnswer: 1,
        explanation: "Morning administration of diuretics allows the diuretic effect to occur during waking hours, avoiding sleep disruption from frequent urination.",
        drugId: "15",
        category: "Administration"
      },
      {
        id: "di2",
        question: "What electrolyte imbalance is most commonly caused by loop diuretics?",
        options: [
          "Hyperkalemia",
          "Hypokalemia",
          "Hypernatremia",
          "Hypercalcemia"
        ],
        correctAnswer: 1,
        explanation: "Loop diuretics cause significant potassium loss in the urine, leading to hypokalemia. This is especially dangerous in patients on digoxin.",
        drugId: "15",
        category: "Side Effects"
      },
      {
        id: "di3",
        question: "Why is the combination of Furosemide and aminoglycoside antibiotics dangerous?",
        options: [
          "It reduces antibiotic effectiveness",
          "Both are ototoxic - increased hearing loss risk",
          "It causes weight gain",
          "No significant interaction"
        ],
        correctAnswer: 1,
        explanation: "Both Furosemide and aminoglycosides can cause ototoxicity (hearing damage). Combined use significantly increases this risk, especially with rapid IV furosemide.",
        drugId: "15",
        category: "Drug Interactions"
      },
      {
        id: "di4",
        question: "What metabolic effect do thiazide diuretics have on uric acid?",
        options: [
          "They decrease uric acid levels",
          "They increase uric acid levels (hyperuricemia)",
          "No effect on uric acid",
          "They cause uric acid crystals"
        ],
        correctAnswer: 1,
        explanation: "Thiazides compete with uric acid for excretion in the kidney, leading to hyperuricemia. This can precipitate gout attacks in susceptible patients.",
        drugId: "21",
        category: "Metabolic Effects"
      }
    ]
  },
  {
    id: "steroids",
    title: "Corticosteroid Therapy",
    description: "Mastering glucocorticoid use and side effects",
    category: "Immunology",
    difficulty: "advanced",
    icon: "🔬",
    questions: [
      {
        id: "st1",
        question: "Why should Prednisone be taken in the morning?",
        options: [
          "It causes insomnia if taken at night",
          "It mimics natural cortisol rhythm and causes less adrenal suppression",
          "It is absorbed better in the morning",
          "It works faster in the morning"
        ],
        correctAnswer: 1,
        explanation: "Morning dosing mimics the body's natural cortisol peak, causing less disruption to the hypothalamic-pituitary-adrenal axis and reducing insomnia.",
        drugId: "14",
        category: "Administration"
      },
      {
        id: "st2",
        question: "Why must long-term corticosteroids be tapered rather than stopped abruptly?",
        options: [
          "To save money",
          "To prevent adrenal crisis from suppressed adrenal function",
          "To reduce appetite gradually",
          "Tapering improves effectiveness"
        ],
        correctAnswer: 1,
        explanation: "Long-term steroids suppress the adrenal glands' natural cortisol production. Abrupt discontinuation can cause life-threatening adrenal crisis.",
        drugId: "14",
        category: "Safety"
      },
      {
        id: "st3",
        question: "Which of these is NOT a common side effect of long-term corticosteroid use?",
        options: [
          "Osteoporosis",
          "Weight loss",
          "Hyperglycemia",
          "Increased infection risk"
        ],
        correctAnswer: 1,
        explanation: "Corticosteroids typically cause weight GAIN, not loss, along with cushingoid features, osteoporosis, hyperglycemia, and immunosuppression.",
        drugId: "14",
        category: "Side Effects"
      }
    ]
  }
];

export interface CaseStudy {
  id: string;
  title: string;
  scenario: string;
  patientInfo: {
    age: number;
    gender: string;
    weight: number;
    height: number;
    allergies: string[];
    conditions: string[];
    currentMedications: string[];
  };
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  learningPoints: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const caseStudies: CaseStudy[] = [
  {
    id: "case1",
    title: "Managing New Diabetes Diagnosis",
    scenario: "A 52-year-old patient presents with newly diagnosed Type 2 Diabetes. HbA1c is 8.2%, and the physician wants to start Metformin therapy.",
    patientInfo: {
      age: 52,
      gender: "Male",
      weight: 92,
      height: 175,
      allergies: ["Sulfa drugs"],
      conditions: ["Type 2 Diabetes", "Hypertension", "Mild renal impairment (eGFR 55)"],
      currentMedications: ["Lisinopril 10mg daily", "Aspirin 81mg daily"]
    },
    questions: [
      {
        question: "Is Metformin appropriate for this patient given the mild renal impairment?",
        options: [
          "No, Metformin is contraindicated in any renal impairment",
          "Yes, but dose adjustment may be needed and renal function should be monitored",
          "Yes, renal function has no bearing on Metformin use",
          "Only if combined with insulin"
        ],
        correctAnswer: 1,
        explanation: "Metformin can be used with mild-moderate renal impairment (eGFR 30-60) with dose adjustment and regular monitoring. It's contraindicated when eGFR <30."
      },
      {
        question: "What counseling point is most important for this patient starting Metformin?",
        options: [
          "Take on an empty stomach for best absorption",
          "Take with meals to reduce GI side effects",
          "Only take when blood sugar is high",
          "Avoid all carbohydrates"
        ],
        correctAnswer: 1,
        explanation: "Taking Metformin with food significantly reduces GI side effects like nausea and diarrhea, improving patient adherence."
      },
      {
        question: "The patient asks about drinking alcohol. What should you advise?",
        options: [
          "Alcohol is fine in unlimited amounts",
          "Moderate alcohol intake with caution - increased lactic acidosis risk",
          "Alcohol improves Metformin effectiveness",
          "Only drink alcohol on weekends"
        ],
        correctAnswer: 1,
        explanation: "Alcohol increases the risk of lactic acidosis with Metformin and can cause hypoglycemia. Patients should limit alcohol intake and never binge drink."
      }
    ],
    learningPoints: [
      "Metformin is first-line for Type 2 Diabetes but requires renal function assessment",
      "GI side effects are common but can be minimized by taking with food",
      "Start with low doses and titrate slowly to improve tolerance",
      "Regular monitoring of renal function and B12 levels is recommended",
      "Alcohol should be limited due to increased lactic acidosis risk"
    ],
    difficulty: "intermediate"
  },
  {
    id: "case2",
    title: "Warfarin Management Challenge",
    scenario: "A 68-year-old patient on Warfarin for atrial fibrillation presents with an INR of 4.8 (target 2-3). They report starting a new antibiotic for a respiratory infection one week ago.",
    patientInfo: {
      age: 68,
      gender: "Female",
      weight: 65,
      height: 160,
      allergies: ["Penicillin"],
      conditions: ["Atrial Fibrillation", "Hypertension"],
      currentMedications: ["Warfarin 5mg daily", "Metoprolol 50mg twice daily", "Azithromycin 250mg daily (new)"]
    },
    questions: [
      {
        question: "What likely caused the elevated INR?",
        options: [
          "The patient ate too many leafy greens",
          "Drug interaction between Azithromycin and Warfarin",
          "Natural fluctuation in INR",
          "Metoprolol interaction"
        ],
        correctAnswer: 1,
        explanation: "Many antibiotics, including Azithromycin, can enhance Warfarin's effect by altering gut flora that produce vitamin K or by inhibiting Warfarin metabolism."
      },
      {
        question: "What is the most appropriate immediate action?",
        options: [
          "Continue current dose and recheck in 1 month",
          "Hold Warfarin, consider Vitamin K, and recheck INR frequently",
          "Double the Warfarin dose",
          "Discontinue all medications"
        ],
        correctAnswer: 1,
        explanation: "With significantly elevated INR (>4), Warfarin should be held. Vitamin K may be given depending on bleeding risk. Frequent INR monitoring is essential."
      },
      {
        question: "What should have been done when the antibiotic was prescribed?",
        options: [
          "Nothing special needed",
          "Increased INR monitoring frequency during antibiotic course",
          "Stop Warfarin during antibiotic use",
          "Double the Warfarin dose"
        ],
        correctAnswer: 1,
        explanation: "When any new medication is started in a patient on Warfarin, INR should be checked more frequently to detect and manage interactions early."
      }
    ],
    learningPoints: [
      "Antibiotics are a common cause of Warfarin interactions",
      "Patients on Warfarin should have INR checked when starting new medications",
      "Elevated INR requires prompt intervention to prevent bleeding",
      "Patient education about drug interactions is crucial"
    ],
    difficulty: "advanced"
  },
  {
    id: "case3",
    title: "Acute Asthma Exacerbation",
    scenario: "A 28-year-old known asthmatic presents to the pharmacy in respiratory distress. She reports using her Salbutamol inhaler 8 times today with minimal relief. Her usual medications include Salbutamol PRN and she admits to rarely using her prescribed inhaled corticosteroid.",
    patientInfo: {
      age: 28,
      gender: "Female",
      weight: 58,
      height: 165,
      allergies: ["None known"],
      conditions: ["Asthma (moderate persistent)"],
      currentMedications: ["Salbutamol MDI PRN", "Beclomethasone MDI (prescribed but not using)"]
    },
    questions: [
      {
        question: "What does the frequent Salbutamol use indicate?",
        options: [
          "Good asthma control",
          "Poor asthma control - she needs urgent medical evaluation",
          "She should use it more often",
          "The inhaler is not working"
        ],
        correctAnswer: 1,
        explanation: "Using rescue inhaler more than 2-3 times per week indicates poor asthma control. Using it 8 times in one day suggests a severe exacerbation requiring urgent medical attention."
      },
      {
        question: "What is the likely reason for her poor asthma control?",
        options: [
          "Salbutamol is not effective",
          "Non-adherence to her inhaled corticosteroid (controller medication)",
          "She has outgrown her asthma",
          "Too much exercise"
        ],
        correctAnswer: 1,
        explanation: "Not using the inhaled corticosteroid (controller medication) allows airway inflammation to persist, leading to frequent symptoms and exacerbations."
      },
      {
        question: "What immediate action should be taken?",
        options: [
          "Tell her to use more Salbutamol at home",
          "Refer to emergency services/urgent care immediately",
          "Advise her to rest and try again tomorrow",
          "Switch her Salbutamol brand"
        ],
        correctAnswer: 1,
        explanation: "A patient in respiratory distress who has not responded to multiple rescue inhaler doses needs immediate medical evaluation. This could be a life-threatening asthma attack."
      }
    ],
    learningPoints: [
      "Frequent rescue inhaler use indicates poor asthma control",
      "Controller medications (inhaled corticosteroids) are essential for persistent asthma",
      "Patient education on the importance of daily controller medications is crucial",
      "Severe exacerbations require immediate emergency referral",
      "Asthma action plans help patients recognize and respond to worsening symptoms"
    ],
    difficulty: "intermediate"
  },
  {
    id: "case4",
    title: "Polypharmacy in the Elderly",
    scenario: "A 78-year-old patient comes to the pharmacy feeling dizzy and confused. She takes multiple medications and her daughter is concerned about her declining cognition over the past month.",
    patientInfo: {
      age: 78,
      gender: "Female",
      weight: 55,
      height: 155,
      allergies: ["Codeine (nausea)"],
      conditions: ["Hypertension", "Type 2 Diabetes", "Anxiety", "Insomnia", "Chronic pain"],
      currentMedications: [
        "Amlodipine 10mg daily",
        "Metformin 500mg twice daily",
        "Glibenclamide 5mg daily",
        "Diazepam 5mg three times daily",
        "Tramadol 50mg three times daily",
        "Omeprazole 20mg daily"
      ]
    },
    questions: [
      {
        question: "Which medication is most likely contributing to her confusion?",
        options: [
          "Amlodipine",
          "Metformin",
          "Diazepam",
          "Omeprazole"
        ],
        correctAnswer: 2,
        explanation: "Benzodiazepines like Diazepam are associated with cognitive impairment in the elderly and should generally be avoided. The long half-life leads to accumulation."
      },
      {
        question: "What dangerous combination exists in her medication list?",
        options: [
          "Amlodipine and Metformin",
          "Diazepam and Tramadol",
          "Omeprazole and Glibenclamide",
          "Metformin and Omeprazole"
        ],
        correctAnswer: 1,
        explanation: "The combination of Diazepam (benzodiazepine) and Tramadol (opioid) carries an FDA black box warning for respiratory depression, sedation, and death."
      },
      {
        question: "Why is Glibenclamide particularly concerning in this elderly patient?",
        options: [
          "It's too expensive",
          "Long half-life increases hypoglycemia risk",
          "It doesn't work in elderly patients",
          "It causes weight loss"
        ],
        correctAnswer: 1,
        explanation: "Glibenclamide's long duration of action (10-16 hours) increases the risk of prolonged hypoglycemia in elderly patients, which can present as confusion and falls."
      },
      {
        question: "Her dizziness could also be related to:",
        options: [
          "Not enough medications",
          "Over-treatment of blood pressure causing orthostatic hypotension",
          "Too much exercise",
          "Drinking too much water"
        ],
        correctAnswer: 1,
        explanation: "In elderly patients, aggressive blood pressure treatment can cause orthostatic hypotension leading to dizziness and falls, especially when combined with sedating medications."
      }
    ],
    learningPoints: [
      "Benzodiazepines should be avoided in elderly patients (Beers Criteria)",
      "Opioid-benzodiazepine combinations are extremely dangerous",
      "Long-acting sulfonylureas increase hypoglycemia risk in elderly",
      "Polypharmacy increases drug interaction risk",
      "Regular medication reviews are essential in elderly patients",
      "Confusion in elderly patients is often medication-related"
    ],
    difficulty: "advanced"
  },
  {
    id: "case5",
    title: "Malaria Treatment in Endemic Area",
    scenario: "A 35-year-old man presents with fever, chills, and headache for 3 days. Rapid malaria test is positive for P. falciparum. He has no known drug allergies and is otherwise healthy.",
    patientInfo: {
      age: 35,
      gender: "Male",
      weight: 70,
      height: 175,
      allergies: ["None"],
      conditions: ["Uncomplicated P. falciparum malaria"],
      currentMedications: ["None"]
    },
    questions: [
      {
        question: "What is the first-line treatment for uncomplicated P. falciparum malaria?",
        options: [
          "Chloroquine alone",
          "Artemether-Lumefantrine (ACT)",
          "Quinine only",
          "Doxycycline alone"
        ],
        correctAnswer: 1,
        explanation: "Artemisinin-based Combination Therapies (ACTs) like Artemether-Lumefantrine are first-line for uncomplicated P. falciparum malaria due to rapid action and reduced resistance."
      },
      {
        question: "What critical counseling must be given about taking Artemether-Lumefantrine?",
        options: [
          "Take on an empty stomach",
          "Take with a fatty meal for adequate absorption",
          "Take only at bedtime",
          "Avoid drinking water"
        ],
        correctAnswer: 1,
        explanation: "Lumefantrine absorption increases up to 16-fold with fatty food. Without fat, drug levels may be too low for effective parasite killing, risking treatment failure."
      },
      {
        question: "How should the 3-day course be administered?",
        options: [
          "Once daily for 3 days",
          "Twice daily for 3 days (6 doses total), with doses 8 hours apart on day 1",
          "Four times daily for 3 days",
          "Single dose only"
        ],
        correctAnswer: 1,
        explanation: "The standard regimen is 6 doses over 3 days: initial dose, second dose at 8 hours, then twice daily for days 2 and 3. All doses must be taken with fat."
      }
    ],
    learningPoints: [
      "ACTs are first-line for uncomplicated falciparum malaria",
      "Fatty food is CRITICAL for Lumefantrine absorption",
      "Complete the full 3-day course even if feeling better",
      "Treatment failure can result from inadequate drug absorption",
      "Severe malaria requires IV artesunate, not oral ACT"
    ],
    difficulty: "intermediate"
  },
  {
    id: "case6",
    title: "Paracetamol Overdose Risk",
    scenario: "A 25-year-old woman comes to buy Paracetamol for a severe headache. She mentions she has already taken 'several' paracetamol tablets today for her headache and also took some cold medicine this morning. She seems frustrated that her headache won't go away.",
    patientInfo: {
      age: 25,
      gender: "Female",
      weight: 60,
      height: 162,
      allergies: ["None"],
      conditions: ["Migraine (self-reported)"],
      currentMedications: ["Panadol Extra taken today", "Cold & Flu tablets this morning"]
    },
    questions: [
      {
        question: "What is the critical concern in this scenario?",
        options: [
          "She might be allergic to paracetamol",
          "Potential paracetamol overdose from multiple products",
          "She needs a stronger painkiller",
          "Headaches are not treatable"
        ],
        correctAnswer: 1,
        explanation: "Many over-the-counter products contain paracetamol. Taking multiple products can easily lead to exceeding the 4g daily maximum, risking hepatotoxicity."
      },
      {
        question: "You need to determine her total paracetamol intake. Panadol Extra contains 500mg paracetamol per tablet. If she took 2 tablets four times, and the cold medicine contained 500mg per dose taken twice, what's her total?",
        options: [
          "2 grams",
          "5 grams (exceeds maximum)",
          "3 grams",
          "4 grams exactly"
        ],
        correctAnswer: 1,
        explanation: "Panadol Extra: 2 × 4 × 500mg = 4000mg + Cold medicine: 2 × 500mg = 1000mg. Total = 5000mg (5g), exceeding the 4g maximum. This puts her at risk for liver damage."
      },
      {
        question: "What is the appropriate action?",
        options: [
          "Sell her more paracetamol",
          "Refuse sale and advise her to seek urgent medical attention",
          "Tell her to drink lots of water",
          "Recommend she takes ibuprofen on top"
        ],
        correctAnswer: 1,
        explanation: "With potential paracetamol overdose, she needs urgent medical evaluation. Liver damage from paracetamol can occur without immediate symptoms and be fatal if untreated."
      }
    ],
    learningPoints: [
      "Paracetamol is found in many combination products - always check total intake",
      "Maximum daily dose is 4g in healthy adults",
      "Symptoms of liver damage may not appear until it's severe",
      "N-acetylcysteine is the antidote but must be given early",
      "Patient education on reading product labels is essential"
    ],
    difficulty: "beginner"
  }
];
