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
    description: "Test your knowledge on diabetes medications including metformin and insulin",
    category: "Endocrine",
    difficulty: "intermediate",
    icon: "💊",
    questions: [
      {
        id: "q1",
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
        id: "q2",
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
        id: "q3",
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
        id: "q4",
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
      }
    ]
  },
  {
    id: "anticoagulants",
    title: "Anticoagulant Therapy",
    description: "Learn about blood thinners including warfarin and their management",
    category: "Hematology",
    difficulty: "advanced",
    icon: "🩸",
    questions: [
      {
        id: "q1",
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
        id: "q2",
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
        id: "q3",
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
        id: "q1",
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
        id: "q2",
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
        id: "q3",
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
        id: "q1",
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
        id: "q2",
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
        id: "q1",
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
        id: "q2",
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
      }
    ],
    learningPoints: [
      "Metformin is first-line for Type 2 Diabetes but requires renal function assessment",
      "GI side effects are common but can be minimized by taking with food",
      "Start with low doses and titrate slowly to improve tolerance",
      "Regular monitoring of renal function and B12 levels is recommended"
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
      }
    ],
    learningPoints: [
      "Antibiotics are a common cause of Warfarin interactions",
      "Patients on Warfarin should have INR checked when starting new medications",
      "Elevated INR requires prompt intervention to prevent bleeding",
      "Patient education about drug interactions is crucial"
    ],
    difficulty: "advanced"
  }
];
