import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ComposeInput {
  subject: string;
  setting: string;
  action: string;
  lighting: string;
  art_direction: string;
  extras: string;
  params: {
    ar: string;
    stylize: number;
    chaos: number;
    raw: boolean;
    seed?: string;
    profiles: string[];
    srefs: string[];
    sw?: number;
    strip_query: boolean;
    max_srefs: number;
  };
}

interface ComposeOutput {
  prompt_line: string;
  variants: string[];
  notes: string;
}

const SYSTEM_MESSAGE = `You are an expert Midjourney prompt engineer. Your job is to take a simple idea and transform it into a detailed, cinematic Midjourney prompt following a proven formula.

THE CINEMATIC FORMULA - Follow this exact structure:
1. CHARACTER + ACTION: Start with a specific subject and what they're doing
2. ENVIRONMENT + KEY GEOMETRY: Add the setting with a bold geometric element (portal, disc, ring, monolith, pyramid)
3. LIGHT BEHAVIOR + COLOR CONTRAST: Include warm + cool color duality (orange/blue, cyan/magenta, gold/silver)
4. ATMOSPHERE + CINEMATIC TONE: Add diffusion elements (mist, fog, snow) and textures
5. EMOTIONAL CUE: End with a mood descriptor (quiet awe, silent revelation, contemplative wonder)
6. TECHNICAL PARAMETERS: Apply flags in correct order

THE TONAL EQUATION - Keep these balanced:
- Isolation: Single subject or small focus point (minimalist composition)
- Geometry: One bold, simple shape as visual anchor
- Color Duality: Always pair warm + cool colors for cinematic energy
- Atmospheric Softness: Use fog, mist, snow, or light diffusion to avoid hard sci-fi

IDEAL PARAMETER RANGES FOR CINEMATIC RESULTS:
- chaos: 45-60 (provides variety without losing structure)
- stylize: 600-800 (refined lighting and color harmony)
- ar: 3:2 recommended (perfect cinematic framing)
- raw: true preferred (realistic material quality)

MIDJOURNEY SYNTAX RULES - CRITICAL:
- NEVER use --sw (style weight) unless --sref image URLs are provided in params.srefs
- Only include --sref if actual image URLs exist in params.srefs array
- If params.srefs is empty, do NOT include --sref or --sw in output
- Flag order MUST BE: --ar → --stylize → --chaos → --raw → --profile → --sref → --sw → --seed
- Use double hyphens (--) never single hyphen (-)
- Limit srefs to params.max_srefs value
- Strip URL query strings if params.strip_query is true
- One line only, no line breaks anywhere

ENHANCEMENT EXAMPLES:
- Subject: "climber" → "lone futuristic climber in weathered metallic suit"
- Geometry: Add "circular portal of light embedded in mountain wall"
- Color: Add "glowing orange core radiating into blue mist"
- Atmosphere: Add "crystalline snow catching reflections, volumetric fog"
- Emotion: Add "mood of quiet awe and transcendence"
- Result: Minimal, powerful, cinematic composition

TEMPERATURE SETTINGS:
- Use params.stylize value in output
- Use params.chaos value in output
- Include params.raw if true
- Use params.ar for aspect ratio

OUTPUT FORMAT:
{
  "prompt_line": "subject, setting, action, lighting, art direction, extras --ar X:X --stylize XXX --chaos XX [--raw] [--sref URLs --sw XXX] [--seed XXX]",
  "variants": [
    "different creative interpretation with different mood/lighting/composition",
    "another variant with alternative style or atmosphere"
  ],
  "notes": "brief explanation of creative enhancements made and why"
}

EXAMPLE TRANSFORMATIONS:
Input: {"subject": "cyber punk futuristic human", ...}
Good: "augmented human with neon cybernetic implants and holographic interface, rain-soaked Tokyo alleyway with glowing advertisements, reaching toward floating data stream, electric blue and magenta neon lighting with reflections on wet pavement, Blade Runner cinematic style, photorealistic detail, anamorphic lens flares, shot on RED camera"

Input: {"subject": "mountain climber", ...}
Good: "experienced alpinist in bright red technical gear with ice axe, jagged snow-covered peak at golden hour with clouds below, ascending final ridge toward summit, warm backlight creating rim glow with lens flare, adventure photography editorial style, dramatic low angle composition, atmospheric haze, shot on medium format Hasselblad"

Remember: The user gives you a simple idea. Your job is to be CREATIVE and ADD DETAILS they haven't thought of while maintaining their core concept.`;

function stripQueryString(url: string): string {
  try {
    const urlObj = new URL(url);
    return `${urlObj.origin}${urlObj.pathname}`;
  } catch {
    return url;
  }
}

function sanitizePrompt(s: string): string {
  return s
    .replace(/\u2013|\u2014/g, "--") // em-dash and en-dash to --
    .replace(/\s+/g, " ") // normalize spaces
    .trim();
}

function validateAndCleanPrompt(prompt: string, hasSrefs: boolean): string {
  // Remove --sw if there are no --sref URLs
  if (!hasSrefs && prompt.includes("--sw")) {
    prompt = prompt.replace(/--sw\s+\d+/g, "");
  }
  
  // Remove --sref if it's empty or malformed
  prompt = prompt.replace(/--sref\s+(?=--)/g, "");
  
  return sanitizePrompt(prompt);
}

export async function POST(request: NextRequest) {
  try {
    const input: ComposeInput = await request.json();
    
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }
    
    // Check if there are actual style reference URLs
    const hasSrefs = input.params.srefs && input.params.srefs.length > 0 && input.params.srefs.some(url => url.trim());
    
    // If no srefs, remove sw from params to signal AI not to use it
    if (!hasSrefs) {
      delete input.params.sw;
    }
    
    const userMessage = JSON.stringify(input, null, 2);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_MESSAGE },
        { 
          role: "user", 
          content: `${userMessage}\n\nIMPORTANT: ${hasSrefs ? 'Style references are provided, you may use --sref and --sw' : 'NO style references provided - do NOT use --sref or --sw flags'}`
        },
      ],
      temperature: 0.7, // Increased for more creativity
      response_format: { type: "json_object" },
    });
    
    const responseText = completion.choices[0].message.content || "{}";
    const output: ComposeOutput = JSON.parse(responseText);
    
    // Validate and clean the main prompt
    output.prompt_line = validateAndCleanPrompt(output.prompt_line, hasSrefs);
    
    // Validate and clean variants
    output.variants = (output.variants || []).map(v => validateAndCleanPrompt(v, hasSrefs));
    
    // Apply query string stripping if needed
    if (input.params.strip_query) {
      output.prompt_line = output.prompt_line.replace(
        /https?:\/\/[^\s]+/g,
        (match) => stripQueryString(match)
      );
      output.variants = output.variants.map((variant) =>
        variant.replace(/https?:\/\/[^\s]+/g, (match) => stripQueryString(match))
      );
    }
    
    return NextResponse.json(output);
  } catch (error) {
    console.error("Error composing prompt:", error);
    return NextResponse.json(
      { 
        error: "Failed to compose prompt",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
