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
  },
  {
    id: "psychiatric",
    title: "Psychiatric Medications",
    description: "Test your knowledge on antidepressants, antipsychotics, and mood stabilizers",
    category: "Psychiatry",
    difficulty: "advanced",
    icon: "🧠",
    questions: [
      {
        id: "psy1",
        question: "What is the black box warning associated with SSRIs like Sertraline?",
        options: [
          "Risk of weight gain",
          "Increased suicidality in young adults",
          "Risk of heart attack",
          "Liver failure"
        ],
        correctAnswer: 1,
        explanation: "SSRIs carry a black box warning for increased risk of suicidal thoughts and behaviors in children, adolescents, and young adults, especially during initial treatment.",
        drugId: "31",
        category: "Safety"
      },
      {
        id: "psy2",
        question: "Why should antidepressants not be stopped abruptly?",
        options: [
          "They are addictive",
          "Discontinuation syndrome with flu-like symptoms and mood changes",
          "They cause immediate relapse",
          "No specific reason"
        ],
        correctAnswer: 1,
        explanation: "Abrupt discontinuation can cause discontinuation syndrome with symptoms like dizziness, nausea, flu-like symptoms, insomnia, and mood disturbances. Gradual tapering is recommended.",
        drugId: "31",
        category: "Administration"
      },
      {
        id: "psy3",
        question: "What metabolic effect is most concerning with Olanzapine?",
        options: [
          "Hypoglycemia",
          "Significant weight gain and metabolic syndrome",
          "Weight loss",
          "Hypotension only"
        ],
        correctAnswer: 1,
        explanation: "Olanzapine is associated with significant weight gain, hyperglycemia, and dyslipidemia. Regular monitoring of metabolic parameters is essential.",
        drugId: "33",
        category: "Side Effects"
      },
      {
        id: "psy4",
        question: "What is the therapeutic range for Lithium?",
        options: [
          "0.1-0.5 mEq/L",
          "0.6-1.2 mEq/L",
          "2.0-3.0 mEq/L",
          "5.0-10.0 mEq/L"
        ],
        correctAnswer: 1,
        explanation: "Lithium has a narrow therapeutic index with a range of 0.6-1.2 mEq/L. Levels above 1.5 mEq/L can cause toxicity; above 2.0 mEq/L can be life-threatening.",
        drugId: "35",
        category: "Monitoring"
      },
      {
        id: "psy5",
        question: "Which drug combination with Lithium is particularly dangerous?",
        options: [
          "Paracetamol",
          "NSAIDs and ACE inhibitors",
          "Antacids",
          "Antibiotics"
        ],
        correctAnswer: 1,
        explanation: "NSAIDs and ACE inhibitors reduce lithium excretion, significantly increasing lithium levels and risk of toxicity. Thiazide diuretics are also problematic.",
        drugId: "35",
        category: "Interactions"
      },
      {
        id: "psy6",
        question: "What unique side effect is associated with Risperidone compared to other antipsychotics?",
        options: [
          "Weight loss",
          "Hyperprolactinemia causing galactorrhea",
          "Improved sexual function",
          "Hair growth"
        ],
        correctAnswer: 1,
        explanation: "Risperidone causes significant hyperprolactinemia, leading to amenorrhea, galactorrhea, gynecomastia, and sexual dysfunction, more than most other antipsychotics.",
        drugId: "34",
        category: "Side Effects"
      }
    ]
  },
  {
    id: "neurology",
    title: "Neurological Medications",
    description: "Learn about anticonvulsants and drugs for neurological conditions",
    category: "Neurology",
    difficulty: "advanced",
    icon: "⚡",
    questions: [
      {
        id: "neuro1",
        question: "Why is HLA-B*1502 testing recommended before starting Carbamazepine?",
        options: [
          "To check liver function",
          "Risk of Stevens-Johnson syndrome in positive patients",
          "To determine correct dose",
          "To check kidney function"
        ],
        correctAnswer: 1,
        explanation: "HLA-B*1502 allele carriers (common in Asian populations) have significantly increased risk of Stevens-Johnson syndrome/toxic epidermal necrolysis with carbamazepine.",
        drugId: "28",
        category: "Safety"
      },
      {
        id: "neuro2",
        question: "What is unique about Phenytoin's pharmacokinetics?",
        options: [
          "It has first-order kinetics",
          "Zero-order kinetics at therapeutic doses - small dose changes cause large level changes",
          "It is completely predictable",
          "It has a very wide therapeutic range"
        ],
        correctAnswer: 1,
        explanation: "Phenytoin follows zero-order (saturable) kinetics at therapeutic doses, meaning small dose increases can cause disproportionately large increases in plasma levels.",
        drugId: "29",
        category: "Pharmacokinetics"
      },
      {
        id: "neuro3",
        question: "What critical warning exists for Valproate in women of childbearing potential?",
        options: [
          "It causes infertility",
          "Highly teratogenic - causes neural tube defects",
          "It reduces contraceptive efficacy",
          "No specific concerns"
        ],
        correctAnswer: 1,
        explanation: "Valproate is highly teratogenic with up to 10% risk of major congenital malformations and neurodevelopmental disorders. It should be avoided in women of childbearing potential unless essential.",
        drugId: "30",
        category: "Pregnancy"
      },
      {
        id: "neuro4",
        question: "Which anticonvulsant significantly reduces oral contraceptive efficacy?",
        options: [
          "Valproate",
          "Carbamazepine",
          "Gabapentin",
          "Levetiracetam"
        ],
        correctAnswer: 1,
        explanation: "Carbamazepine is a strong CYP3A4 inducer that significantly reduces hormone levels, making hormonal contraceptives unreliable. Alternative contraception is needed.",
        drugId: "28",
        category: "Interactions"
      },
      {
        id: "neuro5",
        question: "Why does Gabapentin require three-times-daily dosing?",
        options: [
          "It has a very long half-life",
          "Dose-dependent absorption - higher single doses are poorly absorbed",
          "It causes insomnia",
          "For better taste"
        ],
        correctAnswer: 1,
        explanation: "Gabapentin absorption is saturable - as the dose increases, the percentage absorbed decreases. Divided dosing improves overall bioavailability.",
        drugId: "50",
        category: "Pharmacokinetics"
      }
    ]
  },
  {
    id: "thyroid-endocrine",
    title: "Thyroid & Endocrine Drugs",
    description: "Understand medications for thyroid and hormonal conditions",
    category: "Endocrine",
    difficulty: "intermediate",
    icon: "🦋",
    questions: [
      {
        id: "thy1",
        question: "When should Levothyroxine be taken?",
        options: [
          "With breakfast",
          "On empty stomach, 30-60 minutes before breakfast",
          "After dinner",
          "With milk"
        ],
        correctAnswer: 1,
        explanation: "Levothyroxine absorption is significantly reduced by food, fiber, calcium, and iron. It should be taken on an empty stomach, ideally 30-60 minutes before eating.",
        drugId: "26",
        category: "Administration"
      },
      {
        id: "thy2",
        question: "How long does it take for Levothyroxine to reach steady state?",
        options: [
          "1-2 days",
          "1 week",
          "6-8 weeks",
          "6 months"
        ],
        correctAnswer: 2,
        explanation: "Due to its long half-life (6-7 days), levothyroxine takes 6-8 weeks to reach steady state. TSH should be rechecked after this period following dose changes.",
        drugId: "26",
        category: "Pharmacokinetics"
      },
      {
        id: "thy3",
        question: "What supplements should be separated from Levothyroxine?",
        options: [
          "Vitamin B12",
          "Calcium and Iron supplements",
          "Vitamin D",
          "Zinc"
        ],
        correctAnswer: 1,
        explanation: "Calcium and iron bind to levothyroxine and significantly reduce absorption. They should be taken at least 4 hours apart from levothyroxine.",
        drugId: "26",
        category: "Interactions"
      }
    ]
  },
  {
    id: "gout-arthritis",
    title: "Gout & Arthritis Medications",
    description: "Test your knowledge on drugs for gout and inflammatory conditions",
    category: "Rheumatology",
    difficulty: "intermediate",
    icon: "🦴",
    questions: [
      {
        id: "gout1",
        question: "When should Allopurinol NOT be started?",
        options: [
          "In patients with kidney stones",
          "During an acute gout attack",
          "In elderly patients",
          "In diabetic patients"
        ],
        correctAnswer: 1,
        explanation: "Starting allopurinol during an acute gout attack can worsen and prolong the attack. It should be initiated 2-4 weeks after resolution, with NSAID or colchicine cover.",
        drugId: "37",
        category: "Clinical Practice"
      },
      {
        id: "gout2",
        question: "What is the critical drug interaction between Allopurinol and Azathioprine?",
        options: [
          "No interaction",
          "Allopurinol blocks azathioprine metabolism - dose must be reduced 75%",
          "Azathioprine increases allopurinol levels",
          "They enhance each other's effect safely"
        ],
        correctAnswer: 1,
        explanation: "Allopurinol inhibits xanthine oxidase which metabolizes azathioprine's active metabolite. Without dose reduction (by 75%), severe bone marrow suppression can occur.",
        drugId: "37",
        category: "Interactions"
      },
      {
        id: "gout3",
        question: "What is the main sign of Colchicine toxicity?",
        options: [
          "Constipation",
          "Severe diarrhea and GI symptoms",
          "Headache",
          "Skin rash"
        ],
        correctAnswer: 1,
        explanation: "GI symptoms (diarrhea, nausea, vomiting) are early warning signs of colchicine toxicity. Treatment should be stopped if these occur.",
        drugId: "38",
        category: "Toxicity"
      },
      {
        id: "gout4",
        question: "What is the most dangerous error with Methotrexate for rheumatoid arthritis?",
        options: [
          "Taking it with food",
          "Accidentally taking it DAILY instead of WEEKLY",
          "Taking it at night",
          "Skipping folic acid"
        ],
        correctAnswer: 1,
        explanation: "Methotrexate for RA/psoriasis is taken WEEKLY. Daily dosing is a fatal error that causes severe bone marrow suppression, hepatotoxicity, and death.",
        drugId: "36",
        category: "Safety"
      }
    ]
  },
  {
    id: "antifungals-antivirals",
    title: "Antifungal & Antimicrobial Agents",
    description: "Review antifungal drugs and their interactions",
    category: "Infectious Disease",
    difficulty: "intermediate",
    icon: "🍄",
    questions: [
      {
        id: "af1",
        question: "Why is Fluconazole a significant concern for drug interactions?",
        options: [
          "It has no interactions",
          "Strong CYP inhibitor affecting many drugs",
          "It is poorly absorbed",
          "It causes allergy"
        ],
        correctAnswer: 1,
        explanation: "Fluconazole is a potent inhibitor of CYP2C9, CYP2C19, and CYP3A4, leading to significant interactions with warfarin, statins, phenytoin, and many other drugs.",
        drugId: "40",
        category: "Interactions"
      },
      {
        id: "af2",
        question: "What unique dosing makes Fluconazole convenient for vaginal candidiasis?",
        options: [
          "Twice daily for 7 days",
          "Single 150mg dose",
          "Monthly injections",
          "Topical only"
        ],
        correctAnswer: 1,
        explanation: "A single oral 150mg dose of fluconazole is effective for uncomplicated vaginal candidiasis due to its long half-life (30 hours) and high tissue penetration.",
        drugId: "40",
        category: "Administration"
      },
      {
        id: "af3",
        question: "Why must patients avoid lying down after taking Doxycycline?",
        options: [
          "It causes dizziness",
          "Risk of esophageal ulceration",
          "It reduces absorption",
          "It causes nausea"
        ],
        correctAnswer: 1,
        explanation: "Doxycycline can cause severe esophageal ulceration if it lodges in the esophagus. Patients should take it with a full glass of water and remain upright for 30 minutes.",
        drugId: "39",
        category: "Administration"
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
  },
  {
    id: "case7",
    title: "Drug Interaction Crisis",
    scenario: "A 55-year-old man on long-term medications presents to the pharmacy asking to buy ibuprofen for back pain. He mentions he takes 'blood pressure pills and something for his heart.'",
    patientInfo: {
      age: 55,
      gender: "Male",
      weight: 85,
      height: 178,
      allergies: ["None known"],
      conditions: ["Hypertension", "Heart failure", "Chronic kidney disease stage 3"],
      currentMedications: ["Lisinopril 20mg daily", "Furosemide 40mg daily", "Spironolactone 25mg daily"]
    },
    questions: [
      {
        question: "What is the major concern with this patient taking ibuprofen?",
        options: [
          "It might upset his stomach",
          "NSAIDs can worsen renal function and reduce efficacy of his heart/BP medications",
          "It will make him sleepy",
          "No concerns - ibuprofen is safe"
        ],
        correctAnswer: 1,
        explanation: "NSAIDs cause sodium retention, reduce kidney function, and counteract ACE inhibitors and diuretics. In this patient with CKD and heart failure, this could precipitate acute kidney injury or heart failure exacerbation."
      },
      {
        question: "The 'triple whammy' drug combination includes ACE inhibitors, diuretics, and:",
        options: [
          "Paracetamol",
          "NSAIDs",
          "Antibiotics",
          "Antacids"
        ],
        correctAnswer: 1,
        explanation: "The 'triple whammy' is ACE inhibitor + diuretic + NSAID, which significantly increases risk of acute kidney injury. This patient is already on ACE inhibitor and diuretics."
      },
      {
        question: "What alternative would you recommend for his back pain?",
        options: [
          "Higher dose of ibuprofen",
          "Paracetamol with lifestyle measures",
          "Aspirin",
          "More diuretics"
        ],
        correctAnswer: 1,
        explanation: "Paracetamol is the safest analgesic for this patient. Non-pharmacological approaches like heat, gentle exercise, and physiotherapy should also be recommended."
      }
    ],
    learningPoints: [
      "NSAIDs are dangerous in patients with CKD, heart failure, or on multiple antihypertensives",
      "The 'triple whammy' (ACE-I/ARB + diuretic + NSAID) significantly increases AKI risk",
      "Paracetamol is the analgesic of choice in high-risk patients",
      "Always review patient's conditions before recommending OTC medications",
      "Heart failure patients are particularly vulnerable to fluid retention from NSAIDs"
    ],
    difficulty: "intermediate"
  },
  {
    id: "case8",
    title: "Lithium Toxicity",
    scenario: "A 42-year-old woman with bipolar disorder on Lithium therapy presents with tremor, confusion, and slurred speech. She mentions she started taking ibuprofen for joint pain a week ago and has had diarrhea for 3 days.",
    patientInfo: {
      age: 42,
      gender: "Female",
      weight: 68,
      height: 165,
      allergies: ["Penicillin"],
      conditions: ["Bipolar disorder", "Osteoarthritis"],
      currentMedications: ["Lithium 900mg daily", "Ibuprofen 400mg three times daily (self-started)"]
    },
    questions: [
      {
        question: "What is the most likely cause of her symptoms?",
        options: [
          "Flu infection",
          "Lithium toxicity precipitated by NSAID use and dehydration",
          "Side effect of osteoarthritis",
          "Bipolar relapse"
        ],
        correctAnswer: 1,
        explanation: "NSAIDs reduce lithium excretion, and dehydration from diarrhea further concentrates lithium. The symptoms (tremor, confusion, slurred speech) are classic lithium toxicity signs."
      },
      {
        question: "What immediate action is required?",
        options: [
          "Continue medications and rest",
          "Urgent medical evaluation - possible dialysis if severe",
          "Take more lithium",
          "Switch to another NSAID"
        ],
        correctAnswer: 1,
        explanation: "Lithium toxicity is a medical emergency. The patient needs urgent evaluation, lithium level measurement, IV fluids, and potentially dialysis if levels are very high."
      },
      {
        question: "What should this patient have been counseled about when starting lithium?",
        options: [
          "No special precautions needed",
          "Avoid NSAIDs, maintain hydration, and maintain consistent salt intake",
          "Take extra lithium if feeling unwell",
          "NSAIDs improve lithium effectiveness"
        ],
        correctAnswer: 1,
        explanation: "Lithium patients must avoid NSAIDs, maintain adequate hydration, have consistent sodium intake, and avoid dehydrating situations. Any new medication should be checked for interactions."
      }
    ],
    learningPoints: [
      "NSAIDs significantly reduce lithium excretion and increase levels",
      "Dehydration from any cause can precipitate lithium toxicity",
      "Early signs of toxicity include tremor, GI upset, and confusion",
      "Lithium has a narrow therapeutic index requiring careful monitoring",
      "Patient education on avoiding drug interactions is crucial for lithium therapy"
    ],
    difficulty: "advanced"
  },
  {
    id: "case9",
    title: "Serotonin Syndrome Risk",
    scenario: "A 35-year-old woman on Sertraline for depression comes to the pharmacy with a prescription for Tramadol for post-surgical pain. She mentions she also takes St. John's Wort occasionally.",
    patientInfo: {
      age: 35,
      gender: "Female",
      weight: 62,
      height: 168,
      allergies: ["Sulfa drugs"],
      conditions: ["Major depressive disorder", "Recent knee surgery"],
      currentMedications: ["Sertraline 100mg daily", "St. John's Wort (self-medicating)", "Tramadol 50mg QID (new prescription)"]
    },
    questions: [
      {
        question: "What serious condition could result from this combination?",
        options: [
          "Weight gain",
          "Serotonin syndrome",
          "Hair loss",
          "Improved mood"
        ],
        correctAnswer: 1,
        explanation: "Sertraline (SSRI) + Tramadol (serotonin reuptake inhibitor) + St. John's Wort (serotonin effects) creates very high serotonin syndrome risk, which can be life-threatening."
      },
      {
        question: "Symptoms of serotonin syndrome include:",
        options: [
          "Lethargy and constipation",
          "Hyperthermia, agitation, tremor, and hyperreflexia",
          "Weight loss and improved concentration",
          "Drowsiness only"
        ],
        correctAnswer: 1,
        explanation: "Serotonin syndrome presents with hyperthermia, agitation, tremor, hyperreflexia, autonomic instability, and in severe cases, seizures, rhabdomyolysis, and death."
      },
      {
        question: "What is the appropriate action for the pharmacist?",
        options: [
          "Dispense as prescribed",
          "Contact prescriber about interaction and recommend alternative analgesic",
          "Tell patient to stop sertraline",
          "Double the tramadol dose"
        ],
        correctAnswer: 1,
        explanation: "The pharmacist should contact the prescriber, explain the serotonin syndrome risk, and recommend alternative analgesia such as paracetamol or codeine (with caution)."
      }
    ],
    learningPoints: [
      "Tramadol has serotonergic activity and can cause serotonin syndrome with SSRIs",
      "St. John's Wort also affects serotonin and has multiple drug interactions",
      "Always screen for herbal supplements in drug interaction checks",
      "Alternative analgesics should be considered in patients on serotonergic drugs",
      "Serotonin syndrome can be rapidly fatal - recognition and prevention are key"
    ],
    difficulty: "advanced"
  },
  {
    id: "case10",
    title: "Antibiotic Timing Challenge",
    scenario: "A 28-year-old woman is prescribed Doxycycline 100mg twice daily for acne. She takes a multivitamin with iron every morning, drinks a glass of milk with breakfast, and takes antacids for occasional heartburn.",
    patientInfo: {
      age: 28,
      gender: "Female",
      weight: 58,
      height: 165,
      allergies: ["None"],
      conditions: ["Moderate acne vulgaris", "Occasional heartburn"],
      currentMedications: ["Multivitamin with iron (daily)", "Calcium-containing antacids (PRN)", "Oral contraceptive pill"]
    },
    questions: [
      {
        question: "What major issue affects doxycycline absorption with her current routine?",
        options: [
          "She's taking it too often",
          "Iron, calcium (milk), and antacids all chelate and reduce doxycycline absorption",
          "Doxycycline doesn't work for acne",
          "She should take it at night only"
        ],
        correctAnswer: 1,
        explanation: "Divalent and trivalent cations (calcium, magnesium, aluminum, iron) form insoluble complexes with tetracyclines, drastically reducing absorption - sometimes to near zero."
      },
      {
        question: "How should she space her medications?",
        options: [
          "Take everything together for convenience",
          "Doxycycline 2-3 hours before or after iron/calcium/antacids",
          "Skip the multivitamin entirely",
          "Take doxycycline with milk to reduce nausea"
        ],
        correctAnswer: 1,
        explanation: "Doxycycline should be taken 2-3 hours before or after products containing divalent cations. Unlike other tetracyclines, it can be taken with food but not dairy or iron."
      },
      {
        question: "What additional counseling is essential for this patient on doxycycline?",
        options: [
          "Increase sun exposure for vitamin D",
          "Avoid sun exposure and use sunscreen - severe photosensitivity risk",
          "Drink alcohol freely",
          "Take double doses if missed"
        ],
        correctAnswer: 1,
        explanation: "Doxycycline causes significant photosensitivity. Patients should avoid excessive sun exposure, use SPF 30+ sunscreen, and wear protective clothing."
      }
    ],
    learningPoints: [
      "Tetracyclines bind to metal ions reducing absorption dramatically",
      "Separate doxycycline from calcium, iron, magnesium, and aluminum products by 2-3 hours",
      "Doxycycline can be taken with non-dairy food to reduce GI upset",
      "Severe photosensitivity is a major concern - sun protection is essential",
      "Stay upright for 30 minutes after taking to prevent esophageal irritation"
    ],
    difficulty: "beginner"
  },
  {
    id: "case11",
    title: "Methotrexate Dosing Error",
    scenario: "A community pharmacist receives a prescription for Methotrexate 7.5mg DAILY for a 65-year-old patient newly diagnosed with rheumatoid arthritis.",
    patientInfo: {
      age: 65,
      gender: "Male",
      weight: 78,
      height: 172,
      allergies: ["None"],
      conditions: ["Rheumatoid arthritis", "Mild hypertension"],
      currentMedications: ["Amlodipine 5mg daily"]
    },
    questions: [
      {
        question: "What is critically wrong with this prescription?",
        options: [
          "The dose is too low",
          "Methotrexate for RA should be WEEKLY, not daily - this is a potentially fatal error",
          "Methotrexate doesn't work for RA",
          "The patient is too old"
        ],
        correctAnswer: 1,
        explanation: "Methotrexate for rheumatoid arthritis and psoriasis is dosed WEEKLY. Daily dosing is a well-documented fatal error that causes severe bone marrow suppression and organ failure."
      },
      {
        question: "What should the pharmacist do?",
        options: [
          "Dispense as written",
          "Refuse to dispense and contact the prescriber immediately",
          "Dispense half the quantity",
          "Tell patient to take it every other day"
        ],
        correctAnswer: 1,
        explanation: "This is a life-threatening error. The pharmacist must NOT dispense, must contact the prescriber to clarify the intended weekly dosing, and document the intervention."
      },
      {
        question: "What else should be prescribed with methotrexate for RA?",
        options: [
          "Vitamin C",
          "Folic acid 5mg weekly (different day to MTX)",
          "Extra methotrexate for breakthrough symptoms",
          "NSAIDs daily"
        ],
        correctAnswer: 1,
        explanation: "Folic acid supplementation (5mg weekly, often on a different day than methotrexate) reduces side effects like mouth ulcers, nausea, and hepatotoxicity without reducing efficacy."
      }
    ],
    learningPoints: [
      "Methotrexate for RA/psoriasis is WEEKLY - daily dosing is a fatal error",
      "This is one of the most common and dangerous prescribing errors",
      "Pharmacists play a critical role in catching dosing errors",
      "Folic acid supplementation is standard with low-dose methotrexate",
      "Many hospitals now require 'weekly' to be written explicitly on MTX prescriptions"
    ],
    difficulty: "advanced"
  },
  {
    id: "case12",
    title: "Elderly Fall Risk Assessment",
    scenario: "An 82-year-old woman is brought to the pharmacy by her daughter after two falls this week. She seems drowsy and slightly confused. Her medication list is extensive.",
    patientInfo: {
      age: 82,
      gender: "Female",
      weight: 52,
      height: 155,
      allergies: ["Aspirin"],
      conditions: ["Hypertension", "Insomnia", "Anxiety", "Osteoarthritis", "Type 2 Diabetes"],
      currentMedications: [
        "Amlodipine 10mg daily",
        "Temazepam 10mg at night",
        "Diazepam 5mg twice daily",
        "Amitriptyline 25mg at night",
        "Metformin 500mg twice daily",
        "Glibenclamide 5mg daily"
      ]
    },
    questions: [
      {
        question: "Which medications are most likely contributing to her falls?",
        options: [
          "Metformin",
          "Benzodiazepines (temazepam, diazepam) and amitriptyline",
          "Amlodipine only",
          "All medications equally"
        ],
        correctAnswer: 1,
        explanation: "Benzodiazepines and tricyclic antidepressants are strongly associated with falls in elderly due to sedation, confusion, and orthostatic hypotension. These are on the Beers Criteria."
      },
      {
        question: "According to Beers Criteria, which medications should be avoided in elderly?",
        options: [
          "Metformin and amlodipine",
          "Benzodiazepines, tricyclic antidepressants, and long-acting sulfonylureas",
          "All diabetes medications",
          "Only sleeping pills"
        ],
        correctAnswer: 1,
        explanation: "Beers Criteria specifically recommends avoiding benzodiazepines, TCAs, and long-acting sulfonylureas (glibenclamide) in elderly due to falls, confusion, and hypoglycemia risk."
      },
      {
        question: "What additional danger does her diabetes regimen pose?",
        options: [
          "Too much weight loss",
          "Hypoglycemia from glibenclamide contributing to falls and confusion",
          "Kidney damage",
          "No concerns"
        ],
        correctAnswer: 1,
        explanation: "Glibenclamide's long half-life increases hypoglycemia risk in elderly, which can present as confusion and falls. Shorter-acting agents or different classes are preferred."
      }
    ],
    learningPoints: [
      "Multiple sedating medications dramatically increase fall risk in elderly",
      "Beers Criteria identifies medications to avoid in older adults",
      "Benzodiazepines should be avoided in elderly - use non-pharmacological sleep hygiene first",
      "Long-acting sulfonylureas increase hypoglycemia and fall risk in elderly",
      "Polypharmacy reviews are essential in elderly patients with new symptoms"
    ],
    difficulty: "intermediate"
  }
];
