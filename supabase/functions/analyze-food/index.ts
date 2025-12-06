import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image } = await req.json();
    
    if (!image) {
      return new Response(
        JSON.stringify({ error: "Image is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing food image...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Você é um nutricionista especialista em análise de alimentos. Analise a imagem de comida fornecida e retorne APENAS um JSON válido (sem markdown, sem código) com a seguinte estrutura:
{
  "name": "Nome do prato",
  "items": [
    {
      "name": "Nome do alimento",
      "portion": "Porção estimada (ex: 100g, 1 unidade)",
      "calories": número,
      "protein": número em gramas,
      "carbs": número em gramas,
      "fat": número em gramas
    }
  ],
  "total": {
    "calories": número total,
    "protein": número total em gramas,
    "carbs": número total em gramas,
    "fat": número total em gramas
  },
  "healthScore": número de 1 a 10,
  "tips": "Uma dica nutricional sobre a refeição"
}

Seja preciso nas estimativas nutricionais baseando-se em porções visíveis. Se não conseguir identificar alimentos, retorne um JSON com items vazio e uma mensagem no campo tips.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analise esta imagem de comida e forneça informações nutricionais detalhadas. Retorne apenas o JSON, sem formatação markdown."
              },
              {
                type: "image_url",
                image_url: {
                  url: image
                }
              }
            ]
          }
        ],
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Muitas requisições. Aguarde um momento e tente novamente." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Adicione mais créditos para continuar." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI Response received");

    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse JSON from response (remove any markdown code blocks if present)
    let cleanContent = content.trim();
    if (cleanContent.startsWith("```json")) {
      cleanContent = cleanContent.slice(7);
    }
    if (cleanContent.startsWith("```")) {
      cleanContent = cleanContent.slice(3);
    }
    if (cleanContent.endsWith("```")) {
      cleanContent = cleanContent.slice(0, -3);
    }
    cleanContent = cleanContent.trim();

    let result;
    try {
      result = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", cleanContent);
      // Return a fallback response
      result = {
        name: "Refeição",
        items: [],
        total: { calories: 0, protein: 0, carbs: 0, fat: 0 },
        healthScore: 5,
        tips: "Não foi possível analisar a imagem com precisão. Tente tirar uma foto mais clara."
      };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error analyzing food:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Erro ao analisar imagem" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
