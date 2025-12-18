import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, topics, weakAreas, difficulty, questionCount } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    if (type === "generate_quiz") {
      systemPrompt = `You are a pharmacy education expert. Generate quiz questions about pharmaceutical topics. Each question should have 4 options with only one correct answer. Include explanations.`;
      
      userPrompt = `Generate ${questionCount || 5} ${difficulty || 'intermediate'} level quiz questions about: ${topics?.join(', ') || 'general pharmacology'}.
      
${weakAreas?.length ? `Focus especially on these weak areas: ${weakAreas.join(', ')}` : ''}

Return a JSON array of questions in this exact format:
{
  "questions": [
    {
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Explanation of why this is correct",
      "category": "Topic category"
    }
  ]
}`;
    } else if (type === "generate_study_plan") {
      systemPrompt = `You are a pharmacy education advisor. Create personalized study plans based on student performance and weak areas.`;
      
      userPrompt = `Create a ${topics?.duration || 7}-day study plan for a pharmacy student.

Weak areas that need focus: ${weakAreas?.join(', ') || 'general review'}
Topics to cover: ${topics?.topics?.join(', ') || 'pharmacology basics'}

Return a JSON object in this exact format:
{
  "title": "Study plan title",
  "description": "Brief description",
  "focusAreas": ["area1", "area2"],
  "dailyGoals": {
    "day1": {"tasks": ["task1", "task2"], "drugs": ["drug1"], "quizTopics": ["topic1"]},
    "day2": {"tasks": ["task1"], "drugs": ["drug2"], "quizTopics": ["topic2"]}
  },
  "tips": ["Study tip 1", "Study tip 2"]
}`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";
    
    // Parse JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse AI response");
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    
    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in ai-study-tools:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
